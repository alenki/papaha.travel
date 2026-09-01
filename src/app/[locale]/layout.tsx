import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";

import { LOCALES, LOCALE_META, isLocale, pick, type Locale } from "@/lib/i18n";
import { SITE } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Altimeter } from "@/components/layout/Altimeter";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/motion/Preloader";
import { OrganisationSchema } from "@/components/seo/Schema";

/** Both locales are pre-rendered at build time. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/*
  themeColor tints the mobile browser chrome, so it has to match whatever is
  actually painted at the top of the viewport or you get a seam under the URL
  bar. That is basalt on every route, unconditionally:

    - `/`               opens on Hero,       .surface-stone, min-h-[100svh]
    - every other route opens on PageHero,   .surface-stone
    - first paint       is Preloader,        .surface-stone fixed inset-0

  Deliberately NOT a light/dark pair. The palette defines no dark scheme:
  `:root` resolves --bg to paper regardless of the OS preference and
  `colorScheme: "light"` below pins the UA to light form controls and
  scrollbars to match the paper body copy below the fold. Splitting this into
  a prefers-color-scheme array would hand light-mode users a cream bar above a
  basalt masthead, which is the exact seam this value exists to prevent.
*/
export const viewport: Viewport = {
  themeColor: "#0d1a20", // --color-basalt
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "ru";

  const title = `${pick(SITE.nameLocalised, locale)}: ${pick(SITE.tagline, locale)}`;
  const description = pick(SITE.description, locale);

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: title,
      template: `%s: ${pick(SITE.titleSuffix, locale)}`,
    },
    description,
    applicationName: SITE.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: "/ru",
        en: "/en",
        "x-default": "/ru",
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title,
      description,
      url: `${SITE.url}/${locale}`,
      locale: LOCALE_META[locale].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_META[l].ogLocale,
      ),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <html lang={LOCALE_META[locale].htmlLang} className="u-grain">
      <head>
        {/* The three faces used above the fold. The mono loads on demand.
            Oswald is here rather than only in the hero because the masthead
            sets the mark as «ПАПАХА» on every route and in both languages, so
            the Cyrillic subset is first paint everywhere. The hero preloads
            the Latin subset separately, for "PAPAHA TRAVEL". */}
        <link
          rel="preload"
          href="/fonts/oswald-cyrillic-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/oranienbaum-cyrillic-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/commissioner-cyrillic-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="u-fibre antialiased">
        {/*
          Motion renders each element's `initial` state as an inline style
          during SSR, so every reveal ships as opacity:0 / translated in the
          HTML and only becomes visible once JS hydrates and the viewport
          trigger fires. With scripting off that never happens and the page
          stays blank, including for anything that reads the markup without
          running it. A stylesheet !important beats a non-important inline
          style, so this hands the whole page back.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;clip-path:none !important}`}</style>
        </noscript>

        <a href="#main" className="u-skip u-label">
          {locale === "ru" ? "К основному содержанию" : "Skip to content"}
        </a>

        <OrganisationSchema locale={locale} />

        <SmoothScroll />
        <Preloader locale={locale} />

        <Header locale={locale} />

        <main id="main">{children}</main>

        <Footer locale={locale} />
        <Altimeter locale={locale} />
      </body>
    </html>
  );
}
