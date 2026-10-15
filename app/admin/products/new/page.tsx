import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import ProductForm from "../ProductForm";

export default async function NewProduct() {
  await requireAdmin();
  return (
    <>
      <Link href="/admin/products" className="text-sm underline">
        ← Productos
      </Link>
      <h1 className="text-2xl font-bold my-4">Nuevo producto</h1>
      <ProductForm id={null} />
    </>
  );
}
