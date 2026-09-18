# Dayna — лендинг IT-студии

Продающий одностраничный сайт студии полного цикла: сайты, Telegram-боты, веб-сервисы, SaaS, автоматизация и внедрение ИИ.
Заявки с формы приходят в Telegram.

**Стек:** Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS v4 · react-hook-form + zod · lucide-react · next/font (Manrope + Inter).

## Локальный запуск

Нужен Node.js 20+.

```bash
npm install
cp .env.example .env.local   # заполните переменные (см. ниже)
npm run dev                  # http://localhost:3000
```

Проверки перед коммитом:

```bash
npm run lint
npm run build
```

> Без `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` в режиме разработки заявка не отправляется, а печатается в консоль сервера — форму можно тестировать без бота. В продакшене без этих переменных API вернёт ошибку.

## Переменные окружения

| Переменная | Где взять | Зачем |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | [@BotFather](https://t.me/BotFather) → `/newbot` | Токен бота, который пишет заявки |
| `TELEGRAM_CHAT_ID` | Напишите боту `/start` (или добавьте в группу), откройте `https://api.telegram.org/bot<TOKEN>/getUpdates` и возьмите `chat.id` (у групп он отрицательный) | Куда присылать заявки |
| `NEXT_PUBLIC_SITE_URL` | Ваш домен без `/` в конце, например `https://dayna.studio` | canonical, sitemap, Open Graph |

## Как менять контент

Все тексты лежат в `/data` — вёрстку трогать не нужно.

| Файл | Что внутри |
|---|---|
| `data/site.ts` | Название, слоган, контакты (Telegram, email, телефон), реквизиты, меню |
| `data/hero.ts` | Первый экран: заголовок, подзаголовок, кнопки, метрики, содержимое витрины |
| `data/services.ts` | Карточки услуг: тексты, сроки, размер в bento-сетке, список услуг в форме |
| `data/content.ts` | Стек технологий, «боли → решения», кейсы, процесс, «почему мы», FAQ, финальный CTA |

Поиск по проекту `TODO:` покажет все места с заглушками, которые нужно заменить реальными данными.

### Блок кейсов

Компонент `components/sections/Cases.tsx` и тексты `casesSection` в `data/content.ts` готовы, но блок скрыт.
Чтобы вернуть: замените заглушки реальными проектами и добавьте `<Cases />` в `app/page.tsx` (место отмечено комментарием),
а в `data/site.ts` — пункт меню `{ label: "Кейсы", href: "#cases" }`.

## Заявки

- `POST /api/lead` — `app/api/lead/route.ts`
- Серверная валидация zod (`lib/schemas.ts`), honeypot-поле `website`, rate limit — 5 заявок с IP за 10 минут (`lib/rate-limit.ts`).
  Лимит хранится в памяти инстанса; для жёсткой защиты подключите Upstash Redis / Vercel KV.
- Сообщение в Telegram форматируется в `lib/telegram.ts`: имя, контакт, услуга, комментарий, время (МСК), страница.
- Клик «Обсудить проект» на карточке услуги прокручивает к форме и выбирает услугу (`lib/lead-events.ts`).

## Структура

```
app/            страница, layout, API, SEO (sitemap, robots, opengraph-image, icon), политика конфиденциальности
components/
  layout/       Header, Footer, Logo, плавающая кнопка Telegram
  sections/     секции страницы
  mockups/      «живые» мини-интерфейсы вместо картинок
  forms/        форма заявки
  ui/           Button, Section, Reveal, Field, Badge, Card, Container
data/           весь контент
lib/            схемы, отправка в Telegram, rate limit, утилиты
```

## Деплой

Продакшн: **https://dayna-landing.vercel.app** (Vercel, проект `dayna-landing`).

Автодеплой из GitHub: после подключения репозитория каждый push в `main` запускает продакшн-деплой, push в другие ветки — preview.

1. Подключить репозиторий: в Vercel **Project → Settings → Git → Connect Git Repository** (или `npx vercel git connect` из папки проекта).
2. **Settings → Environment Variables:** добавить `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (и `NEXT_PUBLIC_SITE_URL`, если есть свой домен) для Production и Preview.
3. После изменения переменных — **Deployments → … → Redeploy** последнего деплоя.
4. Свой домен: **Settings → Domains**, затем обновить `NEXT_PUBLIC_SITE_URL`.

Ручной деплой без Git: `npx vercel deploy --prod`.
