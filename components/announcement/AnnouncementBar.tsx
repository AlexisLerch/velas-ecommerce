"use client";

import { motion } from "framer-motion";

export default function AnnouncementBar() {
  const text =
    " Envíos gratis en compras mayores a $30.000 — 3 cuotas sin interés — 10% OFF pagando con transferencia ";

  return (
    <div className="w-full overflow-hidden bg-accent text-white py-2 px-4">
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
}
