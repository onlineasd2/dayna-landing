import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  children: ReactNode;
};

export function Section({ id, className, containerClassName, labelledBy, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-20 sm:py-28", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, subtitle, align = "left", className }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-12 max-w-2xl sm:mb-16",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      )}
      <h2 id={id} className="font-display text-h2 font-bold text-balance">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-lead text-muted text-pretty">{subtitle}</p>}
    </Reveal>
  );
}
