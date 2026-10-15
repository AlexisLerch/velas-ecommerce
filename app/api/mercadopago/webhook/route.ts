import { after, NextResponse } from "next/server";
import { sendOrderPaid } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { getPayment, verifySignature } from "@/lib/mercadopago";
import { cancelOrder } from "@/lib/orders";

async function handle(req: Request) {
  const url = new URL(req.url);
  let body: { type?: string; data?: { id?: string | number } } = {};
  try {
    body = await req.json();
  } catch {}

  const type =
    body.type ?? url.searchParams.get("type") ?? url.searchParams.get("topic");
  const dataId = String(
    body.data?.id ??
      url.searchParams.get("data.id") ??
      url.searchParams.get("id") ??
      "",
  );

  if (type !== "payment" || !dataId) return NextResponse.json({ ok: true });
  if (!verifySignature(req, dataId))
    return NextResponse.json({ error: "Firma inválida" }, { status: 401 });

  try {
    // Se consulta el pago directo a MP: no se confía en lo que llega en el body
    const payment = await getPayment(dataId);
    const orderId = payment.external_reference;
    if (!orderId) return NextResponse.json({ ok: true });

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return NextResponse.json({ ok: true });

    if (payment.status === "approved") {
      if ((payment.transaction_amount ?? 0) < order.total) {
        console.error("MP: monto menor al total", {
          orderId,
          payment: payment.id,
        });
        return NextResponse.json({ ok: true });
      }
      const res = await prisma.order.updateMany({
        where: { id: orderId, status: "PENDING_PAYMENT" },
        data: { status: "PAID", mpPaymentId: String(payment.id) },
      });
      // Solo la primera notificación manda mail (MP puede repetirlas)
      if (res.count === 1) {
        const paid = await prisma.order.findUnique({
          where: { id: orderId },
          include: { items: true },
        });
        if (paid) after(() => sendOrderPaid(paid));
      }
    } else if (
      payment.status === "rejected" ||
      payment.status === "cancelled"
    ) {
      await cancelOrder(orderId);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("MP WEBHOOK ERROR:", error);
    // 500 => Mercado Pago reintenta
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}

export const POST = handle;
export const GET = handle;
