"use client";

import { Product } from "@/lib/products";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import Image from "next/image";

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const [hovered, setHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedTag, setSelectedTag] = useState(1);

  // Fotos de etiquetas (temporalmente usamos la misma foto)
  const tagImages: Record<number, string> = {
    1: product.image,
    2: product.image,
    3: product.image,
  };

  // Animaciones
  const imageVariants = {
    hidden: { opacity: 0, x: -150 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  return (
    <main className="min-h-screen px-6 py-20 bg-linear-to-br from-secondary to-transparent">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">
        {/* Imagen con efecto premium */}
        <motion.div
          className="relative flex justify-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          {/* Glow detrás de la imagen */}
          <motion.div
            className="absolute w-80 h-80 blur-3xl rounded-full -z-10"
            initial={{ scale: 0 }}
            animate={{ scale: hovered ? 1.3 : 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Imagen grande con animación al cambiar etiqueta */}
          <motion.div
            key={selectedTag} // ⚡ reinicia animación al cambiar etiqueta
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={tagImages[selectedTag]}
              alt={product.name}
              width={520}
              height={520}
              className="object-contain rounded-lg"
            />
          </motion.div>

          {/* Línea animada en mobile */}
          <motion.div
            className="md:hidden absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-linear-to-r from-[#b7a9b1] to-[#5a3b4c] rounded-full animate-scaleX"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Info con líneas en L y animaciones */}
        <motion.div
          className="relative flex flex-col md:items-start items-center text-center md:text-left"
          initial="hidden"
          animate="visible"
          variants={infoVariants}
        >
          {/* Línea en L Desktop */}
          <div className="hidden md:flex absolute -left-36 top-10 items-start">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ duration: 0.8 }}
              className="h-0.5 bg-linear-to-r from-[#b7a9b1] to-[#5a3b4c]"
            />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-0.5 bg-linear-to-b to-[#b7a9b1] from-[#5a3b4c]"
            />
          </div>
          {/* Nombre */}
          <motion.h1
            className="text-4xl md:text-6xl font-semibold tracking-wide text-[#5a3b4c] mb-6 px-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
          >
            {product.name}
          </motion.h1>
          {/* Descripción */}
          <motion.p
            className="text-gray-600 leading-relaxed mb-6 max-w-md px-6 text-lg"
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, delay: 0.1 },
            }}
          >
            {product.description ?? "Sin descripción disponible"}
          </motion.p>
          {/* Precio */}
          <motion.p
            className="text-3xl md:text-3xl font-bold text-[#5a3b4c] mb-4 drop-shadow-md px-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, delay: 0.2 },
            }}
          >
            ${product.price}
          </motion.p>
          {/* Selector de cantidad */}
          <motion.div
            className="flex items-center gap-4 mb-6 px-5"
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, delay: 0.3 },
            }}
          >
            <button
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-accent2 text-textMain font-bold rounded-lg"
            >
              -
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-3 py-1 bg-accent2 text-textMain font-bold rounded-lg"
            >
              +
            </button>
          </motion.div>
          {/* Selector de etiqueta */}
          <p className="mb-2 text-textMain ">Selecciona la Etiquta</p>
          <motion.div
            className="flex gap-4 mb-8 justify-center md:justify-start"
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, delay: 0.4 },
            }}
          >
            {[1, 2, 3].map((tag) => (
              <motion.div
                key={tag}
                className={`cursor-pointer p-1 rounded-lg border-2 ${
                  selectedTag === tag ? "border-navbar" : "border-gray-300"
                }`}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedTag(tag)}
              >
                <motion.img
                  src={tagImages[tag]}
                  alt={`Etiqueta #${tag}`}
                  width={80}
                  height={80}
                  className="object-contain rounded"
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </motion.div>
          {/* Botón agregar al carrito */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity,
                image: tagImages[selectedTag],
              })
            }
            className="bg-navbar text-white px-6 sm:px-10 py-4 rounded-lg tracking-wide shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
          >
            Agregar al carrito
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}
