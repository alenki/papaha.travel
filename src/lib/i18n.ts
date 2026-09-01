export const LOCALES = ["ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ru";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Every piece of authored content on this site is stored bilingually so the
 * two locales can never drift apart. `L` is that pair.
 */
export type L<T = string> = { ru: T; en: T };

/** Resolve a bilingual value for the active locale. */
export function pick<T>(value: L<T>, locale: Locale): T {
  return value[locale];
}

/** Resolve a bilingual value that may simply be a plain (locale-agnostic) value. */
export function maybe<T>(value: L<T> | T, locale: Locale): T {
  return value && typeof value === "object" && "ru" in (value as L<T>)
    ? (value as L<T>)[locale]
    : (value as T);
}

export const LOCALE_META: Record<
  Locale,
  { label: string; short: string; htmlLang: string; ogLocale: string }
> = {
  ru: { label: "Русский", short: "RU", htmlLang: "ru-RU", ogLocale: "ru_RU" },
  en: { label: "English", short: "EN", htmlLang: "en", ogLocale: "en_US" },
};

/** Prefix an app path with the active locale: ("/tours", "en") -> "/en/tours". */
export function localePath(path: string, locale: Locale) {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** Swap the locale segment of the current pathname, preserving the rest. */
export function swapLocale(pathname: string, next: Locale) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isLocale(segments[0])) {
    segments[0] = next;
    return `/${segments.join("/")}`;
  }
  return `/${next}${pathname === "/" ? "" : pathname}`;
}
