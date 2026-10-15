import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/lib/adminAuth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="max-w-sm mx-auto py-16">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Panel de administración
      </h1>
      {adminConfigured() ? (
        <LoginForm />
      ) : (
        <p className="text-sm text-center">
          Falta definir <code>ADMIN_PASSWORD</code> en las variables de entorno.
        </p>
      )}
    </div>
  );
}
