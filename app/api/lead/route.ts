import { z } from "zod";
import { calculateEstimate } from "@/data/pricing";
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

export async function POST(req: Request) {
  const limit = rateLimit(clientIp(req));
  if (!limit.ok) {
    return Response.json(
      { ok: false, error: "Слишком много заявок. Попробуйте через несколько минут." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Проверьте поля формы", issues: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Honeypot заполнен — это бот. Отвечаем «успехом», чтобы не подсказывать.
  if (lead.website) {
    return Response.json({ ok: true });
  }

  // Цену пересчитываем на сервере — клиенту не доверяем
  const estimate = lead.source === "quiz" ? calculateEstimate(lead.quiz) : undefined;
  const message = formatLeadMessage(lead, estimate, req.headers.get("referer"));

  try {
    await sendTelegramMessage(message);
  } catch (error) {
    if (error instanceof TelegramConfigError && process.env.NODE_ENV !== "production") {
      // Локально без токенов: показываем заявку в консоли, чтобы можно было проверить форму
      console.warn(`[lead] ${error.message}. Заявка:\n${message}`);
      return Response.json({ ok: true, dev: true });
    }
    console.error("[lead] Не удалось отправить заявку в Telegram:", error);
    return Response.json({ ok: false, error: "Не удалось отправить заявку" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
