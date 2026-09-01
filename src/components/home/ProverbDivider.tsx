import type { Proverb } from "@/content/copy";
import { pick, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Ornament } from "@/components/ui/Ornament";

/**
 * A proverb, set alone between two sections.
 *
 * These do the work a photograph usually does: they change the pace and let
 * the eye rest, without pretending to be content. Always centred, always the
 * display face, always with the ornament above it.
 */
export function ProverbDivider({
  proverb,
  locale,
  surface = "paper",
  className,
}: {
  proverb: Proverb;
  locale: Locale;
  surface?: "paper" | "stone";
  className?: string;
}) {
  return (
    <section
      className={cn(
        surface === "stone" ? "surface-stone" : "surface-paper",
        "py-[var(--spacing-section-sm)]",
        className,
      )}
    >
      <div className="u-shell flex flex-col items-center text-center">
        <Reveal kind="fade">
          <Ornament
            className="mb-9 w-40 text-[var(--accent)] opacity-70 sm:w-56"
            width={3}
          />
        </Reveal>

        <blockquote className="max-w-[24ch]">
          <SplitText
            as="p"
            text={`«${pick(proverb.text, locale)}»`}
            by="word"
            className="u-display block text-d3 leading-[1.1]"
          />
          <Reveal kind="lift" delay={0.2}>
            <footer className="u-label mt-6">
              {pick(proverb.source, locale)}
            </footer>
          </Reveal>
        </blockquote>
      </div>
    </section>
  );
}
