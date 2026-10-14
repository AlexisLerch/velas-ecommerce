"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { RiShoppingBasketLine } from "react-icons/ri";
import { useCartStore } from "@/store/cartStore";
import FavoriteButton from "./FavoriteButton";

interface Props {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  badge?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  description,
  image,
  badge,
}: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: crypto.randomUUID(), // 👈 ID único del item en carrito
      productId: id, // 👈 ID REAL del producto
      name,
      price,
      image,
      quantity: 1,
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.97 }}
      className="group relative overflow-hidden rounded-lg shadow-sm bg-accent/10"
    >
      <Link href={`/products/${id}`}>
        <div className="overflow-hidden aspect-square relative cursor-pointer">
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
          />
          {badge && (
            <span className="absolute left-2 top-2 bg-orange-400 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
              {badge}
            </span>
          )}
        </div>
        <div className="p-4 flex flex-col gap-2 cursor-pointer">
          <h3 className="text-lg font-semibold text-textMain text-center">
            {name}
          </h3>
          <p className="text-sm text-textMain line-clamp-2 text-center">
            {description}
          </p>
          <p className="text-xl font-bold text-textMain text-center">
            ${price.toLocaleString("es-AR")}
          </p>
        </div>
      </Link>

      <FavoriteButton id={id} className="absolute right-2 top-2" />

      <div className="mt-3 flex items-center gap-2 px-4 pb-4">
        <Link
          href={`/products/${id}`}
          className="flex-1 bg-accent2 text-white py-2 text-center rounded-lg font-medium shadow-sm hover:bg-secondary2/70 transition"
        >
          Ver detalles
        </Link>
        <button
          onClick={handleAddToCart}
          className="p-2 bg-accent2 rounded-lg shadow hover:bg-secondary2/70 transition"
        >
          <RiShoppingBasketLine className="text-navbar text-xl" />
        </button>
      </div>
    </motion.div>
  );
}
