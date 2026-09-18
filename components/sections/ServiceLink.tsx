"use client";

import { ArrowRight } from "lucide-react";
import type { ServiceId } from "@/data/services";
import { selectService } from "@/lib/lead-events";

/** Ссылка на форму заявки, которая сразу выбирает услугу. Растягивается на всю карточку через ::after. */
export function ServiceLink({ service, label, srLabel }: { service: ServiceId; label: string; srLabel: string }) {
  return (
    <a
      href="#contact"
      onClick={() => selectService(service)}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent after:absolute after:inset-0 after:rounded-[var(--radius-card)] after:content-['']"
    >
      {label}
      <span className="sr-only">: {srLabel}</span>
      <ArrowRight className="size-4 transition-transform group-hover/card:translate-x-1" aria-hidden="true" />
    </a>
  );
}
