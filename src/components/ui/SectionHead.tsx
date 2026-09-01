import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";

/**
 * The recurring section header.
 *
 * Index numeral and kicker sit in the left margin against a hairline rule; the
 * display title breaks the grid to the right. Repeating this exact structure on
 * every section is what makes the page scan as a bound document rather than a
 * stack of unrelated blocks.
 */
export function SectionHead({
  index,
  kicker,
  title,
  lead,
  aside,
  className,
  align = "left",
  size = "d2",
  id,
}: {
  /** "01", "02"… Rendered in the margin. */
  index?: string;
  kicker?: string;
  title: string;
  lead?: ReactNode;
  /** Right-hand column content: a link, a count, a note. */
  aside?: ReactNode;
  className?: string;
  align?: "left" | "center";
  size?: "d1" | "d2" | "d3";
  id?: string;
}) {
  const sizeClass =
    size === "d1" ? "text-d1" : size === "d3" ? "text-d3" : "text-d2";

  return (
    <header
      id={id}
      className={cn(
        "border-t border-[var(--rule)] pt-6 sm:pt-8",
        align === "center" && "text-center",
        className,
      )}
    >
      {(index || kicker) && (
        <Reveal kind="lift" className="mb-8 flex items-baseline gap-4 sm:mb-12">
          {index && <span className="u-index">{index}</span>}
          {kicker && <span className="u-label">{kicker}</span>}
        </Reveal>
      )}

      <div
        className={cn(
          "grid gap-x-10 gap-y-8",
          align === "left" && aside
            ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-end"
            : "",
        )}
      >
        <SplitText
          as="h2"
          text={title}
          by="word"
          className={cn("u-display block", sizeClass)}
        />

        {aside && (
          <Reveal kind="lift" delay={0.12} className="lg:pb-[0.6em]">
            {aside}
          </Reveal>
        )}
      </div>

      {lead && (
        <Reveal
          kind="lift"
          delay={0.16}
          className={cn(
            "u-lead mt-7 max-w-[46ch]",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </Reveal>
      )}
    </header>
  );
}
