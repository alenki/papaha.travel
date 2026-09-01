"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { NAV } from "@/content/site";
import { UI } from "@/content/copy";
import { useBackdrop, useOverOpener } from "@/lib/backdrop";
import { localePath, pick, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileMenu } from "./MobileMenu";
import { HornMark } from "@/components/ui/Ornament";

/**
 * The masthead.
 *
 * A single bar of constant height, fixed to the top, permanently on. It does
 * not retract on scroll and it never acquires a background — see
 * `.u-glass-bar` — from the first pixel of the hero to the last line of the
 * footer. Navigation that moves is navigation you have to look for.
 *
 * It has two states, and neither of them is a plate.
 *
 * OVER THE OPENER it is an outline: no blur, white type, a bright hairline.
 * Every route opens on stone, so this is the one stretch where the ground is
 * known in advance and the glass has nothing to separate. `useOverOpener`
 * asks the document rather than the pixels, because over the home hero the
 * pixels give the right answer to the wrong question — a daylit sky measures
 * bright, and the bar does not want ink type over a photograph.
 *
 * PAST IT the glass comes on and the bar goes back to reading the surface
 * actually painted behind it, wearing that surface's tokens: snow and gold
 * over the stone sections, ink and teal over the paper ones. The swap is a
 * single class — everything downstream of it is already written into the
 * surface tokens, so nothing in this file branches on it.
 *
 * The structure is a grid of cells rather than a row of items: brand, routes,
 * language, then a full-depth hairline and the call to action standing in its
 * own cell against the right edge. The rules are what make it read as built
 * rather than floated.
 */
export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  const barRef = useRef<HTMLElement>(null);
  const flat = useOverOpener(barRef, pathname);
  const measured = useBackdrop(barRef, pathname);

  /* Over the opening section the reading is ignored, not skipped: the hook
     keeps running so the handover at the seam is already correct on the frame
     the flat state lets go. Stone is not a guess there — it is what the opener
     is, on every route. */
  const backdrop = flat ? "stone" : measured;

  const [menuOpen, setMenuOpen] = useState(false);

  /*
   * The padding shared by everything on the right-hand end, so the divider
   * rhythm holds from 360px to 1920px. Written out as whole literal class
   * strings rather than composed from a variable: Tailwind scans source text,
   * so a class assembled at runtime is a class that never gets generated.
   */
  const cell = "px-[clamp(1.25rem,2.6vw,2.75rem)]";
  const cellPad = "pr-[clamp(1.25rem,2.6vw,2.75rem)]";

  return (
    <>
      <header
        ref={barRef}
        data-backdrop={backdrop}
        data-flat={flat ? "" : undefined}
        className={cn(
          "u-glass-bar fixed inset-x-0 top-0 z-50 h-[var(--spacing-header)] border-b border-[var(--rule)]",
          backdrop === "stone" ? "surface-stone" : "surface-paper",
        )}
      >
        <div className="flex h-full items-stretch justify-between pl-[var(--spacing-gutter)]">
          {/* Brand. Oswald for the wordmark, because that is the face the mark
              is set in on the home page, and the one spot of gold in the horn
              beside it — cream and gold on basalt, never touching, which is
              the colour logic of the identity. */}
          <Link
            href={localePath("/", locale)}
            className="group flex shrink-0 items-center gap-3 pr-6"
            aria-label="Papaha"
          >
            {/* Colour is in the transition list beside transform because the
                accent under this mark changes with the surface — gold on
                stone, teal on paper — and an instant swap on the one gold
                thing in the bar is the frame everybody notices. */}
            <HornMark className="w-[1.45rem] shrink-0 text-[var(--accent)] transition-[transform,color] duration-[0.7s] ease-[var(--ease-out-quint)] group-hover:rotate-[-14deg]" />
            {/* Sized off the cap, not the em: Oswald's caps fill 0.81 of the
                em, so 1.15rem here stands about as tall as 1.45rem would in a
                normal-proportioned face. Weight is 400 rather than the
                .u-wordmark 350 — the logo's stem is 0.125 of its cap, and at a
                15 px cap that is under two pixels of white on blurred glass. */}
            <span className="u-wordmark text-[1.15rem] font-normal leading-none text-[var(--fg)] transition-colors duration-[0.45s] ease-[var(--ease-drift)] sm:text-[1.4rem]">
              ПАПАХА
            </span>
          </Link>

          <div className="flex items-stretch">
            {/* Routes. Sentence-case Commissioner rather than the mono
                micro-caps used everywhere else on the site: this is the one
                place that wants to be read at a glance, not decoded.

                No underline, and no dimmed rest state. Every route sits at
                full snow and the only thing hover moves is the hue — on a bar
                that is pure blur, a second weight of white and a sliding rule
                under six items is exactly the noise the glass was for. */}
            <nav
              className="hidden items-center lg:flex"
              aria-label={locale === "ru" ? "Основная навигация" : "Primary"}
            >
              <ul className="flex items-center gap-6 xl:gap-7">
                {NAV.map((item) => {
                  const href = localePath(item.href, locale);
                  const active =
                    pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block font-[family-name:var(--font-nav)]",
                          /* 17px/540, up from the 15px/430 this started at.
                             Enough to hold its own against the mark without
                             the bar turning into a headline — Inter at 540 is
                             already a touch heavier on the page than the
                             humanist 430 was, so the number understates the
                             move by a little. */
                          "text-[1.0625rem] leading-none tracking-[-0.005em] [font-weight:540]",
                          "transition-colors duration-[0.4s] ease-[var(--ease-out-quint)]",
                          active
                            ? "text-[var(--accent-text)]"
                            : "text-[var(--fg)] hover:text-[var(--accent-text)]",
                        )}
                      >
                        {pick(item.label, locale)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Language sits *inside* the rhythm rather than in a cell of its
                own: one rule on this end is structure, two is a toolbar. The
                trailing pad matches the cell padding so the gap either side of
                the divider is equal. */}
            <div className={cn("hidden items-center pl-8 sm:flex", cellPad)}>
              <LocaleSwitch locale={locale} />
            </div>

            {/* The call to action, in its own cell against the right edge.
                The gold wipes up from the bottom on hover: the same fill, the
                same easing and the same duration as every button on the site,
                without the box drawn around it. */}
            <Link
              href={localePath("/contact", locale)}
              className={cn(
                "group relative isolate hidden items-center overflow-hidden md:flex",
                "border-l border-[var(--rule)]",
                cell,
                "font-[family-name:var(--font-nav)]",
                /* Back to the original 15px/500, plus a little: 17px and 600.
                   The CTA carries 60 more than the routes beside it because it
                   is the one thing in the bar that is an action rather than a
                   destination, and that gap is the only thing saying so — the
                   cell has a rule but no box. */
                "text-[1.0625rem] leading-none text-[var(--fg)] [font-weight:600]",
                "transition-colors duration-[0.5s] ease-[var(--ease-out-quint)]",
                "hover:text-[var(--accent-contrast)]",
                "before:absolute before:inset-0 before:-z-10 before:origin-bottom",
                "before:scale-y-0 before:bg-[var(--accent)] before:transition-transform",
                "before:duration-[0.55s] before:ease-[var(--ease-out-quint)]",
                "hover:before:scale-y-100",
              )}
            >
              {pick(UI.writeUs, locale)}
            </Link>

            {/* Burger, in a matching cell so the divider rhythm survives on
                the viewports where the routes themselves cannot. */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={cn(
                "u-label flex items-center gap-2.5 border-l border-[var(--rule)]",
                cell,
                "text-[var(--fg)] transition-colors duration-300 hover:text-[var(--accent-text)] lg:hidden",
              )}
              aria-expanded={menuOpen}
              aria-label={pick(UI.menu, locale)}
            >
              <span className="hidden sm:inline">{pick(UI.menu, locale)}</span>
              <span aria-hidden="true" className="flex flex-col gap-[5px]">
                <span className="block h-px w-6 bg-current" />
                <span className="block h-px w-6 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        locale={locale}
      />
    </>
  );
}
