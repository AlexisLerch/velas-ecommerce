import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { site, whatsappLink } from "@/config/site";
import ClearCart from "./ClearCart";

export const dynamic = "force-dynamic";

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; r?: string }>;
}) {
  const { order: id, r } = await searchParams;
  const order = id
    ? await prisma.order.findUnique({
        where: { id },
        include: { items: true },
      })
    : null;

  if (!order)
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Pedido no encontrado</h1>
        <Link href="/products" className="underline">
          Volver a la tienda
        </Link>
      </div>
    );

  const failed = r === "failure" || order.status === "CANCELLED";
  const paid = order.status !== "PENDING_PAYMENT" && !failed;
  const mp = order.paymentMethod === "MERCADOPAGO";

  const title = failed
    ? "El pago no se completó"
    : paid
      ? "¡Gracias por tu compra!"
      : mp
        ? "Estamos esperando la confirmación del pago"
        : "¡Recibimos tu pedido!";

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* Con MP el carrito se vacía recién acá, cuando el cliente vuelve */}
      {!failed && mp && <ClearCart />}

      <h1 className="text-3xl font-bold mb-2 text-center">{title}</h1>
      <p className="text-center text-muted mb-10">Pedido #{order.number}</p>

      {failed && (
        <p className="text-center mb-8">
          Tu pedido fue cancelado y no se hizo ningún cobro. Podés volver a
          intentarlo desde el carrito.
        </p>
      )}

      {!failed && order.paymentMethod === "TRANSFER" && (
        <div className="bg-secondary p-4 rounded mb-8 text-sm space-y-1">
          <p className="font-semibold">
            Transferí ${order.total.toLocaleString("es-AR")} a:
          </p>
          {site.bank.alias && <p>Alias: {site.bank.alias}</p>}
          {site.bank.cbu && <p>CBU: {site.bank.cbu}</p>}
          {site.bank.holder && <p>Titular: {site.bank.holder}</p>}
          <p className="pt-2">
            Después enviá el comprobante por{" "}
            <a
              className="underline"
              href={whatsappLink(`Hola! Te envío el comprobante del pedido #${order.number}`)}
            >
              WhatsApp
            </a>{" "}
            indicando el número de pedido.
          </p>
        </div>
      )}

      {!failed && order.paymentMethod === "CASH" && (
        <p className="bg-secondary p-4 rounded mb-8 text-sm">
          Pagás en efectivo{" "}
          {order.deliveryMethod === "PICKUP" ? "al retirar" : "al recibir"} tu
          pedido. Te vamos a contactar para coordinar.
        </p>
      )}

      <section className="mb-8">
        <h2 className="font-semibold mb-3">Resumen</h2>
        {order.items.map((i) => (
          <div key={i.id} className="flex justify-between border-b py-2 text-sm">
            <span>
              {i.name} x{i.quantity}
            </span>
            <span>${(i.unitPrice * i.quantity).toLocaleString("es-AR")}</span>
          </div>
        ))}
        <div className="flex justify-between pt-2 text-sm">
          <span>Envío</span>
          <span>
            {order.shippingCost === 0
              ? "Gratis"
              : `$${order.shippingCost.toLocaleString("es-AR")}`}
          </span>
        </div>
        <div className="flex justify-between pt-2 font-bold">
          <span>Total</span>
          <span>${order.total.toLocaleString("es-AR")}</span>
        </div>
      </section>

      <div className="text-center">
        <Link href="/products" className="underline">
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}
