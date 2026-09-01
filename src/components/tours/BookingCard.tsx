import Link from "next/link";
import type { Tour } from "@/content/types";
import { UI } from "@/content/copy";
import { MONTHS_FULL, MONTHS_SHORT, DIFFICULTY_LABELS } from "@/content/tours";
import { CONTACT } from "@/content/site";
import { channelsFor, contactHref } from "@/lib/contact";
import { localePath, pick, type Locale } from "@/lib/i18n";
import { cn, formatAltitude, formatPrice, groupDigits } from "@/lib/utils";

/**
 * The sticky booking panel.
 *
 * Price, the spec that decides whether this trip is for you, the twelve-month
 * bar, and one tap into a messenger with the route name already written. No
 * checkout: nobody in this market buys a mountain day through a cart.
 */
export function BookingCard({
  tour,
  locale,
  className,
}: {
  tour: Tour;
  locale: Locale;
  className?: string;
}) {
  const short = pick(MONTHS_SHORT, locale);
  const full = pick(MONTHS_FULL, locale);
  const channels = channelsFor(locale).filter((c) => c.id !== "email");
  const title = pick(tour.title, locale);

  const specs: { label: string; value: string }[] = [
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
      label: pick(UI.difficulty, locale),
      value: pick(DIFFICULTY_LABELS[tour.difficulty], locale),
    },
  ];

  return (
    <aside
      className={cn(
        "surface-stone flex flex-col gap-7 p-6 sm:p-8",
        className,
      )}
    >
      {/* Price */}
      <div>
        <span className="u-label mb-2 block">
          {pick(UI.from, locale)} · {pick(UI.perPerson, locale)}
        </span>
        <div className="u-data text-[clamp(2rem,3.4vw,2.75rem)] leading-none text-snow">
          {formatPrice(tour.priceFrom)}
        </div>
        {tour.pricePrivate && (
          <p className="u-label mt-3 max-w-[24ch]">
            {locale === "ru" ? "Индивидуально:" : "Private:"}{" "}
            {formatPrice(tour.pricePrivate)}
            <br />
            {pick(UI.perVehicle, locale)}
          </p>
        )}
      </div>

      {/* Spec */}
      <dl className="flex flex-col border-t border-[var(--rule)]">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex items-baseline justify-between gap-4 border-b border-[var(--rule)] py-3"
          >
            <dt className="u-label">{spec.label}</dt>
            <dd className="u-tabular text-right text-sm text-snow">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Season bar */}
      <div>
        <span className="u-label mb-3 block">{pick(UI.season, locale)}</span>
        <ul className="flex gap-[3px]">
          {Array.from({ length: 12 }, (_, i) => {
            const open = tour.months.includes(i + 1);
            return (
              <li key={i} className="flex-1">
                <span className="u-sr">
                  {full[i]}:{" "}
                  {open
                    ? locale === "ru"
                      ? "выезжаем"
                      : "running"
                    : locale === "ru"
                      ? "закрыто"
                      : "closed"}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-6",
                    open ? "bg-[var(--accent)]" : "bg-[var(--bg-raised)]",
                  )}
                />
                <span
                  aria-hidden="true"
                  className="u-label mt-1.5 block text-center text-[0.5rem]"
                >
                  {short[i]}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-[var(--fg-3)]">
          {pick(tour.seasonNote, locale)}
        </p>
      </div>

      {/* Act */}
      <div className="flex flex-col gap-2.5 border-t border-[var(--rule)] pt-6">
        {channels.map((channel) => (
          <a
            key={channel.id}
            href={contactHref(channel.id, { locale, tour: title })}
            target={channel.id === "phone" ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={cn(
              "u-label flex items-center justify-between border px-4 py-3.5 transition-colors duration-300",
              channel.primary
                ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]"
                : "border-[var(--rule-strong)] text-snow hover:border-[var(--accent)] hover:text-[var(--accent)]",
            )}
          >
            <span>
              {channel.primary
                ? `${pick(UI.book, locale)} · ${channel.label}`
                : channel.label}
            </span>
            <span aria-hidden="true">→</span>
          </a>
        ))}

        <Link
          href={localePath("/contact", locale)}
          className="u-label mt-2 text-center text-[var(--fg-3)] transition-colors duration-300 hover:text-snow"
        >
          {locale === "ru"
            ? "или оставьте заявку на сайте"
            : "or leave an enquiry on the site"}
        </Link>
      </div>

      <p className="text-xs leading-relaxed text-[var(--fg-3)]">
        {pick(CONTACT.responseNote, locale)}
      </p>
    </aside>
  );
}
