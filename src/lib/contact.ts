import { CONTACT } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/**
 * Enquiry deep links.
 *
 * Channel priority is not a design preference: it is how this market actually
 * behaves. Telegram is the default business channel for Russian travel; MAX has
 * been preinstalled on new devices since September 2025 and is now unavoidable;
 * WhatsApp is essentially an inbound-foreigner channel here and so only appears
 * on the English side.
 *
 * Two hard rules:
 *   · `encodeURIComponent` is the only correct encoder. `encodeURI` leaves
 *     &, ?, # and , unescaped; `escape` emits legacy %uXXXX that neither
 *     Telegram nor WhatsApp will decode.
 *   · The pre-filled text is never load-bearing. Telegram Desktop has a
 *     long-standing bug mangling Cyrillic in `?text=`, so the message must be
 *     a convenience, never the only way the enquiry reaches us.
 */

export type Channel = "telegram" | "max" | "vk" | "whatsapp" | "phone" | "email";

export type Enquiry = {
  /** Human-readable tour title, not the slug. */
  tour?: string;
  dates?: string;
  pax?: string;
  locale?: Locale;
};

/** Kept well under ~250 source characters, since some Android intent handlers truncate. */
export function enquiryText({
  tour,
  dates,
  pax,
  locale = "ru",
}: Enquiry = {}): string {
  const parts: string[] = [];

  if (locale === "ru") {
    parts.push("Здравствуйте. Пишу с сайта papaha.travel.");
    if (tour) parts.push(`Маршрут: ${tour}`);
    if (dates) parts.push(`Даты: ${dates}`);
    if (pax) parts.push(`Человек: ${pax}`);
    parts.push("Подскажите свободные даты и стоимость.");
  } else {
    parts.push("Hello. Writing from papaha.travel.");
    if (tour) parts.push(`Route: ${tour}`);
    if (dates) parts.push(`Dates: ${dates}`);
    if (pax) parts.push(`Travellers: ${pax}`);
    parts.push("Could you confirm availability and price?");
  }

  return parts.join("\n");
}

export function contactHref(channel: Channel, enquiry: Enquiry = {}): string {
  const text = encodeURIComponent(enquiryText(enquiry));

  switch (channel) {
    case "telegram":
      return `https://t.me/${CONTACT.telegram}?text=${text}`;
    case "whatsapp":
      return `https://wa.me/${CONTACT.whatsapp}?text=${text}`;
    case "max":
      // MAX has no documented ?text= prefill as of August 2026.
      return `https://max.ru/${CONTACT.max}`;
    case "vk":
      return `https://vk.me/${CONTACT.vk}`;
    case "phone":
      return `tel:+${CONTACT.phoneRaw}`;
    case "email":
      return `mailto:${CONTACT.email}`;
  }
}

export type ChannelMeta = { id: Channel; label: string; primary?: boolean };

/**
 * The channels we surface, in order, for a given locale.
 * Russian visitors never see WhatsApp; English visitors never see MAX or VK.
 */
export function channelsFor(locale: Locale): ChannelMeta[] {
  if (locale === "ru") {
    return [
      { id: "telegram", label: "Telegram", primary: true },
      { id: "phone", label: "Позвонить" },
      { id: "max", label: "MAX" },
      { id: "vk", label: "ВКонтакте" },
    ];
  }
  return [
    { id: "telegram", label: "Telegram", primary: true },
    { id: "whatsapp", label: "WhatsApp" },
    { id: "phone", label: "Call us" },
    { id: "email", label: "Email" },
  ];
}
