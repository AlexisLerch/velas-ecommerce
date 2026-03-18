"use client";

import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-accent2 text-textMain mt-20 border-t border-borderMain">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col items-center gap-8 text-center">
        {/* Logo / marca */}
        <div className="flex flex-col items-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-logo)" }}
          >
            Velas
          </h2>
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
      <div className="border-t border-borderMain py-4 text-center text-xs text-textMuted bg-secondary2">
        © {new Date().getFullYear()} Velas — Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;
