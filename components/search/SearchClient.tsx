"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/lib/products";

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function SearchClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const q = normalize(query.trim());

  const results = q
    ? products.filter((p) =>
        normalize(
          [p.name, p.scent, p.category, p.description, ...(p.notes ?? [])]
            .filter(Boolean)
            .join(" "),
        ).includes(q),
      )
    : [];

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-4xl md:text-6xl font-light tracking-wide text-heading mb-12">
          Buscar
        </h1>

        <div className="relative max-w-xl mx-auto mb-16">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Probá con lavanda, vainilla, cítrico..."
            className="w-full pl-11 pr-4 py-4 rounded-full bg-card border border-cardBorder text-textMain focus:outline-none focus:ring-2 focus:ring-accent2"
          />
        </div>

        {!q && (
          <p className="text-center text-muted">
            Buscá por nombre, aroma o tipo de vela.
          </p>
        )}
        {q && results.length === 0 && (
          <p className="text-center text-muted">
            No encontramos resultados para &ldquo;{query}&rdquo;.
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((p) => (
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
      </div>
    </main>
  );
}
