import type { FaqItem } from "@/content/types";
import { SECTIONS } from "@/content/copy";
import { pick, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { SectionHead } from "./SectionHead";
import { Accordion } from "./Accordion";

export function FaqBlock({
  items,
  locale,
  index = "09",
  className,
  surface = "paper",
}: {
  items: FaqItem[];
  locale: Locale;
  index?: string;
  className?: string;
  surface?: "paper" | "stone";
}) {
  return (
    <section
      className={cn(
        surface === "stone" ? "surface-stone" : "surface-paper",
        "py-[var(--spacing-section)]",
        className,
      )}
    >
      <div className="u-shell">
        <SectionHead
          index={index}
          kicker={pick(SECTIONS.faq.kicker, locale)}
          title={pick(SECTIONS.faq.title, locale)}
        />

        <div className="mt-12 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,58ch)] lg:gap-16">
          <div className="hidden lg:block" aria-hidden="true" />
          <Accordion
            items={items.map((item) => ({
              id: item.id,
              title: pick(item.q, locale),
              body: (
                <p className="max-w-[62ch] leading-relaxed">
                  {pick(item.a, locale)}
                </p>
              ),
            }))}
            defaultOpen={0}
          />
        </div>
      </div>
    </section>
  );
}
