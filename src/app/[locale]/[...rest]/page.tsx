import { notFound } from "next/navigation";

/**
 * Catch-all so unmatched paths render *our* 404 rather than Next's built-in one.
 *
 * `app/[locale]/not-found.tsx` only handles `notFound()` thrown from inside the
 * [locale] tree. A URL like /ru/does-not-exist never matches a route in that
 * tree at all, so without this it escapes to the framework default, losing the
 * layout, the header, the footer and the html lang attribute.
 */
export default function CatchAll(): never {
  notFound();
}
