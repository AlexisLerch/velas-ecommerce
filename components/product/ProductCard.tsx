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
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="group relative rounded-2xl bg-secondary2 shadow-md overflow-hidden"
    >
      {/* imagen */}
      <div className="overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="w-full h-65 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* contenido */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-text">{name}</h3>

        <p className="text-xl font-bold text-accent2">${price}</p>

        <button className="mt-2 bg-accent2 text-white py-2 rounded-xl transition-all duration-300 hover:bg-navbar hover:shadow-lg active:scale-95">
          Agregar al carrito
        </button>
      </div>

      {/* glow decorativo */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-t from-transparent via-white/10 to-white/30"></div>
    </motion.div>
  );
}
