import type { Resolver } from "react-hook-form";
import type { ContactFields } from "./schemas";

/**
 * Резолвер react-hook-form, который подгружает zod и схему только при первой валидации.
 * Так валидация не утяжеляет стартовый бандл страницы.
 */
export const contactResolver: Resolver<ContactFields> = async (values, context, options) => {
  const [{ zodResolver }, { contactFieldsSchema }] = await Promise.all([
    import("@hookform/resolvers/zod"),
    import("./schemas"),
  ]);
  return zodResolver(contactFieldsSchema)(values, context, options);
};
