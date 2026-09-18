import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { leadSchema } from "@/lib/schemas";
import { formatLeadMessage, sendTelegramMessage, TelegramConfigError } from "@/lib/telegram";

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// Коды ошибок: rate_limit | bad_request | invalid | send_failed — клиент показывает текст на языке страницы
export async function POST(req: Request) {
  const limit = rateLimit(clientIp(req));
  if (!limit.ok) {
    return Response.json(
      { ok: false, error: "rate_limit" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "invalid", issues: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Honeypot заполнен — это бот. Отвечаем «успехом», чтобы не подсказывать.
  if (lead.website) {
    return Response.json({ ok: true });
  }

  const message = formatLeadMessage(lead, req.headers.get("referer"));

  try {
    await sendTelegramMessage(message);
  } catch (error) {
    if (error instanceof TelegramConfigError && process.env.NODE_ENV !== "production") {
      // Локально без токенов: показываем заявку в консоли, чтобы можно было проверить форму
      console.warn(`[lead] ${error.message}. Заявка:\n${message}`);
      return Response.json({ ok: true, dev: true });
    }
    console.error("[lead] Не удалось отправить заявку в Telegram:", error);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
