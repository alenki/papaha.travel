"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { z } from "zod";
import { M } from "@/components/motion/motionTag";
import { Button } from "@/components/ui/Button";
import { FORM, UI } from "@/content/copy";
import { CONTACT } from "@/content/site";
import {
  CONSENT_CHECKBOX,
  CONSENT_LINK_OFFER,
  CONSENT_LINK_PRIVACY,
} from "@/content/legal";
import { TOURS } from "@/content/tours";
import { channelsFor, contactHref } from "@/lib/contact";
import { localePath, pick, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { DUR, EASE } from "@/lib/motion";
import { HornMark } from "@/components/ui/Ornament";

/**
 * The enquiry form.
 *
 * Short on purpose. We never ask for an email address, a city, a date of birth
 * or "how did you hear about us": each is a 152-ФЗ liability and a measurable
 * drop in completions, and none of them is needed to answer the question.
 *
 * Dates are free text rather than a picker: "ещё выбираем" is a legitimate
 * answer, and date-range pickers are where mobile conversion goes to die.
 */

const schema = z.object({
  name: z.string().trim().min(2),
  phone: z
    .string()
    .trim()
    // 10 digits after the country code is the Russian shape; be permissive
    // enough for international numbers without letting through nonsense.
    .refine((value) => value.replace(/\D/g, "").length >= 10),
  channel: z.string(),
  tour: z.string().optional(),
  dates: z.string().optional(),
  adults: z.number().int().min(1).max(40),
  children: z.number().int().min(0).max(20),
  message: z.string().max(2000).optional(),
  consent: z.literal(true),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, boolean>>;

/** Formats as +7 (999) 123-45-67 while leaving other country codes alone. */
function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";

  const ru = digits.startsWith("8")
    ? `7${digits.slice(1)}`
    : digits.startsWith("7")
      ? digits
      : digits.length <= 10
        ? `7${digits}`
        : digits;

  if (ru.length > 11) return `+${ru}`;

  const [, a, b, c, d] =
    /^7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/.exec(ru) ?? [];
  if (a === undefined) return `+${ru}`;

  let out = "+7";
  if (a) out += ` (${a}`;
  if (a && a.length === 3) out += ")";
  if (b) out += ` ${b}`;
  if (c) out += `-${c}`;
  if (d) out += `-${d}`;
  return out;
}

export function EnquiryForm({
  locale,
  /** Pre-selects a route when the form is embedded on a tour page. */
  defaultTour,
  className,
}: {
  locale: Locale;
  defaultTour?: string;
  className?: string;
}) {
  const channels = channelsFor(locale).filter(
    (channel) => channel.id !== "email",
  );

  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );
  const [errors, setErrors] = useState<Errors>({});

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState(channels[0]?.id ?? "telegram");
  const [tour, setTour] = useState(defaultTour ?? "");
  const [dates, setDates] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const payload = {
      name,
      phone,
      channel,
      tour: tour || undefined,
      dates: dates || undefined,
      adults,
      children,
      message: message || undefined,
      consent,
      locale,
    };

    const result = schema.safeParse(payload);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        next[issue.path[0] as keyof Errors] = true;
      }
      setErrors(next);
      // Move focus to the first thing that needs fixing.
      const firstKey = Object.keys(next)[0];
      document
        .querySelector<HTMLElement>(`[data-field="${firstKey}"]`)
        ?.focus();
      return;
    }

    setErrors({});
    setState("sending");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(String(response.status));
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  const fieldClass = (invalid?: boolean) =>
    cn(
      "w-full border-b bg-transparent py-3 text-[var(--fg)] outline-none transition-colors duration-300",
      "focus:border-[var(--accent)]",
      invalid ? "border-[var(--accent)]" : "border-[var(--rule-strong)]",
    );

  if (state === "sent") {
    return (
      <M.div
        className={cn("flex flex-col items-start gap-6", className)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.md, ease: EASE.out }}
        role="status"
      >
        <HornMark className="w-10 text-[var(--accent)]" />
        <h3 className="u-display text-d3">{pick(FORM.successTitle, locale)}</h3>
        <p className="u-lead max-w-[40ch]">
          {pick(CONTACT.responsePromise, locale)}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setState("idle");
            setName("");
            setPhone("");
            setDates("");
            setMessage("");
            setConsent(false);
          }}
        >
          {pick(FORM.successAgain, locale)}
        </Button>
      </M.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("flex flex-col gap-8", className)}>
      {/* Name + phone */}
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="u-label mb-2 block">
            {pick(FORM.name.label, locale)} *
          </label>
          <input
            id="f-name"
            data-field="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={pick(FORM.name.placeholder, locale)}
            aria-invalid={errors.name || undefined}
            aria-describedby={errors.name ? "f-name-error" : undefined}
            className={fieldClass(errors.name)}
          />
          {errors.name && (
            <p id="f-name-error" className="u-label u-label-accent mt-2">
              {pick(FORM.name.error, locale)}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="f-phone" className="u-label mb-2 block">
            {pick(FORM.phone.label, locale)} *
          </label>
          <input
            id="f-phone"
            data-field="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder={pick(FORM.phone.placeholder, locale)}
            aria-invalid={errors.phone || undefined}
            aria-describedby={errors.phone ? "f-phone-error" : undefined}
            className={cn(fieldClass(errors.phone), "u-data")}
          />
          {errors.phone && (
            <p id="f-phone-error" className="u-label u-label-accent mt-2">
              {pick(FORM.phone.error, locale)}
            </p>
          )}
        </div>
      </div>

      {/* Channel */}
      <fieldset>
        <legend className="u-label mb-3">
          {pick(FORM.channel.label, locale)}
        </legend>
        <div className="flex flex-wrap gap-2">
          {channels.map((entry) => (
            <label
              key={entry.id}
              className={cn(
                "u-label cursor-pointer border px-4 py-2.5 transition-colors duration-300",
                channel === entry.id
                  ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]"
                  : "border-[var(--rule-strong)] text-[var(--fg-2)] hover:border-[var(--fg)]",
              )}
            >
              <input
                type="radio"
                name="channel"
                value={entry.id}
                checked={channel === entry.id}
                onChange={() => setChannel(entry.id)}
                className="u-sr"
              />
              {entry.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Tour + dates */}
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="f-tour" className="u-label mb-2 block">
            {pick(FORM.tour.label, locale)}
          </label>
          <select
            id="f-tour"
            value={tour}
            onChange={(e) => setTour(e.target.value)}
            className={cn(fieldClass(), "cursor-pointer")}
          >
            <option value="">{pick(FORM.tour.placeholder, locale)}</option>
            {TOURS.map((entry) => (
              <option key={entry.slug} value={pick(entry.title, locale)}>
                {pick(entry.title, locale)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="f-dates" className="u-label mb-2 block">
            {pick(FORM.dates.label, locale)}
          </label>
          <input
            id="f-dates"
            type="text"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            placeholder={pick(FORM.dates.placeholder, locale)}
            className={fieldClass()}
          />
        </div>
      </div>

      {/* Party size */}
      <fieldset>
        <legend className="u-label mb-3">{pick(FORM.pax.label, locale)}</legend>
        <div className="flex flex-wrap gap-8">
          {(
            [
              ["adults", adults, setAdults, FORM.pax.adults, 1],
              ["children", children, setChildren, FORM.pax.children, 0],
            ] as const
          ).map(([key, value, setValue, label, min]) => (
            <div key={key} className="flex items-center gap-4">
              <span className="u-label w-[5.5rem]">{pick(label, locale)}</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setValue(Math.max(min, value - 1))}
                  className="flex h-9 w-9 items-center justify-center border border-[var(--rule-strong)] text-[var(--fg)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  aria-label={`${pick(label, locale)} −`}
                >
                  −
                </button>
                <span className="u-data w-6 text-center text-[var(--fg)]">
                  {value}
                </span>
                <button
                  type="button"
                  onClick={() => setValue(value + 1)}
                  className="flex h-9 w-9 items-center justify-center border border-[var(--rule-strong)] text-[var(--fg)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  aria-label={`${pick(label, locale)} +`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Message */}
      <div>
        <label htmlFor="f-message" className="u-label mb-2 block">
          {pick(FORM.message.label, locale)}
        </label>
        <textarea
          id="f-message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={pick(FORM.message.placeholder, locale)}
          className={cn(fieldClass(), "resize-y")}
        />
      </div>

      {/* Consent */}
      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            data-field="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={errors.consent || undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
          />
          <span className="text-xs leading-relaxed text-[var(--fg-2)]">
            {pick(CONSENT_CHECKBOX, locale)}{" "}
            <Link
              href={localePath("/legal/privacy", locale)}
              className="u-underline text-[var(--fg)]"
            >
              {pick(CONSENT_LINK_PRIVACY, locale)}
            </Link>{" "}
            {locale === "ru" ? "и" : "and"}{" "}
            <Link
              href={localePath("/legal/offer", locale)}
              className="u-underline text-[var(--fg)]"
            >
              {pick(CONSENT_LINK_OFFER, locale)}
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p className="u-label u-label-accent mt-2">
            {pick(FORM.consentError, locale)}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex flex-wrap items-center gap-6">
        <Button
          type="submit"
          variant="solid"
          size="lg"
          disabled={state === "sending"}
        >
          {state === "sending"
            ? pick(FORM.submitting, locale)
            : pick(FORM.submit, locale)}
        </Button>

        <div className="flex items-center gap-3">
          <span className="u-label">{pick(FORM.orWrite, locale)}</span>
          <a
            href={contactHref("telegram", { locale, tour: tour || undefined })}
            target="_blank"
            rel="noopener noreferrer"
            className="u-label u-underline text-[var(--fg)]"
          >
            Telegram
          </a>
        </div>
      </div>

      <AnimatePresence>
        {state === "failed" && (
          <M.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="border-l-2 border-[var(--accent)] pl-4 text-sm text-[var(--fg-2)]"
          >
            {pick(FORM.failure, locale)}
          </M.div>
        )}
      </AnimatePresence>

      <p className="u-label">{pick(UI.enquire, locale)} · {CONTACT.phoneDisplay}</p>
    </form>
  );
}
