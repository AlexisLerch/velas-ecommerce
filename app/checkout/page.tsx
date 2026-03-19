"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

export default function CheckoutPage() {
  const { items } = useCartStore();

  const [paymentMethod, setPaymentMethod] = useState("mercadopago");
  const [loading, setLoading] = useState(false);

  // 💰 total dinámico (PRO)
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    // 💳 MERCADO PAGO
    if (paymentMethod === "mercadopago") {
      try {
        setLoading(true);

        const res = await fetch("/api/mercadopago", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items }),
        });

        const data = await res.json();

        // 🔥 redirección al pago
        window.location.href = data.url;
      } catch (error) {
        console.error(error);
        alert("Error al iniciar el pago");
      } finally {
        setLoading(false);
      }
    }

    // 🏦 TRANSFERENCIA
    if (paymentMethod === "transferencia") {
      alert("Realizá la transferencia con los datos mostrados.");
    }

    // 💵 EFECTIVO
    if (paymentMethod === "efectivo") {
      alert("Tu pedido fue registrado. Pagás al recibir.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* 🛒 RESUMEN */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Tu pedido</h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">x{item.quantity}</p>
                </div>
                <p>${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-lg font-bold flex justify-between">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>

        {/* 💳 MÉTODOS DE PAGO */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Método de pago</h2>

          <div className="space-y-3 mb-6">
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                value="mercadopago"
                checked={paymentMethod === "mercadopago"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Mercado Pago
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="radio"
                value="transferencia"
                checked={paymentMethod === "transferencia"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Transferencia bancaria
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="radio"
                value="efectivo"
                checked={paymentMethod === "efectivo"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Efectivo
            </label>
          </div>

          {/* 🏦 TRANSFERENCIA */}
          {paymentMethod === "transferencia" && (
            <div className="bg-gray-100 p-4 rounded mb-4 text-sm">
              <p className="font-semibold mb-2">Datos para transferir:</p>
              <p>Alias: velas.tienda</p>
              <p>CBU: 000000000000</p>
              <p className="mt-2">
                Enviá el comprobante por WhatsApp para confirmar tu pedido.
              </p>
            </div>
          )}

          {/* 💵 EFECTIVO */}
          {paymentMethod === "efectivo" && (
            <div className="bg-gray-100 p-4 rounded mb-4 text-sm">
              <p>Pagás en efectivo al recibir el producto o al retirar.</p>
            </div>
          )}

          {/* 🚀 BOTÓN */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded mt-4 hover:opacity-90 transition"
          >
            {loading ? "Procesando..." : "Confirmar compra"}
          </button>
        </div>
      </div>
    </div>
  );
}
