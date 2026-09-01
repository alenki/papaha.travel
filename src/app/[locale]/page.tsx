import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { PROVERBS } from "@/content/copy";
import { FAQ } from "@/content/faq";

import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { ProverbDivider } from "@/components/home/ProverbDivider";
import { AltitudeScale } from "@/components/home/AltitudeScale";
import { Seasons } from "@/components/home/Seasons";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactCta } from "@/components/home/ContactCta";
import { FaqSchema } from "@/components/seo/Schema";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <FaqSchema items={FAQ.slice(0, 6)} locale={locale} />

      <Hero locale={locale} />

      {/* 01: the claim */}
      <Manifesto locale={locale} />

      {/* 02: the catalogue */}
      <FeaturedTours locale={locale} />

      <ProverbDivider proverb={PROVERBS[2]} locale={locale} surface="paper" />

      {/* 03: the organising idea */}
      <AltitudeScale locale={locale} />

      {/* 04: when */}
      <Seasons locale={locale} />

      {/* 05: proof */}
      <Testimonials locale={locale} />

      <ProverbDivider proverb={PROVERBS[5]} locale={locale} surface="paper" />

      {/* 06: the ask */}
      <ContactCta locale={locale} />
    </>
  );
}
