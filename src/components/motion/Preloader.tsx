"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { M } from "./motionTag";
import { startScroll, stopScroll } from "./SmoothScroll";
import { DUR, EASE } from "@/lib/motion";
import { groupDigits } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

/**
 * The first-load sequence: an ascent.
 *
 * The counter climbs from Nalchik's 512 m to the west summit of Elbrus at
 * 5 642 m, naming each station as it passes. When it lands, the panel splits
 * into horizontal bands that lift away in a stagger: the site is revealed from
 * behind the mountain, not faded in over it.
 *
 * Plays once per session. Honours prefers-reduced-motion by skipping entirely.
 */

const STATIONS: { m: number; ru: string; en: string }[] = [
  { m: 512, ru: "Нальчик", en: "Nalchik" },
  { m: 1030, ru: "Чегемское ущелье", en: "Chegem Gorge" },
  { m: 1740, ru: "Верхняя Балкария", en: "Upper Balkaria" },
  { m: 2350, ru: "Азау", en: "Azau" },
  { m: 3847, ru: "Гара-Баши", en: "Gara-Bashi" },
  { m: 5642, ru: "Эльбрус", en: "Elbrus" },
];

const SUMMIT = STATIONS[STATIONS.length - 1].m;
const BASE = STATIONS[0].m;

const CLIMB_MS = 1750;
const HOLD_MS = 260;
const BANDS = 6;

const SESSION_KEY = "papaha:arrived";

/**
 * sessionStorage is an external store, so read it through the API designed for
 * exactly that. The server snapshot is always `false`, which keeps the markup
 * identical on both sides and avoids a hydration mismatch. Because the
 * result is *derived* into `phase`, no effect ever has to write state to undo
 * a first render.
 */
function subscribeToArrival() {
  // Written once, by us, in this tab. Nothing else can change it underneath.
  return () => {};
}

function hasArrived() {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    // Private mode, or storage disabled: treat as a first visit.
    return false;
  }
}

export function Preloader({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion();

  const arrived = useSyncExternalStore(
    subscribeToArrival,
    hasArrived,
    useCallback(() => false, []),
  );

  const skip = arrived || Boolean(reduced);

  const [rawPhase, setPhase] = useState<"climb" | "open" | "gone">("climb");
  const phase = skip ? "gone" : rawPhase;

  const [rawMetres, setMetres] = useState(BASE);
  const metres = skip ? SUMMIT : rawMetres;

  const frame = useRef(0);

  useEffect(() => {
    if (skip) return;

    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Nothing to do: the sequence simply plays again next time.
    }

    stopScroll();
    document.body.style.overflow = "hidden";

    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / CLIMB_MS);
      const eased = 1 - Math.pow(1 - t, 4);
      setMetres(Math.round(BASE + (SUMMIT - BASE) * eased));
      if (t < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setPhase("open"), HOLD_MS);
      }
    };
    frame.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame.current);
  }, [skip]);

  useEffect(() => {
    if (phase !== "open") return;
    const id = window.setTimeout(() => setPhase("gone"), 1150);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "gone") return;
    document.body.style.overflow = "";
    startScroll();
  }, [phase]);

  // The station we have climbed past most recently.
  const station =
    [...STATIONS].reverse().find((s) => metres >= s.m) ?? STATIONS[0];
  const progress = (metres - BASE) / (SUMMIT - BASE);

  return (
    <>
      <noscript>
        {/* Without JS the sequence can never finish, so never let it cover the page. */}
        <style>{`[data-preloader]{display:none !important}`}</style>
      </noscript>

      <AnimatePresence>
        {phase !== "gone" && (
          <M.div
            data-preloader=""
            className="surface-stone fixed inset-0 z-[100] flex flex-col justify-between"
            aria-hidden="true"
          >
            {/* The bands that lift away. */}
            <div className="absolute inset-0 -z-10 flex flex-col">
              {Array.from({ length: BANDS }, (_, i) => (
                <M.div
                  key={i}
                  className="w-full flex-1 bg-basalt"
                  initial={{ y: "0%" }}
                  animate={
                    phase === "open" ? { y: "-101%" } : { y: "0%" }
                  }
                  transition={{
                    duration: 0.95,
                    ease: EASE.inOut,
                    // Lift from the bottom band upward: the horizon drops away.
                    delay: (BANDS - 1 - i) * 0.055,
                  }}
                />
              ))}
            </div>

            <M.div
              className="flex h-full flex-col justify-between p-[var(--spacing-gutter)]"
              animate={
                phase === "open"
                  ? { opacity: 0, transition: { duration: 0.3, ease: EASE.in } }
                  : { opacity: 1 }
              }
            >
              {/* Wordmark */}
              <M.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DUR.md, ease: EASE.out, delay: 0.1 }}
                className="flex items-baseline justify-between gap-4"
              >
                <span className="u-display text-d4 text-snow">ПАПАХА</span>
                <span className="u-label text-snow-3">
                  {locale === "ru" ? "Нальчик · Кавказ" : "Nalchik · Caucasus"}
                </span>
              </M.div>

              {/* The readout */}
              <div className="flex flex-col gap-5">
                <div className="flex items-end justify-between gap-6">
                  <M.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: DUR.sm, delay: 0.18 }}
                    className="u-data u-tabular text-[clamp(3rem,13vw,10rem)] leading-[0.85] text-snow"
                  >
                    {groupDigits(metres)}
                    <span className="ml-[0.15em] text-[0.24em] text-glacier">
                      {locale === "ru" ? "М" : "M"}
                    </span>
                  </M.span>

                  <M.span
                    key={station.ru}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: DUR.sm, ease: EASE.out }}
                    className="u-label pb-[0.6em] text-right text-glacier"
                  >
                    {locale === "ru" ? station.ru : station.en}
                  </M.span>
                </div>

                {/* Progress rule */}
                <div className="relative h-px w-full bg-[var(--rule)]">
                  <div
                    className="absolute inset-y-0 left-0 bg-glacier"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>

                <div className="flex justify-between">
                  <span className="u-label text-snow-3">
                    {locale === "ru" ? "Восхождение" : "Ascent"}
                  </span>
                  <span className="u-label text-snow-3">
                    {Math.round(progress * 100)}%
                  </span>
                </div>
              </div>
            </M.div>
          </M.div>
        )}
      </AnimatePresence>
    </>
  );
}
