"use client";

import { useRef, useState } from "react";
import {
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { M } from "@/components/motion/motionTag";
import { SECTIONS } from "@/content/copy";
import { STATIONS, SITE } from "@/content/site";
import { TOURS } from "@/content/tours";
import { pick, type Locale } from "@/lib/i18n";
import { groupDigits } from "@/lib/utils";
import { SplitText } from "@/components/motion/SplitText";
import { Contour } from "@/components/ui/Contour";
import { EASE } from "@/lib/motion";

/**
 * The altitude scale: the section the whole site is named after.
 *
 * A sticky viewport is pinned for three screens of scroll while a marker
 * travels the full 512 m → 5 642 m range. Each station lights as the marker
 * reaches it and reports which of our routes actually get you there, so the
 * scale is a navigational device rather than an infographic.
 *
 * The scroll distance is intentionally generous: the point is that the climb
 * takes effort.
 */
export function AltitudeScale({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    // Start when the sticky child pins, end when it unpins.
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });

  const markerTop = useTransform(smooth, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(smooth, "change", (value) => {
    const clamped = Math.min(0.9999, Math.max(0, value));
    setIndex(Math.floor(clamped * STATIONS.length));
  });

  const station = STATIONS[Math.min(index, STATIONS.length - 1)];

  // Which routes actually reach this band.
  const reaching = TOURS.filter(
    (tour) =>
      tour.altitudeM >= station.m &&
      // don't list every tour against Nalchik itself
      station.m > SITE.baseAltitude,
  ).slice(0, 3);

  return (
    <section
      ref={ref}
      className="surface-stone relative"
      style={{ height: reduced ? "auto" : "320vh" }}
      aria-label={pick(SECTIONS.altitude.title, locale)}
      // This section is the altimeter while it is on screen.
      data-hide-altimeter=""
    >
      <div
        className={reduced ? "" : "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden"}
      >
        <Contour
          className="pointer-events-none absolute -right-[15%] top-[-20%] h-[140%] w-[80%] text-glacier"
          seed={21}
          rings={18}
          centres={2}
          opacity={0.08}
        />

        <div className="relative u-shell py-[var(--spacing-section-sm)]">
          <div className="mb-10 flex items-baseline gap-4">
            <span className="u-index">03</span>
            <span className="u-label">{pick(SECTIONS.altitude.kicker, locale)}</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16">
            {/* ── Left: heading + readout ─────────────────────────────── */}
            <div className="flex flex-col justify-between gap-10">
              <SplitText
                as="h2"
                text={pick(SECTIONS.altitude.title, locale)}
                by="word"
                className="u-display block max-w-[16ch] text-d2 text-snow"
              />

              <div>
                <p className="u-lead mb-8 max-w-[38ch] text-snow-2">
                  {pick(SECTIONS.altitude.lead, locale)}
                </p>

                {/* The big readout */}
                <div className="flex items-end gap-4 border-t border-[var(--rule)] pt-6">
                  <M.span
                    key={station.m}
                    initial={reduced ? undefined : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE.out }}
                    className="u-data u-tabular text-[clamp(2.5rem,7vw,5rem)] leading-[0.85] text-snow"
                  >
                    {groupDigits(station.m)}
                  </M.span>
                  <span className="u-label pb-2 text-glacier">
                    {locale === "ru" ? "метров" : "metres"}
                  </span>
                </div>

                <M.span
                  key={`${station.m}-name`}
                  initial={reduced ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45 }}
                  className="u-display mt-4 block text-d4 text-snow"
                >
                  {pick(station.name, locale)}
                </M.span>

                {reaching.length > 0 && (
                  <M.div
                    key={`${station.m}-tours`}
                    initial={reduced ? undefined : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.08 }}
                    className="mt-5"
                  >
                    <span className="u-label mb-2 block">
                      {locale === "ru" ? "Сюда доходят" : "Routes that reach it"}
                    </span>
                    <ul className="flex flex-col gap-1">
                      {reaching.map((tour) => (
                        <li
                          key={tour.slug}
                          className="text-sm text-snow-2"
                        >
                          • {pick(tour.title, locale)}
                        </li>
                      ))}
                    </ul>
                  </M.div>
                )}
              </div>
            </div>

            {/* ── Right: the scale ────────────────────────────────────── */}
            <div className="relative flex min-h-[22rem] lg:min-h-[30rem]">
              {/* The rule */}
              <div className="relative w-px shrink-0 bg-[var(--rule)]">
                {!reduced && (
                  <M.div
                    className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-[var(--accent)]"
                    style={{ top: markerTop }}
                  />
                )}
              </div>

              {/* Stations */}
              <ol className="flex flex-1 flex-col justify-between pl-5">
                {STATIONS.map((entry, i) => {
                  const active = i === Math.min(index, STATIONS.length - 1);
                  const passed = i <= index;
                  return (
                    <li
                      key={entry.m}
                      className="flex items-baseline gap-4 transition-opacity duration-500"
                      style={{ opacity: passed ? 1 : 0.32 }}
                    >
                      <span
                        className="u-data u-tabular w-[4.5rem] shrink-0 text-xs transition-colors duration-500"
                        style={{
                          color: active
                            ? "var(--accent)"
                            : "var(--color-glacier)",
                        }}
                      >
                        {groupDigits(entry.m)}
                      </span>
                      <span
                        className="u-label transition-colors duration-500"
                        style={{
                          color: active
                            ? "var(--color-snow)"
                            : "var(--color-snow-3)",
                        }}
                      >
                        {pick(entry.name, locale)}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
