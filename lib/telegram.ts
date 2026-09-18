import "server-only";
import { serviceOptions } from "@/data/services";
import type { LeadPayload } from "./schemas";

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const moscowTime = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "Europe/Moscow",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatLeadMessage(lead: LeadPayload, page: string | null): string {
  const service = serviceOptions.find((o) => o.id === lead.service)?.label;
  const lines: string[] = [];

  lines.push("<b>🔥 Новая заявка с сайта</b>", "");
  lines.push(`👤 <b>Имя:</b> ${escapeHtml(lead.name)}`);
  lines.push(`📞 <b>Контакт:</b> ${escapeHtml(lead.contact)}`);
  lines.push(`🧩 <b>Услуга:</b> ${service ? escapeHtml(service) : "не выбрана"}`);

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
