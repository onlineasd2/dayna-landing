import { NextResponse, type NextRequest } from "next/server";

// Языковая маршрутизация: страницы лежат в app/[lang].
//   /…      → русский (базовый язык, без префикса) — внутренний rewrite на /ru/…
//   /en/…   → английский
//   /kz/…   → казахский (код языка kk)
//   /ru/…   → редирект на адрес без префикса, чтобы у страницы был один URL
const PREFIXED = new Set(["en", "kz"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (PREFIXED.has(first)) return NextResponse.next();

  if (first === "ru") {
    // Служебные маршруты метаданных (OG-картинка) Next генерирует с префиксом /ru — отдаём как есть
    if (pathname.endsWith("/opengraph-image") || pathname.includes("/opengraph-image/")) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/ru${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Всё, кроме API, служебных файлов Next и статических файлов с расширением (icon.svg, robots.txt, sitemap.xml…)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
