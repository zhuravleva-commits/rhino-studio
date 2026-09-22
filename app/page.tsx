import Image from 'next/image';
import Link from 'next/link';

import { PortfolioCard } from './portfolio-card';
import { ServiceCard } from './service-card';
import { ProcessReel } from './process-reel';

const services = [
  {
    label: 'сайты',
    title: 'Лендинги',
    lines: ['оффер', 'структура', 'запуск'],
    image: '/service-sites.png',
    video: '/service-sites-hover.mp4',
    videoFit: { height: '108.40%', x: '-0.22%', y: '-0.15%' },
  },
  {
    label: 'продукты',
    title: 'Веб-приложения',
    lines: ['UX', 'интерфейс', 'разработка'],
    image: '/service-products.png',
    video: '/service-products-hover.mp4',
    videoFit: { height: '104.76%', x: '-3.81%', y: '-0.73%' },
  },
  {
    label: 'telegram',
    title: 'Mini apps',
    lines: ['боты', 'платежи', 'CRM'],
    image: '/service-telegram.png',
    video: '/service-telegram-hover.mp4',
    videoKey: true,
    videoFit: { height: '101.02%', x: '-0.00%', y: '-0.00%' },
  },
  {
    label: 'AI',
    title: 'AI-системы',
    lines: ['агенты', 'данные', 'автоматизация'],
    image: '/service-ai.png',
    video: '/service-ai-hover.mp4',
    videoFit: { height: '100.83%', x: '0.07%', y: '-0.00%' },
  },
];

const portfolioItems = [
  {
    type: 'Мобильное приложение',
    title: 'Визовый центр',
    note: 'заявки, документы, чат и статус оформления',
    image: '/portfolio-visa.png',
    video: '/portfolio-visa-hover.mp4',
  },
  {
    type: 'Веб + мобильное',
    title: 'Платформа недвижимости',
    note: 'поиск, карта, бронирование и чат с менеджером',
    image: '/portfolio-real-estate-kling-preview-macbook.png',
    video: '/portfolio-real-estate-hover.mp4',
  },
  {
    type: 'Веб-приложение',
    title: 'CRM для сервисной компании',
    note: 'заявки, диспетчеризация и контроль показателей',
    image: '/portfolio-crm-dark.png',
    video: '/portfolio-crm-hover.mp4',
  },
  {
    type: 'Мобильное приложение',
    title: 'Proxy manager',
    note: 'профили, подключение, подписка и диагностика',
    image: '/portfolio-proxy-light.png',
    video: '/portfolio-proxy-hover.mp4',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="reference-hero" aria-labelledby="reference-hero-title">
        <Image
          alt="Первый экран Rhino Studio в редакционном стиле"
          className="reference-hero__image"
          height="945"
          priority
          src="/rhino-editorial-hero.png"
          width="1680"
        />

        <h1 className="sr-only" id="reference-hero-title">Rhino Studio — создаём сайты, которые продают</h1>

        <nav aria-label="Основная навигация" className="reference-hero__hotspots">
          <Link aria-label="Rhino Studio — на главную" className="reference-hotspot reference-hotspot--logo" href="/" />
          <a aria-label="Услуги" className="reference-hotspot reference-hotspot--services" href="#services" />
          <a aria-label="Работы" className="reference-hotspot reference-hotspot--works" href="#portfolio" />
          <a aria-label="Процесс" className="reference-hotspot reference-hotspot--process" href="#process" />
          <a aria-label="Контакты" className="reference-hotspot reference-hotspot--contacts" href="mailto:hello@rhino.studio" />
          <a aria-label="Обсудить проект" className="reference-hotspot reference-hotspot--top-cta" href="mailto:hello@rhino.studio" />
          <a aria-label="Обсудить проект" className="reference-hotspot reference-hotspot--main-cta" href="mailto:hello@rhino.studio" />
        </nav>

        <div className="reference-hero-mobile">
          <div className="reference-hero-mobile__nav">
            <span>RHINO</span>
            <a href="mailto:hello@rhino.studio">Обсудить ↗</a>
          </div>
          <p className="reference-hero-mobile__eyebrow">СТРАТЕГИЯ · ДИЗАЙН · РАЗРАБОТКА</p>
          <h2>RHINO<br />STUDIO</h2>
          <p>Создаём сайты, которые продают.</p>
          <a className="reference-hero-mobile__cta" href="mailto:hello@rhino.studio">Обсудить проект <span>↗</span></a>
          <Image alt="Превью цифрового продукта Rhino Studio" height="945" src="/rhino-editorial-hero.png" width="1680" />
        </div>
      </section>

      <section
        id="services"
        className="hero-strip mx-auto max-w-[1360px] px-5 pb-16 pt-6 sm:px-8 sm:pt-8 lg:px-12"
      >
        {/* Вырезает фон только там, где объект целиком цветной (самолётик).
            Порог по «синеве» (B−R): фон карточки ≤37, тело объекта ≥56.
            Размытие перед порогом убирает зернистость от сжатия видео. */}
        <svg aria-hidden="true" className="absolute h-0 w-0" focusable="false">
          <filter colorInterpolationFilters="sRGB" id="service-video-key">
            <feGaussianBlur in="SourceGraphic" result="soft" stdDeviation="1" />
            <feColorMatrix
              in="soft"
              result="alpha"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      -23.182 0 23.182 0 -3.727"
            />
            <feComposite in="SourceGraphic" in2="alpha" operator="in" />
          </filter>
        </svg>

        <div className="services-grid mx-auto grid max-w-[920px] auto-rows-fr gap-4 sm:gap-6 md:grid-cols-2 lg:gap-10">
          {services.map((service, index) => (
            <ServiceCard index={index} key={service.title} service={service} />
          ))}
        </div>
      </section>

      <ProcessReel />

      <section
        id="portfolio"
        className="portfolio-pearl px-5 py-18 text-foreground sm:px-8 sm:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-16">
            <p className="mb-7 text-sm font-bold uppercase text-foreground/46">
              Портфолио
            </p>
            <h2 className="max-w-5xl text-6xl font-semibold leading-[0.92] sm:text-8xl lg:text-9xl">
              Наши прошлые работы
            </h2>
            <p className="mt-8 max-w-3xl text-xl leading-8 text-foreground/58 sm:text-2xl">
              Первые визуальные заготовки под будущие кейсы: без внешних
              ссылок, но уже с понятной подачей продукта.
            </p>
          </div>

          <div className="portfolio-grid grid gap-x-8 gap-y-14 md:grid-cols-2">
            {portfolioItems.map((item, index) => (
              <PortfolioCard index={index} item={item} key={item.title} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
