"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

  const handleAddToCart = () => {
    addItem({ id, name, price, image, quantity: 1 });
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative rounded-2xl bg-primary shadow-lg overflow-hidden cursor-pointer border-4 border-gray-200"
    >
      <div className="overflow-hidden aspect-square">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-xl font-bold text-gray-900">${price}</p>
        <p className="text-sm text-gray-600">{description}</p>

        <button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-gray-900 text-white py-2 rounded-lg font-medium shadow-sm hover:bg-gray-800 active:scale-95 transition-all duration-200"
        >
          Agregar al carrito
        </button>
      </div>
    </motion.div>
  );
}
