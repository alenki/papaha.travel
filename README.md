# Papaha — papaha.travel

Website for **Папаха**, a tour operator based in Nalchik, Kabardino-Balkaria.
Russian-primary with a complete English translation.

---

## Running it

```bash
npm install
npm run fonts:sync     # copies the woff2 files out of node_modules into /public/fonts
npm run dev            # http://localhost:3000 → redirects to /ru or /en
```

```bash
npm run build && npm start   # production
npm run lint                 # eslint
npm run typecheck            # tsc --noEmit
npm run qa                   # 73 automated page checks, see "Verification"
npm run qa:nojs              # renders with scripting disabled
```

Node 22+. No environment variables are required to run the site as it stands —
see **Delivery** below for the one that switches the enquiry form on.

---

## The design

**Paper & Stone.** The site alternates between two surfaces, and the contrast
is the concept rather than decoration:

- **Paper** — an archival survey map. Undyed sheep wool, hairline rules,
  marginalia, index numerals, ornament. This is where you *plan*.
- **Stone** — teal night at altitude. Photography, glacier light, silence. This
  is where you *arrive*.

Wrapping any subtree in `.surface-stone` or `.surface-paper` flips every
semantic token underneath it — type colour, rules, accent, form fields, even
the grain blend mode. Components never branch on which surface they sit on.

**The organising idea is altitude.** Nalchik sits at 512 m and the west summit
of Elbrus at 5 642 m, and everything Papaha sells lives somewhere on that line.
So the first-load sequence is an ascent, scroll position is read as elevation,
and the centre of the home page is a scroll-driven altitude scale that names
the station you are passing and lists the routes that reach it.

### Palette

Three colours, lifted off the papaha mark, and the ramps needed to build two
readable surfaces out of them. Defined in `src/app/globals.css` under `@theme`.

| Token | Hex | What it is |
|---|---|---|
| `--color-teal` | `#3f7287` | the ground the logo sits on |
| `--color-snow` | `#f2f5f6` | the mark's "PAPAHA" — type on stone |
| `--color-gold` | `#ebc96a` | the mark's "TRAVEL" — the accent |
| `--color-paper` | `#f2f0e9` | undyed fleece, the inside of a papakha |
| `--color-basalt` | `#0d1a20` | the teal driven down to almost black |
| `--color-ink` | `#101e25` | not black; the teal at its darkest |
| `--color-teal-deep` | `#2c5364` | accent as type, on paper |
| `--color-teal-lit` | `#5c93a9` | instrument readouts on stone (aliased as `--color-glacier`) |
| `--color-gold-ink` | `#7a5e1c` | the one gold dark enough for paper (aliased as `--color-brass`) |

**The accent flips with the surface.** This is the one rule to know, and it
comes from the mark itself: in the logo, cream and gold each sit on teal, but
never on each other and never on cream. So —

| | accent | accent as type | text on an accent fill |
|---|---|---|---|
| **Paper** | teal | `--color-teal-deep` (7.28:1) | `--color-snow` (4.83:1) |
| **Stone** | gold | `--color-gold` (11.04:1) | `--color-basalt` (11.04:1) |

Gold is never set as type on paper — it measures 1.41:1. Anything *filled* with
`--accent` must take `--accent-contrast` for its text, never `--color-snow`
directly: white on gold is 1.46:1. Use `--accent-text` for accent-as-type and
`--accent` for fills and rules; on stone they are the same colour, on paper they
are not, and reaching for the wrong one is the easiest mistake to make here.

### Typography

Every family is **self-hosted**, and every one has native Cyrillic:

- **Oranienbaum** — display. Oleg Pospelov's revival of a turn-of-the-century
  Russian didone. Vertical stress, hairline thins, very tall. Cyrillic is its
  native script, not an afterthought. One weight, always uppercase.
- **Oswald** — the wordmark, and nothing else: "PAPAHA TRAVEL" in the hero,
  «ПАПАХА» in the masthead and the footer ghost. A *match*, not the original —
  the supplied logo is hand-lettered, and measurably so, with an H crossbar
  at 60% of the cap and an E middle arm at 39%, a spread no released typeface
  carries. Oswald was the closest fit in a 233-variant sweep and the only close
  one with a Cyrillic this good, which the masthead needs on every route. It
  sets PAPAHA at 3.48 cap heights against the mark's 3.46. See the note over
  its `@font-face` in `globals.css`.
- **Commissioner** — body. Humanist variable sans with a genuinely well-drawn
  Cyrillic. Carries every word you actually read.
- **Martian Mono** — the instrument face. Altitudes, coordinates, prices,
  indices, every micro-label. Rare for a mono, it has full Cyrillic.

Self-hosting is deliberate: **Google Fonts is unreliable and often blocked
inside Russia**, which is where most of this audience is, and
`next/font/google` fetches at build time — so a build machine without access to
Google would fail outright. It also keeps visitor IPs away from a foreign CDN,
which matters under 152-ФЗ. Total type payload is ~480 KB across both scripts,
of which any one page loads only the subsets its script actually needs.

To change a face: edit `scripts/sync-fonts.mjs`, run `npm run fonts:sync`, then
update the `@font-face` blocks and `--font-*` tokens in `globals.css`.

---

## Structure

```
src/
  app/
    [locale]/            every page; the locale segment IS the root layout
      page.tsx           home
      tours/             index + [slug]
      about, gallery, contact
      legal/[doc]        privacy · offer · consent
      [...rest]          catch-all → renders our 404, not Next's
      not-found.tsx
    api/enquiry/route.ts
    sitemap.ts, robots.ts, globals.css
  components/
    layout/    Header, Footer, Altimeter, MobileMenu, LocaleSwitch, PageHero
    motion/    SmoothScroll (Lenis), Reveal, SplitText, Parallax, Magnetic,
               Marquee, Counter, Preloader, motionTag
    ui/        Button, Plate, Figure, Contour, Ornament, Accordion,
               SectionHead, FaqBlock
    home/      Hero, Manifesto, FeaturedTours, AltitudeScale, Seasons,
               Testimonials, ContactCta, GuidesStrip (About page only)
    tours/     TourCard, TourIndex, BookingCard, Itinerary
    gallery/   GalleryGrid (with lightbox)
    seo/       Schema (JSON-LD)
  content/     ← ALL copy and data lives here. Nothing is hard-coded in a page.
  lib/         i18n, motion tokens, contact deep links, utils
```

### Content model

All authored content is stored bilingually as `{ ru, en }` so the two locales
cannot drift apart. `pick(value, locale)` resolves it. One file per tour under
`src/content/tours/`, so the client can edit a single trip without scrolling
past eight others.

---

## Placeholders

**Search the project for `PLACEHOLDER`.** Everything invented is marked. The
critical items, in the order they should be filled:

1. **`src/content/site.ts`** — phone, email, Telegram/MAX/VK handles, address,
   working hours, and the `LEGAL` block (entity name, ИНН, ОГРНИП). Russian
   travellers check these before transferring money; an empty footer reads as a
   scam.
2. **`src/content/site.ts` → `STATS`** — years, guests, routes. Verify against
   reality; inflated counts are the fastest way to lose someone who
   cross-checks you on 2GIS.
3. **`src/content/testimonials.ts`** — written, not collected. Replace with
   real reviews and keep the source link so the `AggregateRating` stays honest.
4. **`src/content/guides.ts`** — names, portraits, biographies, and the
   accreditation numbers referenced on `/guides`.
5. **`src/content/legal.ts`** — structurally complete drafts in the standard
   Russian form. **Not legal advice.** A lawyer must review them and every
   `[PLACEHOLDER]` must be filled before launch.
6. **Photography** — see below.
7. **`/contact`** — the map is a drawn placeholder; swap in an embedded Yandex
   map.

### Photography

Most slots now carry a real photograph, sourced from Wikimedia Commons under
CC BY, CC BY-SA and public domain terms. **This is interim photography**, good
enough to design and sell against, and it should be replaced by the company's
own archive.

Slots with no photograph fall back to a **drawn survey plate**: a seeded
ridgeline under a graded sky, with topographic contours and the corner
registration marks of a printed sheet. Deterministic, pure SVG, no client JS.
A grey box would misrepresent the design, and a photograph of somewhere else
would misrepresent the place.

#### The pipeline

`scripts/media-manifest.json` is the source of truth. One entry per figure id,
naming a source file, its licence and author, the aspect ratio it is rendered
at, and the focal point that must survive the crop. Then:

```sh
node scripts/fetch-media.mjs          # download, crop, encode, generate
node scripts/fetch-media.mjs --force  # ignore the cached originals
```

That downloads each original into `/.media-cache` (gitignored), crops it to the
slot's exact ratio around its focal point, encodes WebP into `/public/media`,
and writes three generated files:

| file | what it is |
| --- | --- |
| `src/content/media.ts` | figure id → `src`, dimensions, blur placeholder |
| `src/content/credits.ts` | the attribution list rendered at `/credits` |
| `scripts/media-generated.json` | machine record of the last run |

`Figure` looks each slot up in `MEDIA` by id, so the content files stay about
content. A photograph removed from the manifest is deleted from `/public/media`
on the next run and the slot returns to its plate.

To pin a one-off without going through the manifest, set `src` directly on the
figure — an explicit `src` always wins over the lookup.

#### Attribution is not optional

CC BY and CC BY-SA licence the images **only while their authors are credited**.
`/credits` carries that list and the footer links to it from every page. If you
replace the photography with your own, that page empties itself; if you add
someone else's work by hand, add the credit by hand too.

#### What is still missing

Four slots have no free photograph in existence, and all four are easy to shoot:
khychiny for the gastro hero, ayran and cheese, the Tyzyl stone mushrooms, and
the switchbacks up to the Aktoprak pass.

The four guide portraits and the about-page portrait are deliberately left as
plates. Putting a stranger's face under a named colleague's biography
misrepresents that person, so those need real staff photographs.

---

## Enquiries

Channel priority is set by how this market actually behaves, not by habit:
**Telegram first**, then phone, then MAX (preinstalled on Russian devices since
September 2025), then VK. WhatsApp appears **only on the English side**, where
it is an inbound-foreigner channel. Configured in `src/lib/contact.ts`.

The form is short on purpose. It does **not** collect email, city, date of
birth or "how did you hear about us" — each is a 152-ФЗ liability and a
measurable drop in completions, and none is needed to answer the question.
Dates are free text rather than a picker, because "ещё выбираем" is a
legitimate answer and date-range pickers are where mobile conversion dies.

Pre-filled messenger text is never load-bearing: Telegram Desktop has a
long-standing bug mangling Cyrillic in `?text=`, so the draft is a convenience,
not the delivery mechanism.

### Delivery — the one thing left to wire

`src/app/api/enquiry/route.ts` validates, rate-limits and logs. It does not yet
send anywhere. The seam is marked; a Telegram bot is the recommended target,
because it is where the team already works:

```ts
await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: formatted }),
});
```

Until then the messenger buttons beside the form are the real channel, so the
success state the user sees is truthful.

**If this is ever pointed at a third-party CRM, check where that CRM's database
physically lives** — 152-ФЗ requires personal data of Russian citizens to be
stored on servers inside Russia.

---

## SEO

- Static generation for every page in both locales (56 pages).
- `hreflang` alternates on every route, `x-default` → `ru`.
- JSON-LD: `TravelAgency`, `TouristTrip` + `Offer` + itinerary, `FAQPage`,
  `BreadcrumbList`, `Article`. Yandex leans on structured data considerably
  harder than Google does for local businesses.
- `sitemap.xml` with per-URL language alternates; `robots.txt` carries `host`
  so Yandex can pick the canonical mirror. Legal pages are `noindex`.
- **The whole site renders without JavaScript** — ~9 400 characters of real
  content on the home page with scripting off. Motion serialises its `initial`
  state into the SSR markup, so a `<noscript>` override in the layout hands the
  page back.

---

## Verification

```
npm run qa        → 73 page checks · 23 routes × 3 breakpoints + reduced motion
npm run qa:nojs   → renders with scripting disabled
```

`scripts/qa.mjs` drives the Chromium that Playwright already installed (no
extra binaries) and fails on: horizontal overflow, missing or duplicated
`<h1>`, images without `alt`, controls with no accessible name, missing
`html lang`, unexpected status codes, any console or page error, and — under
`prefers-reduced-motion` — content stuck at `opacity: 0` inside the viewport.

Current state: **lint clean · typecheck clean · build clean · 73/73 QA pass.**

Two things that pass and are worth not regressing:

- `html { overflow-x: clip }` — `clip`, not `hidden`. `hidden` turns the
  element into a scroll container and silently breaks every `position: sticky`
  on the site.
- The Seasons table's scroll wrapper is `position: relative`. Its cells hold
  visually-hidden (`position: absolute`) spans for screen readers; without a
  positioned ancestor their containing block is further up the tree, so
  `overflow-x: auto` does not clip them and they drag the page ~300 px wide on
  a phone.

---

## Accessibility

Skip link; a single `<h1>` per page; real landmarks; `aria-current` on active
navigation; the mobile menu and gallery lightbox trap focus, close on Escape
and restore scroll; split text carries one `aria-label` and hides the pieces;
the season grid is a real `<table>` with per-cell text for screen readers;
`:focus-visible` rings on the accent colour throughout.

`prefers-reduced-motion` is honoured in CSS **and** in JS — Lenis does not
initialise, the preloader is skipped entirely, and parallax and magnetic
effects return their static children rather than merely running faster.

---

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind v4 · Motion 13 · Lenis · Zod
