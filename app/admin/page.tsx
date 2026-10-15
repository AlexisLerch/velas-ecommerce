import Link from "next/link";
import type { OrderStatus } from "@prisma/client";
import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { money, PAYMENT_LABEL, STATUS_LABEL } from "./statusLabels";

export const dynamic = "force-dynamic";

export default async function AdminOrders({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const { status } = await searchParams;
  const filter =
    status && status in STATUS_LABEL ? (status as OrderStatus) : undefined;

  const orders = await prisma.order.findMany({
    where: filter ? { status: filter } : {},
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const chip = (active: boolean) =>
    `px-3 py-1 rounded border ${active ? "bg-navbar text-white" : ""}`;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      <div className="flex flex-wrap gap-2 mb-6 text-sm">
        <Link href="/admin" className={chip(!filter)}>
          Todos
        </Link>
        {Object.entries(STATUS_LABEL).map(([k, v]) => (
          <Link key={k} href={`/admin?status=${k}`} className={chip(filter === k)}>
            {v}
          </Link>
        ))}
      </div>

      {orders.length === 0 ? (
        <p>No hay pedidos.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-cardBorder">
                <th className="py-2 pr-4">#</th>
                <th className="pr-4">Fecha</th>
                <th className="pr-4">Cliente</th>
                <th className="pr-4">Pago</th>
                <th className="pr-4">Estado</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-cardBorder hover:bg-secondary"
                >
                  <td className="py-2 pr-4">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="underline font-semibold"
                    >
                      #{o.number}
                    </Link>
                  </td>
                  <td className="pr-4">
                    {o.createdAt.toLocaleString("es-AR")}
                  </td>
                  <td className="pr-4">{o.customerName}</td>
                  <td className="pr-4">{PAYMENT_LABEL[o.paymentMethod]}</td>
                  <td className="pr-4">{STATUS_LABEL[o.status]}</td>
                  <td className="text-right">{money(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
