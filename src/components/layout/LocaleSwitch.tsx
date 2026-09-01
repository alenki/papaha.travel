"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_META, swapLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * RU / EN.
 *
 * Swaps only the locale segment and keeps the rest of the path, so switching
 * language on a tour page lands on the same tour rather than the home page.
 * That is the single most common failure of bolted-on i18n.
 */
export function LocaleSwitch({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="group"
      aria-label={locale === "ru" ? "Язык сайта" : "Site language"}
    >
      {LOCALES.map((code, i) => {
        const active = code === locale;
        return (
          <span key={code} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden="true" className="u-label opacity-35">
                /
              </span>
            )}
            <Link
              href={swapLocale(pathname, code)}
              hrefLang={LOCALE_META[code].htmlLang}
              aria-current={active ? "true" : undefined}
              /* The inactive code is fg-2, not fg-3. It rides in the masthead,
                 which is now pure blur over the opening photograph rather than
                 a basalt plate, and at fg-3 the mono is small enough that the
                 lighter backdrop drops it to 3.9:1. fg-2 is still audibly
                 quieter than the active code without going under the floor. */
              className={cn(
                "u-label transition-colors duration-300",
                active
                  ? "text-[var(--fg)]"
                  : "text-[var(--fg-2)] hover:text-[var(--accent-text)]",
              )}
            >
              {LOCALE_META[code].short}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
