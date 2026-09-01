"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/Magnetic";

/**
 * The site's one button.
 *
 * Signature interaction: the label is stacked twice inside a mask. On hover the
 * top copy rises out and the bottom copy rises in, while a fill wipes up from
 * the bottom edge. Both are pure CSS transforms on the same easing as
 * everything else, so it costs nothing and feels like part of the same machine.
 */

type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[0.6875rem] tracking-[0.16em]",
  md: "px-6 py-3.5 text-[0.75rem] tracking-[0.15em]",
  lg: "px-8 py-5 text-[0.8125rem] tracking-[0.14em]",
};

/**
 * `--fill` is the block that wipes up on hover, `--fill-fg` the label colour
 * that has to survive on top of it, so the two are only ever chosen as a pair.
 * That matters most for `solid`, because `--accent` is not one colour: it is
 * teal on paper and gold on stone. Pinning the label to snow read as white on
 * gold (1.46:1) for every button inside a `.surface-stone` section.
 * `--accent-contrast` is the token that flips alongside `--accent`, so it is
 * the only correct partner for an accent fill.
 */
const VARIANTS: Record<Variant, string> = {
  solid:
    "bg-[var(--fg)] text-[var(--bg)] border border-[var(--fg)] [--fill:var(--accent)] [--fill-fg:var(--accent-contrast)]",
  outline:
    "bg-transparent text-[var(--fg)] border border-[var(--rule-strong)] [--fill:var(--fg)] [--fill-fg:var(--bg)]",
  ghost:
    "bg-transparent text-[var(--fg)] border border-transparent [--fill:transparent] [--fill-fg:var(--accent-text)]",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Trailing glyph: an arrow, usually. */
  trailing?: ReactNode;
  magnetic?: boolean;
  full?: boolean;
};

function Inner({
  children,
  trailing,
}: {
  children: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <>
      <span className="relative block overflow-hidden">
        {/* Top copy, rises out on hover. */}
        <span className="block transition-transform duration-[0.55s] ease-[var(--ease-out-quint)] group-hover:-translate-y-full">
          {children}
        </span>
        {/* Bottom copy, waits below, rises in. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-[0.55s] ease-[var(--ease-out-quint)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      {trailing && (
        <span className="relative block shrink-0 transition-transform duration-[0.55s] ease-[var(--ease-out-quint)] group-hover:translate-x-1">
          {trailing}
        </span>
      )}
    </>
  );
}

function shell(
  variant: Variant,
  size: Size,
  full: boolean | undefined,
  className: string | undefined,
) {
  return cn(
    "group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden",
    "font-mono font-medium uppercase leading-none",
    "transition-colors duration-[0.5s] ease-[var(--ease-out-quint)]",
    "hover:text-[var(--fill-fg)]",
    // The fill: a block that wipes up from the bottom edge.
    "before:absolute before:inset-0 before:-z-10 before:bg-[var(--fill)]",
    "before:origin-bottom before:scale-y-0 before:transition-transform",
    "before:duration-[0.55s] before:ease-[var(--ease-out-quint)]",
    "hover:before:scale-y-100",
    SIZES[size],
    VARIANTS[variant],
    full && "w-full",
    className,
  );
}

export function ButtonLink({
  href,
  children,
  variant = "outline",
  size = "md",
  className,
  trailing,
  magnetic = false,
  full,
  external,
  ...rest
}: BaseProps & {
  href: string;
  external?: boolean;
  "aria-label"?: string;
}) {
  const content = (
    <Link
      href={href}
      className={shell(variant, size, full, className)}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...rest}
    >
      <Inner trailing={trailing}>{children}</Inner>
    </Link>
  );

  return magnetic ? (
    <Magnetic className={cn("inline-block", full && "w-full")}>
      {content}
    </Magnetic>
  ) : (
    content
  );
}

export function Button({
  children,
  variant = "solid",
  size = "md",
  className,
  trailing,
  magnetic = false,
  full,
  type = "button",
  ...rest
}: BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const content = (
    <button
      type={type}
      className={cn(
        shell(variant, size, full, className),
        "disabled:pointer-events-none disabled:opacity-45",
      )}
      {...rest}
    >
      <Inner trailing={trailing}>{children}</Inner>
    </button>
  );

  return magnetic ? (
    <Magnetic className={cn("inline-block", full && "w-full")}>
      {content}
    </Magnetic>
  ) : (
    content
  );
}

/** The arrow used on nearly every call to action. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-[0.9em] w-[0.9em]", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}
