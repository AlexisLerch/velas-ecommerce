// lib/prisma.ts
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// tu conexión a PostgreSQL
const connectionString = process.env.DATABASE_URL!;

const pool = new Pool({
  connectionString,
});

// creamos el cliente PrismaPg
export const prisma = new PrismaPg(pool);
