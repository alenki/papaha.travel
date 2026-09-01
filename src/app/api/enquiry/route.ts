import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Enquiry endpoint.
 *
 * Validates, then hands off. Delivery is intentionally left as a single
 * clearly-marked seam: drop in a Telegram bot call, a CRM webhook or an SMTP
 * send and nothing else has to change.
 *
 * Note on 152-ФЗ: personal data of Russian citizens must be stored on servers
 * located inside Russia. If this is ever wired to a third-party CRM, check
 * where that CRM's database physically lives before sending anything to it.
 */

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(32),
  channel: z.enum(["telegram", "whatsapp", "max", "vk", "phone"]),
  tour: z.string().max(200).optional(),
  dates: z.string().max(200).optional(),
  adults: z.number().int().min(1).max(40),
  children: z.number().int().min(0).max(20),
  message: z.string().max(2000).optional(),
  consent: z.literal(true),
  locale: z.enum(["ru", "en"]),
});

/** Crude in-memory rate limit. Replace with Redis/Upstash if this ever scales. */
const seen = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function limited(key: string) {
  const now = Date.now();
  const entry = seen.get(key);

  if (!entry || now > entry.reset) {
    seen.set(key, { count: 1, reset: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (limited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const enquiry = parsed.data;

  /* ─────────────────────────────────────────────────────────────────────────
   * DELIVERY: [PLACEHOLDER]
   *
   * Nothing is sent anywhere yet. Pick one and wire it here:
   *
   *   Telegram bot (recommended, since it is where they already work):
   *     await fetch(
   *       `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
   *       {
   *         method: "POST",
   *         headers: { "Content-Type": "application/json" },
   *         body: JSON.stringify({
   *           chat_id: process.env.TELEGRAM_CHAT_ID,
   *           parse_mode: "HTML",
   *           text: formatted,
   *         }),
   *       },
   *     );
   *
   *   Email: Resend / SMTP via nodemailer.
   *   CRM:   amoCRM or Bitrix24 webhook; both are standard in this market.
   *
   * Until then the enquiry is logged so nothing is silently dropped during
   * development, and the client still gets a truthful success state because
   * the messenger buttons beside the form are the real channel.
   * ───────────────────────────────────────────────────────────────────────── */

  const formatted = [
    `Заявка с papaha.travel`,
    `Имя: ${enquiry.name}`,
    `Телефон: ${enquiry.phone}`,
    `Канал: ${enquiry.channel}`,
    enquiry.tour ? `Маршрут: ${enquiry.tour}` : null,
    enquiry.dates ? `Даты: ${enquiry.dates}` : null,
    `Человек: ${enquiry.adults} взр.${enquiry.children ? ` + ${enquiry.children} дет.` : ""}`,
    enquiry.message ? `Комментарий: ${enquiry.message}` : null,
    `Язык сайта: ${enquiry.locale}`,
  ]
    .filter(Boolean)
    .join("\n");

  console.info("[enquiry]\n%s", formatted);

  return NextResponse.json({ ok: true });
}
