"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSyncExternalStore } from "react";

// El tema vive en la clase "dark" de <html> (la setea el script de app/layout.tsx)
const subscribe = (callback: () => void) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => null;

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}
      title={dark ? "Modo claro" : "Modo oscuro"}
      whileHover={{ scale: 1.25, y: -2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`relative cursor-pointer text-accent hover:text-secondary2 ${className}`}
    >
      {/* En el server no sabemos el tema: reservamos el espacio */}
      {dark === null ? (
        <span className="block w-[22px] h-[22px]" />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={dark ? "sun" : "moon"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {dark ? <FaSun size={22} /> : <FaMoon size={22} />}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.button>
  );
}
