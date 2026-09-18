import { CalendarCheck, FileSignature, LifeBuoy, LockKeyhole, Palette, Sparkles, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { whySection } from "@/data/content";

const icons: Record<(typeof whySection.items)[number]["icon"], LucideIcon> = {
  palette: Palette,
  lock: LockKeyhole,
  file: FileSignature,
  calendar: CalendarCheck,
  sparkles: Sparkles,
  lifebuoy: LifeBuoy,
};

export function WhyUs() {
  return (
    <Section id="why" labelledBy="why-title" className="border-y border-border bg-surface/30">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          id="why-title"
          eyebrow={whySection.eyebrow}
          title={whySection.title}
          subtitle={whySection.subtitle}
          className="lg:sticky lg:top-28 lg:mb-0 lg:self-start"
        />

        <ul className="grid gap-x-10 sm:grid-cols-2">
          {whySection.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.title} delay={(i % 2) * 0.06} className="border-t border-border py-7">
                <Icon className="size-6 text-accent" aria-hidden="true" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
