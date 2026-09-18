import Link from "next/link";
import { Mail, Phone, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getNav, getSiteTexts, site, telegramUrl } from "@/data/site";
import { localizedPath, type Locale } from "@/lib/i18n";
import { m } from "@/paraglide/messages.js";
import { Logo } from "./Logo";

export function Footer({ locale }: { locale: Locale }) {
  const o = { locale };
  const year = new Date().getFullYear();
  const texts = getSiteTexts(locale);
  const nav = getNav(locale);
  return (
    <footer className="border-t border-border pb-24 pt-14 md:pb-10">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo locale={locale} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{texts.tagline}</p>
          </div>

          <nav aria-label={m.nav_footer_label({}, o)}>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-subtle">{m.footer_sections({}, o)}</p>
            <ul className="space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-muted transition-colors hover:text-fg">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-subtle">{m.footer_contacts({}, o)}</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
                  <Send className="size-4" aria-hidden="true" />@{site.contacts.telegram}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contacts.email}`} className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
                  <Mail className="size-4" aria-hidden="true" />
                  {site.contacts.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contacts.phoneHref}`} className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
                  <Phone className="size-4" aria-hidden="true" />
                  {site.contacts.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. {texts.legal}
          </p>
          <Link href={localizedPath(locale, "/privacy")} className="transition-colors hover:text-fg">
            {m.footer_privacy({}, o)}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
