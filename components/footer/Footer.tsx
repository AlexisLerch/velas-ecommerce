"use client";

import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-accent2 text-textMain mt-20 border-t border-borderMain">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col items-center gap-8 text-center">
        {/* Logo / marca */}
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Frodito Logo"
            width={100}
            height={100}
            className="object-contain mb-4"
          />
          <p className="text-textMuted text-sm max-w-md">
            Velas artesanales hechas con amor para crear ambientes únicos en tu
            hogar.
          </p>
        </div>

        {/* Redes */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold mb-4">Seguinos</h3>
          <div className="flex justify-center gap-6 text-2xl">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-200"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-200"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* línea inferior */}
      <div className="border-t border-borderMain py-4 text-center text-xs text-textMuted bg-secondary">
        © {new Date().getFullYear()} Velas — Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;
