"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { Bot, CheckCheck, CircleCheck, Paperclip, SendHorizontal, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { heroChat } from "@/data/hero";
import { cn } from "@/lib/utils";

const { messages, lead } = heroChat;
const TOTAL = messages.length;

/** Тайминги сценария: сколько ждать перед показом сообщения i (мс). */
function delayFor(index: number) {
  return messages[index].from === "agent" ? 1400 : 900;
}

export function AiChatMockup({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const reduce = useReducedMotionSafe();

  // shown — сколько сообщений уже видно; TOTAL + 1 означает, что показана карточка заявки
  const [shown, setShown] = useState(1);
  const finalStep = TOTAL + 1;
  const visible = reduce ? finalStep : shown;
  const typing = !reduce && shown < TOTAL && messages[shown].from === "agent";

  useEffect(() => {
    if (reduce || !inView) return;

    const wait = shown < TOTAL ? delayFor(shown) : shown === TOTAL ? 700 : 5200;
    const id = window.setTimeout(() => {
      setShown((s) => (s >= finalStep ? 1 : s + 1));
    }, wait);
    return () => window.clearTimeout(id);
  }, [shown, inView, reduce, finalStep]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="glow pointer-events-none absolute -inset-10 -z-10 opacity-80" aria-hidden="true" />

      <div
        className="card overflow-hidden shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]"
        role="img"
        aria-label="Пример: ИИ-агент стоматологии отвечает клиенту, называет цену, предлагает время и создаёт заявку в CRM"
      >
        {/* Шапка окна */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
          <div className="flex size-9 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Bot className="size-[18px]" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-sm font-medium">
              {heroChat.title}
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                <Sparkles className="size-2.5" aria-hidden="true" /> AI
              </span>
            </p>
            <p className="truncate text-xs text-subtle">{heroChat.subtitle}</p>
          </div>
          <div className="hidden gap-1.5 sm:flex" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Лента сообщений */}
        <div className="flex h-[340px] flex-col justify-end gap-2.5 overflow-hidden px-4 py-4 sm:h-[360px] sm:px-5" aria-hidden="true">
          <AnimatePresence initial={false}>
            {messages.slice(0, Math.min(visible, TOTAL)).map((m, i) => (
              <motion.div
                key={`${i}-${m.from}`}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed sm:text-sm",
                  m.from === "client"
                    ? "self-end rounded-br-md bg-white/[0.08] text-fg"
                    : "self-start rounded-bl-md border border-accent/20 bg-accent/[0.07] text-fg",
                )}
              >
                {m.text}
                {m.from === "client" && (
                  <CheckCheck className="ml-1.5 inline size-3.5 align-[-2px] text-accent" aria-hidden="true" />
                )}
              </motion.div>
            ))}

            {typing && (
              <motion.div
                key="typing"
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1 self-start rounded-2xl rounded-bl-md border border-accent/20 bg-accent/[0.07] px-4 py-3.5"
              >
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="size-1.5 rounded-full bg-accent"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Поле ввода */}
        <div className="flex items-center gap-2 border-t border-border px-4 py-3 sm:px-5" aria-hidden="true">
          <Paperclip className="size-4 text-subtle" />
          <div className="h-9 flex-1 rounded-full bg-white/[0.04] px-4 text-[13px] leading-9 text-subtle">Сообщение…</div>
          <div className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-fg">
            <SendHorizontal className="size-4" />
          </div>
        </div>
      </div>

      {/* Плавающая карточка заявки */}
      <AnimatePresence>
        {visible > TOTAL && (
          <motion.div
            key="lead"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="glass absolute -bottom-14 right-3 w-[240px] rounded-2xl border border-accent/30 p-4 shadow-[0_20px_60px_-15px_rgb(198_244_50/0.3)] sm:-bottom-6 sm:-right-6 sm:w-[260px]"
            aria-hidden="true"
          >
            <div className="mb-3 flex items-center gap-2">
              <CircleCheck className="size-4 text-accent" />
              <p className="whitespace-nowrap text-sm font-medium">{lead.title}</p>
              <span className="ml-auto whitespace-nowrap rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-muted">→ {lead.target}</span>
            </div>
            <dl className="space-y-1.5 text-xs">
              {lead.fields.map((f) => (
                <div key={f.label} className="flex justify-between gap-3">
                  <dt className="text-subtle">{f.label}</dt>
                  <dd className="font-medium text-fg">{f.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
