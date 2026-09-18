// Карточки услуг (bento-сетка) и список услуг для формы заявки.
// Структура — здесь, тексты — в messages/{locale}.json (ключи service_*).
import { t, type Locale } from "@/lib/i18n";
import { m } from "@/paraglide/messages.js";

export const serviceIds = [
  "landing",
  "bot",
  "automation",
  "saas",
  "web-service",
  "ai-integration",
  "ai-agent",
] as const;
export type ServiceId = (typeof serviceIds)[number];

export type ServiceVisual = "agent" | "bot" | "flow" | "dashboard" | "knowledge" | "cabinet" | "landing";

type ServiceTexts = { title: string; short: string; problem: string; result: string; timeline: string };

const layout: Record<ServiceId, { visual: ServiceVisual; layout: string }> = {
  landing: { visual: "landing", layout: "md:col-span-2 lg:col-span-3 lg:row-span-2" },
  bot: { visual: "bot", layout: "lg:col-span-3" },
  automation: { visual: "flow", layout: "lg:col-span-3" },
  saas: { visual: "dashboard", layout: "md:col-span-2 lg:col-span-4" },
  "web-service": { visual: "cabinet", layout: "lg:col-span-2" },
  "ai-integration": { visual: "knowledge", layout: "lg:col-span-3" },
  "ai-agent": { visual: "agent", layout: "lg:col-span-3" },
};

function serviceTexts(id: ServiceId, locale: Locale): ServiceTexts {
  const o = t(locale);
  switch (id) {
    case "landing":
      return {
        title: m.service_landing_title({}, o),
        short: m.service_landing_short({}, o),
        problem: m.service_landing_problem({}, o),
        result: m.service_landing_result({}, o),
        timeline: m.service_landing_timeline({}, o),
      };
    case "bot":
      return {
        title: m.service_bot_title({}, o),
        short: m.service_bot_short({}, o),
        problem: m.service_bot_problem({}, o),
        result: m.service_bot_result({}, o),
        timeline: m.service_bot_timeline({}, o),
      };
    case "automation":
      return {
        title: m.service_automation_title({}, o),
        short: m.service_automation_short({}, o),
        problem: m.service_automation_problem({}, o),
        result: m.service_automation_result({}, o),
        timeline: m.service_automation_timeline({}, o),
      };
    case "saas":
      return {
        title: m.service_saas_title({}, o),
        short: m.service_saas_short({}, o),
        problem: m.service_saas_problem({}, o),
        result: m.service_saas_result({}, o),
        timeline: m.service_saas_timeline({}, o),
      };
    case "web-service":
      return {
        title: m.service_web_title({}, o),
        short: m.service_web_short({}, o),
        problem: m.service_web_problem({}, o),
        result: m.service_web_result({}, o),
        timeline: m.service_web_timeline({}, o),
      };
    case "ai-integration":
      return {
        title: m.service_ai_integration_title({}, o),
        short: m.service_ai_integration_short({}, o),
        problem: m.service_ai_integration_problem({}, o),
        result: m.service_ai_integration_result({}, o),
        timeline: m.service_ai_integration_timeline({}, o),
      };
    case "ai-agent":
      return {
        title: m.service_ai_agent_title({}, o),
        short: m.service_ai_agent_short({}, o),
        problem: m.service_ai_agent_problem({}, o),
        result: m.service_ai_agent_result({}, o),
        timeline: m.service_ai_agent_timeline({}, o),
      };
  }
}

export function getServicesSection(locale: Locale) {
  const o = t(locale);
  return {
    eyebrow: m.services_eyebrow({}, o),
    title: m.services_title({}, o),
    subtitle: m.services_subtitle({}, o),
    cta: m.services_cta({}, o),
    items: serviceIds.map((id) => ({ id, ...layout[id], ...serviceTexts(id, locale) })),
  };
}

/** Варианты услуг для формы заявки */
export function getServiceOptions(locale: Locale) {
  return [
    ...serviceIds.map((id) => ({ id: id as ServiceId | "other", label: serviceTexts(id, locale).short })),
    { id: "other" as const, label: m.service_other({}, t(locale)) },
  ];
}
