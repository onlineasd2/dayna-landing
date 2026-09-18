"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { baseLocale, localeFromParam, localizedPath } from "@/lib/i18n";
import { m } from "@/paraglide/messages.js";

// not-found не получает params, поэтому язык берём из адреса в браузере
export default function NotFound() {
  const segment = usePathname().split("/")[1] ?? "";
  const locale = localeFromParam(segment) ?? baseLocale;
  const o = { locale };

  return (
    <main className="flex min-h-dvh items-center py-24">
      <Container className="max-w-xl text-center">
        <p className="font-display text-7xl font-extrabold text-accent">404</p>
        <h1 className="mt-6 font-display text-h2 font-extrabold">{m.not_found_title({}, o)}</h1>
        <p className="mt-4 text-muted">{m.not_found_text({}, o)}</p>
        <Link
          href={localizedPath(locale, "/")}
          className="mt-8 inline-flex h-11 items-center rounded-[var(--radius-btn)] bg-accent px-5 font-medium text-accent-fg"
        >
          {m.not_found_back({}, o)}
        </Link>
      </Container>
    </main>
  );
}
