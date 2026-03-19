"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useCartStore, CartItem } from "@/store/cartStore";

type CartItemFromDB = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const cart = useCartStore((state) => state.items);
  const setItems = useCartStore((state) => state.setItems);

  const userId = "usuario-demo";

  const hasLoaded = useRef(false);

  // 🔹 Cargar carrito
  useEffect(() => {
    if (!userId) return;

    fetch(`/api/cart?userId=${userId}`)
      .then((res) => res.json())
      .then((items: CartItemFromDB[]) => {
        console.log("DB:", items);

        if (!items || items.length === 0) {
          hasLoaded.current = true;
          return;
        }

        const mapped: CartItem[] = items.map((i) => ({
          id: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: "",
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
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border rounded-md"
            >
              <span>
                {item.name} x {item.quantity}
              </span>
              <span className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          {/* 💰 TOTAL */}
          <div className="flex justify-between font-bold text-lg mt-6 border-t pt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* 🚀 BOTÓN CHECKOUT */}
          <Link href="/checkout">
            <button
              disabled={cart.length === 0}
              className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              Finalizar compra
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
