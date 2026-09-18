import { z } from "zod";
import { featureIds, projectTypeIds, urgencyIds } from "@/data/pricing";

// Телефон, @username в Telegram или email
const phone = /^\+?[\d\s()-]{7,20}$/;
const username = /^@?[a-zA-Z][a-zA-Z0-9_]{3,31}$/;
const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Поля контакта — общие для формы заявки и последнего шага квиза. */
export const contactFieldsSchema = z.object({
  name: z.string().trim().min(2, "Как к вам обращаться?").max(80, "Слишком длинное имя"),
  contact: z
    .string()
    .trim()
    .min(1, "Оставьте телефон, Telegram или email")
    .max(120, "Слишком длинный контакт")
    .refine((v) => phone.test(v) || username.test(v) || email.test(v), "Укажите телефон, @username или email"),
  comment: z.string().trim().max(1000, "Не больше 1000 символов").optional(),
  // Honeypot: скрытое поле, которое заполняют только боты
  website: z.string().max(200).optional(),
});

export type ContactFields = z.infer<typeof contactFieldsSchema>;

export const quizParamsSchema = z.object({
  type: z.enum(projectTypeIds),
  features: z.array(z.enum(featureIds)).max(featureIds.length),
  urgency: z.enum(urgencyIds),
});

export type QuizParams = z.infer<typeof quizParamsSchema>;

export const leadSchema = z.discriminatedUnion("source", [
  contactFieldsSchema.extend({ source: z.literal("form") }),
  contactFieldsSchema.extend({ source: z.literal("quiz"), quiz: quizParamsSchema }),
]);

export type LeadPayload = z.infer<typeof leadSchema>;
