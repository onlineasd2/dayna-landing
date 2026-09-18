// Витрина на первом экране: сайт, Telegram-бот и автоматическая передача заявки.
// Чистая вёрстка на сервере, анимация — лёгкое «парение» на CSS (отключается при prefers-reduced-motion).
import { ArrowRight, Bot, CheckCheck, CircleCheck, Globe, Send, Workflow } from "lucide-react";
import { heroShowcase } from "@/data/hero";
import { cn } from "@/lib/utils";

const { site, bot, lead } = heroShowcase;

function SiteWindow() {
  return (
    <div className="card overflow-hidden shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="ml-3 flex h-6 flex-1 items-center gap-1.5 rounded-md bg-white/[0.04] px-2.5 text-[11px] text-subtle">
          <Globe className="size-3" />
          {site.url}
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between text-[11px] text-subtle">
          <span className="h-2.5 w-14 rounded bg-white/25" />
          <span className="hidden gap-4 sm:flex">
            {site.nav.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </div>
        <p className="mt-7 max-w-[70%] font-display text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
          {site.title}
        </p>
        <p className="mt-2 text-[13px] text-muted">{site.subtitle}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[12px] font-semibold text-accent-fg">
          {site.cta}
          <ArrowRight className="size-3.5" />
        </span>
        <div className="mt-7 grid grid-cols-3 gap-2 pb-16 sm:pb-20">
          {site.features.map((f) => (
            <span key={f} className="rounded-lg border border-border bg-white/[0.03] px-2.5 py-2.5 text-[11px] leading-tight text-muted">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BotPhone() {
  return (
    <div className="w-[190px] overflow-hidden rounded-[26px] border border-border-strong bg-surface shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)] sm:w-[210px]">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
        <span className="flex size-7 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Bot className="size-3.5" />
        </span>
        <div className="min-w-0">
          <p className="text-[12px] font-medium leading-tight">{bot.title}</p>
          <p className="truncate text-[10px] text-subtle">{bot.subtitle}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 p-2.5 text-[11px] leading-snug">
        <p className="max-w-[90%] self-start rounded-xl rounded-bl-sm bg-white/[0.06] px-2.5 py-1.5">{bot.greeting}</p>
        <div className="grid grid-cols-2 gap-1">
          {bot.services.map((s, i) => (
            <span
              key={s}
              className={cn(
                "rounded-md border px-1.5 py-1 text-center",
                i === 0 ? "border-accent/40 bg-accent/10 text-accent" : "border-border-strong text-muted",
              )}
            >
              {s}
            </span>
          ))}
        </div>
        <p className="max-w-[90%] self-start rounded-xl rounded-bl-sm bg-white/[0.06] px-2.5 py-1.5">{bot.askTime}</p>
        <div className="grid grid-cols-3 gap-1">
          {bot.times.map((t) => (
            <span
              key={t}
              className={cn(
                "rounded-md border px-1 py-1 text-center",
                t === bot.pickedTime ? "border-accent/40 bg-accent/10 text-accent" : "border-border-strong text-muted",
              )}
            >
              {t}
            </span>
          ))}
        </div>
        <p className="max-w-[92%] self-start rounded-xl rounded-bl-sm border border-accent/20 bg-accent/[0.07] px-2.5 py-1.5">
          {bot.done}
          <CheckCheck className="ml-1 inline size-3 text-accent" />
        </p>
      </div>
    </div>
  );
}

function LeadCard() {
  return (
    <div className="glass w-[230px] rounded-2xl border border-accent/30 p-3.5 shadow-[0_20px_60px_-15px_rgb(198_244_50/0.3)] sm:w-[250px]">
      <div className="mb-3 flex items-center gap-2">
        <CircleCheck className="size-4 text-accent" />
        <p className="text-sm font-medium">{lead.title}</p>
        <Workflow className="ml-auto size-4 text-subtle" />
      </div>
      <div className="flex items-center justify-between gap-1 text-[11px]">
        {lead.flow.map((step, i) => (
          <span key={step} className="flex items-center gap-1">
            <span className={cn("rounded-md px-2 py-1", i === lead.flow.length - 1 ? "bg-accent/15 text-accent" : "bg-white/[0.06] text-muted")}>
              {step}
            </span>
            {i < lead.flow.length - 1 && <ArrowRight className="size-3 text-subtle" />}
          </span>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-subtle">
        <Send className="size-3" />
        {lead.note}
      </p>
    </div>
  );
}

export function HeroShowcase({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative pb-24 pl-6 sm:pb-20 sm:pl-16", className)}
      role="img"
      aria-label="Примеры наших продуктов: сайт компании, Telegram-бот для записи и автоматическая передача заявки в CRM и Telegram"
    >
      <div className="glow pointer-events-none absolute -inset-10 -z-10 opacity-80" aria-hidden="true" />
      <div aria-hidden="true">
        <SiteWindow />
        <div className="absolute bottom-0 left-0 animate-float motion-reduce:animate-none">
          <BotPhone />
        </div>
        <div className="absolute -right-6 bottom-14 hidden animate-float [animation-delay:-3s] motion-reduce:animate-none sm:block">
          <LeadCard />
        </div>
      </div>
    </div>
  );
}
