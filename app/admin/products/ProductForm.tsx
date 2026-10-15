"use client";

import { useActionState } from "react";
import { saveProduct } from "../actions";

type P = {
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string | null;
};

const field = "w-full border border-cardBorder rounded px-3 py-2 bg-transparent";

export default function ProductForm({
  id,
  product,
}: {
  id: string | null;
  product?: P;
}) {
  const [state, action, pending] = useActionState(
    saveProduct.bind(null, id),
    null,
  );
  return (
    <form action={action} className="space-y-4 max-w-lg">
      <label className="block text-sm">
        Nombre
        <input name="name" required defaultValue={product?.name} className={field} />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm">
          Precio (ARS)
          <input name="price" type="number" min={0} step={1} required defaultValue={product?.price} className={field} />
        </label>
        <label className="block text-sm">
          Stock
          <input name="stock" type="number" min={0} step={1} required defaultValue={product?.stock ?? 0} className={field} />
        </label>
      </div>
      <label className="block text-sm">
        Imagen (ruta o URL)
        <input name="image" required defaultValue={product?.image} placeholder="/velas/mi-vela.jpg" className={field} />
      </label>
      <label className="block text-sm">
        Descripción
        <textarea name="description" rows={4} defaultValue={product?.description ?? ""} className={field} />
      </label>
      {state?.error && (
        <p role="alert" className="text-red-600 text-sm">
          {state.error}
        </p>
      )}
      <button
        disabled={pending}
        className="bg-navbar text-white px-6 py-2 rounded disabled:opacity-60"
      >
        {pending ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
