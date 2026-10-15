"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { site } from "@/config/site";

type Payment = "MERCADOPAGO" | "TRANSFER" | "CASH";
type Delivery = "SHIPPING" | "PICKUP";

const field =
  "w-full border rounded px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-navbar/40";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();

  const [payment, setPayment] = useState<Payment>("MERCADOPAGO");
  const [delivery, setDelivery] = useState<Delivery>("SHIPPING");
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    notes: "",
  });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Solo informativo: el servidor recalcula todo con los precios reales
  const subtotal = items.reduce((a, i) => a + i.price * i.quantity, 0);
  const shipping =
    delivery === "PICKUP" || subtotal >= site.freeShippingFrom
      ? 0
      : site.shippingCost;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (items.length === 0) return setError("El carrito está vacío");
    if (!accepted)
      return setError("Tenés que aceptar los términos y condiciones");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod: payment,
          deliveryMethod: delivery,
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Error");

      // El carrito se vacía solo cuando el pedido ya quedó guardado
      if (payment !== "MERCADOPAGO") clearCart();
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al procesar el pedido");
      setLoading(false);
    }
  };

  if (items.length === 0)
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p>Tu carrito está vacío.</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-8">
          {/* 👤 DATOS */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Tus datos</h2>
            <div className="space-y-3">
              <input className={field} placeholder="Nombre y apellido" autoComplete="name" value={form.customerName} onChange={set("customerName")} />
              <input className={field} type="email" placeholder="Email" autoComplete="email" value={form.customerEmail} onChange={set("customerEmail")} />
              <input className={field} type="tel" placeholder="Teléfono / WhatsApp" autoComplete="tel" value={form.customerPhone} onChange={set("customerPhone")} />
            </div>
          </section>

          {/* 🚚 ENTREGA */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Entrega</h2>
            <div className="space-y-2 mb-4">
              <label className="flex gap-2 items-center">
                <input type="radio" checked={delivery === "SHIPPING"} onChange={() => setDelivery("SHIPPING")} />
                Envío a domicilio
              </label>
              <label className="flex gap-2 items-center">
                <input type="radio" checked={delivery === "PICKUP"} onChange={() => setDelivery("PICKUP")} />
                Retiro por el local (gratis)
              </label>
            </div>

            {delivery === "SHIPPING" && (
              <div className="space-y-3">
                <input className={field} placeholder="Calle y número" autoComplete="street-address" value={form.address} onChange={set("address")} />
                <div className="grid grid-cols-2 gap-3">
                  <input className={field} placeholder="Ciudad" autoComplete="address-level2" value={form.city} onChange={set("city")} />
                  <input className={field} placeholder="Provincia" autoComplete="address-level1" value={form.province} onChange={set("province")} />
                </div>
                <input className={field} placeholder="Código postal" autoComplete="postal-code" value={form.postalCode} onChange={set("postalCode")} />
              </div>
            )}

            <textarea className={`${field} mt-3`} rows={2} placeholder="Notas del pedido (opcional)" value={form.notes} onChange={set("notes")} />
          </section>
        </div>

        <div className="space-y-8">
          {/* 🛒 RESUMEN */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Tu pedido</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted">x{item.quantity}</p>
                  </div>
                  <p>${(item.price * item.quantity).toLocaleString("es-AR")}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString("es-AR")}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>{shipping === 0 ? "Gratis" : `$${shipping.toLocaleString("es-AR")}`}</span>
              </div>
            </div>
            <div className="mt-3 text-lg font-bold flex justify-between">
              <span>Total</span>
              <span>${total.toLocaleString("es-AR")}</span>
            </div>
          </section>

          {/* 💳 PAGO */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Método de pago</h2>
            <div className="space-y-3 mb-4">
              <label className="flex gap-2 items-center">
                <input type="radio" checked={payment === "MERCADOPAGO"} onChange={() => setPayment("MERCADOPAGO")} />
                Mercado Pago
              </label>
              <label className="flex gap-2 items-center">
                <input type="radio" checked={payment === "TRANSFER"} onChange={() => setPayment("TRANSFER")} />
                Transferencia bancaria
              </label>
              <label className="flex gap-2 items-center">
                <input type="radio" checked={payment === "CASH"} onChange={() => setPayment("CASH")} />
                Efectivo
              </label>
            </div>

            {payment === "TRANSFER" && (
              <div className="bg-secondary p-4 rounded mb-4 text-sm">
                <p>Los datos para transferir te los mostramos al confirmar el pedido.</p>
                <p className="mt-2">Enviá el comprobante por WhatsApp para confirmarlo.</p>
              </div>
            )}
            {payment === "CASH" && (
              <div className="bg-secondary p-4 rounded mb-4 text-sm">
                <p>Pagás en efectivo al recibir el producto o al retirar.</p>
              </div>
            )}

            <label className="flex gap-2 items-start text-sm mb-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span>
                Acepto los{" "}
                <Link href="/terminos" target="_blank" className="underline">
                  términos y condiciones
                </Link>{" "}
                y la{" "}
                <Link href="/privacidad" target="_blank" className="underline">
                  política de privacidad
                </Link>
              </span>
            </label>

            {error && (
              <p role="alert" className="text-red-600 text-sm mb-3">
                {error}
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-navbar text-white py-3 rounded hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Procesando..." : "Confirmar compra"}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
