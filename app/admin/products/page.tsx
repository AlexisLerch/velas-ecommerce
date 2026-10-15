import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { money } from "../statusLabels";

export const dynamic = "force-dynamic";

export default async function AdminProducts() {
  await requireAdmin();
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link
          href="/admin/products/new"
          className="bg-navbar text-white px-4 py-2 rounded text-sm"
        >
          + Nuevo producto
        </Link>
      </div>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-cardBorder">
            <th className="py-2">Producto</th>
            <th>Precio</th>
            <th>Stock</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-cardBorder">
              <td className="py-2">{p.name}</td>
              <td>{money(p.price)}</td>
              <td className={p.stock <= 2 ? "text-red-600 font-semibold" : ""}>
                {p.stock}
              </td>
              <td className="text-right">
                <Link href={`/admin/products/${p.id}`} className="underline">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
