'use client';

import { useState } from 'react';

const steps = [
  {
    title: 'Строим карту продукта',
    copy: 'Находим, где клиент теряет деньги и внимание пользователя — и собираем сценарий, который эту проблему закрывает.',
    tags: ['боли клиентов', 'ценность', 'сценарии'],
    label: 'Идея',
    preview: 'Карта продукта',
    stat: '12 сценариев',
    facts: ['проблема клиента', 'путь пользователя', 'точки роста'],
    result: 'Понимаем, зачем продукт нужен рынку и за что клиент будет платить.',
  },
  {
    title: 'Делаем интерфейс, который продаёт',
    copy: 'Собираем понятный UI/UX, выстраиваем акценты и CTA так, чтобы человек быстро доходил до целевого действия.',
    tags: ['удобный UI/UX', 'CTA', 'конверсия'],
    label: 'Дизайн',
    preview: 'Интерфейс продукта',
    stat: '24 экрана',
    facts: ['понятная навигация', 'сильный CTA', 'доверие к бренду'],
    result: 'Пользователь понимает, что делать, и не теряется на пути к заявке.',
  },
  {
    title: 'Собираем MVP и показываем по этапам',
    copy: 'Фиксируем план, собираем первую рабочую версию и выносим каждый этап на оценку заказчику — без сюрпризов в конце.',
    tags: ['MVP', 'оценка этапов', 'прозрачный план'],
    label: 'Разработка',
    preview: 'Рабочий продукт',
    stat: 'MVP 2 недели',
    facts: ['план и смета', 'демо каждую неделю', 'правки по ходу'],
    result: 'Заказчик видит прогресс, влияет на решение и получает готовый MVP в понятный срок.',
  },
  {
    title: 'Запускаем и измеряем результат',
    copy: 'Передаём продукт команде заказчика, помогаем с запуском и смотрим, как меняются заявки, продажи и поведение клиентов.',
    tags: ['передача продукта', 'аналитика', 'рост'],
    label: 'Запуск',
    preview: 'Первые результаты',
    stat: '+42% заявок',
    facts: ['передача команде', 'сбор обратной связи', 'рост конверсии'],
    result: 'Продукт начинает приносить измеримый результат — больше обращений и быстрее путь к покупке.',
  },
];

export function ProcessReel() {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];

  return (
    <section
      aria-label="Как Rhino Studio превращает идею в продукт"
      className="hero-strip mx-auto max-w-[1360px] px-5 pb-14 sm:px-8 lg:px-12"
    >
      <div className="relative overflow-hidden rounded-[28px] bg-[#111] px-6 py-6 text-white shadow-[0_24px_80px_rgb(0_0_0_/_14%)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgb(113_154_255_/_34%),transparent_28%),radial-gradient(circle_at_84%_85%,rgb(255_255_255_/_16%),transparent_32%)]" />

        <div className="relative flex items-center justify-between gap-4 text-sm font-bold uppercase text-white/62">
          <span className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-white" />
            Как мы работаем
          </span>
          <span className="rounded-full border border-white/24 px-4 py-2 text-white/78">
            от идеи до запуска
          </span>
        </div>

        <div className="relative mt-10 grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/50">
              {String(activeStep + 1).padStart(2, '0')} / {step.label}
            </p>
            <h2 className="mt-5 max-w-xl text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
              {step.title}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-7 text-white/64 sm:text-xl sm:leading-8">
              {step.copy}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {step.tags.map((tag) => (
                <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-white/18 bg-[#f7f8fa] p-3 shadow-2xl shadow-black/30">
            <div className="aspect-[16/10] overflow-hidden rounded-[15px] bg-[#101114] p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-white/12 pb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/45 sm:text-xs">
                <span>rhino / {step.label}</span>
                <span className="flex gap-1.5">
                  <i className="size-2 rounded-full bg-white/24" />
                  <i className="size-2 rounded-full bg-white/16" />
                  <i className="size-2 rounded-full bg-white/10" />
                </span>
              </div>

              <div className="mt-4 h-[calc(100%-36px)]">
                <div className="flex h-full flex-col rounded-xl bg-white p-3 text-black sm:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-black/38 sm:text-[10px]">
                        {step.label}
                      </p>
                      <h3 className="mt-1 text-base font-semibold sm:text-xl">{step.preview}</h3>
                    </div>
                    <span className="rounded-full bg-black px-2 py-1 text-[8px] font-bold text-white sm:px-3 sm:text-[10px]">
                      {step.stat}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                    {step.facts.map((fact, index) => (
                      <div className="rounded-lg bg-black/[.055] p-2" key={fact}>
                        <span className="block h-1.5 rounded-full bg-black/12">
                          <i
                            className="block h-full rounded-full bg-black transition-all duration-500"
                            style={{ width: `${[72, 48, 88][index]}%` }}
                          />
                        </span>
                        <span className="mt-2 block text-[8px] font-semibold leading-3 text-black/62 sm:text-[10px] sm:leading-4">
                          {fact}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 rounded-lg bg-[#eaf1ff] p-2.5 sm:p-3">
                    <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#6684bd] sm:text-[10px]">
                      Результат
                    </span>
                    <p className="mt-1 text-[9px] font-medium leading-3 text-[#31517f] sm:text-[11px] sm:leading-4">
                      {step.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-10 grid gap-2 sm:grid-cols-4">
          {steps.map((item, index) => {
            const isActive = index === activeStep;
            return (
              <button
                aria-pressed={isActive}
                className={`flex items-center justify-between rounded-full px-4 py-3 text-left text-sm font-bold uppercase transition-colors ${
                  isActive ? 'bg-white text-black' : 'bg-white/12 text-white hover:bg-white/20'
                }`}
                key={item.label}
                onClick={() => setActiveStep(index)}
                type="button"
              >
                <span>{item.label}</span>
                <span className={isActive ? 'text-black/42' : 'text-white/44'}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
