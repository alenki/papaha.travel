// Copies the exact woff2 subsets we use out of the Fontsource packages and into
// /public/fonts, so the site serves its own type with zero third-party requests.
//
// Why self-host at all: Google Fonts is unreliable (and often outright blocked)
// inside Russia, which is where most of this audience is. Self-hosting also keeps
// us clean under 152-ФЗ — no visitor IP is handed to a foreign CDN on page load.
//
//   npm run fonts:sync

import { mkdirSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "fonts");

/** [package, files…] — subsets limited to what a RU/EN site actually renders. */
const MANIFEST = [
  [
    "@fontsource/oranienbaum",
    [
      "oranienbaum-latin-400-normal.woff2",
      "oranienbaum-latin-ext-400-normal.woff2",
      "oranienbaum-cyrillic-400-normal.woff2",
      "oranienbaum-cyrillic-ext-400-normal.woff2",
    ],
  ],
  [
    // The wordmark face. Latin carries "PAPAHA TRAVEL" in the hero; the
    // Cyrillic subsets are not optional here — the masthead sets the mark as
    // «ПАПАХА» on both language sides, so Cyrillic is on every route.
    "@fontsource-variable/oswald",
    [
      "oswald-latin-wght-normal.woff2",
      "oswald-latin-ext-wght-normal.woff2",
      "oswald-cyrillic-wght-normal.woff2",
      "oswald-cyrillic-ext-wght-normal.woff2",
    ],
  ],
  [
    "@fontsource-variable/commissioner",
    [
      "commissioner-latin-wght-normal.woff2",
      "commissioner-latin-ext-wght-normal.woff2",
      "commissioner-cyrillic-wght-normal.woff2",
      "commissioner-cyrillic-ext-wght-normal.woff2",
    ],
  ],
  [
    // The masthead face, and only the masthead. A neo-grotesque rather than
    // Commissioner's humanist one: the navigation is set small but heavier
    // than body copy, and at that weight Commissioner's open apertures and
    // calligraphic stress read as warmth where the bar wants to read as
    // signage.
    "@fontsource-variable/inter",
    [
      "inter-latin-wght-normal.woff2",
      "inter-latin-ext-wght-normal.woff2",
      "inter-cyrillic-wght-normal.woff2",
      "inter-cyrillic-ext-wght-normal.woff2",
    ],
  ],
  [
    "@fontsource-variable/martian-mono",
    [
      "martian-mono-latin-wght-normal.woff2",
      "martian-mono-latin-ext-wght-normal.woff2",
      "martian-mono-cyrillic-wght-normal.woff2",
      "martian-mono-cyrillic-ext-wght-normal.woff2",
    ],
  ],
];

mkdirSync(outDir, { recursive: true });

let copied = 0;
let missing = 0;

for (const [pkg, files] of MANIFEST) {
  for (const file of files) {
    const from = join(root, "node_modules", pkg, "files", file);
    const to = join(outDir, file);
    if (!existsSync(from)) {
      console.error(`  ✗ missing ${pkg}/files/${file} — run npm install`);
      missing += 1;
      continue;
    }
    copyFileSync(from, to);
    copied += 1;
  }
}

console.log(`fonts: ${copied} file(s) synced to public/fonts`);
if (missing) {
  console.error(`fonts: ${missing} file(s) missing`);
  process.exit(1);
}
