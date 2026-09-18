import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getHero } from "@/data/hero";
import { getSiteTexts, site } from "@/data/site";
import { baseLocale, langParams, localeFromParam } from "@/lib/i18n";
import { m } from "@/paraglide/messages.js";

// alt — статичный: Next не даёт локализовать его без generateImageMetadata
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Картинка для каждого языка генерируется при сборке
export function generateStaticParams() {
  return langParams.map((lang) => ({ lang }));
}

// Шрифты берём из @fontsource/manrope — без сетевых запросов при сборке.
// Кириллица + cyrillic-ext (казахские буквы) + латиница; Satori сам подбирает файл с нужным глифом.
// У каждого веса своё имя семейства: при одинаковом имени Satori берёт первый файл с глифом и игнорирует вес.
const FONT_DIR = join(process.cwd(), "node_modules/@fontsource/manrope/files");
const SUBSETS = ["cyrillic", "cyrillic-ext", "latin"] as const;
const WEIGHTS = [600, 800] as const;

function loadFonts() {
  return Promise.all(
    WEIGHTS.flatMap((weight) =>
      SUBSETS.map(async (subset) => ({
        name: `Manrope${weight}`,
        data: await readFile(join(FONT_DIR, `manrope-${subset}-${weight}-normal.woff`)),
        weight,
        style: "normal" as const,
      })),
    ),
  );
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const locale = localeFromParam((await params).lang) ?? baseLocale;
  const title = getHero(locale).title;
  const subtitle = m.og_subtitle({}, { locale });
  const tagline = getSiteTexts(locale).tagline;
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0A0A0B",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(198,244,50,0.22), transparent 45%), radial-gradient(rgba(255,255,255,0.08) 1.5px, transparent 1.5px)",
          backgroundSize: "100% 100%, 28px 28px",
          color: "#FAFAFA",
          fontFamily: "Manrope800",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#C6F432",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 22, height: 26, background: "#0A0A0B", borderRadius: "0 13px 13px 0" }} />
          </div>
          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, maxWidth: 1000 }}>{title}</div>
          <div style={{ fontSize: 30, fontFamily: "Manrope600", fontWeight: 600, color: "#A1A1AA" }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontFamily: "Manrope600", fontWeight: 600 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#C6F432" }} />
          <div style={{ color: "#C6F432" }}>{tagline}</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
