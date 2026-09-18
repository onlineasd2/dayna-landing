"use client";

import { ArrowRight } from "lucide-react";
import type { ProjectTypeId } from "@/data/pricing";
import { selectQuizType } from "@/lib/quiz-events";

/** Ссылка на квиз, которая сразу выбирает тип проекта. Растягивается на всю карточку через ::after. */
export function QuizLink({ type, label, srLabel }: { type: ProjectTypeId; label: string; srLabel: string }) {
  return (
    <a
      href="#quiz"
      onClick={() => selectQuizType(type)}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent after:absolute after:inset-0 after:rounded-[var(--radius-card)] after:content-['']"
    >
      {label}
      <span className="sr-only">: {srLabel}</span>
      <ArrowRight className="size-4 transition-transform group-hover/card:translate-x-1" aria-hidden="true" />
    </a>
  );
}
