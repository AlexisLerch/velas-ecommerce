import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export async function POST(req: Request) {
  try {
    const { items }: { items: CartItem[] } = await req.json();

    // 🔥 VALIDACIÓN
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No hay items" }, { status: 400 });
    }

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          id: String(item.id),
          title: item.name,
          unit_price: Number(item.price),
          quantity: Number(item.quantity),
        })),
      },
    });

    // 🔥 DEBUG (CLAVE)
    console.log("MP response:", response);

    // 🔥 FIX CLAVE
    if (!response.init_point) {
      throw new Error("init_point undefined");
    }

    return NextResponse.json({
      url: response.init_point,
    });
  } catch (error) {
    console.error("MP ERROR:", error);

    return NextResponse.json({ error: "Error creando pago" }, { status: 500 });
  }
}
