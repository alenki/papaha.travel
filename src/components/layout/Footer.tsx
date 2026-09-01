import Link from "next/link";
import { CONTACT, LEGAL, LEGAL_NAV, NAV, SITE } from "@/content/site";
import { PROVERBS } from "@/content/copy";
import { localePath, pick, type Locale } from "@/lib/i18n";
import { channelsFor, contactHref } from "@/lib/contact";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/motion/Reveal";
import { Contour } from "@/components/ui/Contour";
import { cn } from "@/lib/utils";

/**
 * The footer is the last stone surface of every page, and it carries the two
 * things a Russian traveller actually looks for before transferring money:
 * a working messenger link, and full legal requisites.
 *
 * The wordmark at the bottom is deliberately clipped by the viewport edge:
 * the page ends mid-letter rather than trailing off into whitespace.
 */
export function Footer({ locale }: { locale: Locale }) {
  const proverb = PROVERBS[0];
  const channels = channelsFor(locale);

  return (
    <footer className="surface-stone relative overflow-hidden">
      <Contour
        className="absolute -right-[10%] -top-[30%] h-[140%] w-[70%] text-glacier"
        seed={12}
        rings={16}
        centres={2}
        opacity={0.07}
      />

      <div className="relative u-shell pb-0 pt-[var(--spacing-section)]">
        {/* Pull quote */}
        <Reveal kind="lift" className="mb-16 max-w-[38ch] sm:mb-24">
          <blockquote>
            <p className="u-display text-d3 leading-[1.08] text-[var(--fg)]">
              «{pick(proverb.text, locale)}»
            </p>
            <footer className="u-label mt-5">
              {pick(proverb.source, locale)}
            </footer>
          </blockquote>
        </Reveal>

        <Ornament
          className="mb-16 w-full max-w-md text-[var(--accent)] opacity-60"
          width={4}
        />

        <div className="grid gap-x-10 gap-y-14 border-t border-[var(--rule)] pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h2 className="u-label">
              {locale === "ru" ? "Связаться" : "Get in touch"}
            </h2>

            <a
              href={`tel:+${CONTACT.phoneRaw}`}
              className="u-data u-underline w-fit text-[1.05rem] text-[var(--fg)]"
            >
              {CONTACT.phoneDisplay}
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="u-underline w-fit text-sm text-[var(--fg-2)]"
            >
              {CONTACT.email}
            </a>

            <div className="mt-1 flex flex-wrap gap-2">
              {channels
                .filter((channel) => channel.id !== "phone")
                .map((channel) => (
                  <a
                    key={channel.id}
                    href={contactHref(channel.id, { locale })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "u-label border px-3 py-2 transition-colors duration-300",
                      channel.primary
                        ? "border-[var(--accent)] text-[var(--accent-text)]"
                        : "border-[var(--rule-strong)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent-text)]",
                    )}
                  >
                    {channel.label}
                  </a>
                ))}
              <a
                href={`https://instagram.com/${CONTACT.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="u-label border border-[var(--rule-strong)] px-3 py-2 text-[var(--fg)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent-text)]"
              >
                Instagram
              </a>
            </div>

            <p className="mt-1 text-xs leading-relaxed text-[var(--fg-3)]">
              {pick(CONTACT.responseNote, locale)}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-4">
            <h2 className="u-label">
              {locale === "ru" ? "Разделы" : "Sections"}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localePath(item.href, locale)}
                    className="u-underline text-sm text-[var(--fg-2)] transition-colors duration-300 hover:text-[var(--fg)]"
                  >
                    {pick(item.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Where we are */}
          <div className="flex flex-col gap-4">
            <h2 className="u-label">
              {locale === "ru" ? "Где мы" : "Where we are"}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--fg-2)]">
              {pick(CONTACT.address, locale)}
            </p>
            <p className="text-sm leading-relaxed text-[var(--fg-2)]">
              {pick(CONTACT.hours, locale)}
            </p>
            <p className="u-data mt-1 text-xs text-[var(--fg-3)]">
              {SITE.coords.lat.toFixed(4)}° N, {SITE.coords.lng.toFixed(4)}° E
            </p>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h2 className="u-label">
              {locale === "ru" ? "Документы" : "Documents"}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {LEGAL_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localePath(item.href, locale)}
                    className="u-underline text-sm text-[var(--fg-2)] transition-colors duration-300 hover:text-[var(--fg)]"
                  >
                    {pick(item.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-col gap-1 text-xs leading-relaxed text-[var(--fg-3)]">
              <span>{pick(LEGAL.entity, locale)}</span>
              <span className="u-data">ИНН {LEGAL.inn}</span>
              <span className="u-data">ОГРНИП {LEGAL.ogrn}</span>
            </div>
          </div>
        </div>

        {/* Colophon */}
        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--rule)] py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="u-label">
            © {SITE.founded}–2026 {pick(SITE.nameLocalised, locale)} ·{" "}
            {pick(SITE.city, locale)}
          </p>
          <p className="u-label max-w-[42ch] sm:text-right">
            {locale === "ru"
              ? "Не является публичной офертой. Цены уточняйте при бронировании."
              : "Not a public offer. Confirm prices when booking."}
          </p>
        </div>
      </div>

      {/* The clipped wordmark, decorative: the real name is in the header.

          The mark's own face rather than the display face, because this is the
          name and not a heading. That costs a rebalance twice over.

          Width: Oswald is condensed, so filling the footer takes 30.7vw where
          Oranienbaum took 20. The number is set off «ПАПАХА» rather than
          "PAPAHA" — the Cyrillic runs 2.99em against the Latin's 2.79 — so the
          wider of the two lands at 92% of the viewport and the narrower simply
          sits inside it.

          Height: its caps then stand far taller than the band this sits in, and
          the leading is what crops them. 0.62em against a 0.81em cap leaves
          about three quarters of the letterform showing, which is the same
          fraction the old setting cleared. */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden"
      >
        <span className="u-wordmark block translate-y-[0.06em] whitespace-nowrap text-center text-[clamp(6.5rem,30.7vw,36rem)] leading-[0.62] text-[var(--fg)] opacity-[0.07]">
          {locale === "ru" ? "ПАПАХА" : "PAPAHA"}
        </span>
      </div>
    </footer>
  );
}
