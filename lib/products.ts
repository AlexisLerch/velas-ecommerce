// lib/products.ts
import { prisma } from "./prisma";
import {
  details,
  extraById,
  extras,
  fallbackCatalog,
  type Category,
} from "./catalog";

const extraByName = (name: string) => extras.find((e) => e.name === name);

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  image: string;
  images?: string[];
  category?: Category;
  scent?: string;
  notes?: string[];
  size?: string;
  burnTime?: string;
  wax?: string;
  badge?: string;
  featured?: boolean;
};

type Row = Pick<Product, "id" | "name" | "price" | "description" | "image">;

const select = {
  id: true,
  name: true,
  price: true,
  description: true,
  image: true,
} as const;

// Si la base no responde en 3s se usa el catálogo local
function withTimeout<T>(promise: Promise<T>, ms = 3000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("DB timeout")), ms),
    ),
  ]);
}

// Suma fotos, aroma, categoría, etc. a un producto de la base (se une por nombre)
function enrich(row: Row): Product {
  const d = details[row.name] ?? extraByName(row.name);
  if (!d) return row;
  const { images, description, ...rest } = d;
  return {
    ...row,
    ...rest,
    description: row.description || description || null,
    image: images[0],
    images,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await withTimeout(prisma.product.findMany({ select }));
    if (rows.length > 0) {
      // Los extras del catálogo local solo se suman si todavía no están en la base
      const names = new Set(rows.map((r) => r.name));
      return [
        ...rows.map(enrich),
        ...extras.filter((e) => !names.has(e.name)),
      ];
    }
  } catch (error) {
    console.warn("[products] DB no disponible, usando catálogo local", error);
  }
  return fallbackCatalog();
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!id) throw new Error("ID is required");

  try {
    const row = await withTimeout(
      prisma.product.findFirst({
        where: { OR: [{ id }, { slug: id }] },
        select,
      }),
    );
    if (row) return enrich(row);
  } catch (error) {
    console.warn("[products] DB no disponible", error);
  }
  return extraById(id) ?? fallbackCatalog().find((p) => p.id === id) ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  const featured = products.filter((p) => p.featured);
  return (featured.length ? featured : products).slice(0, 4);
}
