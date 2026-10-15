// lib/rateLimit.ts
// Límite simple en memoria por IP. En Vercel cada instancia serverless tiene su
// propio contador, así que frena abuso básico pero no es una garantía estricta.
// Para algo más fuerte: Upstash Redis / Vercel KV.
const hits = new Map<string, number[]>();

export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear(); // evita crecer sin límite
  return true;
}

export function clientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
