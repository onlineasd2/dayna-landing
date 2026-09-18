// Мини-интерфейсы для карточек услуг. Чистая вёрстка, без JS — рендерятся на сервере.
import {
  Bot,
  CircleCheck,
  CreditCard,
  Database,
  FileText,
  Gauge,
  MessageSquare,
  Search,
  Sheet,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { ServiceVisual } from "@/data/services";
import { cn } from "@/lib/utils";

const frame = "rounded-2xl border border-border bg-bg/60";

function AgentVisual() {
  return (
    <div className={cn(frame, "flex h-full min-h-[220px] flex-col gap-2 p-4 text-[12px] leading-snug")}>
      <div className="mb-1 flex items-center gap-2 text-subtle">
        <span className="flex size-6 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Bot className="size-3.5" />
        </span>
        Агент · 3 канала · онлайн
        <span className="ml-auto size-1.5 animate-pulse-dot rounded-full bg-accent" />
      </div>
      <p className="max-w-[80%] self-end rounded-xl rounded-br-sm bg-white/[0.07] px-3 py-2">
        Нужен бот для записи в салон, сколько стоит?
      </p>
      <p className="max-w-[85%] self-start rounded-xl rounded-bl-sm border border-accent/20 bg-accent/[0.07] px-3 py-2">
        От 40 000 ₽, запуск за 1–3 недели. Сколько у вас мастеров и какая CRM?
      </p>
      <p className="max-w-[60%] self-end rounded-xl rounded-br-sm bg-white/[0.07] px-3 py-2">6 мастеров, YCLIENTS</p>
      <p className="hidden max-w-[85%] self-start rounded-xl rounded-bl-sm border border-accent/20 bg-accent/[0.07] px-3 py-2 lg:block">
        Подойдёт бот с ИИ и записью в YCLIENTS: от 75 000 ₽, запуск за 2 недели. Отправить план проекта?
      </p>
      <p className="hidden max-w-[60%] self-end rounded-xl rounded-br-sm bg-white/[0.07] px-3 py-2 lg:block">Да, присылайте</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {["Горячий лид", "Бюджет ок", "→ CRM"].map((t) => (
          <span key={t} className="rounded-md border border-accent/25 bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function BotVisual() {
  return (
    <div className={cn(frame, "flex flex-col gap-2 p-3.5 text-[12px]")}>
      <p className="max-w-[88%] rounded-xl rounded-bl-sm bg-white/[0.06] px-3 py-2 leading-snug">
        Выберите тариф курса:
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {["Базовый · 9 900 ₽", "PRO · 19 900 ₽"].map((b, i) => (
          <span
            key={b}
            className={cn(
              "rounded-lg border px-2 py-1.5 text-center text-[11px] font-medium",
              i === 1 ? "border-accent/40 bg-accent/10 text-accent" : "border-border-strong text-muted",
            )}
          >
            {b}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2">
        <CreditCard className="size-3.5 text-accent" />
        <span className="text-muted">Оплата прошла</span>
        <CircleCheck className="ml-auto size-3.5 text-accent" />
      </div>
    </div>
  );
}

function FlowVisual() {
  const nodes = [
    { icon: MessageSquare, label: "Заявка" },
    { icon: Workflow, label: "n8n" },
    { icon: Database, label: "CRM" },
    { icon: Sheet, label: "1С" },
  ];
  return (
    <div className={cn(frame, "relative flex items-center justify-between gap-1 px-3 py-5 sm:px-4")}>
      <svg className="absolute inset-x-6 top-1/2 h-px w-[calc(100%-3rem)] -translate-y-[10px] overflow-visible" aria-hidden="true">
        <line x1="0" y1="0" x2="100%" y2="0" stroke="rgb(198 244 50 / 0.35)" strokeDasharray="4 4" />
      </svg>
      {nodes.map(({ icon: Icon, label }, i) => (
        <div key={label} className="relative z-10 flex flex-col items-center gap-1.5">
          <span
            className={cn(
              "flex size-10 items-center justify-center rounded-xl border bg-surface",
              i === 1 ? "border-accent/50 text-accent shadow-[0_0_20px_-4px_rgb(198_244_50/0.5)]" : "border-border-strong text-muted",
            )}
          >
            <Icon className="size-4" />
          </span>
          <span className="text-[11px] text-subtle">{label}</span>
        </div>
      ))}
    </div>
  );
}

function DashboardVisual() {
  const bars = [38, 52, 44, 63, 58, 74, 69, 88, 81, 96];
  return (
    <div className={cn(frame, "grid gap-3 p-4 sm:grid-cols-[auto_1fr]")}>
      <div className="flex gap-3 sm:flex-col">
        {[
          { label: "MRR", value: "1,4 млн ₽", delta: "+18%" },
          { label: "Клиенты", value: "312", delta: "+24" },
        ].map((k) => (
          <div key={k.label} className="min-w-[110px] rounded-xl bg-white/[0.04] px-3 py-2">
            <p className="text-[11px] text-subtle">{k.label}</p>
            <p className="font-display text-base font-bold">{k.value}</p>
            <p className="text-[11px] text-accent">{k.delta}</p>
          </div>
        ))}
      </div>
      <div className="flex h-[110px] items-end gap-1.5 rounded-xl bg-white/[0.02] px-3 pb-2 pt-3 sm:h-auto">
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn("flex-1 rounded-t-[4px]", i === bars.length - 1 ? "bg-accent" : "bg-white/[0.12]")}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function KnowledgeVisual() {
  return (
    <div className={cn(frame, "flex flex-col gap-2 p-3.5 text-[12px]")}>
      <div className="flex items-center gap-2 rounded-lg bg-white/[0.05] px-2.5 py-1.5 text-muted">
        <Search className="size-3.5" />
        Как оформить возврат?
      </div>
      <div className="rounded-lg border border-accent/20 bg-accent/[0.06] px-2.5 py-2 leading-snug">
        <Sparkles className="mr-1 inline size-3 text-accent" />
        Возврат до 14 дней по заявлению…
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-subtle">
        <FileText className="size-3" /> Регламент_возвратов.pdf · стр. 3
      </div>
    </div>
  );
}

function CabinetVisual() {
  const rows = [
    { id: "#1042", status: "В работе", accent: true },
    { id: "#1041", status: "Отгружен", accent: false },
    { id: "#1039", status: "Оплачен", accent: false },
  ];
  return (
    <div className={cn(frame, "overflow-hidden text-[12px]")}>
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        {["Заказы", "Документы", "Оплаты"].map((t, i) => (
          <span key={t} className={cn("rounded-md px-2 py-0.5", i === 0 ? "bg-white/[0.08] text-fg" : "text-subtle")}>
            {t}
          </span>
        ))}
      </div>
      {rows.map((r) => (
        <div key={r.id} className="flex items-center justify-between border-b border-border px-3 py-2 last:border-0">
          <span className="text-muted">Заказ {r.id}</span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px]",
              r.accent ? "bg-accent/15 text-accent" : "bg-white/[0.06] text-muted",
            )}
          >
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function LandingVisual() {
  return (
    <div className={cn(frame, "overflow-hidden")}>
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="size-2 rounded-full bg-white/10" />
        <span className="size-2 rounded-full bg-white/10" />
        <span className="size-2 rounded-full bg-white/10" />
        <span className="ml-2 h-4 flex-1 rounded bg-white/[0.04]" />
      </div>
      <div className="flex items-center gap-4 p-4">
        <div className="flex-1 space-y-2">
          <span className="block h-2.5 w-4/5 rounded bg-white/20" />
          <span className="block h-2.5 w-3/5 rounded bg-white/20" />
          <span className="block h-2 w-full rounded bg-white/[0.07]" />
          <span className="mt-3 block h-5 w-24 rounded-md bg-accent" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="relative flex size-14 items-center justify-center rounded-full border-[3px] border-accent font-display text-base font-bold text-accent">
            98
          </span>
          <span className="flex items-center gap-1 text-[10px] text-subtle">
            <Gauge className="size-3" /> Lighthouse
          </span>
        </div>
      </div>
    </div>
  );
}

const visuals: Record<ServiceVisual, () => React.JSX.Element> = {
  agent: AgentVisual,
  bot: BotVisual,
  flow: FlowVisual,
  dashboard: DashboardVisual,
  knowledge: KnowledgeVisual,
  cabinet: CabinetVisual,
  landing: LandingVisual,
};

export function ServiceVisualView({ kind }: { kind: ServiceVisual }) {
  const Visual = visuals[kind];
  return (
    <div aria-hidden="true" className="pointer-events-none h-full select-none">
      <Visual />
    </div>
  );
}
