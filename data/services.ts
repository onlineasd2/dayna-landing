// Карточки услуг (bento-сетка). Цена «от» берётся из data/pricing.ts.
import type { ProjectTypeId } from "./pricing";

export type ServiceVisual = "agent" | "bot" | "flow" | "dashboard" | "knowledge" | "cabinet" | "landing";

export type Service = {
  id: ProjectTypeId;
  title: string;
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
  subtitle: "Семь направлений у одного подрядчика. Дизайн уже входит в стоимость.",
  cta: "Рассчитать проект",
};

export const services: Service[] = [
  {
    id: "ai-agent",
    title: "ИИ-агенты",
    problem: "Лиды теряются ночью, в выходные и пока менеджер занят.",
    result: "Агент отвечает за 3 секунды, квалифицирует клиента и записывает в CRM — 24/7.",
    timeline: "2–4 недели",
    visual: "agent",
    layout: "md:col-span-2 lg:col-span-3 lg:row-span-2",
  },
  {
    id: "bot",
    title: "Telegram-боты",
    problem: "Запись, продажи и оплаты идут вручную через переписку.",
    result: "Бот принимает заказы и оплату сам, менеджер получает готовые заявки.",
    timeline: "1–3 недели",
    visual: "bot",
    layout: "lg:col-span-3",
  },
  {
    id: "automation",
    title: "Автоматизация бизнеса",
    problem: "Менеджеры переносят данные между CRM, 1С и таблицами.",
    result: "Системы синхронизируются сами, отчёт готов каждое утро.",
    timeline: "1–3 недели",
    visual: "flow",
    layout: "lg:col-span-3",
  },
  {
    id: "saas",
    title: "SaaS-продукты",
    problem: "Есть идея продукта, но нет команды, чтобы быстро её проверить.",
    result: "MVP с оплатой, тарифами и аналитикой — первые платящие клиенты через 2 месяца.",
    timeline: "6–12 недель",
    visual: "dashboard",
    layout: "md:col-span-2 lg:col-span-4",
  },
  {
    id: "ai-integration",
    title: "Внедрение ИИ",
    problem: "Сотрудники часами ищут ответы в регламентах.",
    result: "ИИ-ассистент отвечает по базе знаний компании за секунды.",
    timeline: "3–6 недель",
    visual: "knowledge",
    layout: "lg:col-span-2",
  },
  {
    id: "web-service",
    title: "Веб-сервисы",
    problem: "Клиенты и партнёры звонят узнать статус заказа.",
    result: "Личный кабинет и админка: статусы, документы и оплаты в одном окне.",
    timeline: "4–10 недель",
    visual: "cabinet",
    layout: "lg:col-span-3",
  },
  {
    id: "landing",
    title: "Лендинги и сайты",
    problem: "Реклама дорожает, а сайт не превращает трафик в заявки.",
    result: "Быстрая страница с понятным оффером, SEO и загрузкой меньше секунды.",
    timeline: "1–2 недели",
    visual: "landing",
    layout: "lg:col-span-3",
  },
];
