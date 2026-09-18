"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { ctaSection } from "@/data/content";
import { contactFieldsSchema, type ContactFields } from "@/lib/schemas";
import { useLeadSubmit } from "@/lib/use-lead-submit";
import { ContactInputs } from "./ContactInputs";
import { ErrorMessage, PrivacyNote, SuccessMessage } from "./SubmitFeedback";

export function LeadForm() {
  const { status, error, submit } = useLeadSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactFieldsSchema),
    defaultValues: { name: "", contact: "", comment: "", website: "" },
  });

  const onSubmit = handleSubmit((values) => submit({ ...values, source: "form" }));

  if (status === "success") return <SuccessMessage />;

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-4" aria-label="Заявка на обсуждение проекта">
      <ContactInputs idPrefix="lead" register={register} errors={errors} commentPlaceholder="Например: нужен бот для записи клиентов" />
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
