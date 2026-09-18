"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { getServiceOptions } from "@/data/services";
import { createContactResolver } from "@/lib/contact-resolver";
import { t, type Locale } from "@/lib/i18n";
import { SERVICE_SELECT_EVENT, type ServiceSelectDetail } from "@/lib/lead-events";
import type { ContactFields } from "@/lib/schemas";
import { useLeadSubmit } from "@/lib/use-lead-submit";
import { m } from "@/paraglide/messages.js";
import { ContactInputs } from "./ContactInputs";
import { ErrorMessage, PrivacyNote, SuccessMessage } from "./SubmitFeedback";

export function LeadForm({ locale }: { locale: Locale }) {
  const o = t(locale);
  const submitLabel = m.form_submit({}, o);
  const serviceOptions = getServiceOptions(locale);
  const resolver = useMemo(() => createContactResolver(locale), [locale]);
  const { status, error, submit } = useLeadSubmit();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFields>({
    resolver,
    defaultValues: { name: "", contact: "", service: "", comment: "", website: "", locale },
  });

  // Клик «Обсудить проект» на карточке услуги — выбираем услугу в форме
  useEffect(() => {
    const onSelect = (e: Event) => setValue("service", (e as CustomEvent<ServiceSelectDetail>).detail.service);
    window.addEventListener(SERVICE_SELECT_EVENT, onSelect);
    return () => window.removeEventListener(SERVICE_SELECT_EVENT, onSelect);
  }, [setValue]);

  const onSubmit = handleSubmit((values) => submit({ ...values, locale }));

  if (status === "success") return <SuccessMessage locale={locale} />;

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5" aria-label={m.form_label({}, o)}>
      <fieldset>
        <legend className="mb-2.5 text-sm font-medium text-muted">{m.form_service_legend({}, o)}</legend>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((opt) => (
            <label
              key={opt.id}
              className="cursor-pointer rounded-full border border-border-strong px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-white/25 hover:text-fg has-[:checked]:border-accent/60 has-[:checked]:bg-accent/10 has-[:checked]:text-accent has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
            >
              <input type="radio" value={opt.id} className="sr-only" {...register("service")} />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      <ContactInputs locale={locale} idPrefix="lead" register={register} errors={errors} />
      {status === "error" && <ErrorMessage locale={locale} error={error} />}
      <Button type="submit" size="lg" disabled={status === "loading"} aria-busy={status === "loading"}>
        {status === "loading" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            {m.form_sending({}, o)}
          </>
        ) : (
          <>
            {submitLabel}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </>
        )}
      </Button>
      <PrivacyNote locale={locale} action={submitLabel} />
    </form>
  );
}
