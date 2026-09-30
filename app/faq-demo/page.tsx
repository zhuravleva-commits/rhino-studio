'use client';

// Витрина концептов блока FAQ. Страница временная: нужна, чтобы выбрать вид,
// в боевую страницу пока ничего не идёт.
//
// Пять подач одних и тех же вопросов. Четыре — аккордеоны с разной плотностью
// и фоном, пятый — вопросы слева, ответ справа, без раскрытия.

import { useState } from 'react';

import { QUESTIONS } from './questions';

import './faq-demo.css';

type Concept = {
  id: string;
  title: string;
  note: string;
};

const CONCEPTS: Concept[] = [
  {
    id: 'lines',
    title: '1. Строки',
    note: 'Вопросы разделены только линиями, ничего лишнего. Спокойный вариант, который не спорит с соседними секциями.',
  },
  {
    id: 'cards',
    title: '2. Карточки',
    note: 'Каждый вопрос в своей карточке на светлом фоне. Заметнее предыдущего, легче попасть курсором.',
  },
  {
    id: 'numbered',
    title: '3. С номерами',
    note: 'Крупные номера слева и большой кегль вопроса. Ближе всего к типографике хиро.',
  },
  {
    id: 'dark',
    title: '4. Тёмная секция',
    note: 'Блок на тёмном фоне, синий акцент на раскрытом вопросе. Отбивает FAQ от светлой части страницы.',
  },
  {
    id: 'split',
    title: '5. Вопросы и ответ',
    note: 'Слева список тем, справа ответ на выбранную. Без раскрытия: ответ всегда один и всегда на виду.',
  },
];

function Accordion({ concept }: { concept: string }) {
  // Первый вопрос открыт: пустой блок из одних заголовков выглядит недоделанным.
  const [open, setOpen] = useState(0);

  return (
    <div className="fq-list">
      {QUESTIONS.map((q, i) => {
        const isOpen = open === i;

        return (
          <div className={`fq-item${isOpen ? ' fq-item--open' : ''}`} key={q.question}>
            <button
              aria-expanded={isOpen}
              className="fq-q"
              onClick={() => setOpen(isOpen ? -1 : i)}
              type="button"
            >
              {concept === 'numbered' ? (
                <span className="fq-num">{String(i + 1).padStart(2, '0')}</span>
              ) : null}

              <span className="fq-q__text">{q.question}</span>
              <span aria-hidden="true" className="fq-sign" />
            </button>

            {/* Высота анимируется через grid-template-rows: так ответ
                раскрывается плавно и без замера высоты скриптом. */}
            <div className="fq-a">
              <div className="fq-a__inner">
                <p>{q.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Split() {
  const [active, setActive] = useState(0);
  const current = QUESTIONS[active];

  return (
    <div className="fq-split">
      <div className="fq-split__menu">
        {QUESTIONS.map((q, i) => (
          <button
            className={`fq-split__tab${active === i ? ' fq-split__tab--on' : ''}`}
            key={q.question}
            onClick={() => setActive(i)}
            type="button"
          >
            <span className="fq-split__short">{q.short}</span>
            <span className="fq-split__hint">{q.question}</span>
          </button>
        ))}
      </div>

      <div className="fq-split__body">
        <h4>{current.question}</h4>
        <p>{current.answer}</p>

        <a className="fq-split__cta" href="mailto:hello@rhino.studio">
          Остались вопросы — напишите <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}

export default function FaqDemoPage() {
  return (
    <main className="fq-page">
      <header className="fq-head">
        <h1>Блок вопросов и ответов — концепты</h1>
        <p>
          Пять подач одних и тех же вопросов: четыре аккордеона разной плотности
          и вариант «список слева, ответ справа». В сам сайт ничего не внедрено.
        </p>
      </header>

      {CONCEPTS.map((c) => (
        <section className={`fq-concept fq-concept--${c.id}`} key={c.id}>
          <div className="fq-concept__head">
            <h2>{c.title}</h2>
            <p>{c.note}</p>
          </div>

          <div className="fq-concept__body">
            <div className="fq-lead">
              <p className="fq-eyebrow">Вопросы</p>
              <h3>Коротко о том, как мы работаем</h3>
            </div>

            {c.id === 'split' ? <Split /> : <Accordion concept={c.id} />}
          </div>
        </section>
      ))}
    </main>
  );
}
