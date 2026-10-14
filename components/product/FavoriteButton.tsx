"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavoritesStore } from "@/store/favoritesStore";

export default function FavoriteButton({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const active = useFavoritesStore((s) => s.ids.includes(id));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <button
      type="button"
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      className={`p-2 rounded-full bg-card/90 border border-cardBorder shadow text-brand hover:scale-110 transition ${className}`}
    >
      {active ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}
