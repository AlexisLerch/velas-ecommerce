"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/products";
import { HiOutlineFilter } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  products: Product[];
}

export default function ProductsGrid({ products }: Props) {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(
    Math.max(...products.map((p) => p.price)),
  );
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      p.price <= maxPrice,
  );

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const filterVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.2 } },
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center text-4xl md:text-6xl font-light tracking-wide text-[#5a3b4c] mb-16 md:mb-24"
      >
        Nuestras Velas
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-6">
        <button
          className="md:hidden flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg self-start"
          onClick={() => setShowFilters(!showFilters)}
        >
          <HiOutlineFilter className="w-5 h-5" /> Filtros
        </button>

        <AnimatePresence>
          {(showFilters || !isMobile) && (
            <motion.div
              variants={filterVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full md:w-64 bg-accent2 p-6 rounded-2xl shadow-lg shrink-0"
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Filtros
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Buscar
                </label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nombre del producto"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:outline-none"
                />
              </div>

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
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              description={p.description ?? ""}
              image={p.image}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
