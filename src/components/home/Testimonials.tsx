import { SECTIONS } from "@/content/copy";
import { RATING, TESTIMONIALS } from "@/content/testimonials";
import { getTour } from "@/content/tours";
import { pick, type Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

/**
 * Reviews as a scroll rail.
 *
 * CSS scroll-snap, no JavaScript, no carousel library, no dots. Six cards in a
 * row that you drag or flick; on a trackpad it behaves exactly like a native
 * horizontal list because that is what it is.
 */
export function Testimonials({ locale }: { locale: Locale }) {
  return (
    <section className="surface-paper py-[var(--spacing-section)]">
      <div className="u-shell">
        <SectionHead
          index="05"
          kicker={pick(SECTIONS.testimonials.kicker, locale)}
          title={pick(SECTIONS.testimonials.title, locale)}
          aside={
            <div className="flex items-baseline gap-3">
              <span className="u-data text-[2rem] leading-none text-[var(--fg)]">
                {RATING.value.toFixed(1).replace(".", ",")}
              </span>
              <span className="u-label max-w-[14ch]">
                {locale === "ru"
                  ? `${RATING.count} отзывов · ${pick(RATING.sourceLabel, locale)}`
                  : `${RATING.count} reviews · ${pick(RATING.sourceLabel, locale)}`}
              </span>
            </div>
          }
        />
      </div>

      <Reveal kind="lift" className="mt-14 sm:mt-20">
        <ul
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--spacing-gutter)] pb-6"
          style={{ scrollbarWidth: "thin" }}
        >
          {TESTIMONIALS.map((entry, i) => {
            const tour = entry.tourSlug ? getTour(entry.tourSlug) : undefined;
            return (
              <li
                key={entry.id}
                className="flex w-[min(88vw,30rem)] shrink-0 snap-start flex-col border-t border-[var(--rule-strong)] pt-5"
              >
                <div className="mb-5 flex items-baseline justify-between gap-4">
                  <span className="u-index">{pad(i + 1)}</span>
                  <span
                    className="u-label u-label-accent"
                    aria-label={`${entry.rating} / 5`}
                  >
                    {"★".repeat(entry.rating)}
                  </span>
                </div>

                <blockquote className="flex flex-1 flex-col">
                  <p className="flex-1 text-[1.02rem] leading-relaxed text-[var(--fg)]">
                    «{pick(entry.text, locale)}»
                  </p>

                  <footer className="mt-7 flex flex-col gap-1 border-t border-[var(--rule)] pt-4">
                    <cite className="not-italic text-sm font-medium text-[var(--fg)]">
                      {pick(entry.name, locale)}
                    </cite>
                    <span className="u-label">
                      {pick(entry.city, locale)} · {pick(entry.date, locale)}
                    </span>
                    {tour && (
                      <span className="u-label u-label-accent mt-1">
                        {pick(tour.title, locale)}
                      </span>
                    )}
                  </footer>
                </blockquote>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <div className="u-shell">
        <p className="u-label mt-2">
          {locale === "ru"
            ? "Листайте вбок →"
            : "Scroll sideways →"}
        </p>
      </div>
    </section>
  );
}
