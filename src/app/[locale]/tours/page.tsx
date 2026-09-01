import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, pick, type Locale } from "@/lib/i18n";
import { SECTIONS, PROVERBS } from "@/content/copy";
import { TOURS, priceFloor } from "@/content/tours";
import { FAQ } from "@/content/faq";
import { SITE } from "@/content/site";
import { formatPrice, plural, pluralEn } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { TourIndex } from "@/components/tours/TourIndex";
import { Seasons } from "@/components/home/Seasons";
import { ProverbDivider } from "@/components/home/ProverbDivider";
import { FaqBlock } from "@/components/ui/FaqBlock";
import { ContactCta } from "@/components/home/ContactCta";
import { BreadcrumbSchema, FaqSchema } from "@/components/seo/Schema";

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

  const title = pick(SECTIONS.tours.title, locale);
  const description = pick(SECTIONS.tours.lead, locale);

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/tours`,
      languages: { ru: "/ru/tours", en: "/en/tours", "x-default": "/ru/tours" },
    },
    openGraph: {
      title,
      description,
      url: `${SITE.url}/${locale}/tours`,
      type: "website",
    },
  };
}

export default async function ToursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const count = TOURS.length;
  const days = TOURS.reduce((sum, tour) => sum + tour.durationDays, 0);

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        trail={[
          { name: locale === "ru" ? "Главная" : "Home", href: "/" },
          { name: pick(SECTIONS.tours.title, locale), href: "/tours" },
        ]}
      />
      <FaqSchema items={FAQ} locale={locale} />

      <PageHero
        locale={locale}
        index="01"
        kicker={pick(SECTIONS.tours.kicker, locale)}
        title={pick(SECTIONS.tours.title, locale)}
        lead={pick(SECTIONS.tours.lead, locale)}
        breadcrumb={[{ label: pick(SECTIONS.tours.title, locale) }]}
        seed={9}
        meta={[
          {
            label: locale === "ru" ? "Маршрутов" : "Routes",
            value: String(count),
          },
          {
            label: locale === "ru" ? "От" : "From",
            value: formatPrice(priceFloor()),
          },
          {
            label: locale === "ru" ? "Высшая точка" : "Highest point",
            value: "5 642 м",
          },
          {
            label: locale === "ru" ? "Сезон" : "Season",
            value: locale === "ru" ? "Круглый год" : "All year",
          },
          {
            label: locale === "ru" ? "Всего дней" : "Total days",
            value: `${days} ${
              locale === "ru"
                ? plural(days, ["день", "дня", "дней"])
                : pluralEn(days, "day", "days")
            }`,
          },
        ]}
      />

      <TourIndex tours={TOURS} locale={locale} />

      <ProverbDivider proverb={PROVERBS[4]} locale={locale} surface="paper" />

      <Seasons locale={locale} />

      <FaqBlock items={FAQ} locale={locale} />

      <ContactCta locale={locale} />
    </>
  );
}
