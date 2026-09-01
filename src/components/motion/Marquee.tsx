"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker.
 *
 * One track holding the content twice, translated by exactly -50% of itself,
 * which lands the duplicate precisely where the original started, so the loop
 * is seamless. CSS keyframes only: no RAF, no scroll listener, nothing on the
 * main thread. The duplicate is aria-hidden so the belt reads once.
 *
 * Callers must supply enough content to exceed the viewport width, otherwise
 * a gap appears at the right edge on wide screens.
 */
export function Marquee({
  children,
  className,
  trackClassName,
  speed = "normal",
  direction = "left",
  pauseOnHover = false,
  fade = true,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  speed?: "normal" | "slow";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  /** Soft-mask both ends so the loop never visibly cuts. */
  fade?: boolean;
}) {
  const mask =
    "linear-gradient(90deg, transparent, black 7%, black 93%, transparent)";

  return (
    <div
      className={cn("group relative w-full overflow-hidden", className)}
      style={fade ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
    >
      <div
        className={cn(
          "flex w-max",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{
          animation:
            speed === "slow"
              ? "var(--animate-marquee-slow)"
              : "var(--animate-marquee)",
          animationDirection: direction === "right" ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        <div className={cn("flex shrink-0 items-center", trackClassName)}>
          {children}
        </div>
        <div
          aria-hidden="true"
          className={cn("flex shrink-0 items-center", trackClassName)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
