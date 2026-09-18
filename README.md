# Данил — лендинг IT-студии

Продающий одностраничный сайт студии полного цикла: сайты, Telegram-боты, веб-сервисы, SaaS, автоматизация и внедрение ИИ.
Заявки с формы приходят в Telegram.

**Стек:** Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS v4 · Paraglide JS (i18n) · react-hook-form + zod · lucide-react · next/font (Manrope + Inter).

**Языки:** русский (`/`), английский (`/en`), казахский (`/kz`).

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

Все тексты сайта лежат в словарях `messages/{ru,en,kk}.json` — вёрстку трогать не нужно.
Ключи во всех трёх файлах одинаковые; меняете текст — меняйте его во всех языках.

| Где | Что |
|---|---|
| `messages/ru.json`, `en.json`, `kk.json` | Все тексты: меню, первый экран, услуги, FAQ, форма, ошибки, политика |
| `data/site.ts` | Название в логотипе, контакты (Telegram, email, телефон), реквизиты |
| `data/services.ts` | Порядок услуг и их размер в bento-сетке |
| `data/content.ts` | Список технологий в бегущей строке, иконки «Почему мы» |

Поиск по проекту `TODO:` покажет все места с заглушками, которые нужно заменить реальными данными.

## Локализация (Paraglide JS)

- Настройки проекта — `project.inlang/settings.json` (базовый язык `ru`, языки `ru`, `en`, `kk`).
- Словари компилируются в типизированные функции в папку `paraglide/` (генерируется, в git не хранится).
  Компиляция запускается автоматически перед `dev`, `build`, `lint` и после `npm install`; вручную — `npm run i18n`.
- В коде: `m.hero_title({}, { locale })` — язык передаётся явно, поэтому все языковые версии рендерятся статически.
- Маршруты: страницы лежат в `app/[lang]`, `proxy.ts` открывает русский без префикса, `/en` и `/kz` — с префиксом, `/ru/...` редиректит на адрес без префикса.
  Для SEO выставляются `hreflang`, отдельные canonical, OG-картинки и sitemap для каждого языка.
- Казахский: код языка — `kk` (стандарт BCP 47), в адресе — `/kz`. Перевод стоит вычитать носителю языка.

**Добавить язык:** добавьте код в `project.inlang/settings.json`, создайте `messages/<код>.json` с теми же ключами,
пропишите сегмент URL и подписи в `lib/i18n.ts` (`localeSegments`, `localeLabels`, `localeNames`, `ogLocales`) и в `PREFIXED` в `proxy.ts`.

### Блок кейсов

Компонент `components/sections/Cases.tsx` и тексты в `data/cases.ts` (пока только на русском) готовы, но блок скрыт.
Чтобы вернуть: замените заглушки реальными проектами, перенесите тексты в `messages/*.json`, добавьте `<Cases locale={locale} />`
в `app/[lang]/page.tsx` (место отмечено комментарием) и пункт меню в `getNav` (`data/site.ts`).

## Заявки

- `POST /api/lead` — `app/api/lead/route.ts`
- Серверная валидация zod (`lib/schemas.ts`), honeypot-поле `website`, rate limit — 5 заявок с IP за 10 минут (`lib/rate-limit.ts`).
  Лимит хранится в памяти инстанса; для жёсткой защиты подключите Upstash Redis / Vercel KV.
- Сообщение в Telegram (всегда на русском) форматируется в `lib/telegram.ts`: имя, контакт, услуга, комментарий, время (МСК), язык сайта, страница.
- API отдаёт коды ошибок (`rate_limit`, `invalid`, `send_failed`…), а текст ошибки показывается на языке страницы.
- Клик «Обсудить проект» на карточке услуги прокручивает к форме и выбирает услугу (`lib/lead-events.ts`).

## Структура

```
app/[lang]/     страницы на трёх языках: главная, политика, 404, OG-картинка
app/            API, sitemap, robots, icon
messages/       словари ru / en / kk
proxy.ts        языковая маршрутизация
components/
  layout/       Header, Footer, Logo, плавающая кнопка Telegram
  sections/     секции страницы
  mockups/      «живые» мини-интерфейсы вместо картинок
  forms/        форма заявки
  ui/           Button, Section, Reveal, Field, Badge, Card, Container
data/           структура контента (тексты берутся из messages/)
lib/            i18n, схемы, отправка в Telegram, rate limit, утилиты
```

## Деплой

Продакшн: **https://dayna-landing.vercel.app** (Vercel, проект `dayna-landing`).

Автодеплой из GitHub: после подключения репозитория каждый push в `main` запускает продакшн-деплой, push в другие ветки — preview.

1. Подключить репозиторий: в Vercel **Project → Settings → Git → Connect Git Repository** (или `npx vercel git connect` из папки проекта).
2. **Settings → Environment Variables:** добавить `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (и `NEXT_PUBLIC_SITE_URL`, если есть свой домен) для Production и Preview.
3. После изменения переменных — **Deployments → … → Redeploy** последнего деплоя.
4. Свой домен: **Settings → Domains**, затем обновить `NEXT_PUBLIC_SITE_URL`.

Ручной деплой без Git: `npx vercel deploy --prod`.
