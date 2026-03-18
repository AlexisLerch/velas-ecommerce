"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { RiShoppingBasketLine } from "react-icons/ri";
import { useCartStore } from "@/store/cartStore";

interface Props {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductCard({
  id,
  name,
  price,
  description,
  image,
}: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que al hacer click también se dispare el link
    addItem({ id, name, price, image, quantity: 1 });
  };

  // Variants para animación de entrada
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <Link href={`/products/${id}`} className="block">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -8, scale: 1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="group relative overflow-hidden cursor-pointer rounded-lg shadow-sm"
      >
        <div className="overflow-hidden aspect-square relative">
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
          />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-textMain text-center">
            {name}
          </h3>
          <p className="text-sm text-textMain line-clamp-2 text-center">
            {description}
          </p>
          <p className="text-xl font-bold text-textMain text-center">
            ${price}
          </p>

          {/* 👇 IMPORTANTE */}
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault(); // 🔥 clave
                e.stopPropagation();
                handleAddToCart(e);
              }}
              className="flex-1 bg-accent2 text-white py-2 rounded-lg font-medium shadow-sm hover:bg-secondary2/70 transition"
            >
              Agregar
            </button>

            <button
              onClick={(e) => {
                e.preventDefault(); // 🔥 clave
                e.stopPropagation();
                handleAddToCart(e);
              }}
              className="p-2 bg-accent2 rounded-lg shadow hover:bg-secondary2/70 transition"
            >
              <RiShoppingBasketLine className="text-navbar text-xl" />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
