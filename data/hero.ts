// Первый экран и витрина. Тексты — в messages/{locale}.json (ключи hero_*, showcase_*).
import { t, type Locale } from "@/lib/i18n";
import { m } from "@/paraglide/messages.js";

export function getHero(locale: Locale) {
  const o = t(locale);
  return {
    // TODO: актуализировать или убрать бейдж (hero_badge)
    badge: m.hero_badge({}, o),
    title: m.hero_title({}, o),
    titleAccent: m.hero_title_accent({}, o),
    subtitle: m.hero_subtitle({}, o),
    primaryCta: { label: m.hero_cta_primary({}, o), href: "#contact" },
    secondaryCta: { label: m.hero_cta_secondary({}, o), href: "#services" },
    // TODO: заменить на реальные цифры студии (hero_metric_*)
    metrics: [
      { value: m.hero_metric_1_value({}, o), label: m.hero_metric_1_label({}, o) },
      { value: m.hero_metric_2_value({}, o), label: m.hero_metric_2_label({}, o) },
      { value: m.hero_metric_3_value({}, o), label: m.hero_metric_3_label({}, o) },
      { value: m.hero_metric_4_value({}, o), label: m.hero_metric_4_label({}, o) },
    ],
  };
}

export function getShowcase(locale: Locale) {
  const o = t(locale);
  return {
    label: m.showcase_label({}, o),
    site: {
      url: "your-company.ru",
      nav: [m.showcase_site_nav_1({}, o), m.showcase_site_nav_2({}, o), m.showcase_site_nav_3({}, o)],
      title: m.showcase_site_title({}, o),
      subtitle: m.showcase_site_subtitle({}, o),
      cta: m.showcase_site_cta({}, o),
      features: [m.showcase_site_feature_1({}, o), m.showcase_site_feature_2({}, o), m.showcase_site_feature_3({}, o)],
    },
    bot: {
      title: m.showcase_bot_title({}, o),
      subtitle: m.showcase_bot_subtitle({}, o),
      greeting: m.showcase_bot_greeting({}, o),
      services: [m.showcase_bot_service_1({}, o), m.showcase_bot_service_2({}, o)],
      askTime: m.showcase_bot_ask_time({}, o),
      times: ["11:00", "14:30", "16:30"],
      pickedTime: "16:30",
      done: m.showcase_bot_done({}, o),
    },
    lead: {
      title: m.showcase_lead_title({}, o),
      flow: [m.showcase_lead_site({}, o), "CRM", "Telegram"],
      note: m.showcase_lead_note({}, o),
    },
  };
}
