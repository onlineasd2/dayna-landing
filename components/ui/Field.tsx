import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-xl border bg-white/[0.03] px-4 text-[0.9375rem] text-fg placeholder:text-subtle transition-colors focus:border-accent/60 focus:bg-white/[0.05] focus:outline-none focus-visible:outline-none";

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
};

export function FieldShell({ id, label, error, hint, children }: BaseProps & { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-muted">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

export function TextField({
  id,
  label,
  error,
  hint,
  className,
  ...props
}: BaseProps & ComponentPropsWithoutRef<"input">) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, "h-12", error ? "border-danger/60" : "border-border-strong", className)}
        {...props}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  hint,
  className,
  ...props
}: BaseProps & ComponentPropsWithoutRef<"textarea">) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, "min-h-24 resize-y py-3", error ? "border-danger/60" : "border-border-strong", className)}
        {...props}
      />
    </FieldShell>
  );
}
