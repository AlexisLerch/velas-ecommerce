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
    e.stopPropagation();
    addItem({ id, name, price, image, quantity: 1 });
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
        </div>
        <div className="p-4 flex flex-col gap-2 cursor-pointer">
          <h3 className="text-lg font-semibold text-textMain text-center">
            {name}
          </h3>
          <p className="text-sm text-textMain line-clamp-2 text-center">
            {description}
          </p>
          <p className="text-xl font-bold text-textMain text-center">
            ${price}
          </p>
        </div>
      </Link>

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
