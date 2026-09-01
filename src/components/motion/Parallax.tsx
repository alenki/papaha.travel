"use client";

import { useRef, type ReactNode } from "react";
import { useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { M } from "./motionTag";

/**
 * Scroll-linked translation. Positive `speed` lags behind the scroll (recedes),
 * negative runs ahead (approaches).
 *
 * Always transform-only, always spring-smoothed, so it costs one compositor
 * layer and never triggers layout.
 */
export function Parallax({
  children,
  className,
  speed = 0.14,
  axis = "y",
  clamp = true,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of the element's own travel. 0.1–0.3 reads as depth; beyond 0.4 reads as a bug. */
  speed?: number;
  axis?: "x" | "y";
  clamp?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 100}%`, `${-speed * 100}%`],
    { clamp },
  );
  const smooth = useSpring(raw, { stiffness: 120, damping: 26, mass: 0.7 });

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <M.div style={axis === "y" ? { y: smooth } : { x: smooth }}>{children}</M.div>
    </div>
  );
}

/**
 * The counterpart used on every photographic plate: the frame holds still and
 * is masked, while the image inside drifts and is over-scaled just enough that
 * no edge is ever exposed.
 */
export function ParallaxFrame({
  children,
  className,
  speed = 0.12,
  scale = 1.22,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-speed * 100}%`, `${speed * 100}%`],
  );
  const smooth = useSpring(y, { stiffness: 110, damping: 28, mass: 0.8 });

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      {reduced ? (
        <div className="h-full w-full">{children}</div>
      ) : (
        <M.div
          className="h-full w-full"
          style={{ y: smooth, scale, willChange: "transform" }}
        >
          {children}
        </M.div>
      )}
    </div>
  );
}
