"use client";

import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-navbarBg text-textMain mt-20 border-t border-borderMain">
      <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-10 text-center sm:text-left">
        {/* Logo / marca */}
        <div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-logo)" }}
          >
            Velas
          </h2>
          <p className="text-textMuted text-sm">
            Velas artesanales hechas con amor para crear ambientes únicos en tu
            hogar.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="font-semibold mb-4">Navegación</h3>
          <ul className="space-y-2 text-textMuted text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-accent transition-colors duration-200"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-accent transition-colors duration-200"
              >
                Velas
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-accent transition-colors duration-200"
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-accent transition-colors duration-200"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Atención */}
        <div>
          <h3 className="font-semibold mb-4">Atención al cliente</h3>
          <ul className="space-y-2 text-textMuted text-sm">
            <li className="hover:text-accent transition-colors duration-200 cursor-pointer">
              Envíos y devoluciones
            </li>
            <li className="hover:text-accent transition-colors duration-200 cursor-pointer">
              Preguntas frecuentes
            </li>
            <li className="hover:text-accent transition-colors duration-200 cursor-pointer">
              Medios de pago
            </li>
          </ul>
        </div>

        {/* Redes */}
        <div>
          <h3 className="font-semibold mb-4">Seguinos</h3>
          <div className="flex justify-center sm:justify-start gap-4 text-xl">
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
      <div className="border-t border-borderMain py-4 text-center text-xs text-textMuted">
        © {new Date().getFullYear()} Velas — Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;
