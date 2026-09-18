import { z } from "zod";
import { serviceIds } from "@/data/services";
import { locales, t, type Locale } from "@/lib/i18n";
import { m } from "@/paraglide/messages.js";

// Телефон, @username в Telegram или email
const phone = /^\+?[\d\s()-]{7,20}$/;
const username = /^@?[a-zA-Z][a-zA-Z0-9_]{3,31}$/;
const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Схема формы заявки. Тексты ошибок — на языке страницы; на сервере язык не важен. */
export function createContactSchema(locale: Locale) {
  const o = t(locale);
  return z.object({
    name: z.string().trim().min(2, m.error_name_required({}, o)).max(80, m.error_name_long({}, o)),
    contact: z
      .string()
      .trim()
      .min(1, m.error_contact_required({}, o))
      .max(120, m.error_contact_long({}, o))
      .refine((v) => phone.test(v) || username.test(v) || email.test(v), m.error_contact_invalid({}, o)),
    // Услуга необязательна: пустая строка = «не выбрано»
    service: z.union([z.enum([...serviceIds, "other"]), z.literal("")]).optional(),
    comment: z.string().trim().max(1000, m.error_comment_long({}, o)).optional(),
    // Язык страницы, с которой пришла заявка
    locale: z.enum(locales).optional(),
    // Honeypot: скрытое поле, которое заполняют только боты
    website: z.string().max(200).optional(),
  });
}

export type ContactFields = z.infer<ReturnType<typeof createContactSchema>>;

export const leadSchema = createContactSchema("ru");
export type LeadPayload = z.infer<typeof leadSchema>;
