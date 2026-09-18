// Общие данные студии: название, контакты, навигация, реквизиты.

export const site = {
  // TODO: заменить на реальное название студии
  name: "Dayna",
  // TODO: заменить на реальный слоган
  tagline: "IT-продукты под ключ — от идеи до запуска",
  description:
    "Разрабатываем сайты, Telegram-ботов, веб-сервисы и SaaS, автоматизируем процессы и внедряем ИИ. Под ключ — от идеи и дизайна до запуска и поддержки.",
  // TODO: заменить на реальный домен
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dayna.studio",
  locale: "ru_RU",

  contacts: {
    // TODO: заменить на реальный Telegram
    telegram: "dayna_studio",
    // TODO: заменить на реальный email
    email: "hello@dayna.studio",
    // TODO: заменить на реальный телефон
    phone: "+7 (900) 000-00-00",
    phoneHref: "+79000000000",
    workingHours: "Пн–Пт, 10:00–20:00 МСК",
  },

  // TODO: заменить на реальные реквизиты
  legal: {
    entity: "ИП Иванов Иван Иванович",
    inn: "000000000000",
    ogrn: "000000000000000",
  },
} as const;

export const telegramUrl = `https://t.me/${site.contacts.telegram}`;

export const nav = [
  { label: "Услуги", href: "#services" },
  { label: "Как работаем", href: "#process" },
  { label: "Почему мы", href: "#why" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contact" },
] as const;

export const headerCta = { label: "Обсудить проект", href: "#contact" } as const;
