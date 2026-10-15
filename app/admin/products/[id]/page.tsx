import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "../../actions";
import ProductForm from "../ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <>
      <Link href="/admin/products" className="text-sm underline">
        ← Productos
      </Link>
      <h1 className="text-2xl font-bold my-4">Editar: {product.name}</h1>
      <ProductForm id={product.id} product={product} />
      <form action={deleteProduct.bind(null, product.id)} className="mt-10">
        <button className="text-red-600 underline text-sm">
          Eliminar producto
        </button>
      </form>
    </>
  );
}
