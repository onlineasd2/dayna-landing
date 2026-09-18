import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { processSection } from "@/data/content";

export function Process() {
  return (
    <Section id="process" labelledBy="process-title">
      <SectionHeading
        id="process-title"
        eyebrow={processSection.eyebrow}
        title={processSection.title}
        subtitle={processSection.subtitle}
      />

      <ol className="relative grid gap-0 lg:grid-cols-6 lg:gap-4">
        {/* Линия таймлайна */}
        <span
          aria-hidden="true"
          className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-border-strong to-transparent lg:left-0 lg:right-0 lg:top-[15px] lg:bottom-auto lg:h-px lg:w-auto lg:bg-gradient-to-r"
        />
        {processSection.steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 0.06} className="relative flex gap-5 pb-8 last:pb-0 lg:flex-col lg:gap-5 lg:pb-0">
            <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-bg font-display text-sm font-bold text-accent">
              {i + 1}
            </span>
            <div>
              <p className="mb-2 inline-flex rounded-full bg-white/[0.05] px-2.5 py-0.5 text-xs font-medium text-muted">
                {step.duration}
              </p>
              <h3 className="font-display text-lg font-bold tracking-tight">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
