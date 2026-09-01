import type { L } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EVERYTHING THE CLIENT NEEDS TO FILL IN LIVES IN THIS FILE.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Search the project for the string `PLACEHOLDER` to find every value that is
 *  invented. Nothing else in the codebase hard-codes a phone number, a legal
 *  entity, a price or an address: it all resolves from here.
 *
 *  See README.md → "Handover checklist" for the ordered list.
 */

export const PLACEHOLDER = "PLACEHOLDER" as const;

export const SITE = {
  /** Canonical origin. Used for sitemap, OG images, JSON-LD, hreflang. */
  url: "https://papaha.travel",

  name: "Papaha",
  nameLocalised: { ru: "Папаха", en: "Papaha" } satisfies L,

  /** Appended after the page title, e.g. "Тур на Эльбрус: Папаха". */
  titleSuffix: { ru: "Папаха", en: "Papaha" } satisfies L,

  tagline: {
    ru: "Авторские туры по Кабардино-Балкарии и Северному Кавказу",
    en: "Guided journeys through Kabardino-Balkaria and the North Caucasus",
  } satisfies L,

  description: {
    ru: "Небольшая команда из Нальчика. Возим в Приэльбрусье, Верхнюю Балкарию, Чегемское ущелье и на Джилы-Су. На своих машинах, малыми группами, круглый год.",
    en: "A small team out of Nalchik. We run trips to Elbrus, Upper Balkaria, the Chegem gorge and Dzhily-Su. Our own vehicles, small groups, all year round.",
  } satisfies L,

  city: { ru: "Нальчик", en: "Nalchik" } satisfies L,
  region: { ru: "Кабардино-Балкария", en: "Kabardino-Balkaria" } satisfies L,
  country: { ru: "Россия", en: "Russia" } satisfies L,

  /** Nalchik city centre. Drives the map embed and LocalBusiness JSON-LD. */
  coords: { lat: 43.4981, lng: 43.6189 },

  /** Nalchik sits at roughly 512 m. The altimeter counts up from here. */
  baseAltitude: 512,
  summitAltitude: 5642,

  founded: 2016,
} as const;

/* ───────────────────────────── Contact ──────────────────────────────────── */

export const CONTACT = {
  /** PLACEHOLDER: replace with the real number, E.164 with no punctuation. */
  phoneRaw: "79280000000",
  phoneDisplay: "+7 928 000-00-00",

  /** PLACEHOLDER */
  email: "hello@papaha.travel",

  /* Channel order is set in lib/contact.ts. Telegram leads on the Russian
     side, WhatsApp appears only on the English side. */

  /** PLACEHOLDER: Telegram username without the @. The primary RU channel. */
  telegram: "papahatravel",
  /** PLACEHOLDER: MAX username. Preinstalled on Russian devices since Sep 2025. */
  max: "papahatravel",
  /** PLACEHOLDER: VK community short name. */
  vk: "papahatravel",
  /** PLACEHOLDER. WhatsApp: digits only, no +, no spaces, no dashes. */
  whatsapp: "79280000000",

  instagram: "papaha.travel",
  /** PLACEHOLDER */
  youtube: "@papahatravel",

  address: {
    ru: "г. Нальчик, [PLACEHOLDER: улица, дом, офис]",
    en: "Nalchik, [PLACEHOLDER: street, building, office]",
  } satisfies L,

  hours: {
    ru: "Ежедневно, с 09:00 до 21:00 (МСК)",
    en: "Daily, 09:00 to 21:00 (Moscow time)",
  } satisfies L,

  /** Shown next to the phone so nobody expects an instant web reply. */
  responseNote: {
    ru: "Отвечаем в Telegram быстрее всего, обычно в течение часа",
    en: "Telegram gets the fastest reply, usually within the hour",
  } satisfies L,

  /** The promise made on the form. Keep it one that can actually be kept. */
  responsePromise: {
    ru: "Получили. Ответим сегодня до 21:00 по московскому времени.",
    en: "Got it. We'll reply today before 21:00 Moscow time.",
  } satisfies L,
} as const;

/* ───────────────────────────── Legal ────────────────────────────────────── */
/*
 * Russian travellers check these before they transfer money. An empty footer
 * here reads as a scam, so every field must be filled before launch.
 */

export const LEGAL = {
  /** PLACEHOLDER: e.g. «ИП Иванов Иван Иванович» or «ООО „Папаха“». */
  entity: {
    ru: "ИП [PLACEHOLDER: Фамилия Имя Отчество]",
    en: "Sole trader [PLACEHOLDER: full name]",
  } satisfies L,

  /** PLACEHOLDER: 12 digits for ИП, 10 for ООО. */
  inn: "[PLACEHOLDER: ИНН]",
  /** PLACEHOLDER: 15 digits for ИП (ОГРНИП), 13 for ООО (ОГРН). */
  ogrn: "[PLACEHOLDER: ОГРНИП]",

  /** PLACEHOLDER: registry number, if they hold one. */
  registry: "[PLACEHOLDER: номер в реестре туроператоров, если есть]",

  /** Year the privacy policy and offer were last revised. */
  documentsUpdated: "2026",
} as const;

/* ───────────────────────────── Proof ────────────────────────────────────── */
/*
 * PLACEHOLDER: every one of these numbers must be checked against reality
 * before launch. Inflated counts are the fastest way to lose a Russian
 * traveller who cross-checks you on 2GIS.
 */

export const STATS: { value: number; suffix?: L; label: L }[] = [
  {
    value: 9,
    label: { ru: "лет в горах", en: "years in these mountains" },
  },
  {
    value: 4200,
    suffix: { ru: "+", en: "+" },
    label: { ru: "гостей приняли", en: "guests hosted" },
  },
  {
    value: 38,
    label: { ru: "маршрута в активе", en: "routes in the book" },
  },
  {
    value: 5642,
    suffix: { ru: " м", en: " m" },
    label: { ru: "высшая точка", en: "highest point reached" },
  },
];

/* ───────────────────────────── Navigation ───────────────────────────────── */

export type NavItem = { href: string; label: L; index: string };

/*
 * The English labels are transcreated, not translated. "From the Road" carries
 * the register the literal "Gallery" loses.
 */
export const NAV: NavItem[] = [
  { href: "/tours", label: { ru: "Туры", en: "Tours" }, index: "01" },
  { href: "/about", label: { ru: "О нас", en: "Who We Are" }, index: "02" },
  { href: "/gallery", label: { ru: "Галерея", en: "From the Road" }, index: "03" },
  { href: "/contact", label: { ru: "Контакты", en: "Get in Touch" }, index: "04" },
];

export const LEGAL_NAV: NavItem[] = [
  {
    href: "/legal/privacy",
    label: { ru: "Политика конфиденциальности", en: "Privacy policy" },
    index: "",
  },
  {
    href: "/legal/offer",
    label: { ru: "Публичная оферта", en: "Public offer" },
    index: "",
  },
  {
    href: "/legal/consent",
    label: {
      ru: "Согласие на обработку данных",
      en: "Data processing consent",
    },
    index: "",
  },
  // Not legal boilerplate, but it belongs with it: the CC BY-SA photographs on
  // this site are only licensed while their authors are credited.
  {
    href: "/credits",
    label: { ru: "Фотографии", en: "Photographs" },
    index: "",
  },
];

/* ───────────────────────────── Altimeter stations ───────────────────────── */
/*
 * The scroll-linked readout in the header names the altitude band you are
 * "standing in" as you move down the page. Real elevations, real places.
 */

export const STATIONS: { m: number; name: L }[] = [
  { m: 512, name: { ru: "Нальчик", en: "Nalchik" } },
  { m: 809, name: { ru: "Голубые озёра", en: "Blue Lakes" } },
  { m: 1030, name: { ru: "Чегемские водопады", en: "Chegem Falls" } },
  { m: 1740, name: { ru: "Эль-Тюбю", en: "El-Tyubyu" } },
  { m: 2015, name: { ru: "Актопрак", en: "Aktoprak Pass" } },
  { m: 2350, name: { ru: "Азау", en: "Azau" } },
  { m: 2500, name: { ru: "Джилы-Су", en: "Dzhily-Su" } },
  { m: 3500, name: { ru: "Станция «Мир»", en: "Mir Station" } },
  { m: 3847, name: { ru: "Гара-Баши", en: "Gara-Bashi" } },
  { m: 4700, name: { ru: "Косая полка", en: "The Traverse" } },
  { m: 5642, name: { ru: "Западная вершина", en: "West Summit" } },
];
