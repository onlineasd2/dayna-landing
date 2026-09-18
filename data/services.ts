// Карточки услуг (bento-сетка) и список услуг для формы заявки.

export const serviceIds = [
  "landing",
  "bot",
  "automation",
  "saas",
  "web-service",
  "ai-integration",
  "ai-agent",
] as const;
export type ServiceId = (typeof serviceIds)[number];

export type ServiceVisual = "agent" | "bot" | "flow" | "dashboard" | "knowledge" | "cabinet" | "landing";

export type Service = {
  id: ServiceId;
  title: string;
  /** Короткое название — для выбора услуги в форме */
  short: string;
  problem: string;
  result: string;
  /** Срок, который показываем на карточке */
  timeline: string;
  visual: ServiceVisual;
  /** Классы размеров в bento-сетке */
  layout: string;
};

export const servicesSection = {
  eyebrow: "Услуги",
  title: "Что мы делаем",
  subtitle: "Семь направлений у одного подрядчика. Дизайн продумываем сами — в каждом проекте.",
  cta: "Обсудить проект",
};

export const services: Service[] = [
  {
    id: "landing",
    title: "Сайты и лендинги",
    short: "Сайт или лендинг",
    problem: "Сайта нет или он не приносит заявок.",
    result: "Быстрый сайт с понятным предложением, SEO и формой заявки, которая сразу попадает к вам.",
    timeline: "1–2 недели",
    visual: "landing",
    layout: "md:col-span-2 lg:col-span-3 lg:row-span-2",
  },
  {
    id: "bot",
    title: "Telegram-боты",
    short: "Telegram-бот",
    problem: "Запись, заказы и ответы на вопросы идут вручную через переписку.",
    result: "Бот принимает заявки, записывает клиентов и отвечает на частые вопросы сам.",
    timeline: "1–3 недели",
    visual: "bot",
    layout: "lg:col-span-3",
  },
  {
    id: "automation",
    title: "Автоматизация бизнеса",
    short: "Автоматизация",
    problem: "Менеджеры переносят данные между CRM, 1С и таблицами.",
    result: "Системы синхронизируются сами, отчёт готов каждое утро.",
    timeline: "1–3 недели",
    visual: "flow",
    layout: "lg:col-span-3",
  },
  {
    id: "saas",
    title: "SaaS-продукты",
    short: "SaaS-продукт",
    problem: "Есть идея продукта, но нет команды, чтобы быстро её проверить.",
    result: "MVP с личным кабинетом и аналитикой — проверяете идею на реальных пользователях.",
    timeline: "6–12 недель",
    visual: "dashboard",
    layout: "md:col-span-2 lg:col-span-4",
  },
  {
    id: "web-service",
    title: "Веб-сервисы",
    short: "Веб-сервис",
    problem: "Клиенты и партнёры звонят узнать статус заказа.",
    result: "Личный кабинет и админка: статусы и документы в одном окне.",
    timeline: "4–10 недель",
    visual: "cabinet",
    layout: "lg:col-span-2",
  },
  {
    id: "ai-integration",
    title: "Внедрение ИИ",
    short: "Внедрение ИИ",
    problem: "Сотрудники часами ищут ответы в регламентах и документах.",
    result: "ИИ-ассистент отвечает по базе знаний компании за секунды.",
    timeline: "3–6 недель",
    visual: "knowledge",
    layout: "lg:col-span-3",
  },
  {
    id: "ai-agent",
    title: "ИИ-ассистенты для клиентов",
    short: "ИИ-ассистент",
    problem: "Клиенты пишут ночью и в выходные, а ответить некому.",
    result: "Ассистент отвечает на вопросы, записывает клиентов и передаёт заявки в CRM.",
    timeline: "2–4 недели",
    visual: "agent",
    layout: "lg:col-span-3",
  },
];

export const serviceOptions = [
  ...services.map((s) => ({ id: s.id, label: s.short })),
  { id: "other", label: "Другое" },
] as const;
