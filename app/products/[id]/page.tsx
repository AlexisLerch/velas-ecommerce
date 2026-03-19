// app/products/[id]/page.tsx
import { getProductById } from "@/lib/products";
import ProductDetail from "@/components/product/ProductDetail";

interface Props {
  params: Promise<{ id: string }>; // ⚠ tratar params como Promise
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params; // ✅ unwrap del Promise

  if (!id) return <div>ID no definido</div>;

  const product = await getProductById(id);

  if (!product) return <div>Producto no encontrado</div>;

  return <ProductDetail product={product} />;
}
