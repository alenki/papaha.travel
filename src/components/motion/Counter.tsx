"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { groupDigits } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * A number that climbs when it enters view.
 *
 * Eased with the same out-quint as everything else, and stepped through
 * `requestAnimationFrame` on a duration rather than a fixed increment, so the
 * count always lands exactly on `value` regardless of frame rate.
 */
export function Counter({
  value,
  duration = 1900,
  className,
  prefix = "",
  suffix = "",
  /** Start the climb from here instead of zero, e.g. Nalchik's 512 m. */
  from = 0,
}: {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  from?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();

  const [animated, setAnimated] = useState(from);
  // Derived, not synchronised: with reduced motion the number is simply the
  // final value from the first paint, so no effect has to write state to
  // "correct" it afterwards.
  const display = reduced ? value : animated;

  useEffect(() => {
    if (!inView || reduced) return;

    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / duration);
      // out-quint: matches --ease-out-quint closely enough to feel identical.
      const eased = 1 - Math.pow(1 - t, 5);
      setAnimated(Math.round(from + (value - from) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, from, reduced]);

  return (
    <span ref={ref} className={cn("u-tabular", className)}>
      {prefix}
      {groupDigits(display)}
      {suffix}
    </span>
  );
}
