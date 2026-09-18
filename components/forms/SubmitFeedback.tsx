import Link from "next/link";
import { CircleCheck, Send } from "lucide-react";
import { ctaSection } from "@/data/content";
import { telegramUrl } from "@/data/site";

export function SuccessMessage({ children }: { children?: React.ReactNode }) {
  return (
    <div role="status" className="flex flex-col items-center gap-4 py-8 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
        <CircleCheck className="size-7" aria-hidden="true" />
      </span>
      <div>
        <p className="font-display text-2xl font-bold tracking-tight">{ctaSection.success.title}</p>
        <p className="mt-2 text-muted">{ctaSection.success.text}</p>
      </div>
      {children}
    </div>
  );
}

export function ErrorMessage({ message }: { message?: string | null }) {
  return (
    <p role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-fg">
      {message ?? ctaSection.error}{" "}
      <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-accent underline-offset-4 hover:underline">
        <Send className="size-3.5" aria-hidden="true" />
        Telegram
      </a>
    </p>
  );
}

export function PrivacyNote({ action }: { action: string }) {
  return (
    <p className="text-xs leading-relaxed text-subtle">
      Нажимая «{action}», вы соглашаетесь с{" "}
      <Link href="/privacy" className="text-muted underline underline-offset-4 hover:text-fg">
        политикой конфиденциальности
      </Link>
      .
    </p>
  );
}
