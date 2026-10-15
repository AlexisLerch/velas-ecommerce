// lib/orders.ts
// Creación de pedidos. Los precios SIEMPRE se leen del servidor: del carrito
// solo se toman el id del producto y la cantidad.
import type {
  DeliveryMethod,
  Order,
  OrderItem,
  PaymentMethod,
} from "@prisma/client";
import { site } from "@/config/site";
import { prisma } from "./prisma";
import { getProductById } from "./products";

export class OrderError extends Error {}

export type OrderInput = {
  items: { productId: string; quantity: number }[];
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  notes?: string;
};

export type OrderWithItems = Order & { items: OrderItem[] };

const PAYMENT_METHODS: PaymentMethod[] = ["MERCADOPAGO", "TRANSFER", "CASH"];
const DELIVERY_METHODS: DeliveryMethod[] = ["SHIPPING", "PICKUP"];
const MAX_QTY = 50;

const clean = (v: unknown, max = 200) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/** Valida y normaliza el body que llega del checkout. Lanza OrderError. */
export function parseOrderInput(body: unknown): OrderInput {
  const b = (body ?? {}) as Record<string, unknown>;

  const paymentMethod = b.paymentMethod as PaymentMethod;
  const deliveryMethod = b.deliveryMethod as DeliveryMethod;
  if (!PAYMENT_METHODS.includes(paymentMethod))
    throw new OrderError("Método de pago inválido");
  if (!DELIVERY_METHODS.includes(deliveryMethod))
    throw new OrderError("Método de entrega inválido");

  if (!Array.isArray(b.items) || b.items.length === 0)
    throw new OrderError("El carrito está vacío");

  const items = b.items.map((raw) => {
    const it = (raw ?? {}) as Record<string, unknown>;
    const quantity = Number(it.quantity);
    const productId = clean(it.productId, 100);
    if (!productId || !Number.isInteger(quantity) || quantity < 1)
      throw new OrderError("Producto inválido en el carrito");
    return { productId, quantity: Math.min(quantity, MAX_QTY) };
  });

  const customerName = clean(b.customerName);
  const customerEmail = clean(b.customerEmail).toLowerCase();
  const customerPhone = clean(b.customerPhone, 40);
  if (customerName.length < 2) throw new OrderError("Ingresá tu nombre");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail))
    throw new OrderError("Email inválido");
  if (customerPhone.replace(/\D/g, "").length < 6)
    throw new OrderError("Ingresá un teléfono de contacto");

  const input: OrderInput = {
    items,
    paymentMethod,
    deliveryMethod,
    customerName,
    customerEmail,
    customerPhone,
    notes: clean(b.notes, 500) || undefined,
  };

  if (deliveryMethod === "SHIPPING") {
    input.address = clean(b.address);
    input.city = clean(b.city);
    input.province = clean(b.province);
    input.postalCode = clean(b.postalCode, 20);
    if (!input.address || !input.city || !input.province || !input.postalCode)
      throw new OrderError("Completá la dirección de envío");
  }

  return input;
}

type Resolved = {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  tracksStock: boolean;
};

async function resolveItems(input: OrderInput): Promise<Resolved[]> {
  // Unir duplicados
  const qtyById = new Map<string, number>();
  for (const it of input.items)
    qtyById.set(it.productId, (qtyById.get(it.productId) ?? 0) + it.quantity);

  const resolved: Resolved[] = [];
  for (const [id, quantity] of qtyById) {
    const db = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      select: { id: true, name: true, price: true, stock: true },
    });
    if (db) {
      if (db.stock < quantity)
        throw new OrderError(
          db.stock > 0
            ? `Solo quedan ${db.stock} unidades de "${db.name}"`
            : `"${db.name}" está sin stock`,
        );
      resolved.push({
        productId: db.id,
        name: db.name,
        unitPrice: db.price,
        quantity,
        tracksStock: true,
      });
      continue;
    }

    // Productos que solo viven en el catálogo local (sin control de stock)
    const local = await getProductById(id);
    if (!local) throw new OrderError("Un producto del carrito ya no existe");
    resolved.push({
      productId: local.id,
      name: local.name,
      unitPrice: Math.round(local.price),
      quantity,
      tracksStock: false,
    });
  }
  return resolved;
}

export function calcShipping(subtotal: number, delivery: DeliveryMethod) {
  if (delivery === "PICKUP") return 0;
  return subtotal >= site.freeShippingFrom ? 0 : site.shippingCost;
}

export async function createOrder(input: OrderInput): Promise<OrderWithItems> {
  const items = await resolveItems(input);
  const subtotal = items.reduce((a, i) => a + i.unitPrice * i.quantity, 0);
  const shippingCost = calcShipping(subtotal, input.deliveryMethod);

  return prisma.$transaction(async (tx) => {
    // Descuento atómico: si alguien compró en el medio, count = 0 y se aborta
    for (const it of items.filter((i) => i.tracksStock)) {
      const res = await tx.product.updateMany({
        where: { id: it.productId, stock: { gte: it.quantity } },
        data: { stock: { decrement: it.quantity } },
      });
      if (res.count === 0)
        throw new OrderError(`"${it.name}" se quedó sin stock`);
    }

    return tx.order.create({
      data: {
        paymentMethod: input.paymentMethod,
        deliveryMethod: input.deliveryMethod,
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
        address: input.address,
        city: input.city,
        province: input.province,
        postalCode: input.postalCode,
        notes: input.notes,
        subtotal,
        shippingCost,
        total: subtotal + shippingCost,
        items: {
          create: items.map(({ productId, name, unitPrice, quantity }) => ({
            productId,
            name,
            unitPrice,
            quantity,
          })),
        },
      },
      include: { items: true },
    });
  });
}

/** Cancela un pedido pendiente y devuelve el stock. Idempotente. */
export async function cancelOrder(orderId: string) {
  await prisma.$transaction(async (tx) => {
    const res = await tx.order.updateMany({
      where: { id: orderId, status: "PENDING_PAYMENT" },
      data: { status: "CANCELLED" },
    });
    if (res.count === 0) return; // ya procesado
    const items = await tx.orderItem.findMany({ where: { orderId } });
    for (const it of items) {
      // Si el producto no está en la base (catálogo local) no matchea nada
      await tx.product.updateMany({
        where: { id: it.productId },
        data: { stock: { increment: it.quantity } },
      });
    }
  });
}

export const ORDER_STATUSES = [
  "PENDING_PAYMENT",
  "PAID",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

/**
 * Cambio de estado manual (panel admin). Devuelve el pedido actualizado, o null
 * si no corresponde (ya cancelado, mismo estado). Cancelar devuelve el stock;
 * un pedido cancelado no se puede reactivar (habría que volver a descontar).
 */
export async function setOrderStatus(
  orderId: string,
  status: (typeof ORDER_STATUSES)[number],
): Promise<OrderWithItems | null> {
  return prisma.$transaction(async (tx) => {
    const current = await tx.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
    if (!current || current.status === status || current.status === "CANCELLED")
      return null;

    if (status === "CANCELLED") {
      for (const it of current.items)
        await tx.product.updateMany({
          where: { id: it.productId },
          data: { stock: { increment: it.quantity } },
        });
    }
    return tx.order.update({
      where: { id: orderId },
      data: { status },
      include: { items: true },
    });
  });
}
