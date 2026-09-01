"use client";

import { useEffect, useState } from "react";
import { useScroll, useReducedMotion } from "motion/react";
import { STATIONS, SITE } from "@/content/site";
import { pick, type Locale } from "@/lib/i18n";
import { groupDigits } from "@/lib/utils";

/**
 * The altimeter.
 *
 * The organising idea of this whole site is altitude: Nalchik sits at 512 m and
 * the west summit of Elbrus at 5 642 m, and everything Papaha sells lives
 * somewhere on that line. So scroll position is read as elevation: the page
 * *is* the climb, and this instrument names the station you are passing.
 *
 * Fixed to the bottom-left corner, in the mono face, permanently on. It is the
 * one piece of chrome that never goes away.
 */
export function Altimeter({ locale }: { locale: Locale }) {
  const { scrollY, scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const [metres, setMetres] = useState<number>(SITE.baseAltitude);
  // The hero already carries its own 512 → 5 642 readout, and this sits right
  // on top of the hero's lead paragraph. Stay out of the way until we're past it.
  const [visible, setVisible] = useState(false);
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    // Sample the progress value rather than binding a MotionValue to text:
    // this stays a single cheap setState per frame instead of a subtree render.
    return scrollYProgress.on("change", (value) => {
      const next =
        SITE.baseAltitude +
        (SITE.summitAltitude - SITE.baseAltitude) * Math.min(1, Math.max(0, value));
      setMetres(Math.round(next / 10) * 10);
    });
  }, [scrollYProgress]);

  /**
   * The instrument is live while you are moving and rests when you stop.
   *
   * A permanently pinned readout inevitably sits on top of something: a card,
   * a caption, a photograph. Tying it to motion means it is present exactly
   * when it is meaningful (you are changing altitude) and out of the way the
   * rest of the time, which also happens to be how a real altimeter reads.
   */
  useEffect(() => {
    let idle: ReturnType<typeof setTimeout>;

    const unsubscribe = scrollY.on("change", (value) => {
      const pastHero = value > window.innerHeight * 0.85;
      setVisible(pastHero);

      clearTimeout(idle);
      if (pastHero) {
        idle = setTimeout(() => setVisible(false), 1400);
      }
    });

    return () => {
      clearTimeout(idle);
      unsubscribe();
    };
  }, [scrollY]);

  /**
   * Some sections own the altitude readout themselves: the scale on the home
   * page, the profile on a tour page. Two instruments showing two different
   * numbers at once is worse than no instrument, so those sections mark
   * themselves and this one steps aside.
   */
  useEffect(() => {
    const targets = document.querySelectorAll("[data-hide-altimeter]");
    if (!targets.length) return;

    const onScreen = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        setSuppressed(onScreen.size > 0);
      },
      { threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const station =
    [...STATIONS].reverse().find((s) => metres >= s.m) ?? STATIONS[0];

  const progress =
    (metres - SITE.baseAltitude) / (SITE.summitAltitude - SITE.baseAltitude);

  return (
    <div
      className="pointer-events-none fixed bottom-[var(--spacing-gutter)] left-[var(--spacing-gutter)] z-40 hidden select-none lg:block"
      aria-hidden="true"
      style={{
        opacity: visible && !suppressed ? 1 : 0,
        transform:
          visible && !suppressed ? "translateY(0)" : "translateY(0.75rem)",
        transition: reduced
          ? "none"
          : "opacity 0.5s var(--ease-out-quint), transform 0.5s var(--ease-out-quint)",
      }}
    >
      <div className="u-instrument flex flex-col gap-1.5 px-3.5 py-3">
        <div className="flex items-baseline gap-1.5">
          {/*
            The climb marker, and the one bit of colour in the instrument.
            `--accent-text` rather than `--accent`: this is type, and at
            0.68rem it wants the darkened variant (7.28:1 on paper against the
            flat accent's 4.64:1). Both resolve against the paper root here:
            the instrument hangs off <body>, outside any .surface-stone, which
            is the same paper `.u-instrument` paints behind itself, so the
            reading stays honest whatever is scrolling past underneath.
          */}
          <span className="u-data text-[0.68rem] leading-none text-[var(--accent-text)]">
            ▲
          </span>
          <span className="u-data text-[0.95rem] leading-none tracking-[-0.03em] text-ink">
            {groupDigits(metres)}
          </span>
          <span className="u-label text-[0.58rem] text-ink-3">
            {locale === "ru" ? "м" : "m"}
          </span>
        </div>

        <span className="u-label max-w-[11rem] text-[0.58rem] leading-[1.3] text-ink-3">
          {pick(station.name, locale)}
        </span>

        {/* A 96px rule that fills as you descend the page. The flat `--accent`
            is the right one here, not `--accent-text`: this is a graphic, so
            it only owes 3:1 against the paper track and reads better as the
            saturated teal than as the darkened type variant. */}
        <div className="relative mt-0.5 h-px w-24 bg-paper-4">
          <div
            className="absolute inset-y-0 left-0 bg-[var(--accent)]"
            style={{
              width: `${progress * 100}%`,
              transition: reduced ? "none" : "width 0.18s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
