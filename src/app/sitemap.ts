import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { SITE } from "@/content/site";
import { TOURS } from "@/content/tours";

/**
 * Every page in both locales, with hreflang alternates so Yandex and Google
 * treat /ru and /en as translations of one another rather than duplicates.
 * Legal pages are deliberately absent: they carry `noindex`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/tours", priority: 0.9, freq: "weekly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/gallery", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
  ];

  const dynamicPaths = TOURS.map((tour) => ({
    path: `/tours/${tour.slug}`,
    priority: 0.85,
    freq: "monthly" as const,
  }));

  const all = [...staticPaths, ...dynamicPaths];
  const now = new Date();

  return all.flatMap((entry) =>
    LOCALES.map((locale) => ({
      url: `${SITE.url}/${locale}${entry.path}`,
      lastModified: now,
      changeFrequency: entry.freq,
      priority: entry.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((alt) => [alt, `${SITE.url}/${alt}${entry.path}`]),
        ),
      },
    })),
  );
}
