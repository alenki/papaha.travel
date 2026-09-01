/**
 * No-JS check.
 *
 * Motion serialises each reveal's `initial` state into the SSR markup, so
 * without scripting the page would render blank. This asserts the <noscript>
 * override actually hands the content back.
 */
import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const BASE = process.argv[2] ?? "http://localhost:3000";
const root = join(homedir(), "AppData", "Local", "ms-playwright");
const exe = [join(root, "chromium-1228", "chrome-win64", "chrome.exe"), "/usr/bin/chromium"]
  .find((p) => existsSync(p));

const browser = await chromium.launch({ executablePath: exe });
const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

let failed = 0;
for (const route of ["/ru", "/ru/tours", "/ru/tours/prielbrusie", "/en"]) {
  await page.goto(BASE + route, { waitUntil: "domcontentloaded" });
  const r = await page.evaluate(() => {
    const els = [...document.querySelectorAll("main h1, main h2, main p")];
    const invisible = els.filter((e) => {
      const cs = getComputedStyle(e);
      return cs.opacity === "0" || cs.visibility === "hidden";
    });
    return {
      total: els.length,
      invisible: invisible.length,
      text: (document.querySelector("main")?.innerText ?? "").trim().length,
      hasNoscript: !!document.querySelector("noscript"),
    };
  });
  const ok = r.invisible === 0 && r.text > 600;
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${route.padEnd(26)} ${r.total} blocks, ${r.invisible} invisible, ${r.text} chars`);
}
await browser.close();
process.exitCode = failed ? 1 : 0;
