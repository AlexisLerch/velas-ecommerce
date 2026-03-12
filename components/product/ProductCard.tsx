"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ name, price, image }: Props) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="group relative rounded-2xl bg-[#B3C1C4] shadow-md overflow-hidden cursor-pointer"
    >
      {/* Imagen */}
      <div className="overflow-hidden aspect-square">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-textMain">{name}</h3>
        <p className="text-xl font-bold text-accent2">${price}</p>

        <button className="mt-3 bg-accent2 text-bgCard py-2 rounded-xl font-medium shadow hover:bg-accent2/80 hover:shadow-lg active:scale-95 transition-all duration-300">
          Agregar al carrito
        </button>
      </div>

      {/* Glow decorativo */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-t from-transparent via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.div>
  );
}
