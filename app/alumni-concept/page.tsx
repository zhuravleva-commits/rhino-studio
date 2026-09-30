'use client';

// Концепт дизайна всей страницы на паре «Alumni Sans + Inter» (вариант 24 из
// /fonts-demo). Страница временная, в сайт ничего не идёт.
//
// Идея — спортивно-редакционный плакат: огромные узкие заголовки прописными,
// тонкие линии сетки, синий как единственный акцентный цвет и спокойный Inter
// для всего, что нужно читать. Тексты и картинки — настоящие, с сайта.
// Форма заявки здесь только для вида и ничего не отправляет.

import { useState } from 'react';

import { CHANNELS, MessengerIcon, type ChannelId } from '../messengers';

import './concept.css';

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Alumni+Sans:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap';

const services = [
  { title: 'Лендинги', tags: ['оффер', 'структура', 'запуск'], image: '/service-sites.webp' },
  { title: 'Веб-приложения', tags: ['UX', 'интерфейс', 'разработка'], image: '/service-products.webp' },
  { title: 'Mini Apps', tags: ['боты', 'платежи', 'CRM'], image: '/service-telegram.webp' },
  { title: 'AI-системы', tags: ['агенты', 'данные', 'автоматизация'], image: '/service-ai.webp' },
];

const prices = [
  { label: 'сайты', title: 'Лендинг', price: '70 000', note: 'Структура, дизайн, адаптивная сборка и запуск.' },
  { label: 'продукты', title: 'Веб-приложение', price: '100 000', note: 'Первая рабочая версия с ключевым сценарием.' },
  { label: 'telegram', title: 'Telegram-бот', price: '40 000', note: 'Основной сценарий, заявки и базовая интеграция.' },
  { label: 'telegram', title: 'Mini App', price: '60 000', note: 'Интерфейс внутри Telegram, логика и backend.' },
];

const steps = [
  { label: 'Идея', title: 'Строим карту продукта', copy: 'Находим, где клиент теряет деньги и внимание, и собираем сценарий, который это закрывает.', stat: '12 сценариев' },
  { label: 'Дизайн', title: 'Делаем интерфейс, который продаёт', copy: 'Понятный UI/UX, акценты и CTA — человек быстро доходит до целевого действия.', stat: '24 экрана' },
  { label: 'Разработка', title: 'Собираем MVP по этапам', copy: 'Фиксируем план, показываем каждый этап — без сюрпризов в конце.', stat: 'MVP 2 недели' },
  { label: 'Запуск', title: 'Запускаем и измеряем', copy: 'Помогаем с запуском и смотрим, как меняются заявки и продажи.', stat: '+42% заявок' },
];

const works = [
  { type: 'Мобильное приложение', title: 'Визовый центр', image: '/portfolio-visa.webp' },
  { type: 'Веб + мобильное', title: 'Платформа недвижимости', image: '/portfolio-real-estate-kling-preview-macbook.webp' },
  { type: 'Веб-приложение', title: 'CRM для сервисной компании', image: '/portfolio-crm-dark.webp' },
  { type: 'Мобильное приложение', title: 'Proxy manager', image: '/portfolio-proxy-light.webp' },
];

const questions = [
  { q: 'Сколько времени занимает работа?', a: 'Лендинг — от недели, веб-приложение и Mini App — от двух недель. Точный срок называем после того, как разберём задачу.' },
  { q: 'Что нужно от меня, чтобы начать?', a: 'Достаточно рассказать, что за продукт и кому он нужен. Тексты, фотографии и доступы соберём вместе по ходу.' },
  { q: 'Как построена оплата?', a: 'Любым удобным для вас способом — определяем перед запуском.' },
  { q: 'Как следить за ходом работы?', a: 'Работаем прозрачно: вы в курсе того, что происходит на каждом этапе.' },
  { q: 'Можно начать с малого и расти потом?', a: 'Так и советуем: первая версия с главным сценарием, дальше — то, чем реально пользуются.' },
];

const TICKER = ['Лендинги', 'Веб-приложения', 'Telegram Mini Apps', 'Боты', 'AI-системы', 'UX / UI'];

function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="al-faq">
      {questions.map((item, i) => (
        <div className={`al-faq__item${open === i ? ' is-open' : ''}`} key={item.q}>
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)} type="button">
            <span className="al-faq__num">{String(i + 1).padStart(2, '0')}</span>
            <span className="al-faq__q">{item.q}</span>
            <span aria-hidden="true" className="al-faq__sign" />
          </button>
          <div className="al-faq__a">
            <div>
              <p>{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FormMock() {
  const [channel, setChannel] = useState<ChannelId>('telegram');

  return (
    <form className="al-form" onSubmit={(e) => e.preventDefault()}>
      <p className="al-form__title">Обсудим проект</p>
      <p className="al-form__sub">Ответим в течение рабочего дня — туда, где вам удобно.</p>

      <input aria-label="Имя" placeholder="Имя" />
      <div className="al-form__channels">
        {CHANNELS.map((c) => (
          <button
            className={`al-chip${channel === c.id ? ' is-on' : ''}`}
            key={c.id}
            onClick={() => setChannel(c.id)}
            type="button"
          >
            <MessengerIcon id={c.id} />
            {c.label}
          </button>
        ))}
      </div>
      <input aria-label="Телефон" placeholder="+7 (900) 000-00-00" />
      <textarea aria-label="О задаче" placeholder="О задаче — необязательно" rows={3} />
      <button className="al-btn al-btn--white" type="submit">
        Оставить заявку
      </button>
    </form>
  );
}

export default function AlumniConcept() {
  return (
    <div className="al">
      <link href="https://fonts.googleapis.com" precedence="default" rel="preconnect" />
      <link href={FONTS_URL} precedence="default" rel="stylesheet" />

      {/* ── Шапка ─────────────────────────────────────────────────────── */}
      <header className="al-header">
        <span className="al-logo">Rhino</span>
        <nav>
          <a href="#services">Услуги</a>
          <a href="#pricing">Цены</a>
          <a href="#process">Процесс</a>
          <a href="#works">Работы</a>
          <a href="#faq">Вопросы</a>
        </nav>
        <a className="al-btn al-btn--sm" href="#faq">
          Обсудить проект
        </a>
      </header>

      {/* ── Первый экран ──────────────────────────────────────────────── */}
      <section className="al-hero">
        <p className="al-eyebrow">Стратегия · Дизайн · Разработка</p>

        <h1 className="al-hero__title">
          <span>
            Создаём <em>сайты,</em>
          </span>
          {/* Картинка прямо внутри строки заголовка — приём плакатной вёрстки:
              работа студии становится частью фразы. */}
          <span>
            которые <i aria-hidden="true" className="al-hero__pill" /> продают
          </span>
        </h1>

        <img alt="" aria-hidden="true" className="al-hero__float al-hero__float--a" src="/service-telegram.webp" />
        <img alt="" aria-hidden="true" className="al-hero__float al-hero__float--b" src="/service-ai.webp" />

        <div className="al-hero__bottom">
          <p className="al-lead">
            Проектируем и разрабатываем сайты, приложения и цифровые продукты с ясной структурой и сильной подачей.
          </p>

          <div className="al-hero__cta">
            <a className="al-btn" href="#faq">
              Обсудить проект
            </a>
            <a className="al-btn al-btn--ghost" href="#works">
              Наши работы
            </a>
          </div>

          <dl className="al-facts">
            <div>
              <dt>7 дней</dt>
              <dd>минимальный срок лендинга</dd>
            </div>
            <div>
              <dt>40 000 ₽</dt>
              <dd>стартовая цена</dd>
            </div>
            <div>
              <dt>+42%</dt>
              <dd>заявок после запуска</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── Бегущая строка ────────────────────────────────────────────── */}
      <div aria-hidden="true" className="al-ticker">
        <div className="al-ticker__track">
          {[0, 1].map((copy) => (
            <span key={copy}>
              {TICKER.map((word) => (
                <span className="al-ticker__word" key={word}>
                  {word} <b>✱</b>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Услуги ────────────────────────────────────────────────────── */}
      <section className="al-section" id="services">
        <div className="al-section__head">
          <p className="al-eyebrow">01 / Услуги</p>
          <h2 className="al-h2">Что делаем</h2>
        </div>

        <div className="al-services">
          {services.map((s, i) => (
            <a className="al-service" href="#faq" key={s.title}>
              <span className="al-service__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="al-service__title">{s.title}</span>
              <span className="al-service__tags">
                {s.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </span>
              <img alt="" className="al-service__img" src={s.image} />
              <span aria-hidden="true" className="al-service__arrow">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Цены ──────────────────────────────────────────────────────── */}
      <section className="al-section al-section--dark" id="pricing">
        <div className="al-section__head">
          <p className="al-eyebrow">02 / Стоимость</p>
          <h2 className="al-h2">
            Понятная <em>точка старта</em>
          </h2>
          <p className="al-section__copy">
            Начинаем с необходимого, запускаем первую версию и развиваем продукт по мере роста задачи.
          </p>
        </div>

        <div className="al-prices">
          {prices.map((p) => (
            <article className="al-price" key={p.title}>
              <p className="al-price__label">{p.label}</p>
              <h3>{p.title}</h3>
              <p className="al-price__value">
                <small>от</small>
                {p.price}
                <small>₽</small>
              </p>
              <p className="al-price__note">{p.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Процесс ───────────────────────────────────────────────────── */}
      <section className="al-section" id="process">
        <div className="al-section__head">
          <p className="al-eyebrow">03 / Процесс</p>
          <h2 className="al-h2">
            От идеи <em>до результата</em>
          </h2>
        </div>

        <div className="al-steps">
          {steps.map((s, i) => (
            <article className="al-step" key={s.label}>
              <span className="al-step__num">{String(i + 1).padStart(2, '0')}</span>
              <p className="al-step__label">{s.label}</p>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
              <span className="al-step__stat">{s.stat}</span>
            </article>
          ))}
        </div>
      </section>

      {/* ── Работы ────────────────────────────────────────────────────── */}
      <section className="al-section al-section--wash" id="works">
        <div className="al-section__head">
          <p className="al-eyebrow">04 / Портфолио</p>
          <h2 className="al-h2">Наши работы</h2>
        </div>

        <div className="al-works">
          {works.map((w) => (
            <article className="al-work" key={w.title}>
              <div className="al-work__img">
                <img alt={w.title} src={w.image} />
              </div>
              <p className="al-work__type">{w.type}</p>
              <h3>{w.title}</h3>
            </article>
          ))}
        </div>
      </section>

      {/* ── Вопросы и заявка ──────────────────────────────────────────── */}
      <section className="al-section" id="faq">
        <div className="al-split">
          <div>
            <p className="al-eyebrow">05 / Вопросы</p>
            <h2 className="al-h2">
              Остались <em>вопросы?</em>
            </h2>
            <Faq />
          </div>
          <FormMock />
        </div>
      </section>

      {/* ── Подвал ────────────────────────────────────────────────────── */}
      <footer className="al-footer">
        <div className="al-footer__row">
          <a href="mailto:hello@rhino.studio">hello@rhino.studio</a>
          <span>Telegram · WhatsApp · MAX · VK</span>
          <span>© 2026</span>
        </div>
        <p aria-hidden="true" className="al-footer__word">
          Rhino studio
        </p>
      </footer>
    </div>
  );
}
