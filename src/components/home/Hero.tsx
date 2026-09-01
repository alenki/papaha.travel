"use client";

import { useRef } from "react";
import { preload } from "react-dom";
import { useScroll, useTransform, useReducedMotion } from "motion/react";
import { M } from "@/components/motion/motionTag";
import { SplitText } from "@/components/motion/SplitText";
import { DUR, EASE } from "@/lib/motion";
import { HERO } from "@/content/copy";
import { localePath, pick, type Locale } from "@/lib/i18n";
import { seeded } from "@/lib/utils";
import { Figure } from "@/components/ui/Figure";
import { ButtonLink } from "@/components/ui/Button";

/**
 * The hero.
 *
 * One plate, edge to edge, and the mark set on top of it. Nothing else: no
 * kicker, no readouts, no marginalia. The instruments belong to the sections
 * below, where there is something to measure — up here the only job is to say
 * whose site this is, in one breath, and then get out of the way.
 *
 * Two details carry the weight:
 *
 *   THE MARK    "PAPAHA TRAVEL" in Oswald 350, stacked as two six-letter
 *               words so the pair squares up into a block — the same block,
 *               and at the same 3.45:2.22 proportion, as the supplied logo.
 *               See the note over the @font-face in globals.css for why this
 *               face and not the one the mark was actually lettered in.
 *
 *   THE TEAR    the section does not end, it rips. The page below is paper and
 *               this one is stone, and the whole identity is that pair, so the
 *               seam between them is drawn as a sheet of paper torn away from
 *               a photograph rather than as a straight edge.
 */

/**
 * The mark is a name: it is not translated and it is not localised. Set in
 * mixed case and uppercased in CSS, so a screen reader is handed "Papaha
 * Travel" rather than being invited to spell it out.
 *
 * The two colours are not a flourish — they are the logo. Cream "PAPAHA" over
 * gold "TRAVEL", both laid on teal, is the whole colour logic of the identity
 * (see the note at the top of globals.css), and this is the one place on the
 * site big enough to state it. On the graded plate that is 8.2:1 and 5.6:1.
 *
 * `track` is the second thing the logo does, and the reason the lockup reads
 * as a block rather than as two lines: in the mark the two words are drawn to
 * the same width, 90 px against 89 on a 27 px cap. That falls out of the
 * lettering — every glyph in it is about one cap-half wide — and it does not
 * fall out of Oswald, whose T, R, V, E and L are all narrower than its P, A
 * and H.
 *
 * The numbers below are measured off the rendered page rather than off the
 * font, and they have to be: SplitText gives every character its own
 * inline-block, and a specimen measurement does not predict what that does to
 * the run. Flush against flush, TRAVEL inks 6.9% narrower than PAPAHA. These
 * two values close that to 1.5%, which is the gap the logo itself carries —
 * 90 px against 89. The indent is not the tracking, and is not a typo: it
 * covers the trailing letter-space (see .u-wordmark) plus the fact that the
 * line opens on a T and closes on an L, whose side bearings would otherwise
 * settle the word left of the one above it.
 *
 * Both are verified, not derived. Changing either means re-measuring the ink
 * of the two lines off a screenshot; the browser will not tell you.
 */
const WORDMARK = [
  { text: "Papaha", tone: "text-snow", track: "" },
  {
    text: "Travel",
    tone: "text-[var(--accent)]",
    track: "tracking-[0.0058em] indent-[0.013em]",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* The torn edge                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The seam between the hero and the page under it.
 *
 * The first pass at this drew the edge as teeth: a flat baseline with a
 * triangle spiked out of it every so often. That is the obvious way to do it
 * and it is wrong twice over. The baseline is *flat*, and no torn sheet is;
 * and the incidents are *triangles*, which reads as pinking shears rather than
 * as a tear. Photograph a real torn edge and the emphasis is the other way
 * round — a wide, wandering silhouette that never repeats itself, and a
 * boundary that is not a line at all but a beard of loose fibre several pixels
 * deep, through which the picture behind still shows.
 *
 * So it is built as three things, in that order of importance:
 *
 *   THE WANDER  fractional Brownian motion in three bands — a slow one for
 *               the drift, a middle one for the lumps, a fast one so the line
 *               is never straight — and then two *creases* over the top of it,
 *               which is where most of the character actually comes from. See
 *               the note on `crease`: fBm alone can only roll, and an edge
 *               that rolls is a coastline, not a tear. Noise rather than a sum
 *               of sines throughout, because a sum of sines is periodic and
 *               the eye finds the period. Then seven *incidents*: single
 *               points where the sheet let go, with a steep flank one side and
 *               a long one the other so they come to a proper apex instead of
 *               a symmetric spike. Between them the profile works across about
 *               two thirds of the strip.
 *
 *   THE FUZZ    the same sheet twice more underneath, each pushed about by
 *               `feDisplacementMap` against a band of turbulence and then
 *               softened, at a third and a half of full opacity. Two octaves
 *               of loose fibre, in other words, drawn by the compositor rather
 *               than a thousand more path nodes. This is the layer that turns
 *               the boundary from a line into a depth, and it is the single
 *               biggest reason the seam stopped reading as die-cut.
 *
 *   THE BEARD   ~170 hairs standing off the edge on top of that, each a short
 *               stroke, in three weights. They cluster: the density is itself
 *               noise, so some runs come away almost clean and others are
 *               furred. Kept *short* — long ones stop reading as fibre and
 *               start reading as grass, which was the first thing this got
 *               wrong.
 *
 * Everything is rounded before it can reach the DOM. `seeded` is built on
 * Math.sin, whose final bits are implementation-defined, so the raw floats
 * differ between the Node process that renders the HTML and the V8 that
 * hydrates it — which React reports as a hydration mismatch.
 */

const TEAR_W = 1600;
const TEAR_H = 150;
/** Sample spacing, in viewBox units: ~3.5 px at 1440, sub-pixel below that. */
const TEAR_STEP = 4;
const TEAR_N = TEAR_W / TEAR_STEP;

/** One decimal place, and no more. See the note above. */
const r1 = (n: number) => Math.round(n * 10) / 10;

/** Random value at one lattice point. Seeds are spread far enough apart that
 *  no octave can land on another octave's samples. */
const lattice = (i: number, seed: number) => seeded(i + seed * 1013.7 + 91.3);

/** Value noise: smoothstep between lattice points, so the curve is C1 and the
 *  lattice never shows up as a crease. */
function noise(x: number, seed: number) {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return lattice(i, seed) * (1 - u) + lattice(i + 1, seed) * u;
}

/** Fractional Brownian motion, normalised to roughly [-1, 1]. */
function fbm(x: number, seed: number, octaves: number) {
  let sum = 0;
  let norm = 0;
  let amp = 1;
  let freq = 1;
  for (let o = 0; o < octaves; o += 1) {
    sum += amp * (noise(x * freq, seed + o * 7) * 2 - 1);
    norm += amp;
    amp *= 0.5;
    // Off 2 on purpose: octaves that double exactly keep meeting on the same
    // lattice points, and those coincidences read as regularity.
    freq *= 2.03;
  }
  return sum / norm;
}

/**
 * The sharp half of a ridged fractal.
 *
 * This is what makes the edge break rather than roll, and it is the one thing
 * fBm cannot do on its own. fBm is smooth everywhere, so a profile built only
 * out of it undulates — and a tear does not undulate. It runs along the grain
 * for a while, jumps across it, and runs again, so what it leaves is long calm
 * stretches punctuated by creases.
 *
 * Folding the noise at zero puts a crease at each of its zero crossings, which
 * is the classic ridged fractal. The catch is that a ridged fractal is sharp
 * on one side and smooth on the other, so used whole it spends most of its
 * range on the smooth half and the creases end up as the *small* feature. So
 * the smooth half is thrown away: `steep` is high enough that this reads zero
 * along most of the width and only lifts off near a crossing, which leaves a
 * term that is nothing at all most of the way across and a spike where it
 * isn't. |fBm| is locally linear either side of a crossing, so what that spike
 * comes to is a point, and `steep` is also what sets how broad the point is.
 *
 * Two of them, at opposite signs: a wide, frequent one for the tabs of paper
 * standing up into the picture, and a narrow, rarer one for the bites taken
 * out of the sheet. The asymmetry is the whole character of the thing — a
 * tear leaves far more of the first than the second, and dialling the two to
 * match turns the edge into a row of icicles.
 */
const crease = (x: number, seed: number, octaves: number, steep: number) =>
  Math.max(0, 1 - Math.abs(fbm(x, seed, octaves)) * steep);

/**
 * Soft limiter. The profile has to stay inside the strip, and a hard clamp
 * does that by leaving dead flat runs wherever it bites — which is the one
 * shape this whole exercise is trying to avoid. tanh is linear through the
 * middle, so everything that was already in range comes out untouched, and
 * only the excursions that would have overshot get compressed.
 */
const squash = (v: number, mid: number, reach: number) =>
  mid + reach * Math.tanh((v - mid) / reach);

type Tear = { d: string; xs: number[]; ys: number[] };

function tearGeometry(seed: number, floor: number): Tear {
  // Where the sheet gave way. `lead` is the flank the tear ran into and `trail`
  // the one it ran out of; they differ, so the crest is a kink rather than the
  // apex of an isosceles triangle. Some go up (a tab still attached) and some
  // down (a bite taken out) in roughly equal measure.
  const incidents = Array.from({ length: 7 }, (_, k) => ({
    c: (0.05 + seeded(seed + k * 97 + 5) * 0.9) * TEAR_N,
    lead: 1 + seeded(seed + k * 29 + 3) * 3.5,
    trail: 3.5 + seeded(seed + k * 53 + 11) * 15,
    depth:
      (0.035 + Math.pow(seeded(seed + k * 71 + 23), 1.5) * 0.17) *
      (seeded(seed + k * 41 + 17) < 0.55 ? -1 : 1),
  }));

  const xs: number[] = [];
  const ys: number[] = [];

  for (let i = 0; i <= TEAR_N; i += 1) {
    const t = i / TEAR_N;
    let v =
      floor +
      fbm(t * 2.4, seed, 2) * 0.22 + // the wander
      fbm(t * 7.5, seed + 63, 3) * 0.26 + // the lumps
      fbm(t * 118, seed + 91, 2) * 0.05 - // the grain
      crease(t * 7, seed + 47, 3, 6) * 0.34 + // tabs standing up
      crease(t * 11, seed + 129, 3, 9) * 0.12; // bites taken out

    for (const s of incidents) {
      const dx = i - s.c;
      const w = dx < 0 ? s.lead : s.trail;
      if (Math.abs(dx) < w) {
        v += s.depth * 0.5 * (1 + Math.cos((Math.PI * dx) / w));
      }
    }

    // Held under half a step, so the sequence stays monotonic in x and the
    // outline can never fold back over itself.
    const jx =
      i === 0 || i === TEAR_N
        ? 0
        : (seeded(seed + i * 31 + 7) - 0.5) * TEAR_STEP * 0.7;

    xs.push(r1(i * TEAR_STEP + jx));
    // Together with the amplitudes above this puts the profile across about
    // 62% of the strip. The ceiling on that is the CTA: see the note on the
    // strip's own height for how the two are kept from meeting.
    ys.push(r1(squash(v, floor, 0.42) * TEAR_H));
  }

  // Closed well below the strip rather than on it: the fuzz layers are the same
  // path shoved around by a displacement map and lifted, and a bottom edge that
  // sat exactly on TEAR_H would get shoved off it and open a seam.
  const foot = TEAR_H + 40;
  const line = xs.map((x, i) => `${x},${ys[i]}`).join(" L");
  return { d: `M0,${foot} L${line} L${TEAR_W},${foot} Z`, xs, ys };
}

/**
 * The three weights the beard is drawn in, coarsest last so it sits on top.
 *
 * Widths are in viewBox units and are allowed to squash with everything else,
 * which looks like the wrong call and is not. The strip is one artwork 1600
 * units wide stretched to whatever the viewport is, so at 1440 a unit is 0.9 px
 * and on a phone it is a quarter of that. Pinned to screen pixels instead —
 * `non-scaling-stroke`, which is what this had first — the hairs keep their
 * width while the spacing between them collapses, and two hundred crisp 1 px
 * strokes across 390 px stop being a beard and become a comb. Letting them
 * thin out with the rest is what makes them fall back into the haze at small
 * sizes, which is where they belong.
 */
const FIBRE_WEIGHTS = [
  { width: 0.9, opacity: 0.32, reach: 7 },
  { width: 1.5, opacity: 0.48, reach: 10 },
  { width: 2.6, opacity: 0.65, reach: 14 },
] as const;

function fibrePaths(tear: Tear, seed: number) {
  const bundles: string[][] = [[], [], []];

  for (let n = 0; n < 380; n += 1) {
    const i = 2 + Math.floor(seeded(seed + n * 17 + 3) * (TEAR_N - 4));
    // Beards rather than an even fringe: the density is noise too, so the
    // edge has bald runs and furred ones the way a real one does.
    const density = 0.5 + 0.5 * fbm((i / TEAR_N) * 5.5, seed + 211, 2);
    if (seeded(seed + n * 43 + 9) > density * 0.92) continue;

    const g = seeded(seed + n * 61 + 13);
    const weight = g < 0.58 ? 0 : g < 0.89 ? 1 : 2;
    // Cubed, so the overwhelming majority are stubble a couple of units long
    // and full-length ones are the exception. Paper fibre is about a millimetre.
    const h = 1.6 + Math.pow(seeded(seed + n * 89 + 21), 3) * FIBRE_WEIGHTS[weight].reach;
    // Barely any lean. Fibre pulled out of a sheet stands off it; anything
    // raked over reads as something growing.
    const lean = (seeded(seed + n * 23 + 5) - 0.5) * h * 0.34;

    bundles[weight].push(
      `M${tear.xs[i]},${tear.ys[i]}q${r1(lean * 0.2)},${r1(-h * 0.6)} ${r1(lean)},${r1(-h)}`,
    );
  }

  return bundles;
}

/** Lint that came away with the sheet and is no longer touching it. Ten is
 *  enough to be felt; more and it reads as dust on the lens. */
function fleckPath(tear: Tear, seed: number) {
  return Array.from({ length: 10 }, (_, k) => {
    const i = 4 + Math.floor(seeded(seed + k * 131 + 19) * (TEAR_N - 8));
    const gap = 2.5 + seeded(seed + k * 59 + 31) * 9;
    const len = 1.5 + seeded(seed + k * 83 + 41) * 3.5;
    const lean = (seeded(seed + k * 37 + 47) - 0.5) * len;
    return `M${tear.xs[i]},${r1(tear.ys[i] - gap)}l${r1(lean)},${r1(-len)}`;
  }).join(" ");
}

/**
 * The two fuzz octaves, coarse first.
 *
 * `scale` is how far the displacement map is allowed to shove the outline, so
 * it sets how deep that octave of fibre reaches; `lift` raises the whole copy
 * off the edge so the shoving has somewhere to happen. The turbulence is
 * deliberately anisotropic — a low frequency down the y axis and a high one
 * across x — because that is what makes the noise field vary quickly along the
 * edge but hold its value up a fibre's length, which is the difference between
 * strands and a field of blobs.
 */
const FUZZ = [
  { lift: 7, freq: "0.09 0.025", scale: 26, blur: "0.85 2.4", opacity: 0.34, seed: 11 },
  { lift: 2.5, freq: "0.2 0.06", scale: 15, blur: "0.3 0.75", opacity: 0.62, seed: 29 },
] as const;

function TornEdge() {
  const tear = tearGeometry(83, 0.52);
  const beard = fibrePaths(tear, 401);
  const flecks = fleckPath(tear, 727);

  return (
    /*
      Three numbers, and each of them is load-bearing.

      9vw is the one that matters. The artwork is 1600 × 150 units stretched to
      fill this box, so the tear is only drawn at its true proportions when the
      box's own ratio matches — a height of 150/1600 of the width, which is
      9.375vw. Miss it and the whole profile is scaled anisotropically: the
      first version of this held a 3.5rem floor on a phone, which stretched the
      tabs to about half again their height while the width squashed to a
      quarter, and every sharp feature came out as a needle. At 9vw a phone and
      a laptop are drawing the same shape.

      11vh is the CTA. That button's floor is the hero's bottom padding,
      `clamp(5.5rem,13vh,9rem)`, and the tear reaches across nearly two thirds
      of its strip, so a strip governed by width alone would climb into the
      button on any window that is wide and short — 1600×677 puts 9vw well past
      where 13vh has stopped. Capping on the same axis is what closes that:
      wherever 13vh is live the gap is 13vh less 11vh of the tear's own reach,
      which cannot go to zero, and outside that range the fixed 5.5rem floor is
      already the larger number. Measured worst case over the usual grid: 17 px.

      7rem is only so the strip stops growing on a very wide monitor. Past
      about 1200px it does cost the true ratio, but in the flattening
      direction, which the profile wears far better than the other one.
    */
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[clamp(2.5rem,min(9vw,11vh),7rem)]"
    >
      <svg
        viewBox={`0 0 ${TEAR_W} ${TEAR_H}`}
        preserveAspectRatio="none"
        className="h-full w-full"
        role="presentation"
      >
        <defs>
          <path id="tear-sheet" d={tear.d} />
          {FUZZ.map((f) => (
            <filter
              key={f.seed}
              id={`tear-fuzz-${f.seed}`}
              x="-2%"
              y="-45%"
              width="104%"
              height="190%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency={f.freq}
                numOctaves={4}
                seed={f.seed}
                result="n"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="n"
                scale={f.scale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
              {/* Softened along y only. Blurring across the width would take
                  the strands with it and leave a plain gradient. */}
              <feGaussianBlur stdDeviation={f.blur} />
            </filter>
          ))}
        </defs>

        {FUZZ.map((f) => (
          <use
            key={f.seed}
            href="#tear-sheet"
            y={-f.lift}
            fill="var(--color-paper)"
            opacity={f.opacity}
            filter={`url(#tear-fuzz-${f.seed})`}
          />
        ))}
        <path
          d={flecks}
          fill="none"
          stroke="var(--color-paper)"
          strokeWidth={1.3}
          strokeOpacity={0.22}
          strokeLinecap="round"
        />
        {beard.map((d, i) => (
          <path
            key={FIBRE_WEIGHTS[i].width}
            d={d.join(" ")}
            fill="none"
            stroke="var(--color-paper)"
            strokeWidth={FIBRE_WEIGHTS[i].width}
            strokeOpacity={FIBRE_WEIGHTS[i].opacity}
            strokeLinecap="round"
          />
        ))}
        {/* Last, and opaque: the fibres have to grow out of the sheet, not sit
            on it, so their roots go under. */}
        <use href="#tear-sheet" fill="var(--color-paper)" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function Hero({ locale }: { locale: Locale }) {
  // The mark is the largest thing on the page and the first thing painted, so
  // its face is fetched alongside the document rather than after the stylesheet
  // has been parsed. The Latin subset only: the masthead sets the mark as
  // «ПАПАХА» on every route, so the Cyrillic one is preloaded in the layout.
  preload("/fonts/oswald-latin-wght-normal.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The plate sinks, the type lifts away faster. Same trick as before, gentler
  // now that the type is centred over the picture instead of beside it.
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // The preloader runs ~2.2s; the hero starts arriving just under it so the two
  // sequences read as one continuous movement rather than two events.
  const BASE_DELAY = 0.25;

  // Reduced motion keeps every fade — things should still *arrive* — but drops
  // the choreography around them. Someone who asked for less movement should
  // not also be made to sit through a 1.4s cue sequence before the paragraph
  // and the button turn up; that is a second, quieter accessibility failure.
  const cue = (t: number) => (reduced ? Math.min(t, 0.15) : t);
  const span = (t: number) => (reduced ? Math.min(t, 0.35) : t);

  return (
    <section
      ref={ref}
      className="surface-stone relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-[var(--spacing-gutter)] pb-[clamp(5.5rem,13vh,9rem)] pt-[clamp(7rem,17vh,11rem)] text-center"
    >
      {/* ── The plate ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <M.div
          className="absolute inset-0"
          style={reduced ? undefined : { y: plateY }}
        >
          {/* `data-reveal` on everything that ships an `initial` state: Motion
              serialises those as inline styles during SSR, so without scripting
              this plate would stay clipped to nothing. The <noscript> override
              in the layout keys off exactly this attribute. */}
          <M.div
            data-reveal=""
            className="h-full w-full"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: span(1.6), ease: EASE.inOut, delay: cue(BASE_DELAY) }}
          >
            <M.div
              data-reveal=""
              className="h-full w-full"
              initial={{ scale: 1.22 }}
              animate={{ scale: 1 }}
              transition={{ duration: span(2.8), ease: EASE.out, delay: cue(BASE_DELAY) }}
            >
              {/*
                The photograph is Elbrus from Cheget; the tone on HERO.figure
                only governs the drawn plate behind it, which is what renders if
                the file is ever missing. That tone stays glacier, and the
                reason is arithmetic rather than taste. Dusk runs #131f2a to
                #d9ab5f, so a full-bleed crop shows you the *middle* of that
                ramp, and the midpoint between a blue-black and a gold is khaki.
                It read as mud across the whole frame. Glacier's ramp is #16323d
                to #6ba4b7: both ends sit near 200deg, so every value in between
                is still the brand teal. There is no muddy midpoint to land on.
              */}
              <Figure
                figure={HERO.figure}
                locale={locale}
                fill
                preload
                sizes="100vw"
                className="h-full w-full"
              />
            </M.div>
          </M.div>
        </M.div>

        {/*
          Nothing else. No grade, no centre scrim, no vignette, no survey
          rules — the photograph is the whole background and it is left alone.

          The cost is measured and it is real: over the brightest snow the mark
          runs about 2.5:1 and its gold about 1.8:1, under the 3:1 that large
          text owes, and the header's snow nav now has only the sky under it.
          Anything laid back over the picture to fix that is another effect, so
          it stays off until asked for.
        */}
      </div>

      {/* ── The mark ───────────────────────────────────────────────────── */}
      <M.div
        className="relative flex w-full max-w-[72rem] flex-col items-center"
        style={reduced ? undefined : { y: typeY, opacity: fade }}
      >
        <h1 className="u-wordmark">
          {WORDMARK.map((line, i) => (
            <SplitText
              key={line.text}
              as="span"
              text={line.text}
              by="char"
              className={`block ${line.tone} ${line.track}`}
              immediate
              delay={cue(BASE_DELAY + 0.35 + i * 0.2)}
              step={0.055}
              duration={span(1.15)}
            />
          ))}
        </h1>

        {/* Pure white rather than the snow-2 every other lead on the site
            gets, heavier than .u-lead's 340, and a step up from --text-lead.
            This is the only paragraph that has to hold its own against a
            photograph instead of a flat surface, so all three of the things
            that carry it — value, stroke and size — are taken up. Overridden
            here rather than in .u-lead because nothing else on the site is
            set over an ungraded picture.

            The size is the token's own ramp scaled by about an eighth, kept
            as a clamp of the same shape so it still tracks the viewport
            rather than pinning to one measurement. The measure is in ch, so
            it grows with the type and the paragraph holds its two lines. */}
        <M.p
          data-reveal=""
          className="u-lead mt-[clamp(2.25rem,8vh,5.5rem)] max-w-[36ch] text-[clamp(1.1875rem,1.7vw,1.625rem)] font-[450] text-white"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: span(DUR.lg), ease: EASE.out, delay: cue(BASE_DELAY + 1.0) }}
        >
          {pick(HERO.lead, locale)}
        </M.p>

        <M.div
          data-reveal=""
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: span(DUR.lg), ease: EASE.out, delay: cue(BASE_DELAY + 1.15) }}
          className="mt-9 sm:mt-11"
        >
          {/* Solid on stone is snow-on-basalt at 16:1, and the fill wipes to
              the mark's own gold at 11:1. Rounded because the reference is,
              and because it is the one round corner on the site — which is
              precisely what makes it the thing you click.

              Taller than `lg`'s own py-5: at the pill radius a button reads
              by its height, and the site's one call to action should not be
              the same size as the ones in a card footer. Local, so every
              other lg button keeps the shared measure. */}
          <ButtonLink
            href={localePath("/tours", locale)}
            variant="solid"
            size="lg"
            magnetic
            className="rounded-full py-7"
          >
            {pick(HERO.cta, locale)}
          </ButtonLink>
        </M.div>
      </M.div>

      <TornEdge />
    </section>
  );
}
