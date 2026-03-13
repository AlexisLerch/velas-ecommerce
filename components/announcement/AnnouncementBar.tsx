"use client";

import { motion } from "framer-motion";

export default function AnnouncementBar() {
  const text =
    "Envíos gratis en compras mayores a $30.000 — 3 cuotas sin interés — 10% OFF pagando con transferencia";

  return (
    <div className="w-full overflow-hidden text-navbar py-2">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20, // más lento y constante
          ease: "linear",
        }}
      >
        <span className="mx-12">{text}</span>
        <span className="mx-12">{text}</span>
        <span className="mx-12">{text}</span>
        <span className="mx-12">{text}</span>
      </motion.div>
    </div>
  );
}
