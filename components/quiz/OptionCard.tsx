import { Check } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  hint?: string;
  aside?: string;
  type: "radio" | "checkbox";
} & Omit<ComponentPropsWithoutRef<"input">, "type">;

/** Карточка-вариант для квиза: настоящий radio/checkbox, стилизованный через :has(). */
export function OptionCard({ title, hint, aside, type, className, ...input }: Props) {
  return (
    <label
      className={cn(
        "group relative flex cursor-pointer items-start gap-3 rounded-2xl border border-border-strong bg-white/[0.02] p-4 transition-colors",
        "hover:border-white/25 hover:bg-white/[0.04]",
        "has-[:checked]:border-accent/60 has-[:checked]:bg-accent/[0.06]",
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
        className,
      )}
    >
      <input type={type} className="peer sr-only" {...input} />
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center border border-border-strong text-accent-fg transition-colors",
          "peer-checked:border-accent peer-checked:bg-accent",
          type === "radio" ? "rounded-full" : "rounded-md",
        )}
      >
        <Check className="size-3.5 opacity-0 transition-opacity group-has-[:checked]:opacity-100" strokeWidth={3} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-fg">{title}</span>
        {hint && <span className="mt-0.5 block text-sm text-muted">{hint}</span>}
      </span>
      {aside && <span className="shrink-0 text-sm text-subtle">{aside}</span>}
    </label>
  );
}
