// lib/products.ts
import { prisma } from "./prisma";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  image: string;
};

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      image: true,
    },
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!id) throw new Error("ID is required");

  return prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      image: true,
    },
  });
}
