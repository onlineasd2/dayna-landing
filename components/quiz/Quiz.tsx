"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { ArrowLeft, ArrowRight, LoaderCircle, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ContactInputs } from "@/components/forms/ContactInputs";
import { ErrorMessage, PrivacyNote, SuccessMessage } from "@/components/forms/SubmitFeedback";
import { Button } from "@/components/ui/Button";
import {
  calculateEstimate,
  features,
  formatWeeks,
  projectTypeIds,
  projectTypes,
  urgencies,
  urgencyIds,
  type FeatureId,
  type ProjectTypeId,
  type UrgencyId,
} from "@/data/pricing";
import { quizSection } from "@/data/quiz";
import { QUIZ_SELECT_EVENT, type QuizSelectDetail } from "@/lib/quiz-events";
import { contactFieldsSchema, type ContactFields } from "@/lib/schemas";
import { useLeadSubmit } from "@/lib/use-lead-submit";
import { cn, formatNumber, formatPriceRange } from "@/lib/utils";
import { OptionCard } from "./OptionCard";
import { PriceSummary } from "./PriceSummary";

const LAST_STEP = quizSection.steps.length - 1;

export function Quiz() {
  const reduce = useReducedMotionSafe();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [type, setType] = useState<ProjectTypeId | null>(null);
  const [selected, setSelected] = useState<FeatureId[]>([]);
  const [urgency, setUrgency] = useState<UrgencyId>("standard");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const focusOnStepChange = useRef(false);

  const { status, error, submit, reset: resetSubmit } = useLeadSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactFieldsSchema),
    defaultValues: { name: "", contact: "", comment: "", website: "" },
  });

  const estimate = type ? calculateEstimate({ type, features: selected, urgency }) : null;
  const details = [
    ...selected.map((id) => features[id].label),
    urgencies[urgency].label,
  ];

  // Клик по карточке услуги: выбираем тип и сразу переходим к функциям
  useEffect(() => {
    const onSelect = (e: Event) => {
      const { type: next } = (e as CustomEvent<QuizSelectDetail>).detail;
      setType(next);
      setSelected([]);
      setDirection(1);
      setStep(1);
      resetSubmit();
    };
    window.addEventListener(QUIZ_SELECT_EVENT, onSelect);
    return () => window.removeEventListener(QUIZ_SELECT_EVENT, onSelect);
  }, [resetSubmit]);

  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  // Фокус на заголовок нового шага — после анимации появления (для клавиатуры и скринридеров)
  function onStepShown(shown: number) {
    if (shown !== stepRef.current || !focusOnStepChange.current) return;
    focusOnStepChange.current = false;
    headingRef.current?.focus({ preventScroll: true });
  }

  function go(to: number) {
    setDirection(to > step ? 1 : -1);
    focusOnStepChange.current = true;
    setStep(Math.max(0, Math.min(LAST_STEP, to)));
  }

  function chooseType(id: ProjectTypeId) {
    setType(id);
    // Оставляем только функции, доступные для нового типа
    setSelected((prev) => prev.filter((f) => projectTypes[id].features.includes(f)));
  }

  function toggleFeature(id: FeatureId) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }

  function restart() {
    setType(null);
    setSelected([]);
    setUrgency("standard");
    resetSubmit();
    go(0);
  }

  const onSubmit = handleSubmit((values) => {
    if (!type) return;
    return submit({ ...values, source: "quiz", quiz: { type, features: selected, urgency } });
  });

  const current = quizSection.steps[step];
  const offset = reduce ? 0 : 24;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
      <div className="card relative p-5 sm:p-8">
        {status === "success" && estimate ? (
          <SuccessMessage>
            <div className="w-full max-w-sm rounded-2xl border border-border bg-white/[0.02] p-4 text-left text-sm">
              <p className="font-medium">{type && projectTypes[type].label}</p>
              <p className="mt-1 text-muted">
                {formatPriceRange(estimate.priceMin, estimate.priceMax)} · {formatWeeks(estimate.weeksMin, estimate.weeksMax)}
              </p>
              <p className="mt-3 text-xs text-subtle">{quizSection.successNote}</p>
            </div>
            <Button variant="secondary" onClick={restart}>
              <RotateCcw className="size-4" aria-hidden="true" />
              {quizSection.restart}
            </Button>
          </SuccessMessage>
        ) : (
          <>
            {/* Прогресс */}
            <div className="mb-8">
              <p className="sr-only" aria-live="polite">
                Шаг {step + 1} из {quizSection.steps.length}: {current.label}
              </p>
              <ol className="grid grid-cols-4 gap-2" aria-hidden="true">
                {quizSection.steps.map((s, i) => (
                  <li key={s.label} className="flex flex-col gap-2">
                    <span className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
                      <span
                        className="block h-full rounded-full bg-accent transition-[width] duration-500 ease-[var(--ease-out-expo)]"
                        style={{ width: i <= step ? "100%" : "0%" }}
                      />
                    </span>
                    <span className={cn("text-xs", i === step ? "font-medium text-fg" : "text-subtle")}>
                      <span className="hidden sm:inline">{i + 1}. </span>
                      {s.label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: offset * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -offset * direction }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => onStepShown(step)}
              >
                <h3 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-bold tracking-tight outline-none sm:text-[1.75rem]">
                  {current.title}
                </h3>
                <p className="mt-2 text-muted">{current.hint}</p>

                <div className="mt-6">
                  {step === 0 && (
                    <fieldset>
                      <legend className="sr-only">{current.title}</legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {projectTypeIds.map((id) => (
                          <OptionCard
                            key={id}
                            type="radio"
                            name="quiz-type"
                            value={id}
                            title={projectTypes[id].label}
                            hint={projectTypes[id].hint}
                            aside={`от ${formatNumber(projectTypes[id].price[0] / 1000)} тыс.`}
                            checked={type === id}
                            onChange={() => chooseType(id)}
                          />
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {step === 1 && type && (
                    <fieldset>
                      <legend className="sr-only">{current.title}</legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {projectTypes[type].features.map((id) => (
                          <OptionCard
                            key={id}
                            type="checkbox"
                            name="quiz-features"
                            value={id}
                            title={features[id].label}
                            aside={`+${formatNumber(features[id].price[0] / 1000)} тыс.`}
                            checked={selected.includes(id)}
                            onChange={() => toggleFeature(id)}
                          />
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {step === 2 && (
                    <fieldset>
                      <legend className="sr-only">{current.title}</legend>
                      <div className="grid gap-3">
                        {urgencyIds.map((id) => (
                          <OptionCard
                            key={id}
                            type="radio"
                            name="quiz-urgency"
                            value={id}
                            title={urgencies[id].label}
                            hint={urgencies[id].hint}
                            aside={urgencies[id].priceK === 1 ? "базовая цена" : `×${String(urgencies[id].priceK).replace(".", ",")}`}
                            checked={urgency === id}
                            onChange={() => setUrgency(id)}
                          />
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {step === 3 && (
                    <form id="quiz-form" onSubmit={onSubmit} noValidate className="relative flex flex-col gap-4">
                      <ContactInputs
                        idPrefix="quiz"
                        register={register}
                        errors={errors}
                        commentPlaceholder="Что важно учесть: сроки запуска, интеграции, примеры"
                      />
                      {status === "error" && <ErrorMessage message={error} />}
                      <PrivacyNote action={quizSection.submit} />
                    </form>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Навигация */}
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
              {step > 0 ? (
                <Button variant="ghost" onClick={() => go(step - 1)} className="px-0">
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  {quizSection.back}
                </Button>
              ) : (
                <span />
              )}

              {step < LAST_STEP ? (
                <Button onClick={() => go(step + 1)} disabled={step === 0 && !type}>
                  {step === 1 && selected.length === 0 ? quizSection.skip : quizSection.next}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Button>
              ) : (
                <Button type="submit" form="quiz-form" disabled={status === "loading"} aria-busy={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                      Отправляем…
                    </>
                  ) : (
                    <>
                      {quizSection.submit}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </>
        )}
      </div>

      <div className="hidden lg:sticky lg:top-24 lg:block">
        <PriceSummary
          variant="panel"
          estimate={estimate}
          typeLabel={type ? projectTypes[type].label : undefined}
          details={details}
        />
      </div>

      {status !== "success" && (
        <PriceSummary variant="bar" estimate={estimate} details={details} className="sticky bottom-3 z-20 lg:hidden" />
      )}
    </div>
  );
}
