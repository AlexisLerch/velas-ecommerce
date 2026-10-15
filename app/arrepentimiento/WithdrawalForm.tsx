"use client";

import { useState } from "react";

const field = "w-full border border-cardBorder rounded px-3 py-2 bg-transparent";

export default function WithdrawalForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/arrepentimiento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Error");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos enviar la solicitud");
      setStatus("idle");
    }
  };

  if (status === "done")
    return (
      <p className="bg-secondary p-4 rounded">
        Recibimos tu solicitud. Te enviamos un email de confirmación y te
        vamos a contactar a la brevedad.
      </p>
    );

  return (
    <form onSubmit={submit} className="space-y-3">
      <input name="name" required placeholder="Nombre y apellido" className={field} />
      <input name="email" type="email" required placeholder="Email" className={field} />
      <input name="orderNumber" required placeholder="Número de pedido (ej: 12)" className={field} />
      <textarea name="reason" rows={3} placeholder="Motivo (opcional)" className={field} />
      {error && (
        <p role="alert" className="text-red-600 text-sm">
          {error}
        </p>
      )}
      <button
        disabled={status === "sending"}
        className="bg-navbar text-white px-6 py-3 rounded disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Solicitar arrepentimiento"}
      </button>
    </form>
  );
}
