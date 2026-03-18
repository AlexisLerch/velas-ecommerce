// app/products/page.tsx
import ProductsGrid from "@/components/product/PrdouctGrid";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-secondary">
      <ProductsGrid products={products} />
    </div>
  );
}
