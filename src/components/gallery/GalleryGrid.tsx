"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { M } from "@/components/motion/motionTag";
import { startScroll, stopScroll } from "@/components/motion/SmoothScroll";
import type { Figure as FigureData } from "@/content/types";
import { Figure } from "@/components/ui/Figure";
import { pick, type Locale } from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";
import { DUR, EASE } from "@/lib/motion";

export type GalleryEntry = {
  figure: FigureData;
  /** Where the frame was taken: the route or article it belongs to. */
  source: string;
};

/**
 * The gallery.
 *
 * Deliberately not a uniform grid: every third plate spans two columns and the
 * rows are allowed to be ragged, which is what an edited contact sheet looks
 * like. Opening one uses a shared `layoutId`, so the plate itself flies into
 * the lightbox rather than a new image fading in over the top of it.
 */
export function GalleryGrid({
  entries,
  locale,
}: {
  entries: GalleryEntry[];
  locale: Locale;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);

  const step = useCallback(
    (delta: number) => {
      setOpen((current) =>
        current === null
          ? null
          : (current + delta + entries.length) % entries.length,
      );
    },
    [entries.length],
  );

  useEffect(() => {
    if (open === null) return;

    stopScroll();
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      startScroll();
    };
  }, [open, close, step]);

  const active = open === null ? null : entries[open];

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {entries.map((entry, i) => {
          // Break the grid every third plate.
          const wide = i % 7 === 2 || i % 11 === 5;
          return (
            <li
              key={entry.figure.id}
              className={cn(wide && "col-span-2")}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full text-left"
                aria-label={pick(entry.figure.alt, locale)}
              >
                <M.div
                  layoutId={`plate-${entry.figure.id}`}
                  className="overflow-hidden"
                >
                  <div className="transition-transform duration-[1.1s] ease-[var(--ease-out-quint)] group-hover:scale-[1.05]">
                    <Figure
                      figure={
                        wide
                          ? { ...entry.figure, ratio: Math.max(entry.figure.ratio, 1.6) }
                          : entry.figure
                      }
                      locale={locale}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      plateLabel={pad(i + 1)}
                    />
                  </div>
                </M.div>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="u-index">{pad(i + 1)}</span>
                  <span className="u-label truncate transition-colors duration-300 group-hover:text-[var(--accent-text)]">
                    {entry.source}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <M.div
            className="surface-stone fixed inset-0 z-[95] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.sm, ease: EASE.out }}
            role="dialog"
            aria-modal="true"
            aria-label={pick(active.figure.alt, locale)}
          >
            {/* Clicking the backdrop closes. */}
            <button
              type="button"
              onClick={close}
              aria-label={locale === "ru" ? "Закрыть" : "Close"}
              className="absolute inset-0 cursor-zoom-out"
            />

            <div className="pointer-events-none relative flex h-full flex-col p-[var(--spacing-gutter)]">
              <div className="pointer-events-auto flex items-start justify-between gap-6">
                <span className="u-label">
                  {pad((open ?? 0) + 1)} / {pad(entries.length)}
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="u-label flex items-center gap-3 text-[var(--fg)]"
                >
                  {locale === "ru" ? "Закрыть" : "Close"}
                  <span aria-hidden="true" className="relative block h-3.5 w-3.5">
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
                  </span>
                </button>
              </div>

              <div className="pointer-events-none flex flex-1 items-center justify-center py-6">
                <M.div
                  layoutId={`plate-${active.figure.id}`}
                  className="pointer-events-auto max-h-full w-full max-w-5xl"
                  transition={{ duration: DUR.md, ease: EASE.inOut }}
                >
                  <Figure
                    figure={active.figure}
                    locale={locale}
                    sizes="(max-width: 1280px) 100vw, 64rem"
                    preload
                  />
                </M.div>
              </div>

              <div className="pointer-events-auto flex flex-wrap items-end justify-between gap-6">
                <div className="max-w-[52ch]">
                  <p className="u-label u-label-accent mb-2">{active.source}</p>
                  <p className="text-sm leading-relaxed text-[var(--fg-2)]">
                    {active.figure.caption
                      ? pick(active.figure.caption, locale)
                      : pick(active.figure.alt, locale)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="u-label border border-[var(--rule-strong)] px-4 py-3 text-[var(--fg)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    aria-label={locale === "ru" ? "Предыдущее" : "Previous"}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="u-label border border-[var(--rule-strong)] px-4 py-3 text-[var(--fg)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    aria-label={locale === "ru" ? "Следующее" : "Next"}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </M.div>
        )}
      </AnimatePresence>
    </>
  );
}
