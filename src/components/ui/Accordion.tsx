"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { motionTag } from "@/components/motion/motionTag";
import { DUR, EASE } from "@/lib/motion";
import { cn, pad } from "@/lib/utils";

/**
 * Disclosure list.
 *
 * Height animates from 0 to `auto`. Motion measures the natural height, so
 * long Russian answers that wrap to four lines animate as correctly as short
 * ones. The trigger is a real <button> with aria-expanded/aria-controls, and
 * the panel keeps its content mounted only while open so nothing hidden is
 * reachable by keyboard.
 */

export type AccordionEntry = {
  id: string;
  title: ReactNode;
  body: ReactNode;
  /** Small right-aligned metadata: a duration, a price, an altitude. */
  meta?: ReactNode;
};

export function Accordion({
  items,
  className,
  numbered = true,
  /** Index of the item open on first paint, or null for all closed. */
  defaultOpen = null,
  /** Allow more than one open at a time. */
  multiple = false,
}: {
  items: AccordionEntry[];
  className?: string;
  numbered?: boolean;
  defaultOpen?: number | null;
  multiple?: boolean;
}) {
  const uid = useId();
  const [open, setOpen] = useState<number[]>(
    defaultOpen === null ? [] : [defaultOpen],
  );
  const reduced = useReducedMotion();
  const Div = motionTag("div");

  const toggle = (index: number) => {
    setOpen((current) => {
      const isOpen = current.includes(index);
      if (multiple) {
        return isOpen
          ? current.filter((i) => i !== index)
          : [...current, index];
      }
      return isOpen ? [] : [index];
    });
  };

  return (
    <div className={cn("border-t border-[var(--rule)]", className)}>
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const panelId = `${uid}-panel-${index}`;
        const buttonId = `${uid}-button-${index}`;

        return (
          <div key={item.id} className="border-b border-[var(--rule)]">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="group flex w-full items-start gap-4 py-5 text-left transition-colors duration-300 hover:text-[var(--accent-text)] sm:gap-6 sm:py-7"
              >
                {numbered && (
                  <span className="u-index mt-[0.45em] shrink-0 transition-colors duration-300 group-hover:text-[var(--accent-text)]">
                    {pad(index + 1)}
                  </span>
                )}

                <span className="flex-1 text-d4 font-normal leading-[1.22] tracking-[-0.015em]">
                  {item.title}
                </span>

                {item.meta && (
                  <span className="u-label mt-[0.7em] hidden shrink-0 sm:block">
                    {item.meta}
                  </span>
                )}

                {/* Plus that becomes a minus. */}
                <span
                  aria-hidden="true"
                  className="relative mt-[0.7em] block h-3 w-3 shrink-0"
                >
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                  <span
                    className={cn(
                      "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current",
                      "transition-transform duration-[0.5s] ease-[var(--ease-out-quint)]",
                      isOpen ? "scale-y-0" : "scale-y-100",
                    )}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <Div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={
                    reduced
                      ? { opacity: 1 }
                      : { height: "auto", opacity: 1 }
                  }
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: DUR.md, ease: EASE.inOut },
                    opacity: { duration: DUR.sm, ease: EASE.out },
                  }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "pb-7 pr-8 text-[var(--fg-2)]",
                      numbered ? "pl-[3.25rem] sm:pl-[4.5rem]" : "pl-0",
                    )}
                  >
                    {item.body}
                  </div>
                </Div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
