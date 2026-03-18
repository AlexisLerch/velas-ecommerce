import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import AnnouncementBar from "@/components/announcement/AnnouncementBar";
import Footer from "@/components/footer/Footer";
import CartPopup from "@/components/cart/CartPopup";
import FloatingCartWrapper from "@/components/floatingCart/FloatingCartWrapper";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-logo",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${cormorant.variable} ${playfair.className}`}
      >
        <Navbar />
        <AnnouncementBar />
        <FloatingCartWrapper />

        {children}
        <CartPopup />
        <Footer />
      </body>
    </html>
  );
}
