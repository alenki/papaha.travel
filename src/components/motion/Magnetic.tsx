"use client";

import { useRef, type ReactNode } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { M } from "./motionTag";

/**
 * Pulls toward the cursor, snaps back on leave.
 *
 * Deliberately restrained: `strength` caps the travel in pixels so a button
 * never detaches from its own hit area: that is the failure mode that makes
 * magnetic buttons feel broken rather than alive.
 */
export function Magnetic({
  children,
  className,
  strength = 14,
  /** Also translate the inner content, at a fraction of the outer travel. */
  innerStrength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  innerStrength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ix = useMotionValue(0);
  const iy = useMotionValue(0);

  const config = { stiffness: 220, damping: 18, mass: 0.55 };
  const sx = useSpring(x, config);
  const sy = useSpring(y, config);
  const six = useSpring(ix, config);
  const siy = useSpring(iy, config);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // -1 … 1 from the element's own centre.
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    const cx = Math.max(-1, Math.min(1, dx));
    const cy = Math.max(-1, Math.min(1, dy));
    x.set(cx * strength);
    y.set(cy * strength);
    ix.set(cx * strength * innerStrength);
    iy.set(cy * strength * innerStrength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    ix.set(0);
    iy.set(0);
  };

  return (
    <M.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <M.div style={{ x: six, y: siy }}>{children}</M.div>
    </M.div>
  );
}
