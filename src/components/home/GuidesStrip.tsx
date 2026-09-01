import { SECTIONS } from "@/content/copy";
import { GUIDES } from "@/content/guides";
import { pick, type Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Figure } from "@/components/ui/Figure";

/**
 * The team.
 *
 * Portraits in a four-up row; on hover the plate lifts to expose the line that
 * person actually says on the road. The quote is the point: a row of faces
 * with job titles under them tells you nothing.
 *
 * There is no longer a /guides page behind these cards, so they are not links:
 * this block, on the About page, is the whole of what the site says about the
 * team.
 */
export function GuidesStrip({ locale }: { locale: Locale }) {
  return (
    <section className="surface-stone py-[var(--spacing-section)]">
      <div className="u-shell">
        <SectionHead
          index="03"
          kicker={pick(SECTIONS.guides.kicker, locale)}
          title={pick(SECTIONS.guides.title, locale)}
          lead={pick(SECTIONS.guides.lead, locale)}
        />

        <RevealGroup
          className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 sm:mt-20"
          step={0.09}
        >
          {GUIDES.map((guide, i) => (
            <RevealItem key={guide.slug} kind="lift">
              <div className="group block">
                <div className="relative overflow-hidden">
                  <div className="transition-transform duration-[1s] ease-[var(--ease-out-quint)] group-hover:scale-[1.04]">
                    <Figure
                      figure={guide.portrait}
                      locale={locale}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      plateLabel={pad(i + 1)}
                    />
                  </div>

                  {/* The quote slides up over the portrait. */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[var(--color-basalt)]/92 p-4 transition-transform duration-[0.6s] ease-[var(--ease-out-quint)] group-hover:translate-y-0">
                    <p className="text-sm leading-snug text-snow">
                      «{pick(guide.quote, locale)}»
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="u-index">{pad(i + 1)}</span>
                  <div>
                    <h3 className="u-display text-[1.35rem] leading-none text-[var(--fg)]">
                      {pick(guide.name, locale)}
                    </h3>
                    <p className="u-label mt-2">{pick(guide.role, locale)}</p>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
