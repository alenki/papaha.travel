import { seeded } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * Topographic contour field.
 *
 * Nested closed isolines around two or three seeded centres: what a 1:50 000
 * Soviet survey sheet of this region actually looks like. Sits behind content
 * at very low opacity to give the paper surface somewhere to be.
 *
 * Pure SVG, deterministic, no client JS.
 */
export function Contour({
  className,
  seed = 3,
  rings = 13,
  centres = 2,
  opacity = 0.5,
  stroke = "currentColor",
}: {
  className?: string;
  seed?: number;
  rings?: number;
  centres?: number;
  opacity?: number;
  stroke?: string;
}) {
  const W = 1200;
  const H = 800;

  const peaks = Array.from({ length: centres }, (_, c) => ({
    cx: W * (0.18 + seeded(seed + c * 13) * 0.64),
    cy: H * (0.2 + seeded(seed + c * 29) * 0.6),
    // Each peak gets its own lobed silhouette.
    lobes: 3 + Math.floor(seeded(seed + c * 41) * 4),
    phase: seeded(seed + c * 53) * Math.PI * 2,
    squash: 0.55 + seeded(seed + c * 67) * 0.5,
  }));

  /** One closed isoline: a circle deformed by two harmonics. */
  function isoline(
    cx: number,
    cy: number,
    radius: number,
    lobes: number,
    phase: number,
    squash: number,
    wobble: number,
  ) {
    const steps = 96;
    const pts: string[] = [];
    for (let i = 0; i < steps; i += 1) {
      const a = (i / steps) * Math.PI * 2;
      const r =
        radius *
        (1 +
          Math.sin(a * lobes + phase) * wobble * 0.22 +
          Math.sin(a * (lobes * 2 + 1) + phase * 1.7) * wobble * 0.09);
      pts.push(
        `${(cx + Math.cos(a) * r).toFixed(1)},${(
          cy +
          Math.sin(a) * r * squash
        ).toFixed(1)}`,
      );
    }
    return `M${pts.join(" L")} Z`;
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn("pointer-events-none select-none", className)}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ opacity }}
    >
      {peaks.map((peak, c) =>
        Array.from({ length: rings }, (_, i) => {
          const step = i + 1;
          const radius = step * (W * 0.028);
          // Every fifth line is an index contour, heavier, as on a real sheet.
          const isIndex = step % 5 === 0;
          return (
            <path
              key={`${c}-${i}`}
              d={isoline(
                peak.cx,
                peak.cy,
                radius,
                peak.lobes,
                peak.phase,
                peak.squash,
                Math.min(1, step / 5),
              )}
              fill="none"
              stroke={stroke}
              strokeWidth={isIndex ? 1.5 : 0.75}
              opacity={isIndex ? 0.95 : 0.55}
            />
          );
        }),
      )}
    </svg>
  );
}
