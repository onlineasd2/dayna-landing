import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { baseLocale, languageAlternates, localeFromParam, localizedPath, t } from "@/lib/i18n";
import { m } from "@/paraglide/messages.js";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = localeFromParam((await params).lang) ?? baseLocale;
  const o = t(locale);
  return {
    title: m.privacy_title({}, o),
    description: m.privacy_description({ name: site.name }, o),
    alternates: { canonical: localizedPath(locale, "/privacy"), languages: languageAlternates("/privacy") },
  };
}

// TODO: согласовать текст политики с юристом и указать реальные реквизиты оператора (messages: privacy_*)
export default async function PrivacyPage({ params }: Props) {
  const locale = localeFromParam((await params).lang);
  if (!locale) notFound();
  const o = t(locale);
  const vars = { entity: site.legal.entity, inn: site.legal.inn, email: site.contacts.email };

  const sections = [
    { title: m.privacy_1_title({}, o), text: m.privacy_1_text(vars, o) },
    { title: m.privacy_2_title({}, o), text: m.privacy_2_text({}, o) },
    { title: m.privacy_3_title({}, o), text: m.privacy_3_text({}, o) },
    { title: m.privacy_4_title({}, o), text: m.privacy_4_text({}, o) },
    { title: m.privacy_5_title({}, o), text: m.privacy_5_text({ email: site.contacts.email }, o) },
  ];

  return (
    <main className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <div className="flex items-center justify-between gap-4">
          <Link href={localizedPath(locale, "/")} className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {m.privacy_back({}, o)}
          </Link>
          <LangSwitcher locale={locale} path="/privacy" />
        </div>
        <h1 className="mt-8 font-display text-h2 font-extrabold">{m.privacy_title({}, o)}</h1>

        <div className="mt-10 space-y-8 leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-fg">
          {sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
