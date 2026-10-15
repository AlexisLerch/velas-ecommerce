// Datos de contacto de la tienda. Completar con los reales (o por variables de
// entorno NEXT_PUBLIC_*) — se usan en el footer, contacto y botones de WhatsApp.
export const site = {
  name: "La Comarca de Cera",
  // Formato internacional sin "+" ni espacios. Ej: 5491112345678
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? "",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "",
  hours: "Lunes a sábados de 9 a 18 hs",
  freeShippingFrom: 30000,
  // Costo de envío fijo (ARS) cuando no se llega al envío gratis. Ajustar.
  shippingCost: Number(process.env.SHIPPING_COST ?? 4500),
  // Datos legales/fiscales (se muestran en el footer y en las páginas legales)
  legal: {
    razonSocial: process.env.NEXT_PUBLIC_RAZON_SOCIAL ?? "",
    cuit: process.env.NEXT_PUBLIC_CUIT ?? "",
    address: process.env.NEXT_PUBLIC_ADDRESS ?? "",
  },
  // Datos para transferencias. Completar con los reales.
  bank: {
    alias: process.env.NEXT_PUBLIC_BANK_ALIAS ?? "",
    cbu: process.env.NEXT_PUBLIC_BANK_CBU ?? "",
    holder: process.env.NEXT_PUBLIC_BANK_HOLDER ?? "",
  },
};

export const whatsappLink = (message = "") =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`
    : "https://wa.me";

export const instagramLink = site.instagram
  ? `https://instagram.com/${site.instagram.replace("@", "")}`
  : "https://instagram.com";
