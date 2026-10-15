// lib/adminAuth.ts
// Login simple del dueño: contraseña en ADMIN_PASSWORD + cookie firmada (HMAC).
// ADMIN_SESSION_SECRET es opcional (si falta se usa la contraseña como clave).
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 días

const secret = () =>
  process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";

const sign = (exp: string) =>
  crypto.createHmac("sha256", secret()).update(`admin:${exp}`).digest("hex");

const safeEqual = (a: string, b: string) => {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
};

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

export function checkPassword(input: string) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  // Hash para comparar en tiempo constante aunque difiera el largo
  const h = (s: string) => crypto.createHash("sha256").update(s).digest("hex");
  return safeEqual(h(input), h(pw));
}

export async function startSession() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign(exp));
}

/** Para páginas y server actions del panel: redirige al login si no hay sesión. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
