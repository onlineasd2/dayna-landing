import { ImageResponse } from "next/og";
import { hero } from "@/data/hero";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const title = hero.title.replace("‑", "-");
const subtitle = "Боты · ИИ-агенты · Автоматизация · SaaS · Сайты";

/** Подгружаем подмножество Manrope с кириллицей (только нужные символы) из Google Fonts. */
async function loadFont(weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Manrope:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
    if (!src) return null;
    const res = await fetch(src[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image() {
  const text = `${site.name}${title}${subtitle}${site.tagline}`;
  const [bold, semibold] = await Promise.all([loadFont(800, text), loadFont(600, text)]);
  const fonts = [
    bold && { name: "Manrope", data: bold, weight: 800 as const, style: "normal" as const },
    semibold && { name: "Manrope", data: semibold, weight: 600 as const, style: "normal" as const },
  ].filter((f) => !!f);

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
          fontFamily: "Manrope",
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
          <div style={{ fontSize: 30, fontWeight: 600, color: "#A1A1AA" }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 600 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#C6F432" }} />
          <div style={{ color: "#C6F432" }}>{site.tagline}</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
