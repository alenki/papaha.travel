import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, pick, type Locale } from "@/lib/i18n";
import { ABOUT, PROVERBS, SECTIONS } from "@/content/copy";
import { SITE, STATS } from "@/content/site";
import { pad } from "@/lib/utils";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { FigureWithCaption } from "@/components/ui/Figure";
import { ParallaxFrame } from "@/components/motion/Parallax";
import { ProverbDivider } from "@/components/home/ProverbDivider";
import { GuidesStrip } from "@/components/home/GuidesStrip";
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
  const title = pick(ABOUT.title, locale);
  const description = pick(ABOUT.story[0], locale).slice(0, 180);

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { ru: "/ru/about", en: "/en/about", "x-default": "/ru/about" },
    },
    openGraph: { title, description, url: `${SITE.url}/${locale}/about` },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        trail={[
          { name: locale === "ru" ? "Главная" : "Home", href: "/" },
          { name: pick(ABOUT.kicker, locale), href: "/about" },
        ]}
      />

      <PageHero
        locale={locale}
        index="02"
        kicker={pick(ABOUT.kicker, locale)}
        title={pick(ABOUT.title, locale)}
        lead={pick(SECTIONS.manifesto.lead, locale)}
        breadcrumb={[{ label: pick(ABOUT.kicker, locale) }]}
        seed={17}
      />

      {/* The story, with a plate cutting through it */}
      <section className="surface-paper py-[var(--spacing-section)]">
        <div className="u-shell">
          <div className="grid gap-x-14 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            <RevealGroup className="flex flex-col" step={0.12}>
              {ABOUT.story.map((paragraph, i) => (
                <RevealItem key={i} kind="lift">
                  <p
                    className={
                      i === 0
                        ? "u-lead mb-7 max-w-[54ch]"
                        : "mb-7 max-w-[60ch] leading-relaxed text-[var(--fg-2)]"
                    }
                  >
                    {pick(paragraph, locale)}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal kind="wipe" className="lg:pt-10">
              <ParallaxFrame className="aspect-[3/4] w-full" speed={0.08}>
                <FigureWithCaption
                  figure={{
                    id: "about-portrait",
                    alt: {
                      ru: "Гид у машины на грунтовой дороге в горах",
                      en: "A guide beside the vehicle on a mountain track",
                    },
                    caption: {
                      ru: "Перевал Актопрак. Три машины, четыре человека, девять маршрутов.",
                      en: "The Aktoprak pass. Three vehicles, four people, nine routes.",
                    },
                    ratio: 0.75,
                    tone: "clay",
                  }}
                  locale={locale}
                  fill
                  sizes="(max-width: 1024px) 100vw, 26rem"
                  className="h-full w-full"
                />
              </ParallaxFrame>
            </Reveal>
          </div>

          {/* Principles */}
          <RevealGroup
            className="mt-20 grid gap-x-10 gap-y-10 border-t border-[var(--rule)] pt-12 sm:grid-cols-2"
            step={0.1}
          >
            {ABOUT.principles.map((principle, i) => (
              <RevealItem key={i} kind="lift" className="flex gap-5">
                <span className="u-index mt-[0.35em] shrink-0">
                  {pad(i + 1)}
                </span>
                <div>
                  <h2 className="u-display mb-2.5 text-d4">
                    {pick(principle.title, locale)}
                  </h2>
                  <p className="max-w-[46ch] leading-relaxed text-[var(--fg-2)]">
                    {pick(principle.text, locale)}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Numbers */}
          <RevealGroup
            className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-[var(--rule)] pt-10 lg:grid-cols-4"
            step={0.09}
          >
            {STATS.map((stat) => (
              <RevealItem key={stat.label.en} kind="lift">
                <div className="u-data text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.9] text-[var(--fg)]">
                  <Counter value={stat.value} />
                  {stat.suffix && (
                    <span className="text-[0.55em] text-[var(--accent-text)]">
                      {pick(stat.suffix, locale)}
                    </span>
                  )}
                </div>
                <div className="u-label mt-3 max-w-[16ch]">
                  {pick(stat.label, locale)}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <ProverbDivider proverb={PROVERBS[3]} locale={locale} surface="paper" />

      <GuidesStrip locale={locale} />

      <ContactCta locale={locale} />
    </>
  );
}
