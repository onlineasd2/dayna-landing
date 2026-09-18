"use client";

import { ArrowRight, Menu, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getNav, getSiteTexts, telegramUrl } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";
import { LangSwitcher } from "./LangSwitcher";
import { Logo } from "./Logo";

export function Header({ locale }: { locale: Locale }) {
  const o = { locale };
  const nav = getNav(locale);
  const cta = { label: m.header_cta({}, o), href: "#contact" };
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled || open ? "glass border-border" : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo locale={locale} />

        <nav aria-label={m.nav_main_label({}, o)} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitcher locale={locale} className="hidden sm:block" />
          <div className="hidden sm:block">
            <Button href={cta.href} size="sm">
              {cta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border-strong text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? m.menu_close({}, o) : m.menu_open({}, o)}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {open && (
          <div
            id="mobile-menu"
            className="h-[calc(100dvh-4rem)] animate-fade-in overflow-y-auto border-t border-border bg-bg lg:hidden"
          >
            <Container className="flex h-full flex-col py-6">
              <nav aria-label={m.nav_mobile_label({}, o)}>
                <ul className="flex flex-col">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={close}
                        className="flex items-center justify-between border-b border-border py-4 font-display text-xl font-medium"
                      >
                        {item.label}
                        <ArrowRight className="size-5 text-subtle" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto flex flex-col gap-3 pt-8">
                <LangSwitcher locale={locale} className="self-center sm:hidden" />
                <Button href={cta.href} size="lg" onClick={close}>
                  {cta.label}
                </Button>
                <Button href={telegramUrl} variant="secondary" size="lg" target="_blank" rel="noopener noreferrer">
                  <Send className="size-4" aria-hidden="true" />
                  {m.write_telegram({}, o)}
                </Button>
                <p className="pt-2 text-center text-sm text-subtle">{getSiteTexts(locale).workingHours}</p>
              </div>
            </Container>
          </div>
      )}
    </header>
  );
}
