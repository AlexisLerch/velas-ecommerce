// app/products/[id]/page.tsx
import type { Metadata } from "next";
import { getProductById } from "@/lib/products";
import ProductDetail from "@/components/product/ProductDetail";

interface Props {
  params: Promise<{ id: string }>; // ⚠ tratar params como Promise
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = id ? await getProductById(id) : null;
  if (!product) return { title: "Producto no encontrado" };

  const description =
    product.description ??
    `${product.name}: vela artesanal de La Comarca de Cera.`;
  return {
    title: product.name,
    description,
    openGraph: { title: product.name, description, images: [product.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params; // ✅ unwrap del Promise

  if (!id) return <div>ID no definido</div>;

  const product = await getProductById(id);

  if (!product) return <div>Producto no encontrado</div>;

  return <ProductDetail product={product} />;
}
