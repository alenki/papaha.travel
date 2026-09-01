import { seeded } from "@/lib/utils";
import type { FigureTone } from "@/content/types";

/**
 * A procedurally drawn survey plate.
 *
 * Every image on this site is a placeholder until the client hands over their
 * photo library. A grey box would misrepresent the design, though, and stock
 * photography would misrepresent the place. So each slot draws itself: a
 * seeded ridge line under a graded sky, with topographic contours and the
 * corner registration marks of a printed survey sheet.
 *
 * Deterministic by seed, so the server and the client draw the identical
 * plate and hydration stays quiet. Pure SVG: no canvas, no client JS.
 */

type TonePalette = {
  skyTop: string;
  skyBottom: string;
  far: string;
  mid: string;
  near: string;
  contour: string;
  mark: string;
};

/**
 * Six plates from one press run.
 *
 * Every tone is mixed from the same brand family — teal #3f7287, gold #ebc96a,
 * cream #f2f5f6 over a deep teal-black #0d1a20 — so the deep end of all six
 * carries the same ~198deg hue. What separates them is temperature and value,
 * never a lurch to an unrelated hue: glacier is the lit cold end, granite the
 * neutral, pine the green shoulder, clay and dusk take their warmth from
 * brass and gold, and wool is the one light plate. (Terracotta is gone from
 * the identity, so the two warm tones are re-lit rather than re-hued.)
 *
 * Relationships the drawing depends on, all verified numerically:
 *   skyTop < skyBottom in lightness — the gradient brightens toward the horizon
 *   far > mid > near — that recession is the only thing reading as distance
 *   contour is a light line stroked at 0.22 INSIDE the near mass, so it needs
 *     enough separation to survive that opacity (all six land >= 1.5:1 against
 *     near after the 0.22 blend; raw separation is 4.6-12.4:1)
 *   mark is the extreme value, drawn at 0.5 as corner crosses and 0.62 as the
 *     caption, over both the sky's top and the darkest mass. On the five dark
 *     tones that means the lightest value (>= 4.0:1 against near at 0.5).
 *     Wool inverts: its plate is light, so its mark is the darkest value, sized
 *     to hold on the pale sky corners (2.98:1) as well as the dark near (1.84:1).
 *   contour doubles as the low sun on clay and dusk, so it has to work as a
 *     disc at 0.34 over the upper sky as well as a hairline.
 */
const TONES: Record<FigureTone, TonePalette> = {
  // Tserik-Kyol, the Blue Lakes: lit brand teal over cold rock. The coldest,
  // most saturated plate — the family's blue end.
  glacier: {
    skyTop: "#16323d",
    skyBottom: "#6ba4b7",
    far: "#55899d",
    mid: "#386a7e",
    near: "#16333f",
    contour: "#a9d5e0",
    mark: "#e3f0f4",
  },
  // Elbrus granite under flat cloud. Same hue as glacier, a third the chroma
  // and a deliberately shallow sky: the family's neutral.
  granite: {
    skyTop: "#2c383e",
    skyBottom: "#75868d",
    far: "#63737a",
    mid: "#445258",
    near: "#1d282e",
    contour: "#a3b1b7",
    mark: "#dde5e8",
  },
  // The ochre hills of the Aktoprak pass: brass in the light, teal in the
  // shade. Warm, but the warmth is gold-derived, not fired clay.
  clay: {
    skyTop: "#313f49",
    skyBottom: "#ccac6e",
    far: "#ab9060",
    mid: "#7a6845",
    near: "#212d31",
    contour: "#e2c383",
    mark: "#f3e7ca",
  },
  // Pine and beech below the treeline: the teal walked toward green, and the
  // darkest of the three cold plates.
  pine: {
    skyTop: "#16272c",
    skyBottom: "#578075",
    far: "#446d62",
    mid: "#2d4f47",
    near: "#132528",
    contour: "#8fbca6",
    mark: "#d6e7db",
  },
  // Last light on the ridge: a gold horizon read against teal-black masses.
  // The highest-contrast plate — nearly everything is silhouette.
  dusk: {
    skyTop: "#131f2a",
    skyBottom: "#d9ab5f",
    far: "#9a8763",
    mid: "#2f414c",
    near: "#0f1a21",
    contour: "#f2d68d",
    mark: "#f5e8ce",
  },
  // Undyed fleece, the inside of a papakha. The one light plate, for paper
  // sections: its sky is the paper ramp itself and its masses fall away into
  // teal-grey. Inverted mark — dark ink, since there is nothing dark to sit on.
  wool: {
    skyTop: "#dad8ce",
    skyBottom: "#f2f0e9",
    far: "#c4c6c0",
    mid: "#97a3a7",
    near: "#5c7079",
    contour: "#eef3f4",
    mark: "#10202a",
  },
};

/**
 * A ridgeline.
 *
 * Built as the *upper envelope* of several seeded peaks rather than a sum of
 * sines. Taking `max` across overlapping triangular peaks is what produces the
 * sharp summits and V-shaped cols a real skyline has. Summing sines only ever
 * gives you rolling hills, which is the tell that a mountain was drawn by
 * someone who has not looked at one.
 */
function ridgePath(
  seed: number,
  width: number,
  height: number,
  baseline: number,
  roughness: number,
  prominence: number,
  peakCount: number,
) {
  const peaks = Array.from({ length: peakCount }, (_, k) => ({
    // Heavy jitter on placement: evenly spaced summits read as a sawtooth.
    x: (k + 0.5) / peakCount + (seeded(seed + k * 13) - 0.5) * (1.35 / peakCount),
    // One summit dominates; the rest are shoulders. A range of equal peaks
    // is the other thing that gives away a generated skyline.
    h:
      prominence *
      (k === Math.floor(seeded(seed + 61) * peakCount)
        ? 0.85 + seeded(seed + k * 29) * 0.15
        : 0.3 + seeded(seed + k * 29) * 0.42),
    w: 0.13 + seeded(seed + k * 41) * 0.26,
    // Asymmetric flanks: glaciated ridges are never symmetrical.
    skew: 0.5 + seeded(seed + k * 53) * 1.1,
  }));

  const n1 = seeded(seed + 3) * Math.PI * 2;
  const n2 = seeded(seed + 17) * Math.PI * 2;

  const steps = 220;
  const points: string[] = [];

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const x = t * width;

    let lift = 0;
    for (const peak of peaks) {
      const d = t - peak.x;
      const flank = d < 0 ? peak.w * peak.skew : peak.w / peak.skew;
      const norm = Math.abs(d) / flank;
      if (norm < 1) {
        // pow > 1 keeps the summit pointed instead of domed
        lift = Math.max(lift, peak.h * Math.pow(1 - norm, 1.35));
      }
    }

    // Fine detail: crags on the flanks, calm at the very top.
    const detail =
      (Math.sin(t * 37.1 + n1) * 0.55 + Math.sin(t * 71.7 + n2) * 0.45) *
      roughness *
      (1 - Math.min(1, lift / Math.max(prominence, 1)) * 0.6);

    points.push(`${x.toFixed(1)},${(baseline - lift + detail).toFixed(1)}`);
  }

  return `M-2,${height + 2} L-2,${points[0].split(",")[1]} L${points.join(
    " L",
  )} L${width + 2},${height + 2} Z`;
}

export function Plate({
  seed = 1,
  ratio = 1.5,
  tone = "granite",
  label,
  className,
}: {
  seed?: number;
  ratio?: number;
  tone?: FigureTone;
  /** Small mono caption burned into the plate's lower-left corner. */
  label?: string;
  className?: string;
}) {
  const palette = TONES[tone];
  const W = 1200;
  const H = Math.round(W / ratio);

  const gid = `p${seed}${tone}`;

  // Three ridge layers, receding. The far range is the tallest and sharpest;
  // each nearer layer is lower and blunter, which is what reads as distance.
  const far = ridgePath(seed * 3 + 1, W, H, H * 0.72, H * 0.006, H * 0.44, 4);
  const mid = ridgePath(seed * 5 + 2, W, H, H * 0.86, H * 0.009, H * 0.3, 3);
  const near = ridgePath(seed * 11 + 3, W, H, H * 1.02, H * 0.013, H * 0.24, 3);

  // Contours ride the near ridge, stepped down, like a topo sheet's index lines.
  const contours = Array.from({ length: 8 }, (_, i) =>
    ridgePath(
      seed * 11 + 3,
      W,
      H,
      H * 1.02 + (i + 1) * (H * 0.03),
      H * 0.013,
      H * 0.24,
      3,
    ),
  );

  const m = Math.round(W * 0.022);
  const tick = Math.round(W * 0.028);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id={`${gid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.skyTop} />
          <stop offset="100%" stopColor={palette.skyBottom} />
        </linearGradient>
        <linearGradient id={`${gid}-haze`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.skyBottom} stopOpacity="0" />
          <stop offset="100%" stopColor={palette.skyBottom} stopOpacity="0.5" />
        </linearGradient>
        <clipPath id={`${gid}-clip`}>
          <path d={near} />
        </clipPath>
        <filter id={`${gid}-grain`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width={W} height={H} fill={`url(#${gid}-sky)`} />

      {/* A low sun, only on the warm tones, kept high enough that the far
          ridge never appears to impale it. */}
      {(tone === "dusk" || tone === "clay") && (
        <circle
          cx={W * (0.16 + seeded(seed + 11) * 0.68)}
          cy={H * 0.2}
          r={W * 0.038}
          fill={palette.contour}
          opacity="0.34"
        />
      )}

      <path d={far} fill={palette.far} />
      <rect width={W} height={H} fill={`url(#${gid}-haze)`} opacity="0.35" />
      <path d={mid} fill={palette.mid} />
      <path d={near} fill={palette.near} />

      {/* Topographic index lines, clipped inside the nearest mass. */}
      <g clipPath={`url(#${gid}-clip)`} opacity="0.22">
        {contours.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={palette.contour}
            strokeWidth={i % 3 === 0 ? 2.2 : 1.1}
          />
        ))}
      </g>

      {/* Registration marks: the corner crosses of a printed survey sheet. */}
      <g stroke={palette.mark} strokeWidth="1.25" opacity="0.5">
        <path d={`M${m},${m + tick} L${m},${m} L${m + tick},${m}`} fill="none" />
        <path
          d={`M${W - m - tick},${m} L${W - m},${m} L${W - m},${m + tick}`}
          fill="none"
        />
        <path
          d={`M${m},${H - m - tick} L${m},${H - m} L${m + tick},${H - m}`}
          fill="none"
        />
        <path
          d={`M${W - m - tick},${H - m} L${W - m},${H - m} L${W - m},${H - m - tick}`}
          fill="none"
        />
      </g>

      {label && (
        <text
          x={m + tick * 0.9}
          y={H - m - tick * 0.35}
          fill={palette.mark}
          opacity="0.62"
          fontFamily="Martian Mono, ui-monospace, monospace"
          fontSize={Math.round(W * 0.0135)}
          letterSpacing={Math.round(W * 0.0022)}
        >
          {label.toUpperCase()}
        </text>
      )}

      <rect
        width={W}
        height={H}
        filter={`url(#${gid}-grain)`}
        opacity="0.09"
        style={{ mixBlendMode: "overlay" }}
      />
    </svg>
  );
}
