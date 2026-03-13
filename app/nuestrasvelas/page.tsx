"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function NuestrasVelas() {
  return (
    <main className="bg-[#f4f1ed] min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center text-4xl md:text-6xl font-light tracking-wide text-[#5a3b4c] mb-20 md:mb-28"
        >
          Nuestras Velas
        </motion.h1>

        <div className="space-y-24 md:space-y-40">
          {/* VELA 1 */}
          <section className="grid md:grid-cols-2 items-center gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Image
                src="/vela.png"
                alt="Vela Limoncello"
                width={420}
                height={420}
                className="object-contain hover:scale-105 transition duration-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative max-w-md mx-auto md:mx-0 text-center md:text-left"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="md:hidden h-px bg-[#b7a9b1] mx-auto mb-6"
              />

              {/* LINEA EN L */}
              <div className="hidden md:flex absolute -left-32 top-8 items-start">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 120 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="h-px bg-[#b7a9b1]"
                />

                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: 50 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="w-px bg-[#b7a9b1]"
                />
              </div>

              <h2 className="text-lg md:text-xl font-semibold tracking-widest text-[#5a3b4c] mb-4">
                VELA LIMONCELLO 190G
              </h2>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Para quienes empiezan el día con calma y buscan un aroma fresco
                que despierte los sentidos. Su fragancia cítrica ilumina el
                ambiente y aporta energía.
              </p>
            </motion.div>
          </section>

          {/* VELA 2 */}
          <section className="grid md:grid-cols-2 items-center gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative max-w-md mx-auto md:mx-0 text-center md:text-right md:order-1 order-2"
            >
              {/* LINEA EN L */}
              <div className="hidden md:flex absolute -right-32 top-8 items-start flex-row-reverse">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 120 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="h-px bg-[#b7a9b1]"
                />

                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: 50 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="w-px bg-[#b7a9b1]"
                />
              </div>

              <h2 className="text-lg md:text-xl font-semibold tracking-widest text-[#5a3b4c] mb-4">
                VELA AMORA DOCE 190G
              </h2>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Ideal para transformar cualquier tarde en un momento especial.
                Sus notas dulces crean un ambiente cálido y acogedor.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="flex justify-center relative md:order-2 order-1"
            >
              <Image
                src="/strawberry.jpg"
                alt="Vela Amora"
                width={420}
                height={420}
                className="object-contain hover:scale-105 transition duration-500"
              />

              <div className="absolute -right-4 top-6 bg-orange-400 text-white text-xs px-4 py-2 rounded-full font-semibold shadow-lg">
                Best Seller
              </div>
            </motion.div>
          </section>

          {/* VELA 3 */}
          <section className="grid md:grid-cols-2 items-center gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Image
                src="/berry.jpg"
                alt="Vela Lavanda"
                width={420}
                height={420}
                className="object-contain hover:scale-105 transition duration-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative max-w-md mx-auto md:mx-0 text-center md:text-left"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="md:hidden h-px bg-[#b7a9b1] mx-auto mb-6"
              />
              <div className="hidden md:flex absolute -left-32 top-8 items-start">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 120 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="h-px bg-[#b7a9b1]"
                />

                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: 50 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="w-px bg-[#b7a9b1]"
                />
              </div>

              <h2 className="text-lg md:text-xl font-semibold tracking-widest text-[#5a3b4c] mb-4">
                VELA SOFT LAVANDA 190G
              </h2>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Perfecta para desconectar al final del día. Su aroma suave de
                lavanda relaja la mente y crea un ambiente ideal para descansar.
              </p>
            </motion.div>
          </section>
        </div>
      </div>
    </main>
  );
}
