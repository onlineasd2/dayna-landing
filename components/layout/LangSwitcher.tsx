import { localeLabels, localeNames, localizedPath, locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

type Props = {
  locale: Locale;
  /** Путь текущей страницы без языкового префикса */
  path?: string;
  className?: string;
};

/** Переключатель языка: обычные ссылки на ту же страницу в другой локали. */
export function LangSwitcher({ locale, path = "/", className }: Props) {
  return (
    <nav aria-label={m.lang_switcher_label({}, { locale })} className={className}>
      <ul className="flex items-center rounded-lg border border-border-strong p-0.5">
        {locales.map((l) => (
          <li key={l}>
            <a
              href={localizedPath(l, path)}
              hrefLang={l}
              lang={l}
              aria-current={l === locale ? "true" : undefined}
              title={localeNames[l]}
              className={cn(
                "block rounded-md px-2 py-1 text-xs font-medium transition-colors",
                l === locale ? "bg-white/[0.08] text-fg" : "text-subtle hover:text-fg",
              )}
            >
              {localeLabels[l]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
