import { prisma } from "@/lib/prisma";

export async function GET() {
  await prisma.product.createMany({
    data: [
      {
        name: "Vela Lavanda",
        price: 12000,
        image: "/products/vela-lavanda.jpg",
        slug: "vela-lavanda",
        stock: 10,
      },
      {
        name: "Vela Vainilla",
        price: 11000,
        image: "/products/vela-vainilla.jpg",
        slug: "vela-vainilla",
        stock: 10,
      },
      {
        name: "Vela Canela",
        price: 11500,
        image: "/products/vela-canela.jpg",
        slug: "vela-canela",
        stock: 10,
      },
      {
        name: "Vela Coco",
        price: 12000,
        image: "/products/vela-coco.jpg",
        slug: "vela-coco",
        stock: 10,
      },
      {
        name: "Vela Jazmin",
        price: 13000,
        image: "/products/vela-jazmin.jpg",
        slug: "vela-jazmin",
        stock: 10,
      },
    ],
  });

  return Response.json({ ok: true });
}
