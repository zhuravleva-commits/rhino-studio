'use client';

import EmblaCarousel, { type EmblaCarouselType } from 'embla-carousel';
import { useEffect, useRef, useState } from 'react';

const prices = [
  {
    title: 'Лендинг',
    price: '70 000',
    icon: 'landing',
    features: [
      'Современный дизайн',
      'Адаптивная вёрстка',
      'Базовая SEO-настройка',
    ],
  },
  {
    title: 'Веб-приложение',
    price: '100 000',
    icon: 'webapp',
    features: [
      'Индивидуальная логика',
      'Интеграции и API',
      'Масштабируемая архитектура',
    ],
  },
  {
    title: 'Telegram-бот',
    price: '40 000',
    icon: 'bot',
    features: [
      'Автоматизация задач',
      'Интеграция с сервисами',
      'Удобное управление',
    ],
  },
  {
    title: 'Mini App',
    price: '60 000',
    icon: 'miniapp',
    features: [
      'Интерфейс внутри Telegram',
      'Интеграция с экосистемой',
      'Публикация и поддержка',
    ],
  },
  {
    title: 'AI-системы',
    price: '120 000',
    icon: 'ai',
    features: [
      'AI-агенты и автоматизация',
      'Работа с данными',
      'Интеграция в процессы',
    ],
  },
];

function ServiceIcon({ type }: { type: string }) {
  if (type === 'landing') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <rect height="14" rx="2" width="18" x="3" y="4" />
        <path d="M8 21h8M12 18v3" />
      </svg>
    );
  }

  if (type === 'webapp') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path d="m4.5 7.8 7.5 4.3 7.5-4.3M12 12v9" />
      </svg>
    );
  }

  if (type === 'bot') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="m21 3-7.6 18-4.1-7.1L3 10.5 21 3Z" />
        <path d="m9.3 13.9 4.2-4.1" />
      </svg>
    );
  }

  if (type === 'miniapp') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <rect height="18" rx="3" width="12" x="6" y="3" />
        <path d="M10 6h4M11 18h2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <circle cx="4.5" cy="6" r="1.5" />
      <circle cx="19.5" cy="6" r="1.5" />
      <circle cx="4.5" cy="18" r="1.5" />
      <circle cx="19.5" cy="18" r="1.5" />
      <path d="m6 7 3.7 3M18 7l-3.7 3M6 17l3.7-3M18 17l-3.7-3" />
    </svg>
  );
}

export function PricingSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselApiRef = useRef<EmblaCarouselType | null>(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    const carouselApi = EmblaCarousel(carouselRef.current, {
      align: 'center',
      containScroll: false,
      duration: 34,
      loop: true,
      skipSnaps: false,
      startIndex: 1,
    });
    const syncActiveCard = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };

    carouselApiRef.current = carouselApi;
    syncActiveCard();

    carouselApi.on('select', syncActiveCard);
    carouselApi.on('reInit', syncActiveCard);

    return () => {
      carouselApi.off('select', syncActiveCard);
      carouselApi.off('reInit', syncActiveCard);
      carouselApi.destroy();
      carouselApiRef.current = null;
    };
  }, []);

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-shell">
        <div aria-hidden="true" className="pricing-shell__glow" />

        <div className="pricing-meta">
          <span>02&nbsp;&nbsp;/&nbsp;&nbsp;Прайс</span>
          <span>Цифровые продукты для роста бизнеса</span>
        </div>

        <div className="pricing-heading">
          <h2>Стоимость услуг</h2>
          <a
            aria-label="Перейти к пояснению о расчёте стоимости"
            className="pricing-heading__footnote"
            href="#pricing-note"
          >
            *
          </a>
          <p>Понятный старт — точную оценку фиксируем после короткого брифа.</p>
        </div>

        <div className="pricing-carousel">
          <button
            aria-label="Предыдущая услуга"
            className="pricing-carousel__arrow pricing-carousel__arrow--left"
            onClick={() => carouselApiRef.current?.scrollPrev()}
            type="button"
          >
            <span aria-hidden="true">←</span>
          </button>

          <div className="pricing-track" ref={carouselRef}>
            <ul aria-label="Стоимость услуг" className="pricing-track__list">
              {prices.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <li className="pricing-slide" key={item.title}>
                    <article
                      aria-current={isActive ? 'true' : undefined}
                      className="pricing-card"
                      data-active={isActive}
                    >
                      <button
                        aria-label={`Выбрать услугу «${item.title}»`}
                        aria-pressed={isActive}
                        className="pricing-card__select"
                        onClick={() => carouselApiRef.current?.scrollTo(index)}
                        type="button"
                      />

                      <div className="pricing-card__topline">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <span className="pricing-card__icon">
                          <ServiceIcon type={item.icon} />
                        </span>
                      </div>

                      <h3>{item.title}</h3>

                      <p className="pricing-card__price">
                        <span>от</span>
                        <strong>{item.price} ₽</strong>
                      </p>

                      <ul className="pricing-card__features">
                        {item.features.map((feature) => (
                          <li key={feature}>
                            <span aria-hidden="true">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <a href="#zayavka">Обсудить проект</a>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            aria-label="Следующая услуга"
            className="pricing-carousel__arrow pricing-carousel__arrow--right"
            onClick={() => carouselApiRef.current?.scrollNext()}
            type="button"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div
          aria-label={`Карточка ${activeIndex + 1} из ${prices.length}`}
          className="pricing-progress"
        >
          {prices.map((item, index) => (
            <span
              aria-hidden="true"
              data-active={index === activeIndex}
              key={item.title}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          ))}
        </div>

        <p className="pricing-note" id="pricing-note">
          <span aria-hidden="true" className="pricing-note__mark">
            *
          </span>
          <span>
            Финальная стоимость зависит от количества экранов, сценариев и
            интеграций. Нестандартные задачи оцениваем после короткого брифа.
          </span>
        </p>
      </div>
    </section>
  );
}
