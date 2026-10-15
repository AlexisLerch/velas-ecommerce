import FavoritesClient from "@/components/favorites/FavoritesClient";
import { getProducts } from "@/lib/products";

export const metadata = { title: "Favoritos" };

export default async function FavoritePage() {
  const products = await getProducts();
  return <FavoritesClient products={products} />;
}
