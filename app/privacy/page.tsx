import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: `Как ${site.name} обрабатывает персональные данные, оставленные на сайте.`,
  alternates: { canonical: "/privacy" },
};

// TODO: согласовать текст политики с юристом и указать реальные реквизиты оператора
export default function PrivacyPage() {
  return (
    <main className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          <ArrowLeft className="size-4" aria-hidden="true" />
          На главную
        </Link>
        <h1 className="mt-8 font-display text-h2 font-extrabold">Политика конфиденциальности</h1>

        <div className="mt-10 space-y-8 leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-fg">
          <section>
            <h2>1. Оператор данных</h2>
            <p>
              Оператор персональных данных — {site.legal.entity}, ИНН {site.legal.inn}. Связь по вопросам обработки данных:{" "}
              <a className="text-accent" href={`mailto:${site.contacts.email}`}>
                {site.contacts.email}
              </a>
              .
            </p>
          </section>
          <section>
            <h2>2. Какие данные мы получаем</h2>
            <p>
              Имя, контакт для связи (телефон, Telegram или email), комментарий и параметры проекта, которые вы указываете в форме
              заявки или калькуляторе.
            </p>
          </section>
          <section>
            <h2>3. Зачем мы их используем</h2>
            <p>Только чтобы связаться с вами, рассчитать стоимость и подготовить предложение по проекту.</p>
          </section>
          <section>
            <h2>4. Хранение и передача</h2>
            <p>
              Данные передаются в защищённый рабочий чат студии и не передаются третьим лицам, кроме случаев, предусмотренных
              законодательством РФ. Храним данные не дольше, чем нужно для работы с заявкой.
            </p>
          </section>
          <section>
            <h2>5. Ваши права</h2>
            <p>
              Вы можете запросить уточнение, изменение или удаление своих данных, написав на {site.contacts.email}. Отправляя
              заявку, вы даёте согласие на обработку персональных данных в соответствии с 152-ФЗ.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
