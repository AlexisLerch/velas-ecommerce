import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/mercadopago";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/checkout", "/cart"],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
