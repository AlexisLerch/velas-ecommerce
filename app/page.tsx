"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="sm:p-2 p-1">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-8xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-4 relative">
          {/* IMAGEN IZQUIERDA */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-square rounded-2xl overflow-hidden group"
          >
            <Image
              src="/candless.jpg"
              alt="Velas"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />

            {/* ETIQUETA 1 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute top-[25%] left-[12%] -translate-y-1/2
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="absolute top-[45%] right-[10%] -translate-y-1/2
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute bottom-[15%] left-[22%]
              bg-[#fff8f0] border border-[#e8d8c3]
              px-3 py-1 md:px-10 md:py-4
              text-xs md:text-md
              max-w-35 md:max-w-none text-center
              rounded-sm font-semibold italic text-accent2
              shadow-md hover:shadow-lg transition"
            >
              Personalizadas a tu gusto
            </motion.div>
          </motion.div>

          {/* IMAGEN DERECHA */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative aspect-square rounded-2xl overflow-hidden group sm:mt-0 -mt-3"
          >
            <Image
              src="/berry.jpg"
              alt="Velas"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />

            {/* TEXTO */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
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
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
