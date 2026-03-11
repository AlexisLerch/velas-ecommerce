// lib/products.ts
import { prisma } from "./prisma";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
    },
  });
}
