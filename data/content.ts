// Тексты секций. Структура — здесь, сами тексты — в messages/{locale}.json.
import { t, type Locale } from "@/lib/i18n";
import { m } from "@/paraglide/messages.js";

export const techItems = [
  "OpenAI",
  "Claude",
  "Telegram",
  "Next.js",
  "n8n",
  "Make",
  "Supabase",
  "PostgreSQL",
  "amoCRM",
  "Bitrix24",
  "1С",
  "ЮKassa",
  "Stripe",
  "WhatsApp",
];

export function getPainsSection(locale: Locale) {
  const o = t(locale);
  return {
    eyebrow: m.pains_eyebrow({}, o),
    title: m.pains_title({}, o),
    subtitle: m.pains_subtitle({}, o),
    now: m.pains_now({}, o),
    withUs: m.pains_with_us({}, o),
    problemSr: m.pains_problem_sr({}, o),
    solutionSr: m.pains_solution_sr({}, o),
    items: [
      { pain: m.pain_1({}, o), solution: m.pain_1_solution({}, o) },
      { pain: m.pain_2({}, o), solution: m.pain_2_solution({}, o) },
      { pain: m.pain_3({}, o), solution: m.pain_3_solution({}, o) },
      { pain: m.pain_4({}, o), solution: m.pain_4_solution({}, o) },
      { pain: m.pain_5({}, o), solution: m.pain_5_solution({}, o) },
      { pain: m.pain_6({}, o), solution: m.pain_6_solution({}, o) },
    ],
  };
}

export function getProcessSection(locale: Locale) {
  const o = t(locale);
  return {
    eyebrow: m.process_eyebrow({}, o),
    title: m.process_title({}, o),
    subtitle: m.process_subtitle({}, o),
    steps: [
      { title: m.process_1_title({}, o), text: m.process_1_text({}, o), duration: m.process_1_duration({}, o) },
      { title: m.process_2_title({}, o), text: m.process_2_text({}, o), duration: m.process_2_duration({}, o) },
      { title: m.process_3_title({}, o), text: m.process_3_text({}, o), duration: m.process_3_duration({}, o) },
      { title: m.process_4_title({}, o), text: m.process_4_text({}, o), duration: m.process_4_duration({}, o) },
      { title: m.process_5_title({}, o), text: m.process_5_text({}, o), duration: m.process_5_duration({}, o) },
      { title: m.process_6_title({}, o), text: m.process_6_text({}, o), duration: m.process_6_duration({}, o) },
    ],
  };
}

export type WhyIcon = "palette" | "lock" | "file" | "calendar" | "sparkles" | "lifebuoy";

export function getWhySection(locale: Locale) {
  const o = t(locale);
  return {
    eyebrow: m.why_eyebrow({}, o),
    title: m.why_title({}, o),
    subtitle: m.why_subtitle({}, o),
    items: [
      { icon: "palette", title: m.why_1_title({}, o), text: m.why_1_text({}, o) },
      { icon: "lock", title: m.why_2_title({}, o), text: m.why_2_text({}, o) },
      { icon: "file", title: m.why_3_title({}, o), text: m.why_3_text({}, o) },
      { icon: "calendar", title: m.why_4_title({}, o), text: m.why_4_text({}, o) },
      { icon: "sparkles", title: m.why_5_title({}, o), text: m.why_5_text({}, o) },
      { icon: "lifebuoy", title: m.why_6_title({}, o), text: m.why_6_text({}, o) },
    ] satisfies { icon: WhyIcon; title: string; text: string }[],
  };
}

export function getFaqSection(locale: Locale) {
  const o = t(locale);
  return {
    eyebrow: m.faq_eyebrow({}, o),
    title: m.faq_title({}, o),
    items: [
      { q: m.faq_1_q({}, o), a: m.faq_1_a({}, o) },
      { q: m.faq_2_q({}, o), a: m.faq_2_a({}, o) },
      { q: m.faq_3_q({}, o), a: m.faq_3_a({}, o) },
      { q: m.faq_4_q({}, o), a: m.faq_4_a({}, o) },
      { q: m.faq_5_q({}, o), a: m.faq_5_a({}, o) },
      { q: m.faq_6_q({}, o), a: m.faq_6_a({}, o) },
      { q: m.faq_7_q({}, o), a: m.faq_7_a({}, o) },
      { q: m.faq_8_q({}, o), a: m.faq_8_a({}, o) },
    ],
  };
}

export function getCtaSection(locale: Locale) {
  const o = t(locale);
  return {
    eyebrow: m.cta_eyebrow({}, o),
    title: m.cta_title({}, o),
    subtitle: m.cta_subtitle({}, o),
    bullets: [m.cta_bullet_1({}, o), m.cta_bullet_2({}, o), m.cta_bullet_3({}, o)],
    telegramLead: m.cta_telegram_lead({}, o),
    telegramCta: m.write_telegram({}, o),
  };
}
