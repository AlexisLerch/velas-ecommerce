// lib/email.ts
// Emails transaccionales con Resend (https://resend.com), por API REST.
// Variables: RESEND_API_KEY, EMAIL_FROM ("La Comarca de Cera <pedidos@tudominio.com>")
// y ORDER_NOTIFY_EMAIL (a dónde te llega el aviso de cada pedido).
// Sin RESEND_API_KEY no se envía nada: se avisa por consola y la tienda sigue.
import { site, whatsappLink } from "@/config/site";
import type { OrderWithItems } from "./orders";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const money = (n: number) => `$${n.toLocaleString("es-AR")}`;

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[email] RESEND_API_KEY no configurada, no se envió:", opts.subject);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM ?? `${site.name} <onboarding@resend.dev>`,
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
        ...(opts.replyTo && { reply_to: opts.replyTo }),
      }),
    });
    if (!res.ok) {
      console.error("[email] Resend respondió", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[email] error enviando", error);
    return false;
  }
}

const notifyTo = () => process.env.ORDER_NOTIFY_EMAIL || site.email;

function layout(title: string, body: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#222">
  <h1 style="font-size:22px;margin-bottom:4px">${esc(site.name)}</h1>
  <h2 style="font-size:18px;font-weight:600;margin-top:0">${title}</h2>
  ${body}
  <p style="color:#888;font-size:12px;margin-top:32px">${esc(site.name)}${site.email ? ` · ${esc(site.email)}` : ""}</p>
</div>`;
}

function summary(o: OrderWithItems) {
  const rows = o.items
    .map(
      (i) =>
        `<tr><td style="padding:4px 0">${esc(i.name)} × ${i.quantity}</td><td style="text-align:right">${money(i.unitPrice * i.quantity)}</td></tr>`,
    )
    .join("");
  return `<table style="width:100%;border-collapse:collapse;font-size:14px">${rows}
  <tr><td style="padding-top:8px;border-top:1px solid #ddd">Envío</td><td style="text-align:right;border-top:1px solid #ddd">${o.shippingCost === 0 ? "Gratis" : money(o.shippingCost)}</td></tr>
  <tr><td style="font-weight:bold">Total</td><td style="text-align:right;font-weight:bold">${money(o.total)}</td></tr></table>`;
}

function delivery(o: OrderWithItems) {
  if (o.deliveryMethod === "PICKUP") return "<p><b>Entrega:</b> retiro por el local.</p>";
  return `<p><b>Envío a:</b> ${esc(o.address ?? "")}, ${esc(o.city ?? "")}, ${esc(o.province ?? "")} (CP ${esc(o.postalCode ?? "")})</p>`;
}

function paymentInstructions(o: OrderWithItems) {
  if (o.paymentMethod === "TRANSFER") {
    const b = site.bank;
    return `<div style="background:#f6f1ec;padding:12px;border-radius:6px;font-size:14px">
    <p style="margin:0 0 6px"><b>Transferí ${money(o.total)} a:</b></p>
    ${b.alias ? `<p style="margin:0">Alias: ${esc(b.alias)}</p>` : ""}
    ${b.cbu ? `<p style="margin:0">CBU: ${esc(b.cbu)}</p>` : ""}
    ${b.holder ? `<p style="margin:0">Titular: ${esc(b.holder)}</p>` : ""}
    <p style="margin:8px 0 0">Enviá el comprobante por <a href="${whatsappLink(`Hola! Comprobante del pedido #${o.number}`)}">WhatsApp</a> indicando el número de pedido.</p></div>`;
  }
  if (o.paymentMethod === "CASH")
    return `<p>Pagás en efectivo ${o.deliveryMethod === "PICKUP" ? "al retirar" : "al recibir"} tu pedido. Te contactamos para coordinar.</p>`;
  return "";
}

/** Pedido recién creado con transferencia o efectivo (queda pendiente). */
export async function sendOrderReceived(o: OrderWithItems) {
  await Promise.all([
    sendEmail({
      to: o.customerEmail,
      replyTo: site.email || undefined,
      subject: `Recibimos tu pedido #${o.number}`,
      html: layout(
        `¡Gracias, ${esc(o.customerName)}! Recibimos tu pedido #${o.number}`,
        `${summary(o)}${delivery(o)}${paymentInstructions(o)}`,
      ),
    }),
    notifyOwner(o, "Nuevo pedido (pago pendiente)"),
  ]);
}

/** Pago confirmado (Mercado Pago o confirmado a mano). */
export async function sendOrderPaid(o: OrderWithItems) {
  await Promise.all([
    sendEmail({
      to: o.customerEmail,
      replyTo: site.email || undefined,
      subject: `Pago confirmado – pedido #${o.number}`,
      html: layout(
        `¡Pago confirmado! Pedido #${o.number}`,
        `<p>Hola ${esc(o.customerName)}, recibimos tu pago. Ya estamos preparando tu pedido.</p>${summary(o)}${delivery(o)}`,
      ),
    }),
    notifyOwner(o, "Pedido PAGADO"),
  ]);
}

/** Pedido enviado / listo para retirar. */
export async function sendOrderShipped(o: OrderWithItems) {
  const pickup = o.deliveryMethod === "PICKUP";
  await sendEmail({
    to: o.customerEmail,
    replyTo: site.email || undefined,
    subject: pickup
      ? `Tu pedido #${o.number} está listo para retirar`
      : `Tu pedido #${o.number} está en camino`,
    html: layout(
      pickup ? "¡Tu pedido está listo para retirar!" : "¡Tu pedido está en camino!",
      `<p>Hola ${esc(o.customerName)}, ${pickup ? `podés pasar a retirarlo. Horario: ${esc(site.hours)}.` : "despachamos tu pedido. Cualquier duda, escribinos."}</p>${summary(o)}`,
    ),
  });
}

function notifyOwner(o: OrderWithItems, label: string) {
  const to = notifyTo();
  if (!to) {
    console.warn("[email] sin ORDER_NOTIFY_EMAIL ni NEXT_PUBLIC_EMAIL: no se avisa al dueño");
    return Promise.resolve(false);
  }
  const method = { MERCADOPAGO: "Mercado Pago", TRANSFER: "Transferencia", CASH: "Efectivo" }[o.paymentMethod];
  return sendEmail({
    to,
    subject: `${label} #${o.number} – ${money(o.total)}`,
    html: layout(
      `${label} #${o.number}`,
      `<p><b>${esc(o.customerName)}</b><br>${esc(o.customerEmail)}<br>${esc(o.customerPhone)}</p>
      <p><b>Pago:</b> ${method}</p>${delivery(o)}${o.notes ? `<p><b>Notas:</b> ${esc(o.notes)}</p>` : ""}${summary(o)}`,
    ),
  });
}

/** Solicitud del botón de arrepentimiento. */
export async function sendWithdrawal(d: {
  name: string;
  email: string;
  orderNumber: string;
  reason: string;
}) {
  const body = `<p><b>${esc(d.name)}</b> (${esc(d.email)}) solicita revocar la compra del pedido <b>#${esc(d.orderNumber)}</b>.</p>${d.reason ? `<p>Motivo: ${esc(d.reason)}</p>` : ""}`;
  const to = notifyTo();
  await Promise.all([
    to
      ? sendEmail({ to, replyTo: d.email, subject: `Botón de arrepentimiento – pedido #${d.orderNumber}`, html: layout("Solicitud de arrepentimiento", body) })
      : Promise.resolve(false),
    sendEmail({
      to: d.email,
      subject: "Recibimos tu solicitud de arrepentimiento",
      html: layout("Recibimos tu solicitud", `<p>Hola ${esc(d.name)}, registramos tu solicitud sobre el pedido #${esc(d.orderNumber)}. Te vamos a contactar a la brevedad.</p>`),
    }),
  ]);
}
