"use client";

import { useState } from "react";
import ProductCard from "../product/ProductCard";
import { Product } from "@/lib/products";
import { HiOutlineFilter } from "react-icons/hi";
import { motion } from "framer-motion";

interface Props {
  products: Product[];
}

export default function ProductsGrid({ products }: Props) {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(
    Math.max(...products.map((p) => p.price)),
  );
  const [showFilters, setShowFilters] = useState(false);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      p.price <= maxPrice,
  );

  // Variants para stagger
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // cada tarjeta entra 0.1s después
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Botón filtros mobile */}
      <button
        className="md:hidden flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg mb-4 self-start"
        onClick={() => setShowFilters(!showFilters)}
      >
        <HiOutlineFilter className="w-5 h-5" /> Filtros
      </button>

      {/* Filtros laterales */}
      <div
        className={`${
          showFilters ? "block" : "hidden"
        } md:block w-full md:w-64 bg-accent2 p-6 rounded-2xl shadow-lg shrink-0 transition-all duration-300`}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Filtros</h2>

        {/* Buscar */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Buscar
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nombre del producto"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all"
          />
        </div>

        {/* Precio */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Precio máximo: ${maxPrice}
          </label>
          <input
            type="range"
            min={0}
            max={Math.max(...products.map((p) => p.price))}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-gray-900"
          />
        </div>
      </div>

      {/* Grid de productos con stagger */}
      <motion.div
        className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((p) => (
          <ProductCard
            key={p.id} // sigue igual
            id={p.id} // obligatorio para detalles
            name={p.name}
            price={p.price}
            description={p.description ?? ""}
            image={p.image}
          />
        ))}
      </motion.div>
    </div>
  );
}
