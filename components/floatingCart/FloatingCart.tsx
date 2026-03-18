"use client";

import Link from "next/link";
import { RiShoppingBasketLine } from "react-icons/ri";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  count: number;
}

export default function FloatingCart({ count }: Props) {
  const controls = useAnimation();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const prevCount = useRef(count);
  const router = useRouter();

  // 🔥 AUTO HIDE SCROLL
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY.current && current > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 BOUNCE cuando cambia el carrito
  useEffect(() => {
    if (count > prevCount.current) {
      controls.start({
        scale: [1, 1.25, 0.95, 1],
        rotate: [0, -10, 10, 0],
        transition: { duration: 0.5 },
      });
    }

    prevCount.current = count;
  }, [count, controls]);

  // 🔥 CLICK ANIMATION + NAV
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    await controls.start({
      scale: [1, 0.9, 1.2, 1],
      rotate: [0, -15, 15, 0],
      transition: { duration: 0.4 },
    });

    router.push("/cart");
  };

  return (
    <motion.div
      animate={{
        y: visible ? 0 : 120,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-5 right-5 z-9999 md:hidden"
    >
      <Link href="/cart" onClick={handleClick}>
        <motion.div
          animate={controls}
          whileTap={{ scale: 0.9 }}
          className="relative flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-md bg-navbar border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        >
          <RiShoppingBasketLine className="w-6 h-6 text-bgCard" />

          <motion.span
            key={count}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute -top-2 -right-2 text-bgCard text-md font-medium px-5 py-1 rounded-full"
          >
            {count}
          </motion.span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
