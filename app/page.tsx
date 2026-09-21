import { PortfolioCard } from './portfolio-card';
import { ServiceCard } from './service-card';
import { ProcessReel } from './process-reel';

const navItems = [
  { label: 'Услуги', href: '#services' },
  { label: 'Работы', href: '#portfolio' },
  { label: 'Процесс' },
  { label: 'Контакты' },
];

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
    type: 'Маркетплейс',
    title: 'Поиск попутчиков',
    note: 'маршруты, бронирование и сценарии водителя',
    image: '/portfolio-rideshare-light.png',
    video: '/portfolio-rideshare-hover.mp4',
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
      <header className="fixed inset-x-0 top-0 z-50 bg-background/92 backdrop-blur-xl">
        <nav
          aria-label="Основная навигация"
          className="mx-auto flex h-[88px] max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:px-12"
        >
          <a
            href="/"
            className="inline-flex items-end text-[28px] font-black leading-none tracking-[-0.065em] transition-opacity hover:opacity-60"
            aria-label="Rhino Studio"
          >
            RH
            <span className="relative inline-block h-[0.82em] w-[0.36em] shrink-0 -translate-y-[0.055em]" aria-hidden="true">
              <svg
                className="absolute inset-x-0 bottom-0 h-full w-full"
                viewBox="0 0 44 92"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M36 92C35 57 27 25 6 4C13 30 15 61 13 92H36Z" fill="currentColor" />
              </svg>
            </span>
            NO
          </a>

          <div className="flex items-center gap-3 sm:gap-8">
            <div className="hidden items-center gap-8 text-[16px] font-medium text-foreground md:flex">
              {navItems.map((item) =>
                item.href ? (
                  <a
                    className="transition-opacity hover:opacity-55"
                    href={item.href}
                    key={item.label}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-muted-foreground" key={item.label}>
                    {item.label}
                  </span>
                ),
              )}
            </div>

            <a
              className="group inline-flex h-[52px] items-center gap-2 rounded-full bg-foreground px-6 text-[16px] font-bold text-background transition-transform duration-300 hover:-translate-y-0.5 sm:px-8"
              href="mailto:hello@rhino.studio"
            >
              Обсудить
              <span
                className="text-xl leading-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </div>
        </nav>
      </header>

      <section className="mx-auto flex min-h-svh max-w-[1360px] flex-col justify-center px-5 pb-24 pt-[136px] sm:px-8 sm:pt-[152px] lg:px-12">
        <div className="hero-reveal mx-auto max-w-5xl text-center">
          <h1
            aria-label="RHINO STUDIO"
            className="flex flex-wrap items-baseline justify-center gap-x-[0.22em] text-6xl font-semibold leading-[0.95] tracking-[-0.065em] sm:text-7xl lg:text-8xl"
          >
            <span className="inline-flex items-end">
              RH
              <span className="relative inline-block h-[0.86em] w-[0.42em] shrink-0 -translate-y-[0.055em]" aria-hidden="true">
                <svg
                  className="absolute inset-x-0 bottom-0 h-full w-full"
                  viewBox="0 0 44 92"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M36 92C35 57 27 25 6 4C13 30 15 61 13 92H36Z" fill="currentColor" />
                </svg>
              </span>
              NO
            </span>
            <span>STUDIO</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9">
            Создаём цифровые продукты для сильных идей.
          </p>
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
