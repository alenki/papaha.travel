import { SECTIONS } from "@/content/copy";
import { STATS } from "@/content/site";
import { ABOUT } from "@/content/copy";
import { pick, type Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Counter } from "@/components/motion/Counter";
import { Contour } from "@/components/ui/Contour";

/**
 * The statement, then the proof.
 *
 * Claim on the left, four counted numbers on the right: the numbers are the
 * argument, so they get the mono face and the tabular figures rather than being
 * decorated.
 */
export function Manifesto({ locale }: { locale: Locale }) {
  return (
    <section className="surface-paper relative overflow-hidden py-[var(--spacing-section)]">
      <Contour
        className="pointer-events-none absolute -left-[22%] top-[10%] h-[110%] w-[65%] text-ink"
        seed={31}
        rings={14}
        centres={1}
        opacity={0.045}
      />

      <div className="relative u-shell">
        <div className="mb-14 flex items-baseline gap-4 border-t border-[var(--rule)] pt-6">
          <span className="u-index">01</span>
          <span className="u-label">{pick(SECTIONS.manifesto.kicker, locale)}</span>
        </div>

        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div>
            <SplitText
              as="h2"
              text={pick(SECTIONS.manifesto.title, locale)}
              by="word"
              className="u-display block max-w-[15ch] text-d2"
            />

            <Reveal kind="lift" delay={0.12} className="u-lead mt-8 max-w-[46ch]">
              {pick(SECTIONS.manifesto.lead, locale)}
            </Reveal>
          </div>

          {/* Principles */}
          <RevealGroup className="flex flex-col" step={0.1}>
            {ABOUT.principles.map((principle, i) => (
              <RevealItem
                key={i}
                kind="lift"
                className="flex gap-5 border-t border-[var(--rule)] py-5 last:border-b"
              >
                <span className="u-index mt-[0.3em] shrink-0">{pad(i + 1)}</span>
                <div>
                  <h3 className="mb-1.5 text-base font-medium text-[var(--fg)]">
                    {pick(principle.title, locale)}
                  </h3>
                  <p className="max-w-[42ch] text-sm leading-relaxed text-[var(--fg-2)]">
                    {pick(principle.text, locale)}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Numbers */}
        <RevealGroup
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-[var(--rule)] pt-10 lg:grid-cols-4"
          step={0.1}
        >
          {STATS.map((stat) => (
            <RevealItem key={stat.label.en} kind="lift">
              <div className="u-data text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.9] text-[var(--fg)]">
                <Counter value={stat.value} />
                {stat.suffix && (
                  <span className="text-[0.55em] text-[var(--accent-text)]">
                    {pick(stat.suffix, locale)}
                  </span>
                )}
              </div>
              <div className="u-label mt-3 max-w-[16ch]">
                {pick(stat.label, locale)}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
