import Link from "next/link";
import type { ReactNode } from "react";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Contour } from "@/components/ui/Contour";

/**
 * The opening of every inner page.
 *
 * Always stone, always the same structure: breadcrumb, index + kicker, display
 * title, lead, optional meta rail. The header is built to sit over a dark
 * opening section, so keeping this consistent is what stops the navigation
 * flickering between colour schemes as you move around the site.
 */
export function PageHero({
  locale,
  index,
  kicker,
  title,
  lead,
  meta,
  breadcrumb,
  seed = 5,
  size = "d1",
  children,
}: {
  locale: Locale;
  index?: string;
  kicker?: string;
  title: string;
  lead?: ReactNode;
  /** Small definition pairs rendered along the bottom rule. */
  meta?: { label: string; value: ReactNode }[];
  breadcrumb?: { label: string; href?: string }[];
  seed?: number;
  size?: "d1" | "d2";
  children?: ReactNode;
}) {
  return (
    <section className="surface-stone relative overflow-hidden pb-[var(--spacing-section-sm)] pt-36 sm:pt-44">
      <Contour
        className="pointer-events-none absolute -right-[12%] -top-[35%] h-[165%] w-[65%] text-glacier"
        seed={seed}
        rings={16}
        centres={2}
        opacity={0.08}
      />

      <div className="relative u-shell">
        {breadcrumb && breadcrumb.length > 0 && (
          <Reveal kind="fade" eager>
            <nav
              aria-label={locale === "ru" ? "Навигация" : "Breadcrumb"}
              className="mb-9"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link
                    href={localePath("/", locale)}
                    className="u-label u-underline"
                  >
                    {locale === "ru" ? "Главная" : "Home"}
                  </Link>
                </li>
                {breadcrumb.map((crumb) => (
                  <li key={crumb.label} className="flex items-center gap-2">
                    <span aria-hidden="true" className="u-label opacity-40">
                      /
                    </span>
                    {crumb.href ? (
                      <Link href={crumb.href} className="u-label u-underline">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="u-label u-label-accent" aria-current="page">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        {(index || kicker) && (
          <Reveal kind="lift" eager className="mb-7 flex items-baseline gap-4">
            {index && <span className="u-index">{index}</span>}
            {kicker && <span className="u-label u-label-accent">{kicker}</span>}
          </Reveal>
        )}

        <SplitText
          as="h1"
          text={title}
          by="word"
          immediate
          delay={0.1}
          className={cn(
            "u-display block max-w-[18ch] text-snow",
            size === "d1" ? "text-d1" : "text-d2",
          )}
        />

        {lead && (
          <Reveal kind="lift" delay={0.3} eager className="u-lead mt-8 max-w-[52ch] text-snow-2">
            {lead}
          </Reveal>
        )}

        {children}

        {meta && meta.length > 0 && (
          <Reveal kind="lift" delay={0.4} eager>
            <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[var(--rule)] pt-7 sm:grid-cols-3 lg:grid-cols-5">
              {meta.map((entry) => (
                <div key={entry.label}>
                  <dt className="u-label mb-2">{entry.label}</dt>
                  <dd className="u-data text-[1.05rem] leading-none text-snow">
                    {entry.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </section>
  );
}
