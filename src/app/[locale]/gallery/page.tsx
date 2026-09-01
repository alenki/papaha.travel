import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, pick, type Locale } from "@/lib/i18n";
import { SECTIONS } from "@/content/copy";
import { TOURS } from "@/content/tours";
import { SITE } from "@/content/site";

import { PageHero } from "@/components/layout/PageHero";
import {
  GalleryGrid,
  type GalleryEntry,
} from "@/components/gallery/GalleryGrid";
import { ContactCta } from "@/components/home/ContactCta";
import { BreadcrumbSchema } from "@/components/seo/Schema";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "ru";
  const title = pick(SECTIONS.gallery.title, locale);
  const description = pick(SECTIONS.gallery.lead, locale);

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/gallery`,
      languages: {
        ru: "/ru/gallery",
        en: "/en/gallery",
        "x-default": "/ru/gallery",
      },
    },
    openGraph: { title, description, url: `${SITE.url}/${locale}/gallery` },
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  /*
   * Every plate on the site, gathered in one place. Hero frames first so the
   * page opens strongly, then the detail frames from each route.
   */
  const entries: GalleryEntry[] = [
    ...TOURS.map((tour) => ({
      figure: tour.hero,
      source: pick(tour.title, locale),
    })),
    ...TOURS.flatMap((tour) =>
      tour.gallery.map((figure) => ({
        figure,
        source: pick(tour.title, locale),
      })),
    ),
  ];

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        trail={[
          { name: locale === "ru" ? "Главная" : "Home", href: "/" },
          { name: pick(SECTIONS.gallery.kicker, locale), href: "/gallery" },
        ]}
      />

      <PageHero
        locale={locale}
        index="03"
        kicker={pick(SECTIONS.gallery.kicker, locale)}
        title={pick(SECTIONS.gallery.title, locale)}
        lead={pick(SECTIONS.gallery.lead, locale)}
        breadcrumb={[{ label: pick(SECTIONS.gallery.kicker, locale) }]}
        seed={29}
        meta={[
          {
            label: locale === "ru" ? "Кадров" : "Frames",
            value: String(entries.length),
          },
          {
            label: locale === "ru" ? "Маршрутов" : "Routes",
            value: String(TOURS.length),
          },
          {
            label: locale === "ru" ? "Снято" : "Shot",
            value: "2016–2026",
          },
        ]}
      />

      <section className="surface-paper py-[var(--spacing-section)]">
        <div className="u-shell">
          <p className="u-label mb-8 border-t border-[var(--rule)] pt-6">
            {locale === "ru"
              ? "Нажмите на кадр, чтобы открыть · ← → для перелистывания"
              : "Tap a frame to open · ← → to move between them"}
          </p>
          <GalleryGrid entries={entries} locale={locale} />
        </div>
      </section>

      <ContactCta locale={locale} />
    </>
  );
}
