import Link from "next/link";
import { CircleCheck, Send } from "lucide-react";
import { telegramUrl } from "@/data/site";
import { localizedPath, t, type Locale } from "@/lib/i18n";
import type { SubmitError } from "@/lib/use-lead-submit";
import { m } from "@/paraglide/messages.js";

export function SuccessMessage({ locale }: { locale: Locale }) {
  const o = t(locale);
  return (
    <div role="status" className="flex flex-col items-center gap-4 py-8 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
        <CircleCheck className="size-7" aria-hidden="true" />
      </span>
      <div>
        <p className="font-display text-2xl font-bold tracking-tight">{m.form_success_title({}, o)}</p>
        <p className="mt-2 text-muted">{m.form_success_text({}, o)}</p>
      </div>
    </div>
  );
}

export function ErrorMessage({ locale, error }: { locale: Locale; error: SubmitError | null }) {
  const o = t(locale);
  return (
    <p role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-fg">
      {error === "rate_limit" ? m.form_error_rate_limit({}, o) : m.form_error({}, o)}{" "}
      <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-accent underline-offset-4 hover:underline">
        <Send className="size-3.5" aria-hidden="true" />
        Telegram
      </a>
    </p>
  );
}

export function PrivacyNote({ locale, action }: { locale: Locale; action: string }) {
  const o = t(locale);
  return (
    <p className="text-xs leading-relaxed text-subtle">
      {m.form_privacy_before({ action }, o)}{" "}
      <Link href={localizedPath(locale, "/privacy")} className="text-muted underline underline-offset-4 hover:text-fg">
        {m.form_privacy_link({}, o)}
      </Link>
      {m.form_privacy_after({}, o)}
    </p>
  );
}
