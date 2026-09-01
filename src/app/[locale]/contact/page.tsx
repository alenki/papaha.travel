import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, pick, type Locale } from "@/lib/i18n";
import { FORM, GETTING_HERE, SECTIONS } from "@/content/copy";
import { CONTACT, LEGAL, SITE } from "@/content/site";
import { FAQ } from "@/content/faq";
import { channelsFor, contactHref } from "@/lib/contact";
import { cn, pad } from "@/lib/utils";

import { PageHero } from "@/components/layout/PageHero";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { FaqBlock } from "@/components/ui/FaqBlock";
import { BreadcrumbSchema, FaqSchema } from "@/components/seo/Schema";
import { Contour } from "@/components/ui/Contour";

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
  const title = pick(SECTIONS.cta.title, locale);
  const description = pick(SECTIONS.cta.lead, locale);

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        ru: "/ru/contact",
        en: "/en/contact",
        "x-default": "/ru/contact",
      },
    },
    openGraph: { title, description, url: `${SITE.url}/${locale}/contact` },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const channels = channelsFor(locale);

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        trail={[
          { name: locale === "ru" ? "Главная" : "Home", href: "/" },
          { name: pick(SECTIONS.cta.kicker, locale), href: "/contact" },
        ]}
      />
      <FaqSchema items={FAQ} locale={locale} />

      <PageHero
        locale={locale}
        index="04"
        kicker={pick(SECTIONS.cta.kicker, locale)}
        title={pick(SECTIONS.cta.title, locale)}
        lead={pick(SECTIONS.cta.lead, locale)}
        breadcrumb={[{ label: pick(SECTIONS.cta.kicker, locale) }]}
        seed={41}
      >
        {/* Channels, right in the hero: the fastest path is the top one. */}
        <Reveal kind="lift" delay={0.36} eager className="mt-10 flex flex-wrap gap-2.5">
          {channels.map((channel) => (
            <a
              key={channel.id}
              href={contactHref(channel.id, { locale })}
              target={channel.id === "phone" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={cn(
                "u-label border px-4 py-3 transition-colors duration-300",
                channel.primary
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]"
                  : "border-[var(--rule-strong)] text-snow hover:border-[var(--accent)] hover:text-[var(--accent)]",
              )}
            >
              {channel.label}
            </a>
          ))}
        </Reveal>
      </PageHero>

      {/* Form + details */}
      <section className="surface-paper py-[var(--spacing-section)]">
        <div className="u-shell">
          <div className="grid gap-x-16 gap-y-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <div>
              <h2 className="u-display mb-3 text-d2">
                {pick(FORM.title, locale)}
              </h2>
              <p className="u-lead mb-12 max-w-[44ch]">
                {pick(CONTACT.responseNote, locale)}
              </p>
              <EnquiryForm locale={locale} />
            </div>

            <div className="flex flex-col gap-12">
              {/* Direct */}
              <div>
                <h2 className="u-label mb-5 border-t border-[var(--rule)] pt-5">
                  {locale === "ru" ? "Напрямую" : "Direct"}
                </h2>
                <a
                  href={contactHref("phone")}
                  className="u-data u-underline block w-fit text-[1.5rem] text-[var(--fg)]"
                >
                  {CONTACT.phoneDisplay}
                </a>
                <a
                  href={contactHref("email")}
                  className="u-underline mt-3 block w-fit text-sm text-[var(--fg-2)]"
                >
                  {CONTACT.email}
                </a>
                <p className="mt-5 text-sm leading-relaxed text-[var(--fg-2)]">
                  {pick(CONTACT.hours, locale)}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-2)]">
                  {pick(CONTACT.address, locale)}
                </p>
                <p className="u-data mt-3 text-xs text-[var(--fg-3)]">
                  {SITE.coords.lat.toFixed(4)}° N, {SITE.coords.lng.toFixed(4)}° E
                </p>
              </div>

              {/* Requisites */}
              <div>
                <h2 className="u-label mb-5 border-t border-[var(--rule)] pt-5">
                  {locale === "ru" ? "Реквизиты" : "Legal details"}
                </h2>
                <dl className="flex flex-col gap-2.5 text-sm text-[var(--fg-2)]">
                  <div>
                    <dt className="u-sr">
                      {locale === "ru" ? "Организация" : "Entity"}
                    </dt>
                    <dd>{pick(LEGAL.entity, locale)}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="u-label pt-[0.2em]">ИНН</dt>
                    <dd className="u-data text-xs">{LEGAL.inn}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="u-label pt-[0.2em]">ОГРНИП</dt>
                    <dd className="u-data text-xs">{LEGAL.ogrn}</dd>
                  </div>
                </dl>
              </div>

              {/* Map placeholder: a drawn plan, not a grey box */}
              <div>
                <h2 className="u-label mb-5 border-t border-[var(--rule)] pt-5">
                  {locale === "ru" ? "На карте" : "On the map"}
                </h2>
                <div className="surface-stone relative aspect-[4/3] w-full overflow-hidden">
                  <Contour
                    className="absolute inset-0 h-full w-full text-glacier"
                    seed={SITE.coords.lat}
                    rings={14}
                    centres={2}
                    opacity={0.3}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <span className="block h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                    <span className="u-display text-d4 text-snow">
                      {pick(SITE.city, locale)}
                    </span>
                    <span className="u-data text-xs text-glacier">
                      {SITE.coords.lat.toFixed(4)}, {SITE.coords.lng.toFixed(4)}
                    </span>
                    <span className="u-label mt-2 max-w-[24ch] text-snow-3">
                      [PLACEHOLDER]{" "}
                      {locale === "ru"
                        ? "заменить на встраиваемую Яндекс.Карту"
                        : "replace with an embedded Yandex map"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting here */}
      <section className="surface-paper pb-[var(--spacing-section)]">
        <div className="u-shell">
          <h2 className="u-display mb-12 border-t border-[var(--rule)] pt-6 text-d2">
            {pick(GETTING_HERE.title, locale)}
          </h2>

          <RevealGroup
            className="grid gap-x-10 gap-y-10 sm:grid-cols-2"
            step={0.09}
          >
            {GETTING_HERE.routes.map((route, i) => (
              <RevealItem key={i} kind="lift" className="flex gap-5">
                <span className="u-index mt-[0.35em] shrink-0">
                  {pad(i + 1)}
                </span>
                <div>
                  <h3 className="u-display mb-2 text-d4">
                    {pick(route.mode, locale)}
                  </h3>
                  <p className="max-w-[46ch] leading-relaxed text-[var(--fg-2)]">
                    {pick(route.text, locale)}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FaqBlock items={FAQ} locale={locale} index="05" />
    </>
  );
}
