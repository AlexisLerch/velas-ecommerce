"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  return (
    <main className="p-2">
      <motion.section
        initial="hidden"
        animate="show"
        variants={container}
        className="max-w-8xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-4 relative">
          {/* IMAGEN IZQUIERDA */}
          <div className="relative h-105 md:h-auto rounded-2xl overflow-hidden group">
            <Image
              src="/candless.jpg"
              alt="Velas"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-101"
            />

            {/* ETIQUETA 1 */}
            <motion.div
              variants={item}
              className="absolute top-[25%] left-[8%] -translate-y-1/2
              bg-[#fff8f0] border border-[#e8d8c3]
              px-3 py-1 md:px-10 md:py-4
              text-xs md:text-md
              max-w-30 md:max-w-none
              rounded-sm font-semibold italic text-accent2
              shadow-md hover:shadow-lg transition"
            >
              Colores únicos
            </motion.div>

            {/* ETIQUETA 2 */}
            <motion.div
              variants={item}
              className="absolute top-[45%] right-[6%] -translate-y-1/2
              bg-[#fff8f0] border border-[#e8d8c3]
              px-3 py-1 md:px-10 md:py-4
              text-xs md:text-md
              max-w-30 md:max-w-none text-center
              font-semibold rounded-sm text-accent2 italic
              shadow-md hover:shadow-lg transition"
            >
              Aromas especiales
            </motion.div>

            {/* ETIQUETA 3 */}
            <motion.div
              variants={item}
              className="absolute bottom-[15%] left-[12%]
              bg-[#fff8f0] border border-[#e8d8c3]
              px-3 py-1 md:px-10 md:py-4
              text-xs md:text-md
              max-w-35 md:max-w-none text-center
              rounded-sm font-semibold italic text-accent2
              shadow-md hover:shadow-lg transition"
            >
              Personalizadas a tu gusto
            </motion.div>
          </div>

          {/* IMAGEN DERECHA */}
          <div className="relative h-105 md:h-225 rounded-2xl overflow-hidden group sm:mt-0 -mt-2">
            <Image
              src="/berry.jpg"
              alt="Velas"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-101"
            />

            {/* TEXTO */}
            <motion.div
              variants={item}
              className="absolute 
              bottom-4 left-4 right-4
              md:bottom-10 md:left-10 md:right-auto
              bg-[#fff8f0] backdrop-blur-sm
              border border-[#e8d8c3]
              p-5 md:p-8
              rounded-xl
              shadow-lg
              md:max-w-[80%]
              transition-all duration-300
              hover:shadow-xl"
            >
              <h2 className="text-xl md:text-3xl font-semibold text-accent2 leading-tight">
                Velas hechas a mano
              </h2>

              <p className="mt-2 md:mt-3 text-text text-sm md:text-md italic leading-relaxed">
                Descubrí nuestras velas artesanales con aromas únicos y
                combinaciones de colores que transforman cualquier ambiente.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
