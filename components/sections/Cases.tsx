import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { casesSection } from "@/data/content";
import { cn } from "@/lib/utils";

export function Cases() {
  return (
    <Section id="cases" labelledBy="cases-title">
      <SectionHeading
        id="cases-title"
        eyebrow={casesSection.eyebrow}
        title={casesSection.title}
        subtitle={casesSection.subtitle}
      />

      <ul className="grid gap-4 lg:grid-cols-2">
        {casesSection.items.map((c, i) => (
          <Reveal as="li" key={c.title} delay={(i % 2) * 0.08} className="flex">
            <article className="card card-interactive flex w-full flex-col p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">{c.niche}</p>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight sm:text-2xl">{c.title}</h3>

              <dl className="mt-6 grid gap-4 text-[0.9375rem] leading-relaxed sm:grid-cols-2">
                <div>
                  <dt className="mb-1 text-xs uppercase tracking-[0.12em] text-subtle">Задача</dt>
                  <dd className="text-muted">{c.task}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-xs uppercase tracking-[0.12em] text-subtle">Решение</dt>
                  <dd className="text-muted">{c.solution}</dd>
                </div>
              </dl>

              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
                {c.results.map((r, j) => (
                  <div key={r.label} className="flex flex-col-reverse gap-1 bg-surface px-4 py-4">
                    <dt className="text-sm text-muted">{r.label}</dt>
                    <dd
                      className={cn(
                        "font-display text-2xl font-extrabold tracking-tight sm:text-3xl",
                        j === 0 ? "text-accent" : "text-fg",
                      )}
                    >
                      {r.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Стек">
                {c.stack.map((t) => (
                  <li key={t} className="rounded-md border border-border bg-white/[0.03] px-2 py-1 text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
