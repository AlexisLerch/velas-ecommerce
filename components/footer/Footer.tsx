"use client";

import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { instagramLink, whatsappLink } from "@/config/site";

const Footer = () => {
  return (
    <footer className="bg-accent2 dark:bg-bgCard text-textMain mt-20 border-t border-borderMain">
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

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
          <Link href="/products" className="hover:text-accent transition-colors">
            Velas
          </Link>
          <Link href="/" className="hover:text-accent transition-colors">
            Nosotros
          </Link>
          <Link href="/nuestrasvelas" className="hover:text-accent transition-colors">
            Nuestras Velas
          </Link>
          <Link href="/contact" className="hover:text-accent transition-colors">
            Contacto
          </Link>
        </nav>

        {/* Redes */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold mb-4">Seguinos</h3>
          <div className="flex justify-center gap-6 text-2xl">
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-200"
            >
              <FaInstagram />
            </a>
            <a
              href={whatsappLink()}
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
