/**
 * Cross-breakpoint QA sweep.
 *
 * Visits every route at three viewport widths and reports the things that are
 * easy to break and tedious to catch by eye: horizontal overflow, missing or
 * duplicated <h1>, images without alt text, icon-only buttons with no
 * accessible name, and any console/page error.
 *
 *   node scripts/qa.mjs                 # against localhost:3000
 *   node scripts/qa.mjs http://host     # against something else
 *
 * Uses playwright-core against the browser Playwright already installed, so it
 * pulls no extra binaries.
 */

import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const BASE = process.argv[2] ?? "http://localhost:3000";

const ROUTES = [
  "/ru",
  "/ru/tours",
  "/ru/tours/chegem-el-tyubyu",
  "/ru/tours/prielbrusie",
  "/ru/tours/ves-kavkaz-5-dney",
  "/ru/about",
  "/ru/gallery",
  "/ru/contact",
  "/ru/legal/privacy",
  "/ru/legal/offer",
  "/ru/legal/consent",
  "/ru/does-not-exist",
  "/en",
  "/en/tours",
  "/en/tours/voskhozhdenie-elbrus",
  "/en/about",
  "/en/gallery",
  "/en/contact",
];

const SIZES = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

function findChromium() {
  const root = join(homedir(), "AppData", "Local", "ms-playwright");
  const candidates = [
    join(root, "chromium-1228", "chrome-win64", "chrome.exe"),
    join(root, "chromium-1187", "chrome-win64", "chrome.exe"),
    "/usr/bin/chromium",
    "/usr/bin/google-chrome",
  ];
  return candidates.find((path) => existsSync(path));
}

const executablePath = findChromium();
if (!executablePath) {
  console.error("No Chromium found. Run: npx playwright install chromium");
  process.exit(1);
}

const browser = await chromium.launch({ executablePath });
const problems = [];
let checks = 0;

for (const size of SIZES) {
  const context = await browser.newContext({
    viewport: { width: size.width, height: size.height },
  });
  const page = await context.newPage();

  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 140));
  });
  page.on("pageerror", (e) => errors.push(`PAGEERROR ${e.message.slice(0, 140)}`));

  for (const route of ROUTES) {
    errors.length = 0;
    const response = await page.goto(BASE + route, { waitUntil: "load" });
    // Let the reveal animations and the preloader settle.
    await page.waitForTimeout(1400);

    const metrics = await page.evaluate(() => {
      const de = document.documentElement;
      const imgs = [...document.querySelectorAll("img")];
      const buttons = [...document.querySelectorAll("button, a")];
      return {
        overflow: de.scrollWidth - de.clientWidth,
        h1: document.querySelectorAll("h1").length,
        noAlt: imgs.filter((i) => !i.hasAttribute("alt")).length,
        unnamed: buttons.filter(
          (b) =>
            !b.textContent.trim() &&
            !b.getAttribute("aria-label") &&
            !b.getAttribute("aria-labelledby") &&
            !b.querySelector("[class*='u-sr']"),
        ).length,
        lang: document.documentElement.lang,
      };
    });

    checks += 1;

    // The 404 route is expected to 404; everything else must be 200.
    const expected = route.includes("does-not-exist") ? 404 : 200;
    const real = errors.filter((e) => !/404 \(Not Found\)/.test(e));

    const issues = [];
    if (response?.status() !== expected)
      issues.push(`status ${response?.status()} (want ${expected})`);
    if (metrics.overflow > 1) issues.push(`overflow ${metrics.overflow}px`);
    if (metrics.h1 !== 1) issues.push(`${metrics.h1} h1`);
    if (metrics.noAlt > 0) issues.push(`${metrics.noAlt} img without alt`);
    if (metrics.unnamed > 0) issues.push(`${metrics.unnamed} unnamed control`);
    if (!metrics.lang) issues.push("no html lang");
    if (real.length) issues.push(`console: ${real[0]}`);

    if (issues.length) {
      problems.push(`${size.name.padEnd(8)} ${route.padEnd(34)} ${issues.join(" · ")}`);
    }
  }

  await context.close();
}

/*
 * Reduced motion.
 *
 * The failure mode here is silent and total: a reveal that animates from
 * opacity 0 but never receives its "show" variant leaves the page blank, and
 * nothing in the console says so. So assert that real text is actually painted
 * and that the preloader has released the scroll lock.
 */
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  for (const route of ["/ru", "/ru/tours/prielbrusie", "/ru/gallery", "/en"]) {
    await page.goto(BASE + route, { waitUntil: "load" });
    await page.waitForTimeout(1200);

    const state = await page.evaluate(() => {
      const main = document.querySelector("main");
      const visibleText = (main?.innerText ?? "").trim().length;
      // Only blocks that are actually ON SCREEN and still invisible are bugs.
      // Anything below the fold is legitimately waiting for its scroll trigger.
      const hidden = [...document.querySelectorAll("main h1, main h2, main p")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          const onScreen = r.bottom > 0 && r.top < window.innerHeight && r.height > 0;
          if (!onScreen) return false;
          const cs = getComputedStyle(el);
          return cs.opacity === "0" || cs.visibility === "hidden";
        }).length;
      return {
        visibleText,
        hidden,
        scrollLocked: document.body.style.overflow === "hidden",
        preloader: !!document.querySelector("[data-preloader]"),
      };
    });

    checks += 1;
    const issues = [];
    if (state.visibleText < 400) issues.push(`only ${state.visibleText} chars painted`);
    if (state.hidden > 0) issues.push(`${state.hidden} block(s) stuck at opacity 0`);
    if (state.scrollLocked) issues.push("scroll still locked");
    if (state.preloader) issues.push("preloader still mounted");
    if (issues.length) {
      problems.push(`reduced  ${route.padEnd(34)} ${issues.join(" · ")}`);
    }
  }

  await context.close();
}

await browser.close();

console.log(`\n${checks} page checks across ${SIZES.length} breakpoints + reduced-motion`);
if (problems.length === 0) {
  console.log("PASS — no problems found\n");
} else {
  console.log(`${problems.length} problem(s):\n`);
  problems.forEach((p) => console.log("  " + p));
  console.log("");
  process.exitCode = 1;
}
