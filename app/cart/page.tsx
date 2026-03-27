"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore, CartItem } from "@/store/cartStore";
import { FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { RiShoppingBasketLine } from "react-icons/ri";
import { GiCandleFlame } from "react-icons/gi";

type CartItemFromDB = {
  id: string; // 👈 ID único del item (para React)
  productId: string; // 👈 ID REAL del producto
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export default function CartPage() {
  const cart = useCartStore((state) => state.items);
  const setItems = useCartStore((state) => state.setItems);
  const removeItem = useCartStore((state) => state.removeItem);

  const userId = "usuario-demo";
  const hasLoaded = useRef(false);

  // 🔹 Cargar carrito
  useEffect(() => {
    if (!userId) return;

    fetch(`/api/cart?userId=${userId}`)
      .then((res) => res.json())
      .then((items: CartItemFromDB[]) => {
        if (!items || items.length === 0) {
          hasLoaded.current = true;
          return;
        }

        const mapped: CartItem[] = items.map((i) => ({
          id: crypto.randomUUID(), // 👈 único para React
          productId: i.productId, // 👈 REAL
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image || "/placeholder.png",
        }));

        setItems(mapped);
        hasLoaded.current = true;
      })
      .catch(console.error);
  }, [userId, setItems]);

  // 🔹 Guardar carrito
  useEffect(() => {
    if (!hasLoaded.current) return;

    fetch(`/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, items: cart }),
    }).catch(console.error);
  }, [cart, userId]);

  const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl h-screen mx-auto flex flex-col p-6 md:p-10"
    >
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>

      {cart.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <Link href="/products">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex flex-col items-center justify-center gap-4 cursor-pointer"
            >
              {/* 🧺 Basket */}
              <RiShoppingBasketLine
                size={110}
                className="text-navbar sm:w-30 sm:h-30"
              />

              {/* 🕯️ Velita ARRIBA centrada */}
              <motion.div
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: [-60, -10, -20], opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="absolute -top-6 left-1/3 -translate-x-1/2"
              >
                <GiCandleFlame size={28} className="text-navbar " />
              </motion.div>

              {/* 🧙 Frodo ARRIBA IZQUIERDA */}
              <motion.div
                initial={{ x: -20, y: -40, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -top-8 left-1/9 -translate-x-1/2"
              >
                <Image
                  src="/frodo.png"
                  alt="Frodito Logo"
                  width={55}
                  height={55}
                  className="object-contain sm:w-16.25 sm:h-16.25"
                />
              </motion.div>

              {/* 📝 Texto */}
              <p className="text-gray-500 mt-4 text-center">
                Tu carrito está vacío
              </p>
              <span className="text-sm text-gray-400">Ir a ver velas ✨</span>
            </motion.div>
          </Link>
        </div>
      ) : (
        <>
          {/* 🧠 LISTA */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scroll">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="flex items-center justify-between gap-4 p-4 border rounded-xl bg-background shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={70}
                      height={70}
                      className="rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="pt-4 mt-20 border-t bg-secondary">
              <div className="flex justify-between font-bold text-xl mb-4">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-navbar text-white py-3 rounded-lg">
                  Finalizar compra
                </button>
              </Link>
            </div>
          </div>

          {/* 💰 FOOTER REAL */}
        </>
      )}
    </motion.div>
  );
}
