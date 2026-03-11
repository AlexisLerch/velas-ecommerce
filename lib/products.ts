// lib/products.ts
import { prisma } from "./prisma";

// Definimos la interfaz Product para TypeScript
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
