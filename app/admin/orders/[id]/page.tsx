import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { updateOrderStatus } from "../../actions";
import { money, PAYMENT_LABEL, STATUS_LABEL } from "../../statusLabels";

export const dynamic = "force-dynamic";

export default async function AdminOrder({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const o = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!o) notFound();

  const next: { status: string; label: string }[] = [];
  if (o.status === "PENDING_PAYMENT")
    next.push({ status: "PAID", label: "Marcar como pagado" });
  if (o.status === "PAID")
    next.push({
      status: "SHIPPED",
      label:
        o.deliveryMethod === "PICKUP"
          ? "Listo para retirar"
          : "Marcar como enviado",
    });
  if (o.status === "SHIPPED")
    next.push({ status: "DELIVERED", label: "Marcar como entregado" });
  if (o.status !== "CANCELLED" && o.status !== "DELIVERED")
    next.push({ status: "CANCELLED", label: "Cancelar (devuelve stock)" });

  return (
    <>
      <Link href="/admin" className="text-sm underline">
        ← Pedidos
      </Link>
      <h1 className="text-2xl font-bold my-4">
        Pedido #{o.number} · {STATUS_LABEL[o.status]}
      </h1>

      <div className="grid md:grid-cols-2 gap-8 text-sm">
        <section className="space-y-1">
          <h2 className="font-semibold text-base mb-2">Cliente</h2>
          <p>{o.customerName}</p>
          <p>
            <a className="underline" href={`mailto:${o.customerEmail}`}>
              {o.customerEmail}
            </a>
          </p>
          <p>
            <a
              className="underline"
              href={`https://wa.me/${o.customerPhone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {o.customerPhone}
            </a>
          </p>
          <h2 className="font-semibold text-base mt-4 mb-2">Entrega</h2>
          {o.deliveryMethod === "PICKUP" ? (
            <p>Retiro por el local</p>
          ) : (
            <p>
              {o.address}, {o.city}, {o.province} (CP {o.postalCode})
            </p>
          )}
          {o.notes && (
            <p className="mt-2">
              <b>Notas:</b> {o.notes}
            </p>
          )}
          <p className="mt-4">
            <b>Pago:</b> {PAYMENT_LABEL[o.paymentMethod]}
          </p>
          {o.mpPaymentId && (
            <p>
              <b>ID de pago MP:</b> {o.mpPaymentId}
            </p>
          )}
          <p className="text-muted">
            Creado: {o.createdAt.toLocaleString("es-AR")}
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Productos</h2>
          {o.items.map((i) => (
            <div
              key={i.id}
              className="flex justify-between border-b border-cardBorder py-1"
            >
              <span>
                {i.name} × {i.quantity}
              </span>
              <span>{money(i.unitPrice * i.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-2">
            <span>Envío</span>
            <span>{money(o.shippingCost)}</span>
          </div>
          <div className="flex justify-between font-bold pt-1">
            <span>Total</span>
            <span>{money(o.total)}</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {next.map((n) => (
              <form
                key={n.status}
                action={updateOrderStatus.bind(null, o.id, n.status)}
              >
                <button
                  className={`px-4 py-2 rounded ${n.status === "CANCELLED" ? "border text-red-600" : "bg-navbar text-white"}`}
                >
                  {n.label}
                </button>
              </form>
            ))}
          </div>
          <p className="text-xs text-muted mt-2">
            Al marcar pagado o enviado, el cliente recibe un email.
          </p>
        </section>
      </div>
    </>
  );
}
