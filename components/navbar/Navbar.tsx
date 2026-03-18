"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { RiShoppingBasketLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

const links = [
  { name: "Nosotros", href: "/" },
  { name: "Velas", href: "/products" },
  { name: "Nuestras Velas", href: "/nuestrasvelas" },
  { name: "Contacto", href: "/contact" },
];

const icons = [
  { icon: FaSearch, href: "/search" },
  { icon: FaHeart, href: "/favorites" },
  { icon: RiShoppingBasketLine, href: "/cart" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0),
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      animate={{
        paddingTop: scrolled ? "4px" : "8px",
        paddingBottom: scrolled ? "4px" : "8px",
        width: scrolled ? "94%" : "99%",
      }}
      transition={{ duration: 0.25 }}
      className="bg-navbar/90 backdrop-blur-md rounded-xl sm:px-6 px-3 mx-auto sm:mt-2 mt-0.5 sticky top-1 z-50"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.span
            animate={{ fontSize: scrolled ? "28px" : "36px" }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.08 }}
            style={{ fontFamily: "var(--font-logo)" }}
            className="text-secondary2/70 font-title font-bold cursor-pointer select-none ml-2"
            onClick={() => setOpen(false)}
          >
            Velas
          </motion.span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none text-accent relative font-medium tracking-wide">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name} className="relative">
                <Link href={link.href}>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative hover:text-accent2 transition-colors"
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 -bottom-1 h-0.5 w-full bg-accent2"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                  </motion.button>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop icons */}
        <div className="hidden md:flex gap-6 text-accent text-lg">
          {icons.map(({ icon: Icon, href }, i) => {
            const isCart = Icon === RiShoppingBasketLine;

            return (
              <Link key={i} href={href}>
                <motion.div
                  whileHover={{ scale: 1.25, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative cursor-pointer hover:text-accent2"
                >
                  <Icon size={isCart ? 22 : 20} />

                  {/* 🔥 Badge */}
                  {isCart && totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0 }}
                      animate={{ scale: [1.2, 0.9, 1] }}
                      transition={{ duration: 0.3 }}
                      className="absolute -top-2 -right-2 bg-accent2 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Mobile button */}
        <div className="flex items-center gap-4 md:hidden">
          <AnimatePresence>
            {open && (
              <motion.div
                className="flex gap-4 text-accent"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {icons.map(({ icon: Icon, href }, i) => {
                  const isCart = Icon === RiShoppingBasketLine;

                  return (
                    <Link key={i} href={href}>
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.15 }}
                        className="relative cursor-pointer hover:text-accent2 mr-2"
                        onClick={() => setOpen(false)}
                      >
                        <Icon size={isCart ? 22 : 20} />

                        {/* 🔥 Badge MOBILE */}
                        {isCart && totalItems > 0 && (
                          <motion.span
                            key={totalItems}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-accent2 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                          >
                            {totalItems}
                          </motion.span>
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            className="text-accent text-xl"
            onClick={() => {
              const next = !open;

              if (next) {
                window.scrollTo({ top: 0, behavior: "smooth" });

                const checkScroll = () => {
                  if (window.scrollY === 0) {
                    setOpen(true);
                  } else {
                    requestAnimationFrame(checkScroll);
                  }
                };

                requestAnimationFrame(checkScroll);
              } else {
                setOpen(false);
              }
            }}
            whileTap={{ scale: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <FaTimes />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <FaBars />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 18,
            }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-4 mt-4 text-accent">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.85, ease: "easeOut" }}
                className="h-px bg-accent2 origin-left"
              />

              {links.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  <motion.span
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 25 }}
                    transition={{
                      delay: i * 0.12,
                      type: "spring",
                      stiffness: 120,
                    }}
                    whileHover={{ x: -4 }}
                    className="text-right hover:text-accent2 block"
                  >
                    {link.name}
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
