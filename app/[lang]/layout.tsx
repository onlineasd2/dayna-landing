import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { getSiteTexts, site } from "@/data/site";
import { baseLocale, langParams, languageAlternates, localeFromParam, localizedPath, locales, ogLocales } from "@/lib/i18n";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  // Предзагружаем только кириллицу — латиница подгрузится по unicode-range при необходимости
  subsets: ["cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic"],
  weight: ["600", "700", "800"],
  display: "swap",
});

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

// Все языковые версии генерируются статически; другие значения [lang] — 404
export function generateStaticParams() {
  return langParams.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const locale = localeFromParam((await params).lang) ?? baseLocale;
  const texts = getSiteTexts(locale);
  const title = `${site.name} — ${texts.tagline}`;

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s — ${site.name}` },
    description: texts.description,
    alternates: { canonical: localizedPath(locale, "/"), languages: languageAlternates("/") },
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      url: localizedPath(locale, "/"),
      siteName: site.name,
      title,
      description: texts.description,
    },
    twitter: { card: "summary_large_image", title, description: texts.description },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: Props) {
  const locale = localeFromParam((await params).lang);
  if (!locale) notFound();

  return (
    <html lang={locale} className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="noise min-h-dvh overflow-x-clip" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
