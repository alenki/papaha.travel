import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/ru/legal/", "/en/legal/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    // Yandex reads this to pick the canonical mirror.
    host: SITE.url,
  };
}
