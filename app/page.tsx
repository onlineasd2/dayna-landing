import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TelegramFab } from "@/components/layout/TelegramFab";
import { Cases } from "@/components/sections/Cases";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { PainsSolutions } from "@/components/sections/PainsSolutions";
import { Process } from "@/components/sections/Process";
import { QuizSection } from "@/components/sections/QuizSection";
import { Services } from "@/components/sections/Services";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { WhyUs } from "@/components/sections/WhyUs";
import { faqSection } from "@/data/content";
import { projectTypes } from "@/data/pricing";
import { services } from "@/data/services";
import { site, telegramUrl } from "@/data/site";

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        description: site.description,
        email: site.contacts.email,
        telephone: site.contacts.phone,
        sameAs: [telegramUrl],
        makesOffer: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.result },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "RUB",
            minPrice: projectTypes[s.id].price[0],
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqSection.items.map((i) => ({
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

export default function Home() {
  return (
    <>
      <JsonLd />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Перейти к содержимому
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TechMarquee />
        <Services />
        <PainsSolutions />
        <Cases />
        <Process />
        <WhyUs />
        <QuizSection />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <TelegramFab />
    </>
  );
}
