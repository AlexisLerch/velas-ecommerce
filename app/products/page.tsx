// app/products/page.tsx
import ProductCard from "@/components/product/ProductCard";
import { getProducts, Product } from "@/lib/products";

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-text">
        Nuestras Velas
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {products.map((prod) => (
          <ProductCard
            key={prod.id}
            name={prod.name}
            price={prod.price}
            image={prod.image}
          />
        ))}
      </div>
    </div>
  );
}
