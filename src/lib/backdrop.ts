"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Which way round a piece of fixed chrome should be, given what is actually
 * painted behind it.
 *
 * The masthead is glass and nothing else — no wash, no tint, no plate. That
 * buys the blur its whole point back, and it costs the one thing a wash was
 * paying for: a guaranteed ground for the type. Snow nav over blurred cream
 * measures 1.1:1, which is not a contrast decision, it is an absence of one.
 *
 * So the bar inverts instead of tinting. Over stone it is snow and gold, over
 * paper it is ink and teal, and the surface classes at the top of globals.css
 * already carry every one of those swaps. All that is missing is knowing
 * which one belongs under it right now — which is this file.
 */
export type Backdrop = "stone" | "paper";

/* -------------------------------------------------------------------------- */
/* Luminance                                                                  */
/* -------------------------------------------------------------------------- */

/** WCAG relative luminance. */
function channel(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(r: number, g: number, b: number): number {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/**
 * The thresholds, derived rather than picked.
 *
 * Ink is 0.0118 and snow is 0.9085, so against a backdrop of luminance L the
 * two options measure (L + 0.05) / 0.0618 and 0.9585 / (L + 0.05). Ink clears
 * 4.5:1 above L = 0.228; snow clears it below L = 0.163. Between those two
 * numbers NEITHER colour reaches 4.5:1 — that is a real property of clear
 * glass over a mid-tone, not a bug, and no amount of detection removes it.
 *
 * The two curves cross at L = 0.193, where both measure 3.94:1, so that is
 * where the decision belongs. The band around it is hysteresis: a backdrop
 * drifting around the crossover would otherwise flip the whole masthead back
 * and forth, and an indecisive masthead is worse than a slightly wrong one.
 */
const TO_PAPER = 0.233;
const TO_STONE = 0.153;

/* -------------------------------------------------------------------------- */
/* Reading colour out of the document                                         */
/* -------------------------------------------------------------------------- */

/**
 * Resolve any CSS colour string to RGBA.
 *
 * Via a 1×1 canvas rather than a regular expression, because computed values
 * on this site are not `rgb()`. The surface tokens are built with `color-mix`
 * in oklab and come back out of `getComputedStyle` as `oklab(0.28 -0.02 -0.02
 * / 0.15)`, which nothing hand-rolled is going to parse correctly. Handing it
 * back to the engine that produced it always parses correctly.
 *
 * Cached by string: a page has a handful of distinct colours and `getImageData`
 * is the single most expensive call in this file.
 */
const colourCache = new Map<string, [number, number, number, number] | null>();

/** A scratch context of the given size. Two are kept, one per caller, because
    the image sampler needs a taller canvas than the colour probe and resizing
    a canvas resets its whole state. */
function scratch(height: number) {
  let ctx: CanvasRenderingContext2D | null | undefined;
  return () => {
    if (ctx !== undefined) return ctx;
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = height;
    ctx = canvas.getContext("2d", { willReadFrequently: true });
    return ctx;
  };
}

const probeContext = scratch(1);

function resolveColour(value: string): [number, number, number, number] | null {
  const hit = colourCache.get(value);
  if (hit !== undefined) return hit;

  const ctx = probeContext();
  let out: [number, number, number, number] | null = null;

  if (ctx) {
    /* fillStyle silently keeps its previous value when handed something it
       cannot parse, so it is set to a known colour first and the result is
       only trusted if it changed. */
    ctx.fillStyle = "#000000";
    ctx.fillStyle = value;
    if (ctx.fillStyle !== "#000000" || value === "#000000") {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      out = [d[0], d[1], d[2], d[3] / 255];
    }
  }

  colourCache.set(value, out);
  return out;
}

/**
 * The luminance of an image, sampled as a column of horizontal strips.
 *
 * One strip would be wrong: the photographs on this site are landscapes, and a
 * landscape is bright at the top and dark at the bottom almost by definition.
 * The bar crosses a specific band of the picture, so it needs that band's
 * luminance and not the whole frame's average.
 *
 * Drawing the image into a 1×STRIPS canvas makes the GPU do the averaging.
 * Cached per element — the result never changes, and this is the only part of
 * the measurement that touches the decoder.
 */
const STRIPS = 12;
const stripCache = new WeakMap<HTMLImageElement, number[]>();
const stripContext = scratch(STRIPS);

function imageStrips(img: HTMLImageElement): number[] | null {
  const hit = stripCache.get(img);
  if (hit) return hit;

  /* Not decoded yet. Deliberately not cached: `schedule` runs again on load. */
  if (!img.complete || img.naturalWidth === 0) return null;

  const ctx = stripContext();
  if (!ctx) return null;

  try {
    ctx.clearRect(0, 0, 1, STRIPS);
    ctx.drawImage(img, 0, 0, 1, STRIPS);
    const d = ctx.getImageData(0, 0, 1, STRIPS).data;

    const out: number[] = [];
    for (let i = 0; i < STRIPS; i += 1) {
      out.push(luminance(d[i * 4], d[i * 4 + 1], d[i * 4 + 2]));
    }
    stripCache.set(img, out);
    return out;
  } catch {
    /* A cross-origin image taints the canvas. Fall back to the colour walk. */
    return null;
  }
}

/**
 * Where in the source image the point `y` falls, as a fraction, accounting for
 * the crop that `object-fit: cover` applies. Every photograph on the site is
 * covered into a fixed ratio, so ignoring the crop would read the wrong band
 * of any picture whose shape does not match its slot.
 */
function sourceFraction(img: HTMLImageElement, y: number): number {
  const box = img.getBoundingClientRect();
  if (box.height === 0) return 0.5;

  let f = (y - box.top) / box.height;

  const source = img.naturalWidth / img.naturalHeight;
  const slot = box.width / box.height;
  if (source < slot) {
    /* Taller than its slot: cropped top and bottom, centred. */
    const visible = source / slot;
    f = (1 - visible) / 2 + f * visible;
  }

  return Math.min(1, Math.max(0, f));
}

/**
 * The luminance painted at one point, whatever is painting it.
 *
 * Three kinds of thing end up under this bar and each answers differently:
 * a photograph, a drawn SVG plate, and a plain coloured box. Hit testing
 * returns the actual painted node in all three cases — including the specific
 * `<path>` inside an SVG — so each one can be asked directly rather than
 * inferred from a class name. Anything transparent defers to its ancestors,
 * which is how the surface tokens end up answering for ordinary sections
 * without being special-cased here.
 */
function luminanceAt(bar: HTMLElement, x: number, y: number): number | null {
  const stack = document
    .elementsFromPoint(x, y)
    .filter((el) => el !== bar && !bar.contains(el));

  for (const el of stack) {
    if (el instanceof HTMLImageElement) {
      const strips = imageStrips(el);
      if (strips) {
        const i = Math.min(
          STRIPS - 1,
          Math.floor(sourceFraction(el, y) * STRIPS),
        );
        return strips[i];
      }
      /* Undecoded or tainted: keep walking rather than guessing. */
      continue;
    }

    const style = getComputedStyle(el);

    /* An SVG shape paints with `fill`, not `background-color`. */
    if (el instanceof SVGElement && el.tagName !== "svg") {
      const filled = resolveColour(style.fill);
      if (filled && filled[3] > 0.5) {
        return luminance(filled[0], filled[1], filled[2]);
      }
    }

    const bg = resolveColour(style.backgroundColor);
    if (bg && bg[3] > 0.5) return luminance(bg[0], bg[1], bg[2]);
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* The reading                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Five points across the bar, as fractions of its width.
 *
 * The masthead is not over one backdrop, it is over a strip of them: the
 * wordmark sits at the left edge and the routes at the right, and on a gallery
 * of tiles those two ends genuinely disagree. Averaging across the width is
 * what stops a single dark tile in a cream grid swinging the whole bar — and
 * it is also the honest limit of the approach, because when the two ends
 * really do differ, one of them gets the wrong answer.
 */
const SAMPLES = [
  0.04, 0.12, 0.22, 0.32, 0.42, 0.5, 0.58, 0.66, 0.74, 0.82, 0.9, 0.96,
];

/**
 * The mean luminance painted behind `bar`, or null if nothing was found.
 *
 * The mean, and not the darkest sample, because the bar is one object and
 * takes one decision. Where the backdrop genuinely disagrees with itself
 * across the width — a grid of photographs against its own gutters, which is
 * most of the gallery — the mean picks the reading that is right for most of
 * the bar and the rest is simply wrong. That is a known and accepted cost of
 * clear glass over tiles, not something a better statistic recovers: no single
 * colour is legible over cream and a dark tile at the same time.
 */
export function readLuminance(bar: HTMLElement): number | null {
  const rect = bar.getBoundingClientRect();
  const y = rect.top + rect.height / 2;

  let total = 0;
  let counted = 0;

  for (const fraction of SAMPLES) {
    const l = luminanceAt(bar, rect.left + rect.width * fraction, y);
    if (l === null) continue;
    total += l;
    counted += 1;
  }

  return counted === 0 ? null : total / counted;
}

/**
 * Track which way round the chrome above the page should be.
 *
 * Starts on stone on both server and client, because every route on the site
 * opens on a stone hero and starting anywhere else flashes the wrong masthead
 * through hydration.
 *
 * Pass the current pathname as `watch`: a client-side navigation replaces the
 * document without necessarily moving the scroll position, which would fire
 * none of the listeners below.
 */
/* -------------------------------------------------------------------------- */
/* The opening section                                                        */
/* -------------------------------------------------------------------------- */

/**
 * The first thing `<main>` actually lays out.
 *
 * Every route opens on a stone hero — the home page on a full-bleed
 * photograph, every other page on PageHero's flat basalt — so the first laid
 * out child of main IS the opener, by construction rather than by convention.
 * Nothing has to be tagged for this to work and nothing can fall out of sync
 * with it, which is the whole reason it is found this way round.
 *
 * The height test is not defensive padding: the home page's first child is
 * FaqSchema, a `<script type="application/ld+json">`, and a script has no box.
 */
function opener(): HTMLElement | null {
  const main = document.getElementById("main");
  if (!main) return null;
  for (const el of Array.from(main.children)) {
    if (el instanceof HTMLElement && el.offsetHeight > 0) return el;
  }
  return null;
}

/**
 * Whether the fixed bar is still sitting over the page's opening section.
 *
 * This is the one piece of state the masthead cannot get from luminance. Over
 * the home hero the reading is *correct* and useless: a daylit sky measures
 * bright, `useBackdrop` dutifully answers "paper", and the bar puts ink type
 * over a photograph because the arithmetic said so. What the bar wants there
 * is not the colour behind it, it is the knowledge that it is over the
 * opening plate — which is a fact about the document, not about a pixel.
 *
 * So it is asked as one: is the bar clear of the opener's bottom edge.
 *
 * `- rect.height` is the handover, and it is a bar-depth early on purpose.
 * The home hero does not end on a straight edge, it ends on the torn paper
 * sheet drawn inside it (see TornEdge in Hero.tsx), which is up to 112px of
 * cream living *within* the section's own box. Handing over at the section's
 * true bottom would run white type over that paper for the last stretch of
 * the scroll. One bar-depth early puts the swap at roughly the moment the
 * tear starts entering the bar, on every viewport in the range.
 *
 * No hysteresis, unlike the luminance thresholds above, and for the opposite
 * reason: this is a monotonic function of scroll position rather than a noisy
 * sample, so there is nothing to flutter — and a band here would only make
 * the flat state feel late coming back on the way up.
 */
export function useOverOpener(
  ref: RefObject<HTMLElement | null>,
  watch?: unknown,
): boolean {
  /* True on both server and client, because every route opens at the top of
     its own hero. The one case that does not — a reload with the scroll
     position restored — is corrected by the first measure() below. */
  const [over, setOver] = useState(true);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    let frame = 0;
    /* Resolved once and re-resolved only if the node leaves the document.
       This runs on every painted frame of every scroll, and walking main's
       children is the kind of thing that is free until it is not. */
    let section = opener();

    const measure = () => {
      frame = 0;
      if (!section?.isConnected) section = opener();
      if (!section) return;

      const rect = bar.getBoundingClientRect();
      setOver(rect.bottom < section.getBoundingClientRect().bottom - rect.height);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    /* The opener's height is not settled at mount: its photograph decodes
       late and its type reflows when the display face swaps in. Both move
       the edge this is measured against without moving the scroll position. */
    window.addEventListener("load", schedule, true);
    const resize = new ResizeObserver(schedule);
    resize.observe(document.documentElement);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule, true);
      resize.disconnect();
    };
  }, [ref, watch]);

  return over;
}

export function useBackdrop(
  ref: RefObject<HTMLElement | null>,
  watch?: unknown,
): Backdrop {
  const [backdrop, setBackdrop] = useState<Backdrop>("stone");

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const l = readLuminance(bar);
      if (l === null) return;
      setBackdrop((current) => {
        if (current === "stone" && l > TO_PAPER) return "paper";
        if (current === "paper" && l < TO_STONE) return "stone";
        return current;
      });
    };

    /* At most one reading per painted frame. Scroll fires far faster than the
       compositor paints and a five-point hit test is not free. */
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    /* Photographs decode after the layout that placed them, so the first
       reading of an image slot is always the placeholder underneath it.
       Capture phase, because `load` on an <img> does not bubble. */
    window.addEventListener("load", schedule, true);

    /* The boundary also moves without any scrolling: a font swapping, a reveal
       resolving a section's height. The document's own box catches those. */
    const resize = new ResizeObserver(schedule);
    resize.observe(document.documentElement);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule, true);
      resize.disconnect();
    };
  }, [ref, watch]);

  return backdrop;
}
