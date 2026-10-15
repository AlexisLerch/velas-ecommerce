"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="space-y-4">
      <input
        name="password"
        type="password"
        required
        autoFocus
        placeholder="Contraseña"
        className="w-full border border-cardBorder rounded px-3 py-2 bg-transparent"
      />
      {state?.error && (
        <p role="alert" className="text-red-600 text-sm">
          {state.error}
        </p>
      )}
      <button
        disabled={pending}
        className="w-full bg-navbar text-white py-2 rounded disabled:opacity-60"
      >
        {pending ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
