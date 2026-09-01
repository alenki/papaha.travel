import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, pick, type Locale } from "@/lib/i18n";
import { PHOTO_CREDITS } from "@/content/credits";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbSchema } from "@/components/seo/Schema";

const COPY = {
  kicker: { ru: "Документы", en: "Documents" },
  title: { ru: "Фотографии", en: "Photographs" },
  lead: {
    ru: "Съёмка на сайте пока не наша. Пока свой архив не собран, страницы иллюстрируют работы фотографов Викисклада, опубликованные под свободными лицензиями. Здесь указан автор каждого снимка.",
    en: "The photography here is not ours yet. Until our own archive is shot, the pages are illustrated with the work of Wikimedia Commons photographers published under free licences. Every one of them is credited below.",
  },
  slot: { ru: "Слот", en: "Slot" },
  photographer: { ru: "Автор", en: "Photographer" },
  license: { ru: "Лицензия", en: "Licence" },
  source: { ru: "Источник", en: "Source" },
  empty: {
    ru: "Пока ни одной фотографии не подключено.",
    en: "No photographs are wired in yet.",
  },
} as const;

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

  return {
    title: pick(COPY.title, locale),
    description: pick(COPY.lead, locale),
    alternates: {
      canonical: `/${locale}/credits`,
      languages: {
        ru: "/ru/credits",
        en: "/en/credits",
        "x-default": "/ru/credits",
      },
    },
    robots: { index: false, follow: true },
  };
}

/**
 * Attribution.
 *
 * Every photograph on the site is somebody else's work, used under CC BY,
 * CC BY-SA, CC0 or public domain terms. The first two of those *require*
 * credit, so this page is a licence obligation rather than a courtesy, and the
 * footer links to it from every page. The list is generated from
 * scripts/media-manifest.json by scripts/fetch-media.mjs, so it cannot drift
 * away from what is actually in /public/media.
 */
export default async function CreditsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const title = pick(COPY.title, locale);

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        trail={[
          { name: locale === "ru" ? "Главная" : "Home", href: "/" },
          { name: title, href: "/credits" },
        ]}
      />

      <PageHero
        locale={locale}
        kicker={pick(COPY.kicker, locale)}
        title={title}
        lead={pick(COPY.lead, locale)}
        size="d2"
        seed={317}
        breadcrumb={[{ label: title }]}
      />

      <section className="surface-paper py-[var(--spacing-section)]">
        <div className="u-shell">
          {PHOTO_CREDITS.length === 0 ? (
            <p className="text-[var(--fg-2)]">{pick(COPY.empty, locale)}</p>
          ) : (
            <Reveal kind="fade">
              <ul className="flex flex-col border-t border-[var(--rule)]">
                {PHOTO_CREDITS.map((credit) => (
                  <li
                    key={credit.id}
                    className="grid gap-x-8 gap-y-1.5 border-b border-[var(--rule)] py-5 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_minmax(0,9rem)] sm:items-baseline"
                  >
                    <span className="u-data text-xs text-[var(--fg-3)]">
                      {credit.id}
                    </span>

                    <span className="leading-relaxed text-[var(--fg-2)]">
                      <a
                        href={credit.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="u-underline text-[var(--fg)]"
                      >
                        {credit.title.replace(/\.[a-z]+$/i, "")}
                      </a>
                      <span className="text-[var(--fg-3)]"> · </span>
                      {credit.author}
                    </span>

                    <a
                      href={credit.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="u-label u-underline sm:text-right"
                    >
                      {credit.license}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
