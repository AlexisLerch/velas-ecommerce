import { prisma } from "./prisma";
import { CartItem } from "@/store/cartStore";

export async function fetchUserCart(userId: string) {
  return await prisma.cartItem.findMany({
    where: { userId },
  });
}

export async function saveUserCart(userId: string, items: CartItem[]) {
  // 🔥 SIEMPRE borrar antes
  await prisma.cartItem.deleteMany({
    where: { userId },
  });

  if (!items.length) return;

  await prisma.cartItem.createMany({
    data: items.map((i) => ({
      userId,
      productId: i.id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
  });
}
