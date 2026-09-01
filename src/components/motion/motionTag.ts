"use client";

import { motion } from "motion/react";
import type { ComponentType } from "react";

/**
 * Motion components for the intrinsic tags this site actually animates.
 *
 * These are looked up, never created. `motion.create()` returns a brand-new
 * component type on every call, so calling it inside a render body remounts the
 * subtree each pass: the animation restarts, inputs lose focus, and it reads
 * as a hydration bug. `motion.div` and friends are already created once by the
 * library at module load, so a plain map is both correct and free.
 */
const TAGS = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  a: motion.a,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  tbody: motion.tbody,
  tr: motion.tr,
  td: motion.td,
  header: motion.header,
  footer: motion.footer,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  figure: motion.figure,
  blockquote: motion.blockquote,
  button: motion.button,
  nav: motion.nav,
} as const;

export type MotionTagName = keyof typeof TAGS;

/**
 * Returned loosely typed on purpose.
 *
 * The polymorphic wrappers (Reveal, SplitText) build their props object and
 * hand it to `createElement`, which means the props cannot be narrowed to one
 * concrete tag, and Motion's per-tag prop types reject `data-*` keys that JSX
 * would happily accept. The two call sites are small and fully covered by the
 * QA sweep; fighting the generics here buys nothing.
 */
export function motionTag(
  tag: string,
): ComponentType<Record<string, unknown>> {
  return ((TAGS as Record<string, unknown>)[tag] ??
    TAGS.div) as ComponentType<Record<string, unknown>>;
}

export const M = TAGS;
