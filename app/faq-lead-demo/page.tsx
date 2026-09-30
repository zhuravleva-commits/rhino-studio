'use client';

// Витрина концептов блока «FAQ + заявка». Страница временная, в сайт ничего
// не идёт: нужна, чтобы выбрать вид.
//
// Во всех пяти одна раскладка: слева вопросы-аккордеон, справа форма — имя,
// контакт, необязательная задача и удобный мессенджер. Отправка здесь только
// показывает экран «спасибо», в Telegram ничего не уходит.

import { useState, type ReactNode } from 'react';

import './concepts.css';

const QUESTIONS = [
  {
    q: 'Сколько времени занимает работа?',
    a: 'Лендинг — две-три недели, веб-приложение и Mini App — от полутора месяцев. Точный срок называем после того, как разберём задачу.',
  },
  {
    q: 'Что нужно от меня, чтобы начать?',
    a: 'Достаточно рассказать, что за продукт и кому он нужен. Тексты, фотографии и доступы соберём вместе по ходу — бриф заполнять не придётся.',
  },
  {
    q: 'Как построена оплата?',
    a: 'Двумя частями: половина до старта, вторая — перед запуском. На длинных проектах делим на этапы, чтобы вы платили за уже сделанное.',
  },
  {
    q: 'А если захочу что-то поменять по ходу?',
    a: 'Правки внутри согласованной задачи входят в стоимость. Новый раздел или другая логика — оцениваем как дополнение и решаем, делать сейчас или после запуска.',
  },
  {
    q: 'Что происходит, когда сайт запущен?',
    a: 'Месяц после запуска правим всё, что всплывёт. Дальше можно остаться на поддержке или забрать проект себе: код и доступы ваши с первого дня.',
  },
  {
    q: 'Домен и хостинг — на вас или на мне?',
    a: 'Обычно оформляем на вас и получаем доступ: так проект не окажется привязан к студии. Если домена ещё нет, подберём и подключим сами.',
  },
  {
    q: 'Можно начать с малого и расти потом?',
    a: 'Так и советуем. Собираем первую версию с главным сценарием, показываем живым пользователям и дальше вкладываемся в то, чем реально пользуются.',
  },
];

type ChannelId = 'telegram' | 'whatsapp' | 'max' | 'vk';

// Подсказка в поле контакта меняется под выбранный мессенджер: в WhatsApp и
// MAX пишут по номеру, в Telegram удобнее ник, во VK — ссылка на страницу.
const CHANNELS: { id: ChannelId; label: string; placeholder: string }[] = [
  { id: 'telegram', label: 'Telegram', placeholder: '@username или телефон' },
  { id: 'whatsapp', label: 'WhatsApp', placeholder: '+7 900 000-00-00' },
  { id: 'max', label: 'MAX', placeholder: '+7 900 000-00-00' },
  { id: 'vk', label: 'VK', placeholder: 'vk.com/ваша-страница' },
];

// Упрощённые значки для концепта. В боевой версии заменить на официальные SVG.
function ChannelIcon({ id }: { id: ChannelId }) {
  if (id === 'telegram') {
    return (
      <svg aria-hidden="true" className="fl-icon fl-icon--telegram" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" />
        <path
          d="M5.4 11.7 17 7.2c.55-.2 1 .13.83.96l-1.98 9.3c-.14.67-.54.83-1.1.52l-3-2.22-1.46 1.4c-.16.16-.3.3-.6.3l.21-3.07 5.6-5.05c.24-.22-.06-.34-.38-.13l-6.92 4.36-2.98-.93c-.65-.2-.66-.65.14-.96Z"
          fill="#fff"
        />
      </svg>
    );
  }

  if (id === 'whatsapp') {
    return (
      <svg aria-hidden="true" className="fl-icon fl-icon--whatsapp" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" />
        <path
          d="M12 5.4a6.6 6.6 0 0 0-5.7 9.9l-.9 3.3 3.4-.9A6.6 6.6 0 1 0 12 5.4Z"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
        />
        <path
          d="M9.6 8.9c.15-.3.3-.3.47-.3h.36c.1 0 .26 0 .4.32l.5 1.2c.05.13.05.26-.02.38l-.34.43c-.08.1-.14.23-.02.43.42.72 1.07 1.3 1.83 1.66.18.08.32.06.43-.07l.42-.5c.12-.15.26-.15.42-.09l1.17.56c.16.08.26.14.27.24.03.35-.08.76-.42 1.03-.33.27-.85.47-1.34.4-2.12-.33-4-2.2-4.3-4.18-.04-.5.08-.9.28-1.18Z"
          fill="#fff"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={`fl-icon fl-icon--${id}`} viewBox="0 0 24 24">
      <rect height="24" rx={id === 'vk' ? 7 : 12} width="24" />
      <text
        fill="#fff"
        fontFamily="Arial, sans-serif"
        fontSize={id === 'vk' ? 9.5 : 7.4}
        fontWeight="800"
        textAnchor="middle"
        x="12"
        y={id === 'vk' ? 15.4 : 14.7}
      >
        {id === 'vk' ? 'VK' : 'MAX'}
      </text>
    </svg>
  );
}

// ── Левая половина: вопросы ──────────────────────────────────────────────

function Faq({ numbered = false }: { numbered?: boolean }) {
  // Первый вопрос открыт: блок из одних заголовков выглядит недоделанным.
  const [open, setOpen] = useState(0);

  return (
    <div className="fl-faq">
      {QUESTIONS.map((item, index) => {
        const isOpen = open === index;

        return (
          <div className={`fl-faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
            <button
              aria-expanded={isOpen}
              className="fl-faq__q"
              onClick={() => setOpen(isOpen ? -1 : index)}
              type="button"
            >
              {numbered && <span className="fl-faq__num">{String(index + 1).padStart(2, '0')}</span>}
              <span className="fl-faq__text">{item.q}</span>
              <span aria-hidden="true" className="fl-faq__sign" />
            </button>
            <div className="fl-faq__a">
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Правая половина: общее состояние формы ──────────────────────────────

function useLead() {
  const [channel, setChannel] = useState<ChannelId>('telegram');
  const [sent, setSent] = useState(false);
  const placeholder = CHANNELS.find((c) => c.id === channel)!.placeholder;

  return {
    channel,
    setChannel,
    placeholder,
    sent,
    reset: () => setSent(false),
    submit: (event: React.FormEvent) => {
      event.preventDefault();
      setSent(true);
    },
  };
}

function Done({ onReset }: { onReset: () => void }) {
  return (
    <div className="fl-done">
      <p className="fl-done__title">Спасибо, получили</p>
      <p className="fl-done__text">Напишем в выбранный мессенджер в течение рабочего дня.</p>
      <button className="fl-link" onClick={onReset} type="button">
        Отправить ещё одну
      </button>
    </div>
  );
}

function Consent() {
  return <p className="fl-consent">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>;
}

function ChannelPills({ lead, variant }: { lead: ReturnType<typeof useLead>; variant: string }) {
  return (
    <div className={`fl-pills fl-pills--${variant}`} role="radiogroup" aria-label="Удобный мессенджер">
      {CHANNELS.map((c) => (
        <button
          aria-checked={lead.channel === c.id}
          className={`fl-pill${lead.channel === c.id ? ' is-on' : ''}`}
          key={c.id}
          onClick={() => lead.setChannel(c.id)}
          role="radio"
          type="button"
        >
          <ChannelIcon id={c.id} />
          {c.label}
        </button>
      ))}
    </div>
  );
}

// ── 1. Светлая карточка ─────────────────────────────────────────────────

function FormCard() {
  const lead = useLead();

  return (
    <div className="fl-card">
      {lead.sent ? (
        <Done onReset={lead.reset} />
      ) : (
        <form onSubmit={lead.submit}>
          <p className="fl-card__title">Обсудим ваш проект</p>
          <p className="fl-card__sub">Оставьте контакт — напишем туда, где вам удобно.</p>

          <label className="fl-field">
            <span>Имя</span>
            <input autoComplete="name" required />
          </label>

          <div className="fl-field">
            <span>Где удобнее общаться</span>
            <ChannelPills lead={lead} variant="light" />
          </div>

          <label className="fl-field">
            <span>Контакт</span>
            <input placeholder={lead.placeholder} required />
          </label>

          <label className="fl-field">
            <span>
              О задаче <em>необязательно</em>
            </span>
            <textarea placeholder="Пара слов: что нужно, сроки, ссылки" rows={3} />
          </label>

          <button className="fl-submit" type="submit">
            Оставить заявку <span aria-hidden="true">↗</span>
          </button>
          <Consent />
        </form>
      )}
    </div>
  );
}

// ── 2. Синяя панель ─────────────────────────────────────────────────────

function FormBlue() {
  const lead = useLead();

  return (
    <div className="fl-blue">
      {lead.sent ? (
        <Done onReset={lead.reset} />
      ) : (
        <form onSubmit={lead.submit}>
          <p className="fl-blue__eyebrow">Заявка</p>
          <p className="fl-blue__title">Расскажите о задаче — ответим в течение дня</p>

          <div className="fl-blue__row">
            <input aria-label="Имя" autoComplete="name" placeholder="Имя" required />
            <input aria-label="Контакт" placeholder={lead.placeholder} required />
          </div>

          <p className="fl-blue__label">Удобнее в</p>
          <ChannelPills lead={lead} variant="blue" />

          <textarea aria-label="О задаче" placeholder="О задаче — необязательно" rows={3} />

          <button className="fl-submit fl-submit--dark" type="submit">
            Оставить заявку <span aria-hidden="true">↗</span>
          </button>
          <Consent />
        </form>
      )}
    </div>
  );
}

// ── 3. Сначала мессенджер ───────────────────────────────────────────────

function FormTiles() {
  const lead = useLead();
  const [withTask, setWithTask] = useState(false);

  return (
    <div className="fl-tiles-card">
      {lead.sent ? (
        <Done onReset={lead.reset} />
      ) : (
        <form onSubmit={lead.submit}>
          <p className="fl-card__title">Где вам удобнее общаться?</p>
          <p className="fl-card__sub">Выберите мессенджер — напишем первыми.</p>

          <div className="fl-tiles" role="radiogroup" aria-label="Удобный мессенджер">
            {CHANNELS.map((c) => (
              <button
                aria-checked={lead.channel === c.id}
                className={`fl-tile fl-tile--${c.id}${lead.channel === c.id ? ' is-on' : ''}`}
                key={c.id}
                onClick={() => lead.setChannel(c.id)}
                role="radio"
                type="button"
              >
                <ChannelIcon id={c.id} />
                <span>{c.label}</span>
                <i aria-hidden="true" className="fl-tile__check" />
              </button>
            ))}
          </div>

          <div className="fl-tiles-card__fields">
            <input aria-label="Имя" autoComplete="name" placeholder="Имя" required />
            <input aria-label="Контакт" placeholder={lead.placeholder} required />
          </div>

          {withTask ? (
            <textarea aria-label="О задаче" autoFocus placeholder="Что нужно сделать, сроки, ссылки" rows={3} />
          ) : (
            <button className="fl-add" onClick={() => setWithTask(true)} type="button">
              + Коротко рассказать о задаче <em>необязательно</em>
            </button>
          )}

          <button className="fl-submit" type="submit">
            Жду сообщения <span aria-hidden="true">↗</span>
          </button>
          <Consent />
        </form>
      )}
    </div>
  );
}

// ── 4. Тёмный разворот ──────────────────────────────────────────────────

function FormDark() {
  const lead = useLead();

  return (
    <div className="fl-dark-form">
      {lead.sent ? (
        <Done onReset={lead.reset} />
      ) : (
        <form onSubmit={lead.submit}>
          <p className="fl-dark-form__title">Оставить заявку</p>

          <label className="fl-step">
            <b>01</b>
            <span>Как вас зовут</span>
            <input autoComplete="name" required />
          </label>

          <div className="fl-step">
            <b>02</b>
            <span>Куда написать</span>
            <ChannelPills lead={lead} variant="dark" />
            <input aria-label="Контакт" placeholder={lead.placeholder} required />
          </div>

          <label className="fl-step">
            <b>03</b>
            <span>
              О задаче <em>необязательно</em>
            </span>
            <textarea rows={2} />
          </label>

          <button className="fl-submit" type="submit">
            Отправить <span aria-hidden="true">↗</span>
          </button>
          <Consent />
        </form>
      )}
    </div>
  );
}

// ── 5. Письмо одной фразой ──────────────────────────────────────────────

function FormSentence() {
  const lead = useLead();

  return (
    <div className="fl-letter">
      {lead.sent ? (
        <Done onReset={lead.reset} />
      ) : (
        <form onSubmit={lead.submit}>
          <p className="fl-letter__text">
            Здравствуйте! Меня зовут{' '}
            <input aria-label="Имя" autoComplete="name" className="fl-inline" placeholder="имя" required size={8} />.
            Удобнее общаться в
          </p>

          <div className="fl-letter__channels" role="radiogroup" aria-label="Удобный мессенджер">
            {CHANNELS.map((c) => (
              <button
                aria-checked={lead.channel === c.id}
                className={`fl-word${lead.channel === c.id ? ' is-on' : ''}`}
                key={c.id}
                onClick={() => lead.setChannel(c.id)}
                role="radio"
                type="button"
              >
                {c.label}
              </button>
            ))}
          </div>

          <p className="fl-letter__text">
            мой контакт —{' '}
            <input aria-label="Контакт" className="fl-inline fl-inline--wide" placeholder={lead.placeholder} required />
          </p>

          <p className="fl-letter__text fl-letter__text--muted">Если хотите, пара слов о задаче:</p>
          <textarea
            aria-label="О задаче"
            className="fl-letter__task"
            placeholder="нужен лендинг для… / хотим бота, который…"
            rows={2}
          />

          <button className="fl-submit" type="submit">
            Отправить <span aria-hidden="true">↗</span>
          </button>
          <Consent />
        </form>
      )}
    </div>
  );
}

// ── Витрина ─────────────────────────────────────────────────────────────

const CONCEPTS: { id: string; title: string; note: string; render: () => ReactNode }[] = [
  {
    id: 'card',
    title: '1. Светлая карточка',
    note: 'Спокойная версия нынешнего блока: слева строки вопросов, справа светлая карточка с формой. Мессенджеры — капсулы со значками, подсказка в поле контакта меняется под выбранный.',
    render: () => (
      <Split heading="FAQ" left={<Faq />} right={<FormCard />} />
    ),
  },
  {
    id: 'blue',
    title: '2. Синяя панель',
    note: 'Форма — яркое синее пятно в цвет кнопок сайта. Самый заметный призыв, вопросы рядом остаются нейтральными.',
    render: () => <Split heading="FAQ" left={<Faq />} right={<FormBlue />} />,
  },
  {
    id: 'tiles',
    title: '3. Сначала мессенджер',
    note: 'Форма начинается с выбора, где удобно общаться: четыре плитки в фирменных цветах. Поле задачи спрятано за ссылкой — форма выглядит короче.',
    render: () => <Split heading="FAQ" left={<Faq />} right={<FormTiles />} />,
  },
  {
    id: 'dark',
    title: '4. Тёмный разворот',
    note: 'Вся секция тёмная, как отдельная глава в конце страницы. Форма разбита на три пронумерованных шага в духе блока «Процесс».',
    render: () => <Split dark heading="FAQ" left={<Faq numbered />} right={<FormDark />} />,
  },
  {
    id: 'letter',
    title: '5. Письмо одной фразой',
    note: 'Форма читается как сообщение: «Меня зовут …, удобнее в Telegram, мой контакт …». Меньше всего похожа на анкету, запоминается.',
    render: () => <Split heading="Остались вопросы?" left={<Faq numbered />} right={<FormSentence />} />,
  },
];

function Split({ heading, left, right, dark = false }: { heading: string; left: ReactNode; right: ReactNode; dark?: boolean }) {
  return (
    <div className={`fl-split${dark ? ' fl-split--dark' : ''}`}>
      <div className="fl-split__left">
        <h2 className="fl-split__title">{heading}</h2>
        {left}
      </div>
      <div className="fl-split__right">{right}</div>
    </div>
  );
}

export default function FaqLeadDemo() {
  return (
    <main className="fl-page">
      <header className="fl-page__head">
        <p>Rhino · черновик</p>
        <h1>FAQ + заявка: пять концептов</h1>
        <nav>
          {CONCEPTS.map((c) => (
            <a href={`#${c.id}`} key={c.id}>
              {c.title}
            </a>
          ))}
        </nav>
      </header>

      {CONCEPTS.map((c) => (
        <section className={`fl-concept fl-concept--${c.id}`} id={c.id} key={c.id}>
          <div className="fl-concept__label">
            <h3>{c.title}</h3>
            <p>{c.note}</p>
          </div>
          {c.render()}
        </section>
      ))}
    </main>
  );
}
