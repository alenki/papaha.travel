"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { M } from "@/components/motion/motionTag";
import { startScroll, stopScroll } from "@/components/motion/SmoothScroll";
import { DUR, EASE, STAGGER } from "@/lib/motion";
import { NAV } from "@/content/site";
import { UI } from "@/content/copy";
import { CONTACT } from "@/content/site";
import { localePath, pick, type Locale } from "@/lib/i18n";
import { LocaleSwitch } from "./LocaleSwitch";
import { Ornament } from "@/components/ui/Ornament";

/**
 * Full-screen menu.
 *
 * A stone panel wipes down over the page, then the six routes rise out of their
 * masks one after another with their index numerals. Focus is trapped by
 * rendering nothing else interactive, Escape closes, and the underlying page is
 * locked so iOS cannot rubber-band behind the overlay.
 */
export function MobileMenu({
  open,
  onClose,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}) {

  useEffect(() => {
    if (!open) return;

    stopScroll();
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      startScroll();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <M.div
          className="surface-stone fixed inset-0 z-[90] flex flex-col lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: DUR.md, ease: EASE.inOut }}
          role="dialog"
          aria-modal="true"
          aria-label={pick(UI.menu, locale)}
        >
          <div className="flex items-center justify-between px-[var(--spacing-gutter)] py-6">
            <Link
              href={localePath("/", locale)}
              onClick={onClose}
              className="u-display text-d4 text-[var(--fg)]"
            >
              ПАПАХА
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="u-label flex items-center gap-3 text-[var(--fg-2)]"
            >
              {pick(UI.close, locale)}
              <span aria-hidden="true" className="relative block h-3.5 w-3.5">
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-[var(--spacing-gutter)]">
            <ul>
              {NAV.map((item, i) => (
                <li key={item.href} className="border-t border-[var(--rule)]">
                  <Link
                    href={localePath(item.href, locale)}
                    onClick={onClose}
                    className="group flex items-baseline gap-5 py-4"
                  >
                    <span className="u-mask block overflow-hidden">
                      <M.span
                        className="u-index block"
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          duration: DUR.md,
                          ease: EASE.out,
                          delay: 0.24 + i * STAGGER.item,
                        }}
                      >
                        {item.index}
                      </M.span>
                    </span>

                    <span className="u-mask block flex-1 overflow-hidden">
                      <M.span
                        className="u-display block text-d2 transition-colors duration-300 group-hover:text-[var(--accent)]"
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          duration: DUR.lg,
                          ease: EASE.out,
                          delay: 0.24 + i * STAGGER.item,
                        }}
                      >
                        {pick(item.label, locale)}
                      </M.span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <M.div
            className="flex flex-col gap-6 px-[var(--spacing-gutter)] pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.md, delay: 0.6 }}
          >
            <Ornament
              className="w-32 text-[var(--accent)] opacity-70"
              width={2}
            />

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={`tel:+${CONTACT.phoneRaw}`}
                className="u-data text-sm text-[var(--fg)]"
              >
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="u-label text-[var(--fg-2)]"
              >
                {CONTACT.email}
              </a>
            </div>

            <LocaleSwitch locale={locale} />
          </M.div>
        </M.div>
      )}
    </AnimatePresence>
  );
}
