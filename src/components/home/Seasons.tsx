import { SECTIONS } from "@/content/copy";
import { MONTHS_FULL, MONTHS_SHORT, TOURS } from "@/content/tours";
import { pick, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

/**
 * The season matrix.
 *
 * Twelve columns, one row per route, a filled cell where the route runs. It is
 * the single most useful thing on the site for someone who already has dates.
 * It is also honest about the months when half the catalogue is under snow,
 * which is exactly the information a tour operator is usually least keen to
 * put on a grid.
 */
export function Seasons({ locale }: { locale: Locale }) {
  const short = pick(MONTHS_SHORT, locale);
  const full = pick(MONTHS_FULL, locale);

  return (
    <section className="surface-paper py-[var(--spacing-section)]">
      <div className="u-shell">
        <SectionHead
          index="04"
          kicker={pick(SECTIONS.seasons.kicker, locale)}
          title={pick(SECTIONS.seasons.title, locale)}
          lead={pick(SECTIONS.seasons.lead, locale)}
        />

        <Reveal kind="lift" className="mt-14 sm:mt-20">
          {/*
            Horizontal scroll on small screens rather than a squashed grid.

            `relative` is load-bearing: the cells contain visually-hidden
            (position:absolute) spans carrying the month/status text for screen
            readers. Without a positioned ancestor here their containing block
            is somewhere up the tree, so `overflow-x: auto` does not clip them
            and they drag the whole page ~300px wide on a phone.
          */}
          <div className="relative -mx-[var(--spacing-gutter)] overflow-x-auto px-[var(--spacing-gutter)] pb-2">
            <table className="w-full min-w-[42rem] border-collapse">
              <caption className="u-sr">
                {pick(SECTIONS.seasons.title, locale)}
              </caption>

              <thead>
                <tr className="border-b border-[var(--rule-strong)]">
                  <th
                    scope="col"
                    className="u-label py-3 pr-4 text-left align-bottom"
                  >
                    {locale === "ru" ? "Маршрут" : "Route"}
                  </th>
                  {short.map((month, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="u-label w-[5.4%] py-3 text-center align-bottom"
                    >
                      <abbr
                        title={full[i]}
                        className="no-underline"
                        style={{ textDecoration: "none" }}
                      >
                        {month}
                      </abbr>
                    </th>
                  ))}
                </tr>
              </thead>

              <RevealGroup as="tbody" step={0.045}>
                {TOURS.map((tour) => (
                  <RevealItem
                    key={tour.slug}
                    as="tr"
                    kind="fade"
                    className="group border-b border-[var(--rule)]"
                  >
                    <th
                      scope="row"
                      className="py-3.5 pr-4 text-left text-sm font-normal text-[var(--fg-2)] transition-colors duration-300 group-hover:text-[var(--fg)]"
                    >
                      {pick(tour.title, locale)}
                    </th>

                    {Array.from({ length: 12 }, (_, i) => {
                      const open = tour.months.includes(i + 1);
                      return (
                        <td key={i} className="py-3.5 text-center">
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
                              "mx-auto block h-[7px] transition-colors duration-500",
                              open
                                ? "w-full bg-[var(--accent)]"
                                : "w-full bg-[var(--rule)]",
                            )}
                          />
                        </td>
                      );
                    })}
                  </RevealItem>
                ))}
              </RevealGroup>
            </table>
          </div>
        </Reveal>

        <Reveal
          kind="lift"
          delay={0.1}
          className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3"
        >
          <span className="flex items-center gap-2.5">
            <span className="block h-[7px] w-7 bg-[var(--accent)]" />
            <span className="u-label">
              {locale === "ru" ? "Выезжаем" : "Running"}
            </span>
          </span>
          <span className="flex items-center gap-2.5">
            <span className="block h-[7px] w-7 bg-[var(--rule)]" />
            <span className="u-label">
              {locale === "ru" ? "Дорога закрыта" : "Road closed"}
            </span>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
