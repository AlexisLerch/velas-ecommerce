"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  checkPassword,
  endSession,
  requireAdmin,
  startSession,
} from "@/lib/adminAuth";
import { sendOrderPaid, sendOrderShipped } from "@/lib/email";
import { ORDER_STATUSES, setOrderStatus } from "@/lib/orders";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";

// ---------- sesión ----------
export async function login(_: unknown, form: FormData) {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (!rateLimit(`login:${ip}`, 5, 15 * 60 * 1000))
    return { error: "Demasiados intentos. Esperá unos minutos." };

  if (!checkPassword(String(form.get("password") ?? "")))
    return { error: "Contraseña incorrecta" };

  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

// ---------- pedidos ----------
export async function updateOrderStatus(orderId: string, status: string) {
  await requireAdmin();
  if (!(ORDER_STATUSES as readonly string[]).includes(status)) return;

  const order = await setOrderStatus(
    orderId,
    status as (typeof ORDER_STATUSES)[number],
  );
  if (order?.status === "PAID") await sendOrderPaid(order);
  if (order?.status === "SHIPPED") await sendOrderShipped(order);

  revalidatePath("/admin");
  revalidatePath(`/admin/orders/${orderId}`);
}

// ---------- productos ----------
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function parseProduct(form: FormData) {
  const name = String(form.get("name") ?? "").trim();
  const price = Math.round(Number(form.get("price")));
  const stock = Math.round(Number(form.get("stock")));
  const image = String(form.get("image") ?? "").trim();
  const description = String(form.get("description") ?? "").trim() || null;
  if (!name || !image) return { error: "Nombre e imagen son obligatorios" };
  if (!Number.isFinite(price) || price < 0) return { error: "Precio inválido" };
  if (!Number.isFinite(stock) || stock < 0) return { error: "Stock inválido" };
  return { data: { name, price, stock, image, description } };
}

export async function saveProduct(
  id: string | null,
  _: unknown,
  form: FormData,
) {
  await requireAdmin();
  const parsed = parseProduct(form);
  if ("error" in parsed) return { error: parsed.error };

  try {
    if (id) {
      await prisma.product.update({ where: { id }, data: parsed.data });
    } else {
      const base = slugify(parsed.data.name) || "producto";
      const taken = await prisma.product.count({ where: { slug: base } });
      await prisma.product.create({
        data: {
          ...parsed.data,
          slug: taken ? `${base}-${Date.now().toString(36)}` : base,
        },
      });
    }
  } catch (error) {
    console.error("saveProduct", error);
    return { error: "No se pudo guardar el producto" };
  }

  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } }).catch(() => null);
  revalidatePath("/", "layout");
  redirect("/admin/products");
}
