import type { L } from "@/lib/i18n";
import type { Tour, TourFormat } from "../types";

import { chegem } from "./chegem";
import { balkaria } from "./balkaria";
import { elbrus } from "./elbrus";
import { dzhilySu } from "./dzhily-su";
import { aktoprak } from "./aktoprak";
import { bezengi } from "./bezengi";
import { vesKavkaz } from "./ves-kavkaz";
import { gastro } from "./gastro";
import { voskhozhdenie } from "./voskhozhdenie";

/** Catalogue order is the order they appear on /tours. */
export const TOURS: Tour[] = [
  chegem,
  balkaria,
  elbrus,
  dzhilySu,
  aktoprak,
  bezengi,
  vesKavkaz,
  gastro,
  voskhozhdenie,
];

export function getTour(slug: string): Tour | undefined {
  return TOURS.find((tour) => tour.slug === slug);
}

export function featuredTours(): Tour[] {
  return TOURS.filter((tour) => tour.featured);
}

/** Everything except the given slug, nearest in spirit first. */
export function relatedTours(slug: string, count = 3): Tour[] {
  const current = getTour(slug);
  if (!current) return TOURS.slice(0, count);

  return TOURS.filter((tour) => tour.slug !== slug)
    .map((tour) => ({
      tour,
      score:
        // Shared formats matter most, then a similar day-length.
        tour.format.filter((f) => current.format.includes(f)).length * 3 +
        (tour.durationDays === current.durationDays ? 2 : 0) +
        (Math.abs(tour.altitudeM - current.altitudeM) < 1200 ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((entry) => entry.tour);
}

/* ── Filters ─────────────────────────────────────────────────────────────── */

export const FORMAT_LABELS: Record<TourFormat, L> = {
  day: { ru: "Однодневные", en: "Day trips" },
  jeep: { ru: "Джип-туры", en: "Jeep tours" },
  multiday: { ru: "Многодневные", en: "Multi-day" },
  trek: { ru: "Треккинг и восхождения", en: "Trekking & ascents" },
  ski: { ru: "Зима и лыжи", en: "Winter & ski" },
  gastro: { ru: "Гастрономические", en: "Food" },
  photo: { ru: "Фототуры", en: "Photo tours" },
  private: { ru: "Индивидуальные", en: "Private" },
};

/** Only the formats that at least one tour actually uses. */
export function activeFormats(): TourFormat[] {
  const order: TourFormat[] = [
    "day",
    "jeep",
    "multiday",
    "trek",
    "gastro",
    "photo",
    "ski",
    "private",
  ];
  return order.filter((format) =>
    TOURS.some((tour) => tour.format.includes(format)),
  );
}

export const DIFFICULTY_LABELS: Record<1 | 2 | 3 | 4 | 5, L> = {
  1: { ru: "Прогулка", en: "A walk" },
  2: { ru: "Лёгкий", en: "Easy" },
  3: { ru: "Средний", en: "Moderate" },
  4: { ru: "Сложный", en: "Hard" },
  5: { ru: "Экспедиция", en: "Expedition" },
};

export const MONTHS_SHORT: L<string[]> = {
  ru: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
  en: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
};

export const MONTHS_FULL: L<string[]> = {
  ru: [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
};

/** Cheapest tour in the catalogue, used for the "from" price in the hero. */
export function priceFloor(): number {
  return Math.min(...TOURS.map((tour) => tour.priceFrom));
}
