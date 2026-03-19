"use client";

import { Product } from "@/lib/products";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import Image from "next/image";

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const [hovered, setHovered] = useState(false);

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">
        {/* Imagen con efecto premium */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="relative flex justify-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Glow detrás de la imagen */}
          <motion.div
            className="absolute w-80 h-80 blur-3xl rounded-full -z-10"
            initial={{ scale: 0 }}
            animate={{ scale: hovered ? 1.3 : 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Imagen con zoom */}
          <motion.div
            animate={{ scale: hovered ? 1.15 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={product.image}
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
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="relative flex flex-col md:items-start items-center text-center md:text-left"
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
              className="w-0.5 bg-linear-to-b from-[#b7a9b1] to-[#5a3b4c]"
            />
          </div>

          {/* Nombre */}
          <motion.h1
            className="text-4xl md:text-6xl  font-semibold tracking-wide text-[#5a3b4c] mb-6 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {product.name}
          </motion.h1>

          {/* Descripción */}
          <motion.p
            className="text-gray-600 leading-relaxed mb-8 max-w-md px-6 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {product.description ?? "Sin descripción disponible"}
          </motion.p>

          {/* Precio */}
          <motion.p
            className="text-3xl md:text-3xl font-bold text-[#5a3b4c] mb-8 drop-shadow-md px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            ${product.price}
          </motion.p>

          {/* Botón */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
              })
            }
            className="bg-linear-to-r from-[#7f3f5a] to-[#5a3b4c] text-white px-10 py-4 rounded-full tracking-wide shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
          >
            Agregar al carrito
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}
