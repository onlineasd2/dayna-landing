"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { Calculator } from "lucide-react";
import { formatWeeks, type Estimate } from "@/data/pricing";
import { quizSection } from "@/data/quiz";
import { cn, formatPriceRange } from "@/lib/utils";

type Props = {
  estimate: Estimate | null;
  typeLabel?: string;
  details: string[];
  variant: "panel" | "bar";
  className?: string;
};

function AnimatedValue({ value, className }: { value: string; className?: string }) {
  const reduce = useReducedMotionSafe();
  return (
    <span className={cn("relative block", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="block"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function PriceSummary({ estimate, typeLabel, details, variant, className }: Props) {
  const { summary } = quizSection;
  const price = estimate ? formatPriceRange(estimate.priceMin, estimate.priceMax) : "—";
  const weeks = estimate ? formatWeeks(estimate.weeksMin, estimate.weeksMax) : "—";

  if (variant === "bar") {
    return (
      <div
        className={cn("glass flex items-center gap-3 rounded-2xl border border-accent/25 px-4 py-3", className)}
        aria-hidden="true"
      >
        <Calculator className="size-5 shrink-0 text-accent" />
        {estimate ? (
          <div className="min-w-0 text-sm">
            <AnimatedValue value={price} className="font-display font-bold text-fg" />
            <AnimatedValue value={weeks} className="text-xs text-muted" />
          </div>
        ) : (
          <p className="text-sm text-muted">{summary.empty}</p>
        )}
      </div>
    );
  }

  return (
    <aside
      className={cn("card relative flex flex-col gap-6 overflow-hidden p-6", className)}
      aria-label={summary.title}
    >
      <div className="glow pointer-events-none absolute -right-20 -top-20 size-60 opacity-60" aria-hidden="true" />
      <p className="flex items-center gap-2 text-sm font-medium text-muted">
        <Calculator className="size-4 text-accent" aria-hidden="true" />
        {summary.title}
      </p>

      {estimate ? (
        <>
          {/* Живой регион: скринридер озвучит новую цену */}
          <div aria-live="polite" aria-atomic="true" className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-subtle">{summary.priceLabel}</p>
              <AnimatedValue value={price} className="mt-1.5 font-display text-[1.625rem] font-extrabold leading-tight tracking-tight text-fg" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-subtle">{summary.timeLabel}</p>
              <AnimatedValue value={weeks} className="mt-1.5 font-display text-xl font-bold tracking-tight text-accent" />
            </div>
          </div>

          <ul className="space-y-1.5 border-t border-border pt-5 text-sm text-muted">
            <li className="font-medium text-fg">{typeLabel}</li>
            {details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-muted">{summary.empty}</p>
      )}

      <p className="mt-auto text-xs leading-relaxed text-subtle">{summary.note}</p>
    </aside>
  );
}
