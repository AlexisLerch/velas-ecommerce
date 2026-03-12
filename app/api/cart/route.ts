// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchUserCart, saveUserCart } from "@/lib/cart";
import { CartItem } from "@/store/cartStore";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId)
    return NextResponse.json({ error: "No userId" }, { status: 400 });

  const cart = await fetchUserCart(userId);
  return NextResponse.json(cart);
}

export async function POST(req: NextRequest) {
  const { userId, items } = (await req.json()) as {
    userId: string;
    items: CartItem[];
  };
  if (!userId || !items)
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });

  await saveUserCart(userId, items);
  return NextResponse.json({ ok: true });
}
