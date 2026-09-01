"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";

/**
 * Lenis owns the scroll for the whole site.
 *
 * It genuinely moves `window.scrollY` (rather than transforming a wrapper), so
 * Motion's `useScroll`, IntersectionObserver, `position: sticky` and the browser's
 * own scroll restoration all keep working untouched. That is the whole reason to
 * prefer it over a transform-based smooth-scroll.
 */

let instance: Lenis | null = null;

/** Scroll to an element or offset from anywhere in the app. */
export function scrollTo(
  target: string | HTMLElement | number,
  options?: { offset?: number; immediate?: boolean; duration?: number },
) {
  if (instance) {
    instance.scrollTo(target, {
      offset: options?.offset ?? 0,
      immediate: options?.immediate,
      duration: options?.duration ?? 1.4,
    });
    return;
  }
  // Reduced motion, or before hydration: fall back to the platform.
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "auto" });
  } else {
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "auto", block: "start" });
  }
}

export function stopScroll() {
  instance?.stop();
}

export function startScroll() {
  instance?.start();
}

export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      instance = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      // expo-out: catches the wheel instantly, then glides a long way down.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.7,
      // Touch devices already have excellent native inertia, so don't fight it.
      syncTouch: false,
    });

    instance = lenis;

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    // Same-page anchors go through Lenis so they inherit the site's easing.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const el = document.querySelector(hash);
      if (!el) return;

      event.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -96, duration: 1.5 });
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      instance = null;
    };
  }, [reduced]);

  return null;
}
