import { prisma } from "./prisma";
import { CartItem } from "@/store/cartStore";

export async function fetchUserCart(userId: string) {
  return await prisma.CartItem.findMany({ where: { userId } });
}

export async function saveUserCart(userId: string, items: CartItem[]) {
  await prisma.CartItem.deleteMany({ where: { userId } });
  await prisma.CartItem.createMany({
    data: items.map((i) => ({
      userId,
      productId: i.id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
  });
}
