import { Check, Send } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ctaSection } from "@/data/content";
import { site, telegramUrl } from "@/data/site";

export function FinalCta() {
  return (
    <Section id="contact" labelledBy="contact-title" className="overflow-x-clip">
      <div className="card relative overflow-hidden p-6 sm:p-10 lg:p-14">
        <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="glow pointer-events-none absolute -left-40 -top-40 size-[520px] opacity-70" aria-hidden="true" />

        <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">{ctaSection.eyebrow}</p>
            <h2 id="contact-title" className="font-display text-h2 font-extrabold text-balance">
              {ctaSection.title}
            </h2>
            <p className="mt-5 text-lead text-muted text-pretty">{ctaSection.subtitle}</p>

            <ul className="mt-8 space-y-3">
              {ctaSection.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="flex size-5 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center">
              <p className="text-muted">{ctaSection.telegramLead}</p>
              <Button href={telegramUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
                <Send className="size-4" aria-hidden="true" />
                {ctaSection.telegramCta}
              </Button>
            </div>
            <p className="mt-4 text-sm text-subtle">{site.contacts.workingHours}</p>
          </Reveal>

          <Reveal delay={0.1} className="self-start rounded-[var(--radius-card)] border border-border bg-bg/70 p-5 sm:p-7">
            <LeadForm />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
