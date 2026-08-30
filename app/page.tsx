import {
  ArrowUpRight,
  Bot,
  Code2,
  Cpu,
  Layers3,
  MessagesSquare,
  MoveRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const services = [
  {
    title: 'Приложения',
    text: 'Проектируем мобильные и веб-продукты: от MVP до устойчивой платформы с понятной логикой, ролями и интеграциями.',
  },
  {
    title: 'Сайты',
    text: 'Собираем сайты, которые объясняют сложный продукт быстро: структура, тексты, интерфейс, разработка и запуск.',
  },
  {
    title: 'ИИ-агенты',
    text: 'Создаём агентов для продаж, поддержки, аналитики и внутренних процессов: сценарии, память, инструменты, контроль качества.',
  },
  {
    title: 'Боты и системы',
    text: 'Автоматизируем рутину в Telegram, CRM, таблицах, базах данных и корпоративных сервисах.',
  },
];

const cases = [
  {
    label: 'AI operations',
    title: 'Агент для обработки заявок',
    text: 'Классификация входящих сообщений, уточняющие вопросы, постановка задач и отчётность для команды.',
  },
  {
    label: 'Product launch',
    title: 'MVP сервиса бронирования',
    text: 'Личный кабинет, платежный сценарий, админ-панель и быстрый путь к первой проверке гипотезы.',
  },
  {
    label: 'Web presence',
    title: 'Сайт студии с характером',
    text: 'Айдентика, структура, адаптивная вёрстка и подача, которая выглядит как продукт, а не шаблон.',
  },
];

const process = [
  'Разбираем задачу, аудиторию и ограничения',
  'Собираем прототип и карту пользовательских сценариев',
  'Делаем дизайн-систему и рабочую реализацию',
  'Запускаем, измеряем, улучшаем и поддерживаем',
];

const proofPoints = [
  {
    Icon: ShieldCheck,
    title: 'Надёжность',
    text: 'Делаем архитектуру, которую можно поддерживать после запуска.',
  },
  {
    Icon: Cpu,
    title: 'Инженерия',
    text: 'Прорабатываем API, роли, данные, интеграции и сценарии отказа.',
  },
  {
    Icon: Sparkles,
    title: 'AI-практика',
    text: 'Не просто чат-боты, а агенты с инструментами и проверяемым результатом.',
  },
  {
    Icon: Layers3,
    title: 'Система',
    text: 'Дизайн, код и бизнес-логика собираются в единый продукт.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/86 backdrop-blur-xl">
        <nav
          aria-label="Основная навигация"
          className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
        >
          <a href="#top" className="flex items-center gap-3 font-semibold">
            <span className="grid size-9 place-items-center rounded-full bg-foreground text-sm text-background">
              AR
            </span>
            <span>Arina Studio</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#services">
              Услуги
            </a>
            <a className="transition-colors hover:text-foreground" href="#work">
              Работы
            </a>
            <a className="transition-colors hover:text-foreground" href="#process">
              Процесс
            </a>
          </div>
          <a
            className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            href="mailto:hello@arina.studio"
          >
            Обсудить
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </nav>
      </header>

      <section
        id="top"
        className="mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:px-10"
      >
        <div className="grid gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="mb-7 max-w-xl text-sm font-semibold uppercase text-muted-foreground">
              Разработка сайтов, приложений, ИИ-агентов и ботов
            </p>
            <h1 className="max-w-5xl text-[clamp(4.2rem,12vw,11.8rem)] font-black leading-[0.88]">
              Arina Studio
            </h1>
          </div>
          <div className="max-w-xl justify-self-start pb-2 lg:justify-self-end">
            <p className="text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9">
              Мы превращаем сложные цифровые идеи в продукты, которые выглядят
              уверенно, работают быстро и выдерживают реальную нагрузку бизнеса.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
                href="#work"
              >
                Смотреть подход
                <MoveRight className="size-4" aria-hidden="true" />
              </a>
              <a
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-semibold transition-colors hover:bg-muted"
                href="#services"
              >
                Что делаем
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-[2rem] border border-border bg-muted shadow-2xl shadow-black/10">
          <img
            src="/rhino-hero.png"
            alt="Чёрная скульптура носорога как символ студии Arina"
            className="aspect-[16/8] w-full object-cover object-center"
          />
        </div>
      </section>

      <section
        id="services"
        className="border-y border-border bg-[#f4f2ed] px-5 py-18 sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.34fr_1fr]">
          <p className="text-sm font-semibold uppercase text-muted-foreground">
            Что делаем
          </p>
          <div>
            <p className="max-w-4xl text-3xl font-semibold leading-tight sm:text-5xl">
              Строим цифровые системы с сильной оболочкой и точной внутренней
              логикой.
            </p>
            <div className="mt-14 divide-y divide-border">
              {services.map((service, index) => (
                <article
                  className="group grid gap-5 py-8 transition-colors md:grid-cols-[0.16fr_0.42fr_1fr] md:items-start"
                  key={service.title}
                >
                  <span className="text-sm text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-3xl font-bold sm:text-5xl">
                    {service.title}
                  </h2>
                  <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                    {service.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-muted-foreground">
              Selected directions
            </p>
            <h2 className="max-w-4xl text-4xl font-black leading-none sm:text-6xl">
              Кейсы, которые показывают не витрину, а мышление команды.
            </h2>
          </div>
          <a
            className="inline-flex h-12 w-fit items-center gap-2 rounded-full border border-border px-6 text-sm font-semibold transition-colors hover:bg-muted"
            href="mailto:hello@arina.studio"
          >
            Запросить разбор
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {cases.map((item, index) => (
            <article
              className="min-h-[360px] rounded-lg border border-border bg-card p-6 transition-transform hover:-translate-y-1"
              key={item.title}
            >
              <div className="mb-18 flex items-center justify-between text-sm text-muted-foreground">
                <span>{item.label}</span>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-3xl font-bold leading-tight">{item.title}</h3>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-foreground px-5 py-18 text-background sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase text-background/58">
              Почему Rhino
            </p>
            <h2 className="text-4xl font-black leading-none sm:text-7xl">
              Тяжёлые задачи. Чистая реализация.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {proofPoints.map(({ Icon, title, text }) => (
              <article
                className="rounded-lg border border-white/14 bg-white/6 p-6"
                key={title}
              >
                <Icon className="mb-9 size-7 text-[#b8ff4a]" aria-hidden="true" />
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="mt-4 leading-7 text-background/68">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="process"
        className="mx-auto grid max-w-7xl gap-10 px-5 py-18 sm:px-8 lg:grid-cols-[0.35fr_1fr] lg:px-10"
      >
        <p className="text-sm font-semibold uppercase text-muted-foreground">
          Процесс
        </p>
        <div className="divide-y divide-border">
          {process.map((step, index) => (
            <div className="grid gap-5 py-7 md:grid-cols-[0.18fr_1fr_auto]" key={step}>
              <span className="text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-2xl font-semibold sm:text-4xl">{step}</p>
              <ArrowUpRight className="hidden size-6 md:block" aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase text-muted-foreground">
              <MessagesSquare className="size-4" aria-hidden="true" />
              Начнём с идеи
            </p>
            <h2 className="max-w-4xl text-4xl font-black leading-none sm:text-7xl">
              Расскажите, какую систему вы хотите собрать.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#b8ff4a] px-7 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
              href="mailto:hello@arina.studio"
            >
              hello@arina.studio
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-border px-7 text-sm font-bold transition-colors hover:bg-muted"
              href="https://t.me/"
            >
              Telegram
              <Bot className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-wrap justify-between gap-4 text-sm text-muted-foreground">
          <span>Arina Studio, 2026</span>
          <span className="inline-flex items-center gap-2">
            <Code2 className="size-4" aria-hidden="true" />
            Apps, sites, AI agents, bots
          </span>
        </div>
      </footer>
    </main>
  );
}
