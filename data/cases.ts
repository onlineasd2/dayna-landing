// Кейсы. Блок временно скрыт со страницы (см. app/[lang]/page.tsx).
// TODO: все кейсы — заглушки. Заменить на реальные проекты с цифрами, перенести тексты
// в messages/{locale}.json (как остальные секции) и вернуть <Cases /> на страницу.

export type CaseStudy = {
  niche: string;
  title: string;
  task: string;
  solution: string;
  results: { value: string; label: string }[];
  stack: string[];
};

export const casesSection = {
  eyebrow: "Кейсы",
  title: "Уже сделали для других",
  subtitle: "Каждый проект считаем в деньгах клиента — выручке, заявках и сэкономленных часах.",
  items: [
    {
      niche: "Сеть автосервисов",
      title: "ИИ-агент записывает клиентов в Telegram и WhatsApp",
      task: "Администраторы не успевали отвечать, вечерние заявки терялись.",
      solution: "ИИ-агент с базой цен и расписанием, запись в YCLIENTS и карточка в amoCRM.",
      results: [
        { value: "+38%", label: "конверсия в запись" },
        { value: "−60%", label: "нагрузка на администраторов" },
      ],
      stack: ["Claude", "Telegram", "WhatsApp", "amoCRM"],
    },
    {
      niche: "Онлайн-школа",
      title: "Бот продаж с прогревом и оплатой",
      task: "Продажи курса шли вручную через директ, менеджеры выгорали.",
      solution: "Воронка в Telegram: прогрев, тест, оплата через ЮKassa, доступ к урокам.",
      results: [
        { value: "1,2 млн ₽", label: "выручка за первый месяц" },
        { value: "9 дней", label: "окупаемость" },
      ],
      stack: ["Telegram", "ЮKassa", "Node.js", "PostgreSQL"],
    },
    {
      niche: "B2B-дистрибьютор",
      title: "Заказы из CRM сами попадают в 1С",
      task: "Менеджеры вручную переносили заказы, ошибались в артикулах.",
      solution: "Интеграция amoCRM и 1С через n8n, проверка остатков и отчёт руководителю.",
      results: [
        { value: "40 → 4 мин", label: "обработка одного заказа" },
        { value: "0", label: "ошибок в артикулах" },
      ],
      stack: ["n8n", "amoCRM", "1С", "Google Sheets"],
    },
    {
      niche: "SaaS для салонов красоты",
      title: "MVP сервиса онлайн-записи",
      task: "Проверить гипотезу продукта до привлечения инвестиций.",
      solution: "Веб-сервис с записью, напоминаниями, тарифами и оплатой подписки.",
      results: [
        { value: "120", label: "платящих салонов за 4 месяца" },
        { value: "8 недель", label: "от идеи до запуска" },
      ],
      stack: ["Next.js", "Supabase", "Stripe", "OpenAI"],
    },
  ] satisfies CaseStudy[],
};
