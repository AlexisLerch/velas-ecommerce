// lib/products.ts
import { prisma } from "./prisma";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export async function getProducts(): Promise<Product[]> {
  const result = await prisma.$queryRaw<Product[]>`
    SELECT id, name, price, image FROM "Product";
  `;
  return result;
}
