"use client";

import { useState } from "react";
import { whatsappLink } from "@/config/site";

const field =
  "w-full px-4 py-3 rounded-lg bg-card border border-cardBorder text-textMain focus:outline-none focus:ring-2 focus:ring-accent2";

// Arma el mensaje y lo abre en WhatsApp (no hace falta backend)
export default function ContactForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("Consulta general");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola! Soy ${name}.\nMotivo: ${topic}\n${message}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-card border border-cardBorder rounded-2xl p-6 md:p-8 shadow-md space-y-4"
    >
      <h2 className="text-lg font-semibold tracking-widest uppercase text-heading">
        Dejanos tu mensaje
      </h2>
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
        className={field}
      />
      <select
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className={field}
      >
        <option>Consulta general</option>
        <option>Velas personalizadas</option>
        <option>Pedido mayorista / souvenirs</option>
        <option>Estado de mi pedido</option>
      </select>
      <textarea
        required
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Contanos qué necesitás"
        className={field}
      />
      <button
        type="submit"
        className="w-full bg-navbar text-white px-6 py-4 rounded-lg tracking-wide shadow-lg hover:shadow-xl transition"
      >
        Enviar por WhatsApp
      </button>
    </form>
  );
}
