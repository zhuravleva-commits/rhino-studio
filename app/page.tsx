import { PortfolioCard } from './portfolio-card';
import { ProcessReel } from './process-reel';

const navItems = [
  { label: 'Услуги', href: '#services' },
  { label: 'Работы', href: '#portfolio' },
  { label: 'Процесс' },
  { label: 'Контакты' },
];

const showreelScenes = [
  {
    label: 'сайты',
    title: 'Лендинги',
    lines: ['оффер', 'структура', 'запуск'],
    image: '/services-landing-pages.png',
  },
  {
    label: 'продукты',
    title: 'Веб-приложения',
    lines: ['UX', 'интерфейс', 'разработка'],
    image: '/services-web-apps.png',
  },
  {
    label: 'telegram',
    title: 'Mini apps',
    lines: ['боты', 'платежи', 'CRM'],
    image: '/services-mini-apps.png',
  },
  {
    label: 'AI',
    title: 'AI-системы',
    lines: ['агенты', 'данные', 'автоматизация'],
    image: '/services-ai-systems.png',
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

      <section className="mx-auto max-w-[1360px] px-5 pb-10 pt-[136px] sm:px-8 sm:pb-12 sm:pt-[152px] lg:px-12">
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

      <ProcessReel />

      <section
        id="services"
        className="hero-strip mx-auto max-w-[1360px] px-5 pb-[72px] pt-4 sm:px-8 lg:px-12"
      >
        <div className="mb-12 max-w-5xl">
          <p className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Наши продукты приносят доход и удовольствие от их использования.
          </p>
          <p className="mt-6 text-xl leading-8 text-muted-foreground sm:text-2xl">
            Вот как это выглядит в услугах студии.
          </p>
        </div>

        <div className="showreel-card relative min-h-[390px] overflow-hidden rounded-[28px] bg-[#edf5fc] text-foreground sm:min-h-[560px] lg:min-h-[640px]">
          <div className="absolute left-6 top-6 z-30 flex items-center gap-3 text-sm font-bold uppercase text-black/58 sm:left-8 sm:top-8">
            <span className="size-2 rounded-full bg-black" />
            Услуги / showreel
          </div>

          <div className="absolute right-6 top-6 z-30 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-black shadow-sm sm:right-8 sm:top-8">
            услуги студии
          </div>

          <div className="showreel-track flex h-full min-h-[390px] w-[400%] sm:min-h-[560px] lg:min-h-[640px]">
            {showreelScenes.map((scene, index) => (
              <article
                className="showreel-scene relative flex w-1/4 shrink-0 items-center justify-center overflow-hidden px-6 py-24 sm:px-10 lg:px-14"
                key={scene.title}
              >
                <div className="showreel-milky-background absolute inset-0" />

                <div className="relative grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="space-y-5">
                    <p className="text-sm font-bold uppercase text-black/52">
                      {String(index + 1).padStart(2, '0')} / {scene.label}
                    </p>
                    <h2 className="max-w-xl text-5xl font-semibold leading-[0.95] text-black sm:text-7xl">
                      {scene.title}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {scene.lines.map((line) => (
                        <span
                          className="rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-black"
                          key={line}
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="showreel-device relative mx-auto aspect-[16/10] w-full max-w-[620px] overflow-hidden rounded-[22px] border border-white/80 bg-white/35 shadow-2xl shadow-sky-950/15">
                    <img
                      alt={`Пример услуги: ${scene.title}`}
                      className="h-full w-full object-cover"
                      src={scene.image}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="showreel-timeline absolute bottom-6 left-6 right-6 z-30 flex gap-2 sm:bottom-8 sm:left-8 sm:right-8">
            {showreelScenes.map((scene) => (
              <div
                className="h-1 flex-1 overflow-hidden rounded-full bg-black/12"
                key={scene.label}
              >
                <span className="showreel-progress block h-full rounded-full bg-black" />
              </div>
            ))}
          </div>
        </div>
      </section>

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
