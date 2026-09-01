"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import { M } from "@/components/motion/motionTag";
import type { Tour, TourFormat } from "@/content/types";
import { FORMAT_LABELS, activeFormats } from "@/content/tours";
import { UI } from "@/content/copy";
import { pick, type Locale } from "@/lib/i18n";
import { cn, plural, pluralEn } from "@/lib/utils";
import { DUR, EASE, STAGGER } from "@/lib/motion";
import { TourCard } from "./TourCard";

/**
 * The catalogue with its filters.
 *
 * Filtering is client-side over nine items: no fetch, no route change, no
 * spinner. Cards animate out and back in on `layout`, so the grid reflows as a
 * single movement rather than snapping.
 */
export function TourIndex({
  tours,
  locale,
}: {
  tours: Tour[];
  locale: Locale;
}) {
  const [active, setActive] = useState<TourFormat | null>(null);
  const formats = activeFormats();

  const visible = useMemo(
    () => (active ? tours.filter((t) => t.format.includes(active)) : tours),
    [tours, active],
  );

  const count = visible.length;

  return (
    <section className="surface-paper py-[var(--spacing-section)]">
      <div className="u-shell">
        {/* Filter rail */}
        <div className="flex flex-col gap-6 border-t border-[var(--rule)] pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label={locale === "ru" ? "Фильтр по типу" : "Filter by type"}
            className="-mx-[var(--spacing-gutter)] flex gap-2 overflow-x-auto px-[var(--spacing-gutter)] pb-1 lg:mx-0 lg:flex-wrap lg:px-0 lg:pb-0"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-pressed={active === null}
              className={cn(
                "u-label shrink-0 border px-4 py-2.5 transition-colors duration-300",
                active === null
                  ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]"
                  : "border-[var(--rule-strong)] text-[var(--fg-2)] hover:border-[var(--fg)] hover:text-[var(--fg)]",
              )}
            >
              {pick(UI.filterAll, locale)}
            </button>

            {formats.map((format) => (
              <button
                key={format}
                type="button"
                onClick={() => setActive(active === format ? null : format)}
                aria-pressed={active === format}
                className={cn(
                  "u-label shrink-0 border px-4 py-2.5 transition-colors duration-300",
                  active === format
                    ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]"
                    : "border-[var(--rule-strong)] text-[var(--fg-2)] hover:border-[var(--fg)] hover:text-[var(--fg)]",
                )}
              >
                {pick(FORMAT_LABELS[format], locale)}
              </button>
            ))}
          </div>

          <p className="u-label shrink-0" aria-live="polite">
            {locale === "ru"
              ? `${count} ${plural(count, ["маршрут", "маршрута", "маршрутов"])}`
              : `${count} ${pluralEn(count, "route", "routes")}`}
          </p>
        </div>

        {/* Grid */}
        {count > 0 ? (
          <M.div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((tour, i) => (
                <M.div
                  key={tour.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: DUR.md,
                      ease: EASE.out,
                      delay: i * STAGGER.item * 0.5,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                    transition: { duration: DUR.sm, ease: EASE.in },
                  }}
                >
                  <TourCard tour={tour} locale={locale} preload={i < 3} />
                </M.div>
              ))}
            </AnimatePresence>
          </M.div>
        ) : (
          <p className="u-lead mt-16 max-w-[42ch]">
            {pick(UI.nothingFound, locale)}
          </p>
        )}
      </div>
    </section>
  );
}
