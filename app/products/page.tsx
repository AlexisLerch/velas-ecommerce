// ProductsPage.tsx
import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/products";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Nuestras Velas</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
