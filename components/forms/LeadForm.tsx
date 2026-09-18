"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { ctaSection } from "@/data/content";
import { serviceOptions } from "@/data/services";
import { contactResolver } from "@/lib/contact-resolver";
import { SERVICE_SELECT_EVENT, type ServiceSelectDetail } from "@/lib/lead-events";
import type { ContactFields } from "@/lib/schemas";
import { useLeadSubmit } from "@/lib/use-lead-submit";
import { ContactInputs } from "./ContactInputs";
import { ErrorMessage, PrivacyNote, SuccessMessage } from "./SubmitFeedback";

export function LeadForm() {
  const { status, error, submit } = useLeadSubmit();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFields>({
    resolver: contactResolver,
    defaultValues: { name: "", contact: "", service: "", comment: "", website: "" },
  });

  // Клик «Обсудить проект» на карточке услуги — выбираем услугу в форме
  useEffect(() => {
    const onSelect = (e: Event) => setValue("service", (e as CustomEvent<ServiceSelectDetail>).detail.service);
    window.addEventListener(SERVICE_SELECT_EVENT, onSelect);
    return () => window.removeEventListener(SERVICE_SELECT_EVENT, onSelect);
  }, [setValue]);

  const onSubmit = handleSubmit((values) => submit(values));

  if (status === "success") return <SuccessMessage />;

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5" aria-label="Заявка на обсуждение проекта">
      <fieldset>
        <legend className="mb-2.5 text-sm font-medium text-muted">Что нужно сделать?</legend>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((o) => (
            <label
              key={o.id}
              className="cursor-pointer rounded-full border border-border-strong px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-white/25 hover:text-fg has-[:checked]:border-accent/60 has-[:checked]:bg-accent/10 has-[:checked]:text-accent has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
            >
              <input type="radio" value={o.id} className="sr-only" {...register("service")} />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <ContactInputs idPrefix="lead" register={register} errors={errors} commentPlaceholder="Коротко о задаче: что хотите получить и к какому сроку" />
      {status === "error" && <ErrorMessage message={error} />}
      <Button type="submit" size="lg" disabled={status === "loading"} aria-busy={status === "loading"}>
        {status === "loading" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            Отправляем…
          </>
        ) : (
          <>
            {ctaSection.submit}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </>
        )}
      </Button>
      <PrivacyNote action={ctaSection.submit} />
    </form>
  );
}
