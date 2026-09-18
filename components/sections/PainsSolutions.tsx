import { ArrowRight, Check, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { painsSection } from "@/data/content";

export function PainsSolutions() {
  return (
    <Section id="pains" labelledBy="pains-title">
      <SectionHeading
        id="pains-title"
        eyebrow={painsSection.eyebrow}
        title={painsSection.title}
        subtitle={painsSection.subtitle}
      />

      <div className="card overflow-hidden">
        <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-6 border-b border-border px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-subtle md:grid">
          <span>Сейчас</span>
          <span className="w-8" />
          <span>С нами</span>
        </div>
        <ul>
          {painsSection.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.pain}
              delay={i * 0.04}
              className="grid gap-3 border-b border-border px-5 py-5 last:border-0 sm:px-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6"
            >
              <p className="flex items-start gap-3 text-muted">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
                  <X className="size-3" aria-hidden="true" />
                </span>
                <span>
                  <span className="sr-only">Проблема: </span>
                  {item.pain}
                </span>
              </p>
              <ArrowRight className="ml-8 size-4 rotate-90 text-subtle md:ml-0 md:w-8 md:rotate-0" aria-hidden="true" />
              <p className="flex items-start gap-3 font-medium text-fg">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                <span>
                  <span className="sr-only">Решение: </span>
                  {item.solution}
                </span>
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
