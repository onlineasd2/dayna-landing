import { Plus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getFaqSection } from "@/data/content";
import type { Locale } from "@/lib/i18n";

// Аккордеон на нативных <details>: доступен с клавиатуры и работает без JS
export function Faq({ locale }: { locale: Locale }) {
  const faqSection = getFaqSection(locale);
  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading id="faq-title" eyebrow={faqSection.eyebrow} title={faqSection.title} className="lg:mb-0" />

        <div className="divide-y divide-border border-y border-border">
          {faqSection.items.map((item) => (
            <details key={item.q} name="faq" className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-medium transition-colors hover:text-accent sm:text-lg [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border-strong transition-[transform,background-color,border-color] duration-300 group-open:rotate-45 group-open:border-accent/50 group-open:bg-accent/10">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
