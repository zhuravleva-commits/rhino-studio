'use client';

// Блок вопросов и ответов. Вопросы разделены только линиями — так он не спорит
// с соседними секциями, где и так много плашек.
//
// Раскрыт не больше одного ответа: открывая следующий, предыдущий закрываем.
// При загрузке все вопросы свёрнуты — так попросил заказчик.

import { useState } from 'react';

import { LeadForm } from './lead-form';

const questions = [
  {
    question: 'Сколько времени занимает работа?',
    answer:
      'Лендинг — от недели, веб-приложение и Mini App — от двух недель. Точный срок называем после того, как разберём задачу: он зависит от количества экранов и того, насколько готов контент.',
  },
  {
    question: 'Что нужно от меня, чтобы начать?',
    answer:
      'Достаточно рассказать, что за продукт и кому он нужен. Тексты, фотографии и доступы соберём вместе по ходу.',
  },
  {
    question: 'Как построена оплата?',
    answer: 'Любым удобным для вас способом — определяем перед запуском.',
  },
  {
    question: 'Как следить за ходом работы?',
    answer:
      'Работаем прозрачно: вы в курсе того, что происходит на каждом этапе, — видите промежуточные результаты и знаете, что будет дальше.',
  },
  {
    question: 'А если захочу что-то поменять по ходу?',
    answer:
      'Правки внутри согласованной задачи входят в стоимость, обсуждать каждую отдельно не нужно. Если появляется новый раздел или меняется логика — оцениваем как дополнение и решаем, делать сейчас или после запуска.',
  },
  {
    question: 'Можно начать с малого и расти потом?',
    answer:
      'Так и советуем. Собираем первую версию с главным сценарием, показываем живым пользователям и дальше вкладываемся в то, чем реально пользуются, а не в придуманные заранее разделы.',
  },
];

export function FaqSection() {
  const [open, setOpen] = useState(-1);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-shell">
        {/* Блок поделён пополам: слева вопросы, справа заявка. Кто дочитал
            ответы и решился, пишет тут же, не листая страницу. */}
        <div className="faq-questions">
          <h2 className="faq-title">FAQ</h2>

          <div className="faq-list">
            {questions.map((item, index) => {
              const isOpen = open === index;

              return (
                <div
                  className={`faq-item${isOpen ? ' faq-item--open' : ''}`}
                  key={item.question}
                >
                  <button
                    aria-expanded={isOpen}
                    className="faq-question"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    type="button"
                  >
                    <span className="faq-question__text">{item.question}</span>
                    <span aria-hidden="true" className="faq-sign" />
                  </button>

                  {/* Высоту анимируем через grid-template-rows: ответ
                      раскрывается плавно и без замера высоты скриптом. */}
                  <div className="faq-answer">
                    <div className="faq-answer__inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="faq-lead" id="zayavka">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
