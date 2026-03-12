"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { RiShoppingBasketLine } from "react-icons/ri";

export default function CartPopup() {
  const showPopup = useCartStore((state) => state.showPopup);
  const setShowPopup = useCartStore((state) => state.setShowPopup);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 2200); // dura 2.2s
      return () => clearTimeout(timer);
    }
  }, [showPopup, setShowPopup]);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 15, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="bg-linear-to-tr from-secondary2 to-accent2 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-6 w-70 relative"
          >
            {/* Carrito animado */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{
                duration: 0.7,
                type: "spring",
                stiffness: 600,
                damping: 20,
              }}
              className="w-40 h-40 rounded-2xl flex items-center justify-center text-white relative"
            >
              <RiShoppingBasketLine size={120} />

              {/* Tilde animado */}
              <motion.div
                initial={{ scale: 0, rotate: -45, opacity: 0 }}
                animate={{ scale: [0, 1.3, 1], opacity: 1 }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 500,
                  damping: 20,
                }}
                className="absolute top-4 right-4 text-white text-4xl font-bold"
              >
                ✔
              </motion.div>

              {/* Destellos */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1], opacity: [0, 0.8, 0] }}
                transition={{ repeat: 1, duration: 0.8, delay: 0.3 }}
                className="absolute w-5 h-5 bg-white rounded-full top-6 left-10"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1], opacity: [0, 0.8, 0] }}
                transition={{ repeat: 1, duration: 0.8, delay: 0.4 }}
                className="absolute w-4 h-4 bg-white rounded-full bottom-6 right-10"
              />
            </motion.div>

            {/* Mensaje */}
            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center font-bold text-gray-900 text-2xl"
            >
              ¡Agregado al carrito!
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
