import { cn } from "@/lib/utils";

/**
 * Circassian horn-scroll ornament.
 *
 * Kabardian gold-thread embroidery ("дыщэ идэ") is built almost entirely from
 * paired opposing spirals (stylised ram's horns) arranged in strict bilateral
 * symmetry about a central axis, usually with a lozenge or trefoil at the
 * crossing. This is that grammar reduced to a single stroke weight so it can
 * sit as a rule between sections without turning into decoration for its own
 * sake.
 */
export function Ornament({
  className,
  width = 3,
  stroke = "currentColor",
}: {
  className?: string;
  /** How many mirrored horn pairs to repeat. */
  width?: number;
  stroke?: string;
}) {
  const UNIT = 120;
  const H = 48;
  const total = UNIT * width;

  return (
    <svg
      viewBox={`0 0 ${total} ${H}`}
      className={cn("h-auto", className)}
      fill="none"
      stroke={stroke}
      strokeWidth="1.25"
      strokeLinecap="round"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {Array.from({ length: width }, (_, i) => {
        const x = i * UNIT;
        return (
          <g key={i} transform={`translate(${x} 0)`}>
            {/* Left horn, spiral curling inward and up. */}
            <path d="M4 24 C 4 10, 20 4, 32 10 C 42 15, 42 28, 32 31 C 25 33, 20 28, 23 23" />
            {/* Mirrored right horn. */}
            <path
              d="M4 24 C 4 10, 20 4, 32 10 C 42 15, 42 28, 32 31 C 25 33, 20 28, 23 23"
              transform={`translate(${UNIT} 0) scale(-1 1)`}
            />
            {/* Central lozenge at the axis of symmetry. */}
            <path d={`M${UNIT / 2} 14 L${UNIT / 2 + 9} 24 L${UNIT / 2} 34 L${UNIT / 2 - 9} 24 Z`} />
            <circle cx={UNIT / 2} cy="24" r="2" fill={stroke} stroke="none" />
            {/* The connecting stem that makes the band continuous. */}
            <path d={`M40 24 L${UNIT / 2 - 9} 24`} opacity="0.55" />
            <path d={`M${UNIT / 2 + 9} 24 L${UNIT - 40} 24`} opacity="0.55" />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * A single horn glyph. Used as a bullet, a list marker and the "more" affordance
 * on cards, small enough to read as punctuation rather than illustration.
 */
export function HornMark({
  className,
  stroke = "currentColor",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-auto", className)}
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 30 C 4 14, 18 5, 29 11 C 38 16, 37 30, 27 33 C 20 35, 15 29, 19 24" />
    </svg>
  );
}
