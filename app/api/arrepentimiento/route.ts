import { after, NextResponse } from "next/server";
import { sendWithdrawal } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rateLimit";

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  if (!rateLimit(`withdrawal:${clientIp(req)}`, 5, 60 * 60 * 1000))
    return NextResponse.json(
      { error: "Demasiados intentos, probá más tarde" },
      { status: 429 },
    );

  const b = await req.json().catch(() => ({}));
  const data = {
    name: clean(b.name, 100),
    email: clean(b.email, 150).toLowerCase(),
    orderNumber: clean(b.orderNumber, 20),
    reason: clean(b.reason, 500),
  };

  if (data.name.length < 2 || !data.orderNumber)
    return NextResponse.json({ error: "Completá los datos" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });

  after(() => sendWithdrawal(data));
  return NextResponse.json({ ok: true });
}
