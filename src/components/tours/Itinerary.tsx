import type { ItineraryStop } from "@/content/types";
import { UI } from "@/content/copy";
import { pick, type Locale } from "@/lib/i18n";
import { formatAltitude } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * Hour-by-hour programme.
 *
 * Russian tour buyers expect this and Western operators mostly omit it. An
 * itemised day with real clock times is the single strongest signal that the
 * trip has actually been run before. The altitude on each stop ties it back to
 * the scale that organises the rest of the site.
 */
export function Itinerary({
  stops,
  locale,
}: {
  stops: ItineraryStop[];
  locale: Locale;
}) {
  return (
    <div>
      <h2 className="u-label mb-8">{pick(UI.itinerary, locale)}</h2>

      <RevealGroup as="ol" className="border-t border-[var(--rule)]" step={0.07}>
        {stops.map((stop, i) => (
          <RevealItem
            as="li"
            key={i}
            kind="lift"
            className="grid gap-x-6 gap-y-2 border-b border-[var(--rule)] py-6 sm:grid-cols-[6.5rem_minmax(0,1fr)]"
          >
            <div className="flex items-baseline gap-3 sm:flex-col sm:gap-1.5">
              <span className="u-data text-[0.95rem] leading-none text-[var(--accent-text)]">
                {stop.time ?? (stop.label ? pick(stop.label, locale) : "")}
              </span>
              {stop.altitudeM !== undefined && (
                <span className="u-label">
                  {formatAltitude(stop.altitudeM, locale)}
                </span>
              )}
            </div>

            <div>
              <h3 className="mb-1.5 text-[1.05rem] font-medium leading-snug text-[var(--fg)]">
                {pick(stop.title, locale)}
              </h3>
              <p className="max-w-[62ch] text-sm leading-relaxed text-[var(--fg-2)]">
                {pick(stop.text, locale)}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <p className="mt-5 max-w-[52ch] text-xs leading-relaxed text-[var(--fg-3)]">
        {locale === "ru"
          ? "Тайминг может смещаться на 30–40 минут в зависимости от дороги, погоды и того, насколько трудно будет увести группу с очередной смотровой."
          : "Times can shift by 30–40 minutes depending on the road, the weather, and how hard it proves to get the group away from a viewpoint."}
      </p>
    </div>
  );
}
