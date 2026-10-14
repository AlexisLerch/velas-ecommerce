"use client";

import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { useFavoritesStore } from "@/store/favoritesStore";
import type { Product } from "@/lib/products";

export default function FavoritesClient({ products }: { products: Product[] }) {
  const ids = useFavoritesStore((s) => s.ids);
  const favorites = products.filter((p) => ids.includes(p.id));

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-4xl md:text-6xl font-light tracking-wide text-heading mb-16">
          Favoritos
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center">
            <p className="text-muted mb-8">
              Todavía no guardaste ninguna vela. Tocá el corazón en las que más
              te gusten.
            </p>
            <Link
              href="/products"
              className="inline-block bg-navbar text-white px-10 py-4 rounded-lg tracking-wide shadow-lg hover:shadow-xl transition"
            >
              Ver velas
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                description={p.description ?? ""}
                image={p.image}
                badge={p.badge}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
