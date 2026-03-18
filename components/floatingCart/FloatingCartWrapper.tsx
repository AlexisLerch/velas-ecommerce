"use client";

import FloatingCart from "./FloatingCart";
import { useCartStore } from "@/store/cartStore";

export default function FloatingCartWrapper() {
  const cartItems = useCartStore((state) => state.items);

  return <FloatingCart count={cartItems.length} />;
}
