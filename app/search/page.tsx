import SearchClient from "@/components/search/SearchClient";
import { getProducts } from "@/lib/products";

export const metadata = { title: "Buscar | La Comarca de Cera" };

export default async function SearchPage() {
  const products = await getProducts();
  return <SearchClient products={products} />;
}
