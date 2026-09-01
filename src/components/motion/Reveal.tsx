"use client";

import { createElement, type ReactNode } from "react";
import { useReducedMotion, type Variant, type Variants } from "motion/react";
import { DUR, EASE, STAGGER, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motionTag } from "./motionTag";

/*
 * These components are polymorphic: the caller chooses the semantic tag, so a
 * reveal on a heading really is an <h2> and a reveal on a list item really is
 * an <li>. That means the element type is only known at render time.
 *
 * `motionTag` is a lookup into a module-level map, not a factory, so nothing is
 * being constructed per render. We use `createElement` rather than JSX because
 * assigning the lookup to a capitalised local and using it as a JSX tag trips
 * react-hooks/static-components, which cannot see that the map is static, and
 * suppressing a correctness rule is worse than not needing it.
 */

type RevealKind = "rise" | "lift" | "fade" | "wipe" | "scale";

const HIDDEN: Record<RevealKind, Variant> = {
  rise: { y: "112%" },
  lift: { y: 26, opacity: 0 },
  fade: { opacity: 0 },
  wipe: { clipPath: "inset(100% 0 0 0)" },
  scale: { scale: 0.94, opacity: 0 },
};

const SHOWN: Record<RevealKind, Variant> = {
  rise: { y: "0%" },
  lift: { y: 0, opacity: 1 },
  fade: { opacity: 1 },
  wipe: { clipPath: "inset(0% 0 0 0)" },
  scale: { scale: 1, opacity: 1 },
};

function variantsFor(
  kind: RevealKind,
  reduced: boolean,
  duration?: number,
  delay = 0,
): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.2, delay } },
    };
  }
  return {
    hidden: HIDDEN[kind],
    show: {
      ...SHOWN[kind],
      transition: {
        duration: duration ?? (kind === "wipe" ? DUR.xl : DUR.lg),
        ease: kind === "wipe" ? EASE.inOut : EASE.out,
        delay,
      },
    },
  };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** How it arrives. `rise` supplies its own overflow-hidden mask. */
  kind?: RevealKind;
  delay?: number;
  duration?: number;
  /** Any intrinsic tag: "div", "h2", "li", "span"… */
  as?: string;
  /** Re-trigger every time it enters the viewport. Off by default. */
  repeat?: boolean;
  /** Fire on the first visible sliver, for blocks near the fold. */
  eager?: boolean;
};

/**
 * The house reveal. One component, five flavours, one timing system.
 *
 * `rise` wraps its own child in the mask so callers never have to remember the
 * overflow-hidden parent: the single most common way this pattern breaks.
 */
export function Reveal({
  children,
  className,
  kind = "lift",
  delay = 0,
  duration,
  as = "div",
  repeat = false,
  eager = false,
}: RevealProps) {
  const reduced = useReducedMotion() ?? false;

  const inner = createElement(
    motionTag(as),
    {
      "data-reveal": "",
      className: kind === "rise" ? undefined : className,
      variants: variantsFor(kind, reduced, duration, delay),
      initial: "hidden",
      whileInView: "show",
      viewport: {
        ...VIEWPORT,
        once: !repeat,
        /**
         * `wipe` is the one kind that clips the very element the viewport
         * trigger is watching. A fully clipped box reports an
         * intersectionRatio of 0 even while it is squarely on screen, so any
         * fractional threshold deadlocks: it stays hidden because it is not
         * "in view", and it is not in view because it is hidden. Verified in
         * Chrome — ratio 0 clipped, 1 the instant the clip is removed.
         *
         * So wipe triggers on first contact rather than on a fraction of its
         * box. `RevealItem` never hit this because the group it inherits from
         * does the watching, and the group is not the thing being clipped.
         */
        amount: kind === "wipe" ? 0 : eager ? 0.01 : VIEWPORT.amount,
      },
    },
    children,
  );

  if (kind === "rise") {
    return <span className={cn("u-mask", className)}>{inner}</span>;
  }
  return inner;
}

/**
 * Parent for staggered children. Pair with `<RevealItem>`; the group owns the
 * viewport trigger so the whole run reads as one gesture instead of each item
 * firing independently as it crosses the fold.
 */
export function RevealGroup({
  children,
  className,
  step = STAGGER.item,
  delay = 0,
  as = "div",
  eager = false,
  repeat = false,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
  as?: string;
  eager?: boolean;
  repeat?: boolean;
}) {
  return createElement(
    motionTag(as),
    {
      className,
      initial: "hidden",
      whileInView: "show",
      viewport: { ...VIEWPORT, once: !repeat, amount: eager ? 0.01 : 0.15 },
      variants: {
        hidden: {},
        show: { transition: { staggerChildren: step, delayChildren: delay } },
      },
    },
    children,
  );
}

export function RevealItem({
  children,
  className,
  kind = "lift",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  kind?: RevealKind;
  as?: string;
}) {
  const reduced = useReducedMotion() ?? false;

  const inner = createElement(
    motionTag(as),
    {
      "data-reveal": "",
      className: kind === "rise" ? undefined : className,
      variants: variantsFor(kind, reduced),
    },
    children,
  );

  if (kind === "rise") {
    return <span className={cn("u-mask", className)}>{inner}</span>;
  }
  return inner;
}
