import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, LOCALES, localePath, pick, type Locale } from "@/lib/i18n";
import { LEGAL_DOCS, getLegalDoc } from "@/content/legal";
import { LEGAL, LEGAL_NAV, SITE } from "@/content/site";
import { cn } from "@/lib/utils";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbSchema } from "@/components/seo/Schema";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    LEGAL_DOCS.map((doc) => ({ locale, doc: doc.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}): Promise<Metadata> {
  const { locale: raw, doc: slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "ru";
  const doc = getLegalDoc(slug);
  if (!doc) return {};

  return {
    title: pick(doc.title, locale),
    description: pick(doc.standfirst, locale),
    alternates: {
      canonical: `/${locale}/legal/${slug}`,
      languages: {
        ru: `/ru/legal/${slug}`,
        en: `/en/legal/${slug}`,
        "x-default": `/ru/legal/${slug}`,
      },
    },
    // Legal boilerplate should not compete with the real pages in search.
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}) {
  const { locale: raw, doc: slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  const title = pick(doc.title, locale);

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        trail={[
          { name: locale === "ru" ? "Главная" : "Home", href: "/" },
          { name: title, href: `/legal/${slug}` },
        ]}
      />

      <PageHero
        locale={locale}
        kicker={locale === "ru" ? "Документы" : "Documents"}
        title={title}
        lead={pick(doc.standfirst, locale)}
        size="d2"
        seed={slug.length * 11}
        breadcrumb={[{ label: title }]}
      />

      <section className="surface-paper py-[var(--spacing-section)]">
        <div className="u-shell">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,16rem)_minmax(0,68ch)]">
            {/* Document switcher */}
            <nav aria-label={locale === "ru" ? "Документы" : "Documents"}>
              <ul className="flex flex-col gap-1 lg:sticky lg:top-28">
                {LEGAL_NAV.map((item) => {
                  const active = item.href.endsWith(`/${slug}`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={localePath(item.href, locale)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "u-label block border-l-2 py-2.5 pl-4 transition-colors duration-300",
                          active
                            ? "border-[var(--accent)] text-[var(--fg)]"
                            : "border-transparent text-[var(--fg-3)] hover:border-[var(--rule-strong)] hover:text-[var(--fg)]",
                        )}
                      >
                        {pick(item.label, locale)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Body */}
            <div>
              <Reveal kind="fade">
                <p className="u-label mb-10 border-b border-[var(--rule)] pb-5">
                  {pick(doc.updated, locale)}
                </p>
              </Reveal>

              <div className="flex flex-col">
                {doc.body.map((block, i) => {
                  switch (block.kind) {
                    case "h2":
                      return (
                        <h2
                          key={i}
                          className="u-display mb-4 mt-10 text-d4 first:mt-0"
                        >
                          {pick(block.text, locale)}
                        </h2>
                      );
                    case "p":
                      return (
                        <p
                          key={i}
                          className="mb-5 leading-relaxed text-[var(--fg-2)]"
                        >
                          {pick(block.text, locale)}
                        </p>
                      );
                    case "list":
                      return (
                        <ul key={i} className="mb-6 flex flex-col gap-2.5">
                          {block.items.map((item, j) => (
                            <li
                              key={j}
                              className="flex gap-3 leading-relaxed text-[var(--fg-2)]"
                            >
                              <span
                                aria-hidden="true"
                                className="text-[var(--fg-3)]"
                              >
                                ·
                              </span>
                              <span>{pick(item, locale)}</span>
                            </li>
                          ))}
                        </ul>
                      );
                  }
                })}
              </div>

              {/* Standing warning while the placeholders are unfilled. */}
              <div className="mt-14 border-l-2 border-[var(--accent)] pl-5">
                <p className="u-label u-label-accent mb-2">
                  {locale === "ru" ? "Внимание" : "Notice"}
                </p>
                <p className="max-w-[60ch] text-sm leading-relaxed text-[var(--fg-2)]">
                  {locale === "ru"
                    ? "Это рабочий шаблон, а не юридическая консультация. Перед публикацией сайта документ должен проверить юрист, а все поля [PLACEHOLDER] должны быть заполнены реальными реквизитами."
                    : "This is a working template, not legal advice. Before the site goes live this document must be reviewed by a lawyer and every [PLACEHOLDER] replaced with real company details."}
                </p>
                <p className="u-data mt-4 text-xs text-[var(--fg-3)]">
                  {pick(LEGAL.entity, locale)} · ИНН {LEGAL.inn} ·{" "}
                  {SITE.url.replace("https://", "")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
