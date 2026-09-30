'use client';

// Витрина концептов блока заявки. Страница временная, в сайт ничего не идёт.
//
// Сейчас на сайте формы нет совсем: везде ссылки на почту, и самая заметная из
// них — мелкая строка под блоками. Здесь пять способов сделать из неё видное
// место, все в сильно скруглённой рамке.
//
// Отправка нигде не работает: бэкенда под заявки пока нет, кнопки только
// показывают вид. Подключать придётся отдельно — почтой, телеграм-ботом
// или любой готовой службой форм.

import { useState } from 'react';

import './lead-demo.css';

type Concept = {
  id: string;
  title: string;
  note: string;
};

const CONCEPTS: Concept[] = [
  {
    id: 'strip',
    title: '1. Строка-капсула',
    note: 'Одно поле и кнопка в одном овале. Занимает мало места, помещается под любой секцией — например, сразу под FAQ.',
  },
  {
    id: 'wide',
    title: '2. Широкая капсула',
    note: 'Заголовок, два поля и кнопка. Полноценный блок во всю ширину — трудно пройти мимо.',
  },
  {
    id: 'dark',
    title: '3. Тёмная капсула',
    note: 'То же, но контрастным пятном на светлой странице. Самый заметный вариант.',
  },
  {
    id: 'callout',
    title: '4. Без полей',
    note: 'Крупный призыв и большая кнопка, полей нет. Если проще, чтобы писали сразу в почту или телеграм.',
  },
  {
    id: 'split',
    title: '5. Текст и форма',
    note: 'Слева объяснение, что будет после заявки, справа поля. Снимает тревогу «а что дальше».',
  },
];

function Field({
  label,
  name,
  placeholder,
  type = 'text',
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="ld-field">
      <span className="ld-field__label">{label}</span>
      <input
        className="ld-field__input"
        name={name}
        placeholder={placeholder}
        required
        type={type}
      />
    </label>
  );
}

function Form({ concept }: { concept: string }) {
  const [sent, setSent] = useState(false);

  // Отправки нет: показываем, как блок отзывается, чтобы было видно поведение.
  // Тип события не пишем руками — он выводится из onSubmit по месту.
  const submit = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2600);
  };

  if (concept === 'callout') {
    return (
      <div className="ld-callout">
        <div>
          <h3>Расскажите о задаче</h3>
          <p>Ответим в течение дня и предложим, с чего начать.</p>
        </div>

        <a className="ld-btn ld-btn--lg" href="mailto:hello@rhino.studio">
          Обсудить проект <span aria-hidden="true">↗</span>
        </a>
      </div>
    );
  }

  if (concept === 'strip') {
    return (
      <form className="ld-strip" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <span className="ld-strip__text">Обсудим проект?</span>

        <input
          className="ld-strip__input"
          name="contact"
          placeholder="Телефон или почта"
          required
          type="text"
        />

        <button className="ld-btn" type="submit">
          {sent ? 'Спасибо' : 'Отправить'}
        </button>
      </form>
    );
  }

  if (concept === 'split') {
    return (
      <div className="ld-split">
        <div className="ld-split__left">
          <h3>Расскажите о задаче</h3>
          <ol>
            <li>Ответим в течение дня</li>
            <li>Созвонимся на 20 минут</li>
            <li>Пришлём смету и сроки</li>
          </ol>
        </div>

        <form className="ld-split__form" onSubmit={(e) => { e.preventDefault(); submit(); }}>
          <Field label="Как вас зовут" name="name" placeholder="Имя" />
          <Field
            label="Куда ответить"
            name="contact"
            placeholder="Телефон, почта или @ник"
          />

          <button className="ld-btn ld-btn--full" type="submit">
            {sent ? 'Спасибо, скоро ответим' : 'Оставить заявку'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <form className="ld-wide" onSubmit={(e) => { e.preventDefault(); submit(); }}>
      <div className="ld-wide__lead">
        <h3>Расскажите о задаче</h3>
        <p>Ответим в течение дня и предложим, с чего начать.</p>
      </div>

      <div className="ld-wide__fields">
        <Field label="Как вас зовут" name="name" placeholder="Имя" />
        <Field
          label="Куда ответить"
          name="contact"
          placeholder="Телефон, почта или @ник"
        />

        <button className="ld-btn" type="submit">
          {sent ? 'Спасибо' : 'Оставить заявку'}
        </button>
      </div>
    </form>
  );
}

export default function LeadDemoPage() {
  return (
    <main className="ld-page">
      <header className="ld-head">
        <h1>Блок заявки — концепты</h1>
        <p>
          Пять способов сделать из мелкой ссылки видное место. Отправка нигде не
          работает — бэкенда под заявки пока нет, кнопки только показывают вид.
        </p>
      </header>

      {CONCEPTS.map((c) => (
        <section className={`ld-concept ld-concept--${c.id}`} key={c.id}>
          <div className="ld-concept__head">
            <h2>{c.title}</h2>
            <p>{c.note}</p>
          </div>

          <div className="ld-concept__body">
            <Form concept={c.id} />
          </div>
        </section>
      ))}
    </main>
  );
}
