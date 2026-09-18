import "server-only";
import { features, formatWeeks, projectTypes, urgencies, type Estimate } from "@/data/pricing";
import type { LeadPayload } from "./schemas";
import { formatPrice } from "./utils";

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const moscowTime = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "Europe/Moscow",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatLeadMessage(lead: LeadPayload, estimate: Estimate | undefined, page: string | null): string {
  const lines: string[] = [];
  const source = lead.source === "quiz" ? "Квиз-калькулятор" : "Форма заявки";

  lines.push(`<b>🔥 Новая заявка · ${source}</b>`, "");
  lines.push(`👤 <b>Имя:</b> ${escapeHtml(lead.name)}`);
  lines.push(`📞 <b>Контакт:</b> ${escapeHtml(lead.contact)}`);

  if (lead.source === "quiz") {
    const { type, features: selected, urgency } = lead.quiz;
    const featureList = selected.length
      ? selected.map((id) => `  • ${escapeHtml(features[id].label)}`).join("\n")
      : "  — не выбраны";
    lines.push("");
    lines.push(`🧩 <b>Тип проекта:</b> ${escapeHtml(projectTypes[type].label)}`);
    lines.push(`⚙️ <b>Функции:</b>\n${featureList}`);
    lines.push(`⏱ <b>Срочность:</b> ${escapeHtml(urgencies[urgency].label)}`);
  }

  if (estimate) {
    lines.push(
      `💰 <b>Расчёт:</b> ${formatPrice(estimate.priceMin)} – ${formatPrice(estimate.priceMax)} · ${formatWeeks(estimate.weeksMin, estimate.weeksMax)}`,
    );
  }

  if (lead.comment) {
    lines.push("", `💬 <b>Комментарий:</b>\n${escapeHtml(lead.comment)}`);
  }

  lines.push("", `🕒 ${moscowTime.format(new Date())} МСК`);
  if (page) lines.push(`🌐 ${escapeHtml(page)}`);

  return lines.join("\n");
}

export class TelegramConfigError extends Error {}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new TelegramConfigError("TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Telegram API ${res.status}: ${body.slice(0, 300)}`);
  }
}
