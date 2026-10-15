// lib/mercadopago.ts
import crypto from "crypto";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import type { OrderWithItems } from "./orders";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN ?? "",
});

export function siteUrl(req?: Request) {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (env) return env;
  return req ? new URL(req.url).origin : "http://localhost:3000";
}

export async function createPreference(order: OrderWithItems, baseUrl: string) {
  const items = order.items.map((i) => ({
    id: i.productId,
    title: i.name,
    unit_price: i.unitPrice,
    quantity: i.quantity,
    currency_id: "ARS",
  }));
  if (order.shippingCost > 0)
    items.push({
      id: "envio",
      title: "Envío",
      unit_price: order.shippingCost,
      quantity: 1,
      currency_id: "ARS",
    });

  const back = (s: string) =>
    `${baseUrl}/checkout/gracias?order=${order.id}&r=${s}`;
  const isHttps = baseUrl.startsWith("https://");

  const pref = await new Preference(client).create({
    body: {
      items,
      external_reference: order.id,
      payer: { name: order.customerName, email: order.customerEmail },
      back_urls: {
        success: back("success"),
        pending: back("pending"),
        failure: back("failure"),
      },
      // MP exige https para auto_return y para recibir webhooks
      ...(isHttps && {
        auto_return: "approved" as const,
        notification_url: `${baseUrl}/api/mercadopago/webhook`,
      }),
    },
  });

  if (!pref.init_point || !pref.id) throw new Error("MP: preferencia inválida");
  return { id: pref.id, url: pref.init_point };
}

export const getPayment = (id: string) => new Payment(client).get({ id });

/** Valida la firma del webhook si MP_WEBHOOK_SECRET está configurado. */
export function verifySignature(req: Request, dataId: string) {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return true;

  const sig = req.headers.get("x-signature") ?? "";
  const requestId = req.headers.get("x-request-id") ?? "";
  const parts = Object.fromEntries(
    sig.split(",").map((p) => p.trim().split("=") as [string, string]),
  );
  if (!parts.ts || !parts.v1) return false;

  const manifest = `id:${dataId.toLowerCase()};request-id:${requestId};ts:${parts.ts};`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(parts.v1);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
