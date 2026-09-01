"use client";

import { createElement } from "react";
import { useReducedMotion } from "motion/react";
import { M, motionTag } from "./motionTag";
import { DUR, EASE, STAGGER, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Word- or character-level staggered reveal.
 *
 * The visible pieces are `aria-hidden` and the whole thing carries a single
 * `aria-label`, so a screen reader hears one clean sentence instead of
 * forty-one separate letters.
 *
 * See the note in Reveal.tsx on why the root uses `createElement`.
 */

type SplitTextProps = {
  text: string;
  className?: string;
  /** Wrapper tag. Use the real heading level: this does not set size. */
  as?: string;
  by?: "word" | "char" | "line";
  delay?: number;
  step?: number;
  /** Play immediately on mount rather than waiting for the viewport. */
  immediate?: boolean;
  duration?: number;
  repeat?: boolean;
};

export function SplitText({
  text,
  className,
  as = "span",
  by = "word",
  delay = 0,
  step,
  immediate = false,
  duration = DUR.lg,
  repeat = false,
}: SplitTextProps) {
  const reduced = useReducedMotion() ?? false;

  const stagger =
    step ??
    (by === "char"
      ? STAGGER.char
      : by === "line"
        ? STAGGER.line
        : STAGGER.word);

  // `line` means "the caller already split it": they pass \n.
  const units =
    by === "line"
      ? text.split("\n")
      : by === "char"
        ? Array.from(text)
        : text.split(/(\s+)/);

  const animationProps = immediate
    ? { initial: "hidden" as const, animate: "show" as const }
    : {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { ...VIEWPORT, once: !repeat },
      };

  if (reduced) {
    return createElement(
      motionTag(as),
      {
        className,
        ...animationProps,
        variants: {
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.25, delay } },
        },
      },
      text,
    );
  }

  const pieces = units.map((unit, i) => {
    // Preserve whitespace runs as plain, unanimated text.
    if (by === "word" && /^\s+$/.test(unit)) {
      return (
        <span key={`s-${i}`} aria-hidden="true">
          {unit}
        </span>
      );
    }
    if (unit === " " && by === "char") {
      return (
        <span key={`s-${i}`} aria-hidden="true">
          &nbsp;
        </span>
      );
    }

    return (
      <span
        key={`${unit}-${i}`}
        aria-hidden="true"
        className={cn(
          "u-mask",
          by === "line" ? "block" : "inline-block align-bottom",
        )}
      >
        <M.span
          data-reveal=""
          className={by === "line" ? "block" : "inline-block"}
          variants={{
            hidden: { y: "115%" },
            show: { y: "0%", transition: { duration, ease: EASE.out } },
          }}
        >
          {unit}
        </M.span>
      </span>
    );
  });

  return createElement(
    motionTag(as),
    {
      className,
      "data-reveal": "",
      "aria-label": text,
      ...animationProps,
      variants: {
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      },
    },
    pieces,
  );
}
