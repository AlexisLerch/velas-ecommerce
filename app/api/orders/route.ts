import { after, NextResponse } from "next/server";
import { sendOrderReceived } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";
import { createPreference, siteUrl } from "@/lib/mercadopago";
import {
  cancelOrder,
  createOrder,
  OrderError,
  parseOrderInput,
} from "@/lib/orders";

export async function POST(req: Request) {
  if (!rateLimit(`orders:${clientIp(req)}`, 10, 10 * 60 * 1000))
    return NextResponse.json(
      { error: "Demasiados intentos, probá de nuevo en unos minutos" },
      { status: 429 },
    );

  let order;
  try {
    order = await createOrder(parseOrderInput(await req.json()));
  } catch (error) {
    if (error instanceof OrderError)
      return NextResponse.json({ error: error.message }, { status: 400 });
    console.error("ORDER ERROR:", error);
    return NextResponse.json(
      { error: "No pudimos crear el pedido" },
      { status: 500 },
    );
  }

  // Transferencia / efectivo: queda pendiente, se confirma a mano
  if (order.paymentMethod !== "MERCADOPAGO") {
    const created = order;
    after(() => sendOrderReceived(created));
    return NextResponse.json({
      orderId: order.id,
      url: `/checkout/gracias?order=${order.id}`,
    });
  }

  try {
    const pref = await createPreference(order, siteUrl(req));
    await prisma.order.update({
      where: { id: order.id },
      data: { mpPreferenceId: pref.id },
    });
    return NextResponse.json({ orderId: order.id, url: pref.url });
  } catch (error) {
    console.error("MP ERROR:", error);
    await cancelOrder(order.id); // libera el stock
    return NextResponse.json(
      { error: "Error iniciando el pago con Mercado Pago" },
      { status: 502 },
    );
  }
}
