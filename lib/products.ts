// lib/products.ts
import { prisma } from "./prisma";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string | null;
}

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      description: true,
    },
  });
}
