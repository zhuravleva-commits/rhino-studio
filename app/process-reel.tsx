'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useNearViewport } from './use-near-viewport';

// Картинки шагов. На странице видна одна, остальные появляются по клику —
// их заранее кладём в кеш, чтобы переключение шло без паузы на загрузку.
const STEP_IMAGES = [
  '/process-idea-route-transparent.webp',
  '/process-design-responsive.webp',
  '/process-development-split-screen.webp',
  '/process-launch-rocket-wide-v1.webp',
];

const steps = [
  {
    title: 'Строим карту продукта',
    copy: 'Находим, где клиент теряет деньги и внимание пользователя — и собираем сценарий, который эту проблему закрывает.',
    label: 'Идея',
  },
  {
    title: 'Делаем интерфейс, который продаёт',
    copy: 'Собираем понятный UI/UX, выстраиваем акценты и CTA так, чтобы человек быстро доходил до целевого действия.',
    label: 'Дизайн',
  },
  {
    title: 'Собираем MVP и показываем по этапам',
    copy: 'Фиксируем план, собираем первую рабочую версию и выносим каждый этап на оценку заказчику — без сюрпризов в конце.',
    label: 'Разработка',
  },
  {
    title: 'Запускаем и измеряем результат',
    copy: 'Передаём продукт команде заказчика, помогаем с запуском и смотрим, как меняются заявки, продажи и поведение клиентов.',
    label: 'Запуск',
  },
];

export function ProcessReel() {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];
  const sectionRef = useRef<HTMLElement>(null);
  const isNear = useNearViewport(sectionRef);

  useEffect(() => {
    if (!isNear) return;

    for (const src of STEP_IMAGES) {
      const image = new window.Image();
      image.decoding = 'async';
      image.src = src;
    }
  }, [isNear]);

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-label="Как Rhino Studio превращает идею в продукт"
      className="hero-strip mx-auto max-w-[1360px] scroll-mt-28 px-5 pb-14 sm:px-8 lg:px-12"
    >
      <div className="relative overflow-hidden rounded-[28px] bg-[#0d1015] px-6 py-8 text-white shadow-[0_24px_80px_rgb(0_0_0_/_14%)] sm:px-8 sm:py-10 lg:px-10 lg:py-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgb(113_154_255_/_28%),transparent_46%)]"
        />

        <div className="relative grid items-center gap-8 lg:h-[440px] lg:min-h-0 lg:grid-cols-[0.95fr_1.65fr] lg:gap-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/50">
              {String(activeStep + 1).padStart(2, '0')} / {step.label}
            </p>
            <h2
              className={`mt-5 max-w-xl font-semibold leading-[0.98] tracking-[-0.035em] ${
                activeStep === 1
                  ? 'text-[clamp(2.5rem,11vw,3.25rem)] sm:text-[3.5rem] lg:text-[clamp(2.75rem,4.2vw,3.75rem)]'
                  : activeStep === 2
                    ? 'text-[clamp(2.5rem,11vw,3.25rem)] sm:text-[3.5rem] lg:text-[clamp(2.75rem,4.2vw,3.75rem)]'
                    : 'text-[2.75rem] sm:text-[3.5rem] lg:text-[clamp(2.75rem,4.4vw,4rem)]'
              }`}
            >
              {activeStep === 0 ? (
                <>
                  Строим
                  <br />
                  карту
                  <br />
                  продукта
                </>
              ) : activeStep === 1 ? (
                <>
                  Делаем
                  <br />
                  интерфейс,
                  <br />
                  который
                  <br />
                  продаёт
                </>
              ) : activeStep === 2 ? (
                <>
                  Собираем MVP
                  <br />
                  и показываем
                  <br />
                  по этапам
                </>
              ) : (
                step.title
              )}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-7 text-white/64">
              {step.copy}
            </p>
          </div>

          {activeStep === 0 ? (
            <figure className="min-w-0">
              <div className="process-route-visual">
                <Image
                  src={STEP_IMAGES[0]}
                  alt="Карта продукта: пользователь приходит с задачей, проходит по голубому маршруту, находит решение и получает результат."
                  width={1651}
                  height={953}
                  unoptimized
                  decoding="async"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs leading-5 text-white/60 sm:hidden">
                Пришёл с задачей → Нашёл решение → Получил результат
              </figcaption>
            </figure>
          ) : activeStep === 1 ? (
            <figure className="min-w-0 lg:translate-y-2">
              <Image
                className="block h-auto w-full"
                src={STEP_IMAGES[1]}
                alt="Один интерфейс магазина светильников на большом экране и смартфоне: одинаковые визуальные акценты и кнопка выбора, адаптированные под каждое устройство."
                width={1612}
                height={975}
                unoptimized
                decoding="async"
              />
            </figure>
          ) : activeStep === 2 ? (
            <figure className="min-w-0 lg:-mr-4 lg:w-[94%] lg:justify-self-end">
              <Image
                className="process-development-image block h-auto w-full"
                src={STEP_IMAGES[2]}
                alt="Единый экран разработки: слева редактор кода, справа работающая форма записи на консультацию."
                width={1080}
                height={735}
                unoptimized
                decoding="async"
              />
            </figure>
          ) : (
            <figure className="flex h-full min-w-0 items-center justify-center lg:-mr-6">
              <Image
                className="block h-auto max-h-full w-auto max-w-none object-contain mix-blend-lighten lg:max-h-[430px]"
                src={STEP_IMAGES[3]}
                alt="Ракета запускается из окна веб-приложения."
                width={1536}
                height={1024}
                unoptimized
                decoding="async"
              />
            </figure>
          )}
        </div>

        <div className="relative mt-8 grid grid-cols-2 gap-2 sm:mt-10 sm:grid-cols-4">
          {steps.map((item, index) => {
            const isActive = index === activeStep;
            return (
              <button
                aria-pressed={isActive}
                className={`flex items-center justify-between gap-2 rounded-full px-4 py-3 text-left text-xs font-bold uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-sm ${
                  isActive
                    ? 'bg-white text-black'
                    : 'bg-white/12 text-white hover:bg-white/20'
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
