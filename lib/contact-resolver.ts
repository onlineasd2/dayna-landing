import type { Resolver } from "react-hook-form";
import type { Locale } from "./i18n";
import type { ContactFields } from "./schemas";

/**
 * Резолвер react-hook-form, который подгружает zod и схему только при первой валидации.
 * Так валидация не утяжеляет стартовый бандл страницы.
 */
export function createContactResolver(locale: Locale): Resolver<ContactFields> {
  return async (values, context, options) => {
    const [{ zodResolver }, { createContactSchema }] = await Promise.all([
      import("@hookform/resolvers/zod"),
      import("./schemas"),
    ]);
    return zodResolver(createContactSchema(locale))(values, context, options);
  };
}
