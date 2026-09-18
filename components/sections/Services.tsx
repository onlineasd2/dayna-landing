import { Clock } from "lucide-react";
import { ServiceVisualView } from "@/components/mockups/ServiceVisuals";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { projectTypes } from "@/data/pricing";
import { services, servicesSection } from "@/data/services";
import { cn, formatPrice } from "@/lib/utils";
import { QuizLink } from "./QuizLink";

export function Services() {
  return (
    <Section id="services" labelledBy="services-title">
      <SectionHeading
        id="services-title"
        eyebrow={servicesSection.eyebrow}
        title={servicesSection.title}
        subtitle={servicesSection.subtitle}
      />

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {services.map((s, i) => {
          const big = s.visual === "agent";
          return (
            <Reveal as="li" key={s.id} delay={(i % 3) * 0.06} className={cn("flex", s.layout)}>
              <article className="card card-interactive group/card relative flex w-full flex-col gap-5 p-5 sm:p-6">
                <header className="flex items-start justify-between gap-4">
                  <h3 className={cn("font-display font-bold tracking-tight", big ? "text-2xl sm:text-[1.75rem]" : "text-h3")}>
                    {s.title}
                  </h3>
                  <span className="shrink-0 rounded-full border border-border-strong px-2.5 py-1 text-xs font-medium text-fg">
                    от {formatPrice(projectTypes[s.id].price[0])}
                  </span>
                </header>

                <div className="space-y-2 text-[0.9375rem] leading-relaxed">
                  <p className="text-subtle">{s.problem}</p>
                  <p className="text-fg">{s.result}</p>
                </div>

                <div className={cn("mt-auto", big && "flex-1")}>
                  <ServiceVisualView kind={s.visual} />
                </div>

                <footer className="flex items-center justify-between gap-4 border-t border-border pt-4">
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                    <Clock className="size-4 text-subtle" aria-hidden="true" />
                    {s.timeline}
                  </span>
                  <QuizLink type={s.id} label={servicesSection.cta} srLabel={s.title} />
                </footer>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
