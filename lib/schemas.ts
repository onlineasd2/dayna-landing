import { z } from "zod";
import { serviceIds } from "@/data/services";

// Телефон, @username в Telegram или email
const phone = /^\+?[\d\s()-]{7,20}$/;
const username = /^@?[a-zA-Z][a-zA-Z0-9_]{3,31}$/;
const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Поля формы заявки — общие для клиента и сервера. */
export const contactFieldsSchema = z.object({
  name: z.string().trim().min(2, "Как к вам обращаться?").max(80, "Слишком длинное имя"),
  contact: z
    .string()
    .trim()
    .min(1, "Оставьте телефон, Telegram или email")
    .max(120, "Слишком длинный контакт")
    .refine((v) => phone.test(v) || username.test(v) || email.test(v), "Укажите телефон, @username или email"),
  // Услуга необязательна: пустая строка = «не выбрано»
  service: z.union([z.enum([...serviceIds, "other"]), z.literal("")]).optional(),
  comment: z.string().trim().max(1000, "Не больше 1000 символов").optional(),
  // Honeypot: скрытое поле, которое заполняют только боты
  website: z.string().max(200).optional(),
});

export type ContactFields = z.infer<typeof contactFieldsSchema>;

export const leadSchema = contactFieldsSchema;
export type LeadPayload = z.infer<typeof leadSchema>;
