import { CONTACT, LEGAL, SITE } from "@/content/site";
import { RATING } from "@/content/testimonials";
import type { FaqItem, Tour } from "@/content/types";
import { pick, type Locale } from "@/lib/i18n";

/**
 * JSON-LD.
 *
 * Yandex leans on structured data considerably harder than Google does for
 * local businesses, and this is a business whose customers are searching in
 * Russian. Worth getting right.
 */

function Ld({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is authored by us, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganisationSchema({ locale }: { locale: Locale }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "@id": `${SITE.url}/#organisation`,
        name: pick(SITE.nameLocalised, locale),
        alternateName: "Papaha Travel",
        description: pick(SITE.description, locale),
        url: `${SITE.url}/${locale}`,
        telephone: `+${CONTACT.phoneRaw}`,
        email: CONTACT.email,
        foundingDate: String(SITE.founded),
        taxID: LEGAL.inn,
        address: {
          "@type": "PostalAddress",
          addressLocality: pick(SITE.city, locale),
          addressRegion: pick(SITE.region, locale),
          addressCountry: "RU",
          streetAddress: pick(CONTACT.address, locale),
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.coords.lat,
          longitude: SITE.coords.lng,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: pick(SITE.region, locale) },
          { "@type": "Place", name: "Elbrus" },
          { "@type": "Place", name: "North Caucasus" },
        ],
        sameAs: [
          `https://instagram.com/${CONTACT.instagram}`,
          `https://t.me/${CONTACT.telegram}`,
          `https://vk.com/${CONTACT.vk}`,
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: RATING.value,
          reviewCount: RATING.count,
          bestRating: 5,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday",
          ],
          opens: "09:00",
          closes: "21:00",
        },
      }}
    />
  );
}

export function TourSchema({
  tour,
  locale,
}: {
  tour: Tour;
  locale: Locale;
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        "@id": `${SITE.url}/${locale}/tours/${tour.slug}#trip`,
        name: pick(tour.title, locale),
        description: pick(tour.summary, locale),
        url: `${SITE.url}/${locale}/tours/${tour.slug}`,
        touristType:
          locale === "ru"
            ? ["Активный отдых", "Природа", "Культура"]
            : ["Adventure", "Nature", "Culture"],
        itinerary: {
          "@type": "ItemList",
          numberOfItems: tour.itinerary.length,
          itemListElement: tour.itinerary.map((stop, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "TouristAttraction",
              name: pick(stop.title, locale),
              description: pick(stop.text, locale),
            },
          })),
        },
        provider: { "@id": `${SITE.url}/#organisation` },
        offers: {
          "@type": "Offer",
          price: tour.priceFrom,
          priceCurrency: "RUB",
          availability: "https://schema.org/InStock",
          url: `${SITE.url}/${locale}/tours/${tour.slug}`,
          validFrom: "2026-01-01",
        },
        subjectOf: {
          "@type": "CreativeWork",
          about: pick(tour.region, locale),
        },
      }}
    />
  );
}

export function FaqSchema({
  items,
  locale,
}: {
  items: FaqItem[];
  locale: Locale;
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: pick(item.q, locale),
          acceptedAnswer: {
            "@type": "Answer",
            text: pick(item.a, locale),
          },
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({
  trail,
  locale,
}: {
  /** [{ name, href }]; href is locale-relative, e.g. "/tours". */
  trail: { name: string; href: string }[];
  locale: Locale;
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: crumb.name,
          item: `${SITE.url}/${locale}${crumb.href === "/" ? "" : crumb.href}`,
        })),
      }}
    />
  );
}
