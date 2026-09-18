type ClassValue = string | number | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

const rub = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

export function formatPrice(value: number): string {
  return `${rub.format(value)} ₽`;
}

export function formatNumber(value: number): string {
  return rub.format(value);
}

/** «от 80 000 до 140 000 ₽» */
export function formatPriceRange(min: number, max: number): string {
  return `от ${formatNumber(min)} до ${formatPrice(max)}`;
}
