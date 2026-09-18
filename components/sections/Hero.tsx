import { ArrowRight, ArrowDown } from "lucide-react";
import { HeroShowcase } from "@/components/mockups/HeroShowcase";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/data/hero";

function HeroTitle() {
  const [before, after] = hero.title.split(hero.titleAccent);
  return (
    <h1 id="hero-title" className="font-display text-h1 font-extrabold text-balance">
      <span className="text-gradient">{before}</span>
      <span className="text-accent">{hero.titleAccent}</span>
      {after}
    </h1>
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Фон: сетка точек + свечение */}
      <div className="dot-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="glow pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 opacity-70"
        aria-hidden="true"
      />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div>
            <Badge dot className="mb-6">
              {hero.badge}
            </Badge>
            <HeroTitle />
            <p className="mt-6 max-w-xl text-lead text-muted text-pretty">{hero.subtitle}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Button>
              <Button href={hero.secondaryCta.href} size="lg" variant="secondary">
                {hero.secondaryCta.label}
                <ArrowDown className="size-4 text-muted transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <HeroShowcase className="mx-auto w-full max-w-[520px] lg:mr-0" />
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border sm:mt-24 lg:grid-cols-4">
          {hero.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse gap-1 bg-bg px-5 py-6 sm:px-7 sm:py-7">
              <dt className="text-sm text-muted">{m.label}</dt>
              <dd className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{m.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
