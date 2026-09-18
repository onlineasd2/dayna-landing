// Локали и маршрутизация. Тексты — в messages/{locale}.json, компилируются Paraglide в ./paraglide.
import { baseLocale, locales } from "@/paraglide/runtime.js";

export { baseLocale, locales };
export type Locale = (typeof locales)[number];

/** Опции для message-функций Paraglide: m.key({}, t(locale)) */
export const t = (locale: Locale) => ({ locale });

/**
 * Сегмент URL для каждой локали. Базовый русский открывается без префикса («/»),
 * казахский — по «/kz» (код языка при этом kk, как требует BCP 47).
 */
export const localeSegments = { ru: "ru", en: "en", kk: "kz" } as const satisfies Record<Locale, string>;
export type LangParam = (typeof localeSegments)[Locale];

export const langParams = locales.map((l) => localeSegments[l]);

export function localeFromParam(param: string): Locale | undefined {
  return locales.find((l) => localeSegments[l] === param);
}

/** Путь страницы для локали: localizedPath("en", "/privacy") → "/en/privacy" */
export function localizedPath(locale: Locale, path = "/"): string {
  if (locale === baseLocale) return path;
  return `/${localeSegments[locale]}${path === "/" ? "" : path}`;
}

/** hreflang-ссылки на все языковые версии страницы (для metadata.alternates.languages) */
export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((l) => [l, localizedPath(l, path)])),
    "x-default": localizedPath(baseLocale, path),
  };
}

export const localeLabels: Record<Locale, string> = { ru: "RU", en: "EN", kk: "KZ" };
export const localeNames: Record<Locale, string> = { ru: "Русский", en: "English", kk: "Қазақша" };
export const ogLocales: Record<Locale, string> = { ru: "ru_RU", en: "en_US", kk: "kk_KZ" };
