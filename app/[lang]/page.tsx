import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TelegramFab } from "@/components/layout/TelegramFab";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { PainsSolutions } from "@/components/sections/PainsSolutions";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { WhyUs } from "@/components/sections/WhyUs";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { getFaqSection } from "@/data/content";
import { getServicesSection } from "@/data/services";
import { getSiteTexts, site, telegramUrl } from "@/data/site";
import { localeFromParam, localizedPath, type Locale } from "@/lib/i18n";
import { m } from "@/paraglide/messages.js";

function JsonLd({ locale }: { locale: Locale }) {
  const url = new URL(localizedPath(locale, "/"), site.url).toString();
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url,
        logo: `${site.url}/icon.svg`,
        description: getSiteTexts(locale).description,
        email: site.contacts.email,
        telephone: site.contacts.phone,
        sameAs: [telegramUrl],
        makesOffer: getServicesSection(locale).items.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.result },
        })),
      },
      {
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: getFaqSection(locale).items.map((i) => ({
          "@type": "Question",
          name: i.q,
          acceptedAnswer: { "@type": "Answer", text: i.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify + экранирование «<», чтобы исключить XSS через контент
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const locale = localeFromParam((await params).lang);
  if (!locale) notFound();

  return (
    <>
      <JsonLd locale={locale} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        {m.skip_to_content({}, { locale })}
      </a>
      <Header locale={locale} />
      <main id="main">
        <Hero locale={locale} />
        <TechMarquee locale={locale} />
        <Services locale={locale} />
        <PainsSolutions locale={locale} />
        {/* TODO: вернуть блок кейсов (<Cases /> из components/sections/Cases.tsx), когда появятся реальные проекты */}
        <Process locale={locale} />
        <WhyUs locale={locale} />
        <Faq locale={locale} />
        <FinalCta locale={locale} />
      </main>
      <Footer locale={locale} />
      <TelegramFab locale={locale} />
      <RevealObserver />
    </>
  );
}
