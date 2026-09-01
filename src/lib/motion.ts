import type { Transition, Variants } from "motion/react";

/**
 * One instrument, one tuning.
 *
 * Every animated thing on this site borrows from these five curves and five
 * durations. Nothing gets its own bespoke timing, and that is what makes a site
 * feel *composed* rather than assembled.
 */

export const EASE = {
  /** Reveals, entrances. Fast out of the gate, long settle. */
  out: [0.22, 1, 0.36, 1],
  /** Curtains, page transitions. Symmetrical and deliberate. */
  inOut: [0.83, 0, 0.17, 1],
  /** Continuous / scroll-linked motion. Nearly linear, slightly eased. */
  drift: [0.4, 0, 0.2, 1],
  /** Exits. Accelerates away. */
  in: [0.7, 0, 0.84, 0],
  /** Small confident pops: buttons, tags. Never on anything large. */
  pop: [0.34, 1.4, 0.64, 1],
} as const;

export const CSS_EASE = {
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  inOut: "cubic-bezier(0.83, 0, 0.17, 1)",
  drift: "cubic-bezier(0.4, 0, 0.2, 1)",
  in: "cubic-bezier(0.7, 0, 0.84, 0)",
  pop: "cubic-bezier(0.34, 1.4, 0.64, 1)",
} as const;

export const DUR = {
  xs: 0.24,
  sm: 0.42,
  md: 0.68,
  lg: 1.0,
  xl: 1.45,
} as const;

/** Stagger steps. Tight for characters, loose for whole blocks. */
export const STAGGER = {
  char: 0.018,
  word: 0.045,
  line: 0.085,
  item: 0.09,
  block: 0.14,
} as const;

export const T: Record<string, Transition> = {
  reveal: { duration: DUR.lg, ease: EASE.out },
  revealFast: { duration: DUR.md, ease: EASE.out },
  curtain: { duration: DUR.xl, ease: EASE.inOut },
  hover: { duration: DUR.sm, ease: EASE.out },
  tap: { duration: DUR.xs, ease: EASE.pop },
  drift: { duration: DUR.xl, ease: EASE.drift },
  spring: { type: "spring", stiffness: 140, damping: 22, mass: 0.9 },
  springSoft: { type: "spring", stiffness: 70, damping: 20, mass: 1.1 },
  springSnap: { type: "spring", stiffness: 320, damping: 30, mass: 0.6 },
};

/* ------------------------------------------------------------------ */
/* Reusable variant sets                                               */
/* ------------------------------------------------------------------ */

/** The house reveal: rises out of a mask. Pair with an overflow-hidden parent. */
export const riseVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: T.reveal },
};

/** For blocks that shouldn't be masked: a shorter, softer lift. */
export const liftVariants: Variants = {
  hidden: { y: 28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: T.reveal },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.lg, ease: EASE.out } },
};

/** Wipes a block in from the bottom edge using clip-path. */
export const wipeVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: DUR.xl, ease: EASE.inOut },
  },
};

/** Scales an image down from an over-crop as its mask opens. */
export const imageRevealVariants: Variants = {
  hidden: { scale: 1.28 },
  show: { scale: 1, transition: { duration: 1.9, ease: EASE.out } },
};

export function stagger(step: number = STAGGER.item, delay = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: step, delayChildren: delay },
    },
  };
}

/** Standard viewport trigger: fires once, a little before the element lands. */
export const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -12% 0px" } as const;
export const VIEWPORT_EARLY = { once: true, amount: 0.05, margin: "0px 0px -5% 0px" } as const;
