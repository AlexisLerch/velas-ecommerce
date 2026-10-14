"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/products";
import { HiOutlineFilter } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { categories, type Category } from "@/lib/catalog";

interface Props {
  products: Product[];
}

export default function ProductsGrid({ products }: Props) {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(
    Math.max(0, ...products.map((p) => p.price)),
  );
  const [category, setCategory] = useState<Category | "Todas">("Todas");
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
      p.price <= maxPrice &&
      (category === "Todas" || p.category === category),
  );
  const availableCategories = categories.filter((c) =>
    products.some((p) => p.category === c),
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
        className="text-center text-4xl md:text-6xl font-light tracking-wide text-heading mb-16 md:mb-24"
      >
        Nuestras Velas
      </motion.h1>

      {availableCategories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3 mb-10 -mt-8 md:-mt-14">
          {(["Todas", ...availableCategories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-5 py-2 rounded-full text-sm border transition ${
                category === c
                  ? "bg-navbar text-white border-navbar"
                  : "bg-card text-textMain border-cardBorder hover:border-navbar"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <button
          className="md:hidden flex items-center gap-2 bg-navbar text-white px-4 py-2 rounded-lg self-start"
          onClick={() => setShowFilters(!showFilters)}
        >
          <HiOutlineFilter className="w-5 h-5" /> Filtros
        </button>

        <AnimatePresence>
          {/* {(showFilters || !isMobile) && (
            <motion.div
              variants={filterVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full md:w-64 bg-accent2 p-6 rounded-2xl shadow-lg shrink-0"
            >
              <h2 className="text-lg font-semibold mb-4 text-textMain">
                Filtros
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-textMain">
                  Buscar
                </label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nombre del producto"
                  className="w-full px-3 py-2 border border-cardBorder rounded-lg focus:ring-2 focus:ring-cardBorder focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-textMain">
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
          )} */}
        </AnimatePresence>

        <motion.div
          className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-muted py-16">
              No encontramos velas en esta categoría.
            </p>
          )}
          {filtered.map((p) => (
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
        </motion.div>
      </div>
    </div>
  );
}
