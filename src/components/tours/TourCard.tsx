import Link from "next/link";
import type { Tour } from "@/content/types";
import { UI } from "@/content/copy";
import { DIFFICULTY_LABELS } from "@/content/tours";
import { localePath, pick, type Locale } from "@/lib/i18n";
import { cn, formatAltitude, formatPrice, pad } from "@/lib/utils";
import { Figure } from "@/components/ui/Figure";
import { Arrow } from "@/components/ui/Button";

/**
 * The catalogue card.
 *
 * The plate is masked and the image over-scales inside it on hover, the title
 * pulls a rule with it, and the whole card is one link: the whole surface is
 * the hit area, not just the button.
 */
export function TourCard({
  tour,
  locale,
  className,
  /** `wide` runs the plate beside the text instead of above it. */
  layout = "stacked",
  preload = false,
}: {
  tour: Tour;
  locale: Locale;
  className?: string;
  layout?: "stacked" | "wide";
  preload?: boolean;
}) {
  const href = localePath(`/tours/${tour.slug}`, locale);

  return (
    <article className={cn("group relative", className)}>
      <Link href={href} className="block">
        <div
          className={cn(
            layout === "wide"
              ? "grid gap-6 sm:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] sm:items-center sm:gap-12"
              : "flex flex-col",
          )}
        >
          {/* Plate */}
          <div className="relative overflow-hidden">
            <div className="transition-transform duration-[1.1s] ease-[var(--ease-out-quint)] group-hover:scale-[1.05]">
              <Figure
                figure={tour.hero}
                locale={locale}
                preload={preload}
                sizes={
                  layout === "wide"
                    ? "(max-width: 640px) 100vw, 32rem"
                    : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                }
                plateLabel={`${pad(tour.index)} · ${formatAltitude(tour.altitudeM, locale)}`}
              />
            </div>

            {/* Index numeral burned into the corner */}
            <span className="u-data absolute left-3 top-3 text-[0.7rem] text-snow-2 mix-blend-difference">
              {pad(tour.index)}
            </span>

            {/* Price tab, slides up on hover */}
            <div className="absolute bottom-0 right-0 translate-y-full bg-[var(--accent)] px-4 py-2.5 transition-transform duration-[0.55s] ease-[var(--ease-out-quint)] group-hover:translate-y-0">
              <span className="u-label text-[var(--accent-contrast)]">
                {pick(UI.from, locale)} {formatPrice(tour.priceFrom)}
              </span>
            </div>
          </div>

          {/* Text */}
          <div className={cn(layout === "wide" ? "" : "pt-5")}>
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="u-label u-label-accent">
                {pick(tour.kicker, locale)}
              </span>
              <span aria-hidden="true" className="u-label opacity-40">
                ·
              </span>
              <span className="u-label">{pick(tour.duration, locale)}</span>
            </div>

            <h3
              className={cn(
                "u-display leading-[1.02]",
                layout === "wide" ? "text-d3" : "text-d4",
              )}
            >
              {pick(tour.title, locale)}
            </h3>

            <p
              className={cn(
                "mt-3 max-w-[46ch] text-sm leading-relaxed text-[var(--fg-2)]",
                layout === "stacked" && "line-clamp-3",
              )}
            >
              {pick(tour.summary, locale)}
            </p>

            {/* Spec strip */}
            <dl className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-[var(--rule)] pt-4">
              <div className="flex items-baseline gap-2">
                <dt className="u-label">{pick(UI.altitude, locale)}</dt>
                <dd className="u-data text-xs text-[var(--fg)]">
                  {formatAltitude(tour.altitudeM, locale)}
                </dd>
              </div>
              <div className="flex items-baseline gap-2">
                <dt className="u-label">{pick(UI.difficulty, locale)}</dt>
                <dd className="u-data text-xs text-[var(--fg)]">
                  {pick(DIFFICULTY_LABELS[tour.difficulty], locale)}
                </dd>
              </div>
            </dl>

            <span className="mt-5 inline-flex items-center gap-2.5 text-[var(--fg)]">
              <span className="u-label u-underline">
                {locale === "ru" ? "Смотреть маршрут" : "See the route"}
              </span>
              <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
