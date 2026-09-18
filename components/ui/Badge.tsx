import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className, dot = false }: { children: ReactNode; className?: string; dot?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted",
        className,
      )}
    >
      {dot && (
        <span className="relative flex size-1.5" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-accent" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
        </span>
      )}
      {children}
    </span>
  );
}
