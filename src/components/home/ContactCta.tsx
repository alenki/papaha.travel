import { SECTIONS } from "@/content/copy";
import { CONTACT } from "@/content/site";
import { channelsFor, contactHref } from "@/lib/contact";
import { localePath, pick, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { Contour } from "@/components/ui/Contour";

/**
 * The closing call.
 *
 * Every channel is one tap with the enquiry already written, because that is
 * how this market books. The form is offered second, not first.
 */
export function ContactCta({
  locale,
  /** Pre-fills the messenger draft when this sits on a tour page. */
  tourTitle,
}: {
  locale: Locale;
  tourTitle?: string;
}) {
  const channels = channelsFor(locale);

  return (
    <section className="surface-stone relative overflow-hidden py-[var(--spacing-section)]">
      <Contour
        className="pointer-events-none absolute -bottom-[40%] -left-[10%] h-[150%] w-[70%] text-glacier"
        seed={44}
        rings={17}
        centres={1}
        opacity={0.09}
      />

      <div className="relative u-shell">
        <div className="mb-10 flex items-baseline gap-4 border-t border-[var(--rule)] pt-6">
          <span className="u-index">08</span>
          <span className="u-label">{pick(SECTIONS.cta.kicker, locale)}</span>
        </div>

        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <SplitText
              as="h2"
              text={pick(SECTIONS.cta.title, locale)}
              by="word"
              className="u-display block max-w-[14ch] text-d1 text-snow"
            />
            <Reveal kind="lift" delay={0.14} className="u-lead mt-7 max-w-[42ch] text-snow-2">
              {pick(SECTIONS.cta.lead, locale)}
            </Reveal>
          </div>

          <Reveal kind="lift" delay={0.2} className="flex flex-col gap-5">
            {/* Channels */}
            <div className="flex flex-wrap gap-2.5">
              {channels.map((channel) => (
                <a
                  key={channel.id}
                  href={contactHref(channel.id, { locale, tour: tourTitle })}
                  target={channel.id === "phone" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={cn(
                    "u-label border px-4 py-3 transition-colors duration-300",
                    channel.primary
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]"
                      : "border-[var(--rule-strong)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
                  )}
                >
                  {channel.label}
                </a>
              ))}
            </div>

            <a
              href={contactHref("phone")}
              className="u-data u-underline w-fit text-[1.35rem] text-snow"
            >
              {CONTACT.phoneDisplay}
            </a>

            <p className="max-w-[34ch] text-sm leading-relaxed text-[var(--fg-3)]">
              {pick(CONTACT.responseNote, locale)}
            </p>

            <ButtonLink
              href={localePath("/contact", locale)}
              variant="outline"
              size="md"
              trailing={<Arrow />}
              className="mt-1 w-fit"
              magnetic
            >
              {locale === "ru" ? "Заполнить заявку" : "Fill in the form"}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
