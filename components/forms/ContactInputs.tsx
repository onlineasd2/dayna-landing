"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { TextAreaField, TextField } from "@/components/ui/Field";
import { t, type Locale } from "@/lib/i18n";
import type { ContactFields } from "@/lib/schemas";
import { m } from "@/paraglide/messages.js";

type Props = {
  locale: Locale;
  idPrefix: string;
  register: UseFormRegister<ContactFields>;
  errors: FieldErrors<ContactFields>;
};

/** Имя, контакт, комментарий и honeypot. */
export function ContactInputs({ locale, idPrefix, register, errors }: Props) {
  const o = t(locale);
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id={`${idPrefix}-name`}
          label={m.form_name_label({}, o)}
          autoComplete="name"
          placeholder={m.form_name_placeholder({}, o)}
          error={errors.name?.message}
          {...register("name")}
        />
        <TextField
          id={`${idPrefix}-contact`}
          label={m.form_contact_label({}, o)}
          autoComplete="tel"
          placeholder={m.form_contact_placeholder({}, o)}
          error={errors.contact?.message}
          {...register("contact")}
        />
      </div>
      <TextAreaField
        id={`${idPrefix}-comment`}
        label={m.form_comment_label({}, o)}
        placeholder={m.form_comment_placeholder({}, o)}
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
