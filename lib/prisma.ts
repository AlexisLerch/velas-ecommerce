// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Evita múltiples instancias en dev
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // opcional para debug
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
