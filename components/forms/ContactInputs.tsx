"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { TextAreaField, TextField } from "@/components/ui/Field";
import type { ContactFields } from "@/lib/schemas";

type Props = {
  idPrefix: string;
  register: UseFormRegister<ContactFields>;
  errors: FieldErrors<ContactFields>;
  commentPlaceholder?: string;
};

/** Имя, контакт, комментарий и honeypot — общие для формы и квиза. */
export function ContactInputs({ idPrefix, register, errors, commentPlaceholder }: Props) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id={`${idPrefix}-name`}
          label="Имя"
          autoComplete="name"
          placeholder="Как к вам обращаться"
          error={errors.name?.message}
          {...register("name")}
        />
        <TextField
          id={`${idPrefix}-contact`}
          label="Телефон, Telegram или email"
          autoComplete="tel"
          placeholder="+7 900 000-00-00 или @username"
          error={errors.contact?.message}
          {...register("contact")}
        />
      </div>
      <TextAreaField
        id={`${idPrefix}-comment`}
        label="Комментарий (необязательно)"
        placeholder={commentPlaceholder ?? "Коротко о задаче"}
        rows={3}
        error={errors.comment?.message}
        {...register("comment")}
      />
      {/* Honeypot: скрыт от людей и скринридеров */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input id={`${idPrefix}-website`} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
    </>
  );
}
