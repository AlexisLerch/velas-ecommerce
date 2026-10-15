import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { siteUrl } from "@/lib/mercadopago";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const pages = [
    "",
    "/products",
    "/nuestrasvelas",
    "/contact",
    "/terminos",
    "/privacidad",
    "/cambios-y-devoluciones",
    "/arrepentimiento",
  ].map((p) => ({ url: `${base}${p}` }));

  const products = (await getProducts()).map((p) => ({
    url: `${base}/products/${p.id}`,
  }));

  return [...pages, ...products];
}
