// Общие данные студии: название, контакты, навигация, реквизиты.
// Переводимые тексты — в messages/{locale}.json.
import { t, type Locale } from "@/lib/i18n";
import { m } from "@/paraglide/messages.js";

export const site = {
  // Название в логотипе — одинаковое на всех языках
  name: "Данил",
  // TODO: подключить свой домен и задать NEXT_PUBLIC_SITE_URL. До этого используется адрес Vercel
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  contacts: {
    // TODO: заменить на реальный Telegram
    telegram: "dayna_studio",
    // TODO: заменить на реальный email
    email: "hello@dayna.studio",
    // TODO: заменить на реальный телефон
    phone: "+7 (900) 000-00-00",
    phoneHref: "+79000000000",
  },

  // TODO: заменить на реальные реквизиты
  legal: {
    entity: "ИП Иванов Иван Иванович",
    inn: "000000000000",
    ogrn: "000000000000000",
  },
} as const;

export const telegramUrl = `https://t.me/${site.contacts.telegram}`;

export function getSiteTexts(locale: Locale) {
  const o = t(locale);
  return {
    tagline: m.site_tagline({}, o),
    description: m.site_description({}, o),
    workingHours: m.site_working_hours({}, o),
    legal: m.site_legal(site.legal, o),
  };
}

export function getNav(locale: Locale) {
  const o = t(locale);
  return [
    { label: m.nav_services({}, o), href: "#services" },
    { label: m.nav_process({}, o), href: "#process" },
    { label: m.nav_why({}, o), href: "#why" },
    { label: m.nav_faq({}, o), href: "#faq" },
    { label: m.nav_contacts({}, o), href: "#contact" },
  ];
}
