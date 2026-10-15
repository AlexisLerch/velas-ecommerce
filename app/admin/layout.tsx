import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin } from "@/lib/adminAuth";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await isAdmin();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {admin && (
        <nav className="flex flex-wrap items-center gap-6 mb-8 pb-4 border-b border-cardBorder text-sm">
          <Link href="/admin" className="font-semibold hover:underline">
            Pedidos
          </Link>
          <Link href="/admin/products" className="font-semibold hover:underline">
            Productos
          </Link>
          <form action={logout} className="ml-auto">
            <button className="underline text-muted">Cerrar sesión</button>
          </form>
        </nav>
      )}
      {children}
    </div>
  );
}
