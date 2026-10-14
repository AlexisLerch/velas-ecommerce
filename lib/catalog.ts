// lib/catalog.ts
// Datos extra de La Comarca de Cera que no están en la base: fotos, aromas,
// categorías, etc. Los productos de la base (Supabase) se enriquecen por nombre
// con `details`; los que no existen en la base se muestran desde `extras`.
//
// Para sumar fotos nuevas: copiarlas a /public/velas/ y agregar la ruta en
// `images` (la primera es la portada).

export type Category = "En vaso" | "Columnas" | "Figuras" | "Sets";

export type ProductDetails = {
  images: string[];
  category: Category;
  scent: string;
  notes: string[];
  size: string;
  burnTime: string;
  wax: string;
  description?: string;
  badge?: string;
  featured?: boolean;
};

export type CatalogProduct = ProductDetails & {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export const categories: Category[] = ["En vaso", "Columnas", "Figuras", "Sets"];

const vaso = {
  category: "En vaso" as Category,
  size: "190 g · vaso de vidrio",
  burnTime: "Hasta 40 horas",
  wax: "Cera de soja",
};

// Detalles por nombre de producto (tal como figura en la base)
export const details: Record<string, ProductDetails> = {
  "Vela Lavanda": {
    ...vaso,
    images: ["/lavanda-png.webp"],
    scent: "Floral",
    notes: ["Lavanda", "Jazmín", "Almizcle blanco"],
    description:
      "Perfecta para desconectar al final del día. Su aroma suave de lavanda relaja la mente y crea un ambiente ideal para descansar.",
    featured: true,
  },
  "Vela Cítrica": {
    ...vaso,
    images: ["/velas/vela-citrica.png"],
    scent: "Cítrico",
    notes: ["Limón siciliano", "Cáscara de naranja", "Vainilla blanca"],
    description:
      "Para quienes empiezan el día con calma y buscan un aroma fresco que despierte los sentidos. Su fragancia cítrica ilumina el ambiente y aporta energía.",
    featured: true,
  },
  "Vela Rosa": {
    ...vaso,
    images: ["/velas/vela-rosa.png"],
    scent: "Floral",
    notes: ["Rosa", "Peonía", "Almizcle"],
    description:
      "Un aroma delicado y romántico de rosas frescas, para ambientes suaves y cálidos.",
  },
  "Vela Canela": {
    ...vaso,
    images: ["/velas/vela-canela.png"],
    scent: "Especiado",
    notes: ["Canela", "Clavo de olor", "Naranja"],
    description:
      "Cálida y envolvente, con notas de canela que invitan a quedarse en casa. Ideal para días fríos.",
  },
  "Vela Coco": {
    ...vaso,
    images: ["/velas/vela-coco.png"],
    scent: "Dulce",
    notes: ["Coco", "Vainilla", "Leche de almendras"],
    description:
      "Suave y cremosa, con el aroma del coco que trae un toque tropical a cualquier rincón.",
  },
  "Vela Café": {
    ...vaso,
    images: ["/velas/vela-cafe.png"],
    scent: "Gourmand",
    notes: ["Café tostado", "Cacao", "Caramelo"],
    description:
      "El aroma de un café recién hecho para las mañanas y las sobremesas largas.",
  },
  "Vela Naranja": {
    ...vaso,
    images: ["/velas/vela-naranja.png"],
    scent: "Cítrico",
    notes: ["Naranja dulce", "Mandarina", "Ámbar"],
    description:
      "Jugosa y luminosa, con naranja dulce que llena de energía el ambiente.",
  },
  "Vela Vainilla": {
    ...vaso,
    images: ["/velas/vela-vainilla.png"],
    scent: "Dulce",
    notes: ["Vainilla", "Haba tonka", "Azúcar rubia"],
    description:
      "El clásico que nunca falla: vainilla suave y reconfortante, siempre elegante.",
    featured: true,
  },
  "Vela Menta": {
    ...vaso,
    images: ["/velas/vela-menta.png"],
    scent: "Fresco",
    notes: ["Menta", "Eucalipto", "Té verde"],
    description:
      "Fresca y limpia, con menta y eucalipto para renovar el aire y despejar la mente.",
  },
  "Vela Jazmín": {
    ...vaso,
    images: ["/velas/vela-jazmin.png"],
    scent: "Floral",
    notes: ["Jazmín", "Azahar", "Madera blanca"],
    description:
      "Un aroma floral y luminoso de jazmín, con un fondo suave de maderas claras.",
  },
};

// Otros tipos de velas (no están en la base)
export const extras: CatalogProduct[] = [
  {
    id: "amora-doce",
    name: "Vela Amora Doce 190g",
    price: 13500,
    description:
      "Ideal para transformar cualquier tarde en un momento especial. Sus notas dulces crean un ambiente cálido y acogedor, coronada con frutos de cera y mecha de madera.",
    image: "/berry.jpg",
    images: ["/berry.jpg"],
    category: "En vaso",
    scent: "Frutal dulce",
    notes: ["Frambuesa", "Mora", "Azúcar rubia"],
    size: "190 g · vaso de vidrio",
    burnTime: "Hasta 40 horas",
    wax: "Cera de soja · mecha de madera",
    featured: true,
    badge: "Best Seller",
  },
  {
    id: "columnas-acanaladas",
    name: "Velas Columna Acanaladas x3",
    price: 9800,
    description:
      "Tres velas largas acanaladas en tonos rosados, atadas con moño. Un detalle para la mesa, para regalar o para armar una escena con luz cálida.",
    image: "/candless.jpg",
    images: ["/candless.jpg"],
    category: "Columnas",
    scent: "Sin aroma",
    notes: ["Colores únicos", "Hechas a mano"],
    size: "25 cm de alto · 3 unidades",
    burnTime: "Hasta 8 horas cada una",
    wax: "Parafina premium",
    featured: true,
  },
  {
    id: "frutillitas",
    name: "Velas Frutillitas x6",
    price: 8900,
    description:
      "Frutillas de cera moldeadas una por una, en rojo y rosa pastel. Vienen en caja de regalo y quedan hermosas como decoración o para encender.",
    image: "/strawberry.jpg",
    images: ["/strawberry.jpg"],
    category: "Figuras",
    scent: "Frutilla",
    notes: ["Frutilla", "Crema"],
    size: "6 unidades · caja de regalo",
    burnTime: "Hasta 3 horas cada una",
    wax: "Cera de soja",
    badge: "Ideal regalo",
  },
  {
    id: "box-comarca",
    name: "Box Regalo La Comarca",
    price: 29900,
    description:
      "Una selección de nuestras velas en una caja para regalar: una vela en vaso, frutillitas y columnas acanaladas. Se personaliza con tarjeta y colores a tu gusto.",
    image: "/berry.jpg",
    images: ["/berry.jpg", "/strawberry.jpg", "/candless.jpg"],
    category: "Sets",
    scent: "A elección",
    notes: ["Personalizable", "Con tarjeta"],
    size: "Box con 3 productos",
    burnTime: "Según vela elegida",
    wax: "Soja y parafina premium",
    featured: true,
    badge: "Personalizable",
  },
];

export const extraById = (id: string) => extras.find((p) => p.id === id) ?? null;

// Fallback completo si la base no responde: vasos con precio de referencia + extras
export const fallbackCatalog = (): CatalogProduct[] => [
  ...Object.entries(details).map(([name, d]) => ({
    ...d,
    id: name.toLowerCase().replace(/[^a-z]+/g, "-"),
    name,
    price: 12500,
    description: d.description ?? "",
    image: d.images[0],
  })),
  ...extras,
];
