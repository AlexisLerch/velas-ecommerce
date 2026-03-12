"use client";
import React, { useEffect } from "react";
import { useCartStore, CartItem } from "@/store/cartStore";

export default function CartPage() {
  const cart = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);

  const userId = "usuario-demo"; // Por ahora, sin login

  // Cargar carrito desde API
  useEffect(() => {
    fetch(`/api/cart?userId=${userId}`)
      .then((res) => res.json())
      .then((items: CartItem[]) => items.forEach((i) => addItem(i)));
  }, [addItem]);

  // Guardar carrito cuando cambie
  useEffect(() => {
    fetch(`/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, items: cart }),
    });
  }, [cart]);

  const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between p-4 border rounded-md"
            >
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
