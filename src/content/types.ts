import type { L } from "@/lib/i18n";

/**
 * Placeholder-aware image record.
 *
 * `src` is intentionally optional. Where a photograph exists it is served from
 * /public/media; where one does not, the figure renders as a procedurally-drawn
 * topographic plate carrying the same aspect ratio, tone and caption the real
 * photo will. Adding photography later is one property per figure, and no
 * layout moves.
 *
 * Neither `src` nor `blur` is normally set here. `Figure` looks the slot up by
 * id in src/content/media.ts, which `scripts/fetch-media.mjs` generates from
 * scripts/media-manifest.json (where each photograph's source, author and
 * licence live). Set them on the figure only to pin a one-off, which overrides
 * whatever the lookup holds.
 */
export type Figure = {
  id: string;
  alt: L;
  caption?: L;
  /** For example "/media/chegem-01.webp". Omit it to render the placeholder plate. */
  src?: string;
  /**
   * A twenty-pixel-wide WebP data URL held behind the photograph while it
   * loads. On a page this dark an empty box reads as a hole, so every photo
   * fades up out of its own colours instead of out of nothing.
   */
  blur?: string;
  /** width/height. 1.5 = 3:2, 0.75 = 3:4, 1.777 = 16:9 */
  ratio: number;
  /** Which of the palette's landscape tones the plate should be drawn in. */
  tone: FigureTone;
  /** Optional focal point for object-position, 0–100. */
  focus?: { x: number; y: number };
};

export type FigureTone =
  | "glacier"
  | "granite"
  | "clay"
  | "pine"
  | "dusk"
  | "wool";

export type TourFormat =
  | "day"
  | "jeep"
  | "multiday"
  | "trek"
  | "ski"
  | "gastro"
  | "photo"
  | "private";

export type ItineraryStop = {
  /** "08:00" for day tours, "День 1" / "Day 1" handled via `label`. */
  time?: string;
  label?: L;
  title: L;
  text: L;
  altitudeM?: number;
};

export type Tour = {
  slug: string;
  /** Display numeral: 01, 02… Stable across locales. */
  index: number;
  title: L;
  /** Short all-caps label above the title. */
  kicker: L;
  /** One line for cards. */
  summary: L;
  /** Two or three paragraphs for the detail page. */
  description: L[];
  region: L;
  duration: L;
  durationDays: number;
  /** Highest point reached, metres. Drives the altimeter. */
  altitudeM: number;
  /** Round trip from Nalchik, km. */
  distanceKm: number;
  /** From-price per person, RUB. */
  priceFrom: number;
  /** Whole-vehicle private price, RUB. Optional. */
  pricePrivate?: number;
  groupSize: L;
  /** 1 = anyone, 5 = serious mountain days. */
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** Best months, 1–12. Drives the season bar. */
  months: number[];
  seasonNote: L;
  format: TourFormat[];
  highlights: L[];
  itinerary: ItineraryStop[];
  included: L[];
  excluded: L[];
  bring: L[];
  hero: Figure;
  gallery: Figure[];
  coords: { lat: number; lng: number };
  featured?: boolean;
};

export type Guide = {
  slug: string;
  name: L;
  role: L;
  /** Years guiding. */
  since: number;
  languages: L[];
  bio: L[];
  /** A line they actually say on the road. Used as a pull quote. */
  quote: L;
  portrait: Figure;
  /** Highest summit reached, in metres. A small brag stat. */
  peakM?: number;
};

export type Testimonial = {
  id: string;
  name: L;
  city: L;
  tourSlug?: string;
  date: L;
  rating: 1 | 2 | 3 | 4 | 5;
  text: L;
};

export type FaqItem = {
  id: string;
  q: L;
  a: L;
};

export type Landmark = {
  id: string;
  name: L;
  altitudeM: number;
  /** Distance from Nalchik, km. */
  distanceKm: number;
  note: L;
};
