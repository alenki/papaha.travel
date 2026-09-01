import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 1 -> "01", 12 -> "12". Used by the index numerals throughout the site. */
export function pad(n: number, width = 2) {
  return String(n).padStart(width, "0");
}

/** 245000 -> "245 000" (thin non-breaking spaces, the Russian convention). */
export function groupDigits(n: number) {
  return n.toLocaleString("ru-RU").replace(/ /g, " ");
}

/** 4500 -> "4 500 ₽" */
export function formatPrice(n: number) {
  return `${groupDigits(n)} ₽`;
}

/** 3847 -> "3 847 м" / "3 847 m" */
export function formatAltitude(n: number, locale: "ru" | "en") {
  return `${groupDigits(n)} ${locale === "ru" ? "м" : "m"}`;
}

/** Deterministic pseudo-random in [0,1) from an integer seed: keeps SSR and client in sync. */
export function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Russian numeral agreement.
 *
 * Russian picks one of three forms by the last digits of the number:
 *   1, 21, 31…            → маршрут   (nominative singular)
 *   2–4, 22–24…           → маршрута  (genitive singular)
 *   0, 5–20, 25–30…       → маршрутов (genitive plural)
 *
 * Getting this wrong ("9 маршрута") is immediately, jarringly obvious to a
 * native reader, and it is the single most common tell of a translated site.
 *
 *   plural(9, ["маршрут", "маршрута", "маршрутов"]) // "маршрутов"
 */
export function plural(
  count: number,
  forms: [one: string, few: string, many: string],
) {
  const n = Math.abs(count) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}

/** English is simpler, but keep the call sites symmetrical. */
export function pluralEn(count: number, one: string, many: string) {
  return count === 1 ? one : many;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
