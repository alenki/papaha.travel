import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { isLocale, LOCALES, localePath, pick, type Locale } from "@/lib/i18n";
import { getTour, relatedTours, TOURS } from "@/content/tours";
import { SECTIONS, UI } from "@/content/copy";
import { FAQ } from "@/content/faq";
import { SITE } from "@/content/site";
import { formatAltitude, formatPrice, groupDigits, pad } from "@/lib/utils";

import { PageHero } from "@/components/layout/PageHero";
import { Itinerary } from "@/components/tours/Itinerary";
import { BookingCard } from "@/components/tours/BookingCard";
import { TourCard } from "@/components/tours/TourCard";
import { FigureWithCaption } from "@/components/ui/Figure";
import { ParallaxFrame } from "@/components/motion/Parallax";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { HornMark } from "@/components/ui/Ornament";
import { FaqBlock } from "@/components/ui/FaqBlock";
import { ContactCta } from "@/components/home/ContactCta";
import { BreadcrumbSchema, TourSchema } from "@/components/seo/Schema";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    TOURS.map((tour) => ({ locale, slug: tour.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "ru";
  const tour = getTour(slug);
  if (!tour) return {};

  const title = pick(tour.title, locale);
  const description = pick(tour.summary, locale);

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/tours/${slug}`,
      languages: {
        ru: `/ru/tours/${slug}`,
        en: `/en/tours/${slug}`,
        "x-default": `/ru/tours/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE.url}/${locale}/tours/${slug}`,
      type: "article",
    },
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const tour = getTour(slug);
  if (!tour) notFound();

  const related = relatedTours(slug, 3);
  const title = pick(tour.title, locale);

  const lists: { heading: string; items: typeof tour.included; accent?: boolean }[] = [
    { heading: pick(UI.included, locale), items: tour.included, accent: true },
    { heading: pick(UI.excluded, locale), items: tour.excluded },
    { heading: pick(UI.bring, locale), items: tour.bring },
  ];

  return (
    <>
      <TourSchema tour={tour} locale={locale} />
      <BreadcrumbSchema
        locale={locale}
        trail={[
          { name: locale === "ru" ? "Главная" : "Home", href: "/" },
          { name: pick(SECTIONS.tours.title, locale), href: "/tours" },
          { name: title, href: `/tours/${slug}` },
        ]}
      />

      <PageHero
        locale={locale}
        index={pad(tour.index)}
        kicker={pick(tour.kicker, locale)}
        title={title}
        lead={pick(tour.summary, locale)}
        seed={tour.index * 7}
        breadcrumb={[
          {
            label: pick(SECTIONS.tours.title, locale),
            href: localePath("/tours", locale),
          },
          { label: title },
        ]}
        meta={[
          { label: pick(UI.duration, locale), value: pick(tour.duration, locale) },
          {
            label: pick(UI.altitude, locale),
            value: formatAltitude(tour.altitudeM, locale),
          },
          {
            label: pick(UI.distance, locale),
            value: `${groupDigits(tour.distanceKm)} ${pick(UI.km, locale)}`,
          },
          { label: pick(UI.group, locale), value: pick(tour.groupSize, locale) },
          {
            label: pick(UI.from, locale),
            value: formatPrice(tour.priceFrom),
          },
        ]}
      />

      {/* Full-bleed plate */}
      <div className="surface-stone">
        <ParallaxFrame className="h-[52vh] min-h-[20rem] w-full sm:h-[74vh]" speed={0.1}>
          <FigureWithCaption
            figure={tour.hero}
            locale={locale}
            fill
            preload
            sizes="100vw"
            className="h-full w-full"
            plateLabel={`${pick(tour.region, locale)} · ${formatAltitude(tour.altitudeM, locale)}`}
          />
        </ParallaxFrame>
      </div>

      {/* Body */}
      <section className="surface-paper py-[var(--spacing-section)]">
        <div className="u-shell">
          <div className="grid gap-x-14 gap-y-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]">
            {/* Left column */}
            <div className="flex flex-col gap-16">
              {/* Description */}
              <div>
                <RevealGroup step={0.12}>
                  {tour.description.map((paragraph, i) => (
                    <RevealItem key={i} kind="lift">
                      <p
                        className={
                          i === 0
                            ? "u-lead mb-6 max-w-[58ch]"
                            : "mb-6 max-w-[62ch] leading-relaxed text-[var(--fg-2)]"
                        }
                      >
                        {pick(paragraph, locale)}
                      </p>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="u-label mb-7">{pick(UI.highlights, locale)}</h2>
                <RevealGroup
                  as="ul"
                  className="grid gap-x-8 gap-y-4 sm:grid-cols-2"
                  step={0.07}
                >
                  {tour.highlights.map((item, i) => (
                    <RevealItem
                      as="li"
                      key={i}
                      kind="lift"
                      className="flex items-start gap-3 border-t border-[var(--rule)] pt-3.5"
                    >
                      <HornMark className="mt-[0.15em] w-4 shrink-0 text-[var(--accent)]" />
                      <span className="text-sm leading-snug text-[var(--fg)]">
                        {pick(item, locale)}
                      </span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>

              <Itinerary stops={tour.itinerary} locale={locale} />

              {/* Included / excluded / bring */}
              <div className="grid gap-10 sm:grid-cols-3">
                {lists.map((list) => (
                  <div key={list.heading}>
                    <h2 className="u-label mb-5">{list.heading}</h2>
                    <RevealGroup as="ul" className="flex flex-col gap-3" step={0.05}>
                      {list.items.map((item, i) => (
                        <RevealItem
                          as="li"
                          key={i}
                          kind="lift"
                          className="flex gap-2.5 text-sm leading-snug text-[var(--fg-2)]"
                        >
                          <span
                            aria-hidden="true"
                            className={
                              list.accent
                                ? "text-[var(--accent-text)]"
                                : "text-[var(--fg-3)]"
                            }
                          >
                            {list.accent ? "+" : "−"}
                          </span>
                          <span>{pick(item, locale)}</span>
                        </RevealItem>
                      ))}
                    </RevealGroup>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: sticky */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <BookingCard tour={tour} locale={locale} />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="surface-paper pb-[var(--spacing-section)]">
        <div className="u-shell">
          <h2 className="u-label mb-8 border-t border-[var(--rule)] pt-6">
            {locale === "ru" ? "С маршрута" : "From the route"}
          </h2>
          <RevealGroup
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            step={0.08}
          >
            {tour.gallery.map((figure) => (
              <RevealItem key={figure.id} kind="lift">
                <FigureWithCaption
                  figure={figure}
                  locale={locale}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Related */}
      <section className="surface-paper pb-[var(--spacing-section)]">
        <div className="u-shell">
          <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-[var(--rule)] pt-6">
            <h2 className="u-display text-d3">
              {pick(UI.relatedTours, locale)}
            </h2>
            <Link
              href={localePath("/tours", locale)}
              className="u-label u-underline"
            >
              {pick(UI.backToTours, locale)}
            </Link>
          </div>

          <RevealGroup
            className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
            step={0.09}
          >
            {related.map((item) => (
              <RevealItem key={item.slug} kind="lift">
                <TourCard tour={item} locale={locale} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FaqBlock items={FAQ.slice(0, 6)} locale={locale} index="10" />

      <ContactCta locale={locale} tourTitle={title} />
    </>
  );
}
