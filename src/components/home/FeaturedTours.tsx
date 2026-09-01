import { SECTIONS, UI } from "@/content/copy";
import { featuredTours, TOURS } from "@/content/tours";
import { localePath, pick, type Locale } from "@/lib/i18n";
import { plural, pluralEn } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { TourCard } from "@/components/tours/TourCard";
import { ButtonLink, Arrow } from "@/components/ui/Button";

/**
 * Featured routes.
 *
 * Deliberately asymmetric: the first card runs wide across the full measure,
 * the rest fall into a three-up grid beneath it. A uniform grid of five would
 * read as a template; a lead item and a supporting row reads as an edit.
 */
export function FeaturedTours({ locale }: { locale: Locale }) {
  const featured = featuredTours();
  const [lead, ...rest] = featured;

  return (
    <section
      id="tours"
      className="surface-paper py-[var(--spacing-section)]"
    >
      <div className="u-shell">
        <SectionHead
          index="02"
          kicker={pick(SECTIONS.tours.kicker, locale)}
          title={pick(SECTIONS.tours.title, locale)}
          lead={pick(SECTIONS.tours.lead, locale)}
          aside={
            <div className="flex flex-col gap-3">
              <span className="u-label">
                {locale === "ru"
                  ? `${TOURS.length} ${plural(TOURS.length, ["маршрут", "маршрута", "маршрутов"])} в каталоге`
                  : `${TOURS.length} ${pluralEn(TOURS.length, "route", "routes")} in the catalogue`}
              </span>
              <ButtonLink
                href={localePath("/tours", locale)}
                variant="outline"
                size="sm"
                trailing={<Arrow />}
                magnetic
              >
                {pick(UI.allTours, locale)}
              </ButtonLink>
            </div>
          }
        />

        <div className="mt-14 flex flex-col gap-14 sm:mt-20">
          {lead && (
            <RevealGroup>
              <RevealItem kind="lift">
                <TourCard
                  tour={lead}
                  locale={locale}
                  layout="wide"
                  preload
                />
              </RevealItem>
            </RevealGroup>
          )}

          <RevealGroup
            className="grid gap-x-8 gap-y-14 border-t border-[var(--rule)] pt-14 sm:grid-cols-2 lg:grid-cols-3"
            step={0.09}
          >
            {rest.map((tour) => (
              <RevealItem key={tour.slug} kind="lift">
                <TourCard tour={tour} locale={locale} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
