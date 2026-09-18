// Логика калькулятора. Единственный источник цен: карточки услуг, квиз и сервер берут цифры отсюда.
// Все цены — в рублях, сроки — в неделях.
// TODO: сверить базовые цены и надбавки с реальным прайсом студии

type Range = readonly [min: number, max: number];

export const projectTypeIds = [
  "ai-agent",
  "bot",
  "automation",
  "saas",
  "ai-integration",
  "web-service",
  "landing",
] as const;
export type ProjectTypeId = (typeof projectTypeIds)[number];

export const featureIds = [
  "payments",
  "booking",
  "crm",
  "one-c",
  "ai",
  "knowledge",
  "channels",
  "account",
  "admin",
  "subscriptions",
  "analytics",
  "multilang",
  "seo",
] as const;
export type FeatureId = (typeof featureIds)[number];

export const urgencyIds = ["standard", "month", "asap"] as const;
export type UrgencyId = (typeof urgencyIds)[number];

type ProjectType = {
  label: string;
  hint: string;
  /** Базовая вилка цены */
  price: Range;
  /** Базовый срок в неделях */
  weeks: Range;
  /** Функции, которые предлагаем на шаге 2 */
  features: readonly FeatureId[];
};

export const projectTypes: Record<ProjectTypeId, ProjectType> = {
  "ai-agent": {
    label: "ИИ-агент",
    hint: "Отвечает клиентам и квалифицирует лиды 24/7",
    price: [90_000, 150_000],
    weeks: [2, 4],
    features: ["knowledge", "channels", "crm", "booking", "payments", "analytics", "multilang"],
  },
  bot: {
    label: "Telegram-бот",
    hint: "Продажи, запись, оплата, поддержка",
    price: [40_000, 70_000],
    weeks: [1, 3],
    features: ["payments", "booking", "crm", "ai", "admin", "analytics", "multilang"],
  },
  automation: {
    label: "Автоматизация",
    hint: "CRM, 1С, таблицы, n8n/Make, отчёты",
    price: [60_000, 120_000],
    weeks: [1, 3],
    features: ["crm", "one-c", "ai", "analytics", "admin"],
  },
  saas: {
    label: "SaaS-продукт",
    hint: "MVP с оплатой, тарифами и аналитикой",
    price: [350_000, 600_000],
    weeks: [6, 12],
    features: ["subscriptions", "payments", "admin", "analytics", "ai", "multilang", "seo"],
  },
  "ai-integration": {
    label: "Внедрение ИИ",
    hint: "GPT/Claude, RAG, ассистент для сотрудников",
    price: [120_000, 220_000],
    weeks: [3, 6],
    features: ["knowledge", "crm", "one-c", "channels", "admin", "analytics"],
  },
  "web-service": {
    label: "Веб-сервис",
    hint: "Личный кабинет, админка, маркетплейс",
    price: [180_000, 350_000],
    weeks: [4, 10],
    features: ["account", "admin", "payments", "crm", "one-c", "ai", "analytics", "multilang"],
  },
  landing: {
    label: "Лендинг или сайт",
    hint: "Быстрый, конверсионный, с SEO",
    price: [50_000, 90_000],
    weeks: [1, 2],
    features: ["seo", "crm", "ai", "payments", "multilang", "analytics"],
  },
};

type Feature = {
  label: string;
  price: Range;
  /** Сколько недель добавляет к сроку */
  weeks: Range;
};

export const features: Record<FeatureId, Feature> = {
  payments: { label: "Онлайн-оплата", price: [15_000, 25_000], weeks: [0.5, 0.5] },
  booking: { label: "Онлайн-запись и календарь", price: [20_000, 40_000], weeks: [0.5, 1] },
  crm: { label: "Интеграция с CRM", price: [20_000, 40_000], weeks: [0.5, 1] },
  "one-c": { label: "Интеграция с 1С", price: [40_000, 80_000], weeks: [1, 2] },
  ai: { label: "ИИ-ответы (GPT/Claude)", price: [30_000, 60_000], weeks: [1, 1.5] },
  knowledge: { label: "База знаний компании (RAG)", price: [40_000, 80_000], weeks: [1, 2] },
  channels: { label: "Несколько каналов: Telegram, WhatsApp, сайт", price: [25_000, 45_000], weeks: [0.5, 1] },
  account: { label: "Личный кабинет клиента", price: [60_000, 120_000], weeks: [2, 3] },
  admin: { label: "Админ-панель", price: [40_000, 80_000], weeks: [1, 2] },
  subscriptions: { label: "Подписки и тарифы", price: [40_000, 80_000], weeks: [1, 2] },
  analytics: { label: "Аналитика и отчёты", price: [25_000, 50_000], weeks: [0.5, 1] },
  multilang: { label: "Мультиязычность", price: [15_000, 30_000], weeks: [0.5, 1] },
  seo: { label: "SEO и тексты", price: [15_000, 30_000], weeks: [0.5, 0.5] },
};

type Urgency = {
  label: string;
  hint: string;
  /** Множитель цены */
  priceK: number;
  /** Множитель срока */
  timeK: number;
};

export const urgencies: Record<UrgencyId, Urgency> = {
  standard: { label: "Не горит", hint: "Спокойный темп, лучшая цена", priceK: 1, timeK: 1 },
  month: { label: "Нужно в течение месяца", hint: "Сроки короче на 15%", priceK: 1.15, timeK: 0.85 },
  asap: { label: "Нужно было вчера", hint: "Выделяем больше людей, сроки −30%", priceK: 1.35, timeK: 0.7 },
};

export type EstimateInput = {
  type: ProjectTypeId;
  features: readonly FeatureId[];
  urgency: UrgencyId;
};

export type Estimate = {
  priceMin: number;
  priceMax: number;
  weeksMin: number;
  weeksMax: number;
};

const PRICE_STEP = 5_000;
const roundPrice = (v: number) => Math.round(v / PRICE_STEP) * PRICE_STEP;

export function calculateEstimate({ type, features: selected, urgency }: EstimateInput): Estimate {
  const project = projectTypes[type];
  const k = urgencies[urgency];
  // Считаем только функции, доступные для выбранного типа — защита от мусора с клиента
  const valid = selected.filter((id) => project.features.includes(id));

  let [priceMin, priceMax] = project.price;
  let [weeksMin, weeksMax] = project.weeks;
  for (const id of valid) {
    priceMin += features[id].price[0];
    priceMax += features[id].price[1];
    weeksMin += features[id].weeks[0];
    weeksMax += features[id].weeks[1];
  }

  const wMin = Math.max(1, Math.round(weeksMin * k.timeK));
  const wMax = Math.max(wMin + 1, Math.ceil(weeksMax * k.timeK));

  return {
    priceMin: roundPrice(priceMin * k.priceK),
    priceMax: roundPrice(priceMax * k.priceK),
    weeksMin: wMin,
    weeksMax: wMax,
  };
}

export function formatWeeks(min: number, max: number): string {
  const word = (n: number) => {
    const m10 = n % 10;
    const m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return "неделя";
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return "недели";
    return "недель";
  };
  return `${min}–${max} ${word(max)}`;
}
