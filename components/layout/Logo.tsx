import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("inline-flex items-center gap-2.5 rounded-md", className)} aria-label={`${site.name} — на главную`}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect width="28" height="28" rx="8" fill="var(--color-accent)" />
        <path d="M8 7.5h5.5a6.5 6.5 0 0 1 0 13H8v-13Z" fill="var(--color-accent-fg)" />
        <circle cx="13.5" cy="14" r="2.25" fill="var(--color-accent)" />
      </svg>
      <span className="font-display text-lg font-extrabold tracking-tight">{site.name}</span>
    </a>
  );
}
