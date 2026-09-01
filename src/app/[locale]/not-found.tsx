import Link from "next/link";
import { NOT_FOUND, UI } from "@/content/copy";
import { DEFAULT_LOCALE, localePath, pick } from "@/lib/i18n";
import { featuredTours } from "@/content/tours";
import { pad } from "@/lib/utils";
import { Contour } from "@/components/ui/Contour";
import { ButtonLink, Arrow } from "@/components/ui/Button";

/**
 * 404.
 *
 * A not-found file cannot read route params, so it renders in the default
 * locale. Rather than apologise, it does the useful thing: offers three roads
 * that do exist.
 */
export default function NotFound() {
  const locale = DEFAULT_LOCALE;
  const suggestions = featuredTours().slice(0, 3);

  return (
    <section className="surface-stone relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-40">
      <Contour
        className="pointer-events-none absolute -right-[10%] top-[-25%] h-[150%] w-[70%] text-glacier"
        seed={99}
        rings={18}
        centres={2}
        opacity={0.1}
      />

      <div className="relative u-shell">
        <span className="u-data mb-8 block text-[clamp(3rem,9vw,7rem)] leading-none text-[var(--accent)]">
          {NOT_FOUND.code}
        </span>

        <h1 className="u-display max-w-[14ch] text-d1 text-snow">
          {pick(NOT_FOUND.title, locale)}
        </h1>

        <p className="u-lead mt-7 max-w-[40ch] text-snow-2">
          {pick(NOT_FOUND.lead, locale)}
        </p>

        <ul className="mt-14 flex flex-col border-t border-[var(--rule)]">
          {suggestions.map((tour, i) => (
            <li key={tour.slug} className="border-b border-[var(--rule)]">
              <Link
                href={localePath(`/tours/${tour.slug}`, locale)}
                className="group flex items-baseline gap-5 py-5"
              >
                <span className="u-index">{pad(i + 1)}</span>
                <span className="u-display flex-1 text-d4 text-snow transition-colors duration-300 group-hover:text-[var(--accent)]">
                  {pick(tour.title, locale)}
                </span>
                <Arrow className="shrink-0 self-center text-snow-3 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink
            href={localePath("/", locale)}
            variant="solid"
            size="md"
            magnetic
          >
            {locale === "ru" ? "На главную" : "Home"}
          </ButtonLink>
          <ButtonLink
            href={localePath("/tours", locale)}
            variant="outline"
            size="md"
            trailing={<Arrow />}
          >
            {pick(UI.allTours, locale)}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
