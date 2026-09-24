'use client';

// Трава в хиро — ролик вместо картинки. Два слоя одного файла, потому что честно
// зациклить его нечем: за пять секунд трава уходит в другую позу, и стык
// «конец → начало» щёлкает.
//
// Белый фон ролика выбивается в прозрачность. Без этого видео легло бы
// прямоугольником поверх имени и закрыло буквы, которые по замыслу перекрыты
// только травинками.

import { useEffect, useRef } from 'react';

// Ролик уже обрезан по границам цикла, поэтому слой всегда начинается сначала.
// Из исходных пяти секунд вырезан кусок с 0.97: первую секунду фон уплывал
// из чистого белого в сероватый, и каждый круг начинался бы со вспышки.
const LOOP_START = 0;

// Здесь кадр ближе всего к стартовому — мерил разницу по всем парам кадров,
// эта пара лучшая из 184. Дальше идёт только хвост под растворение.
const LOOP_POINT = 3.5;

// Совпадение в точке склейки неидеальное — заметно расходятся 10% пикселей,
// так что слои перекрываются подольше, чем требовалось прошлому ролику.
// Растворение обязано укладываться в ролик с запасом: когда оно упиралось
// ровно в последний кадр, время вставало на 3.8999 и слои залипали.
const CROSSFADE = 0.3;

export function HeroGrass() {
  const firstRef = useRef<HTMLVideoElement>(null);
  const secondRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const first = firstRef.current;
    const second = secondRef.current;

    if (!first || !second) {
      return;
    }

    let frame = 0;

    const rewind = (video: HTMLVideoElement) => {
      video.currentTime = LOOP_START;
    };

    // Браузер сам останавливает фоновое видео без звука, чтобы сберечь батарею,
    // и тогда play() отклоняется. Это штатно: ловим, иначе летит необработанное
    // исключение в консоль.
    const start = (video: HTMLVideoElement) => {
      video.play().catch(() => {});
    };

    // Ждём метаданные: до них перемотка не применится и слой начнёт
    // с нулевого кадра, то есть с той самой вспышки.
    const whenReady = (video: HTMLVideoElement, run: () => void) => {
      if (video.readyState >= 1) {
        run();
      } else {
        video.addEventListener('loadedmetadata', run, { once: true });
      }
    };

    // Просили меньше движения — оставляем неподвижный кадр из самого ролика.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      whenReady(first, () => {
        rewind(first);
      });

      return;
    }

    let active = 0;

    whenReady(first, () => {
      rewind(first);
      start(first);
    });

    const tick = () => {
      frame = requestAnimationFrame(tick);

      const current = active === 0 ? first : second;
      const next = active === 0 ? second : first;

      if (current.currentTime < LOOP_POINT) {
        return;
      }

      // Следующий слой стартует ровно в точке склейки, поэтому в растворении
      // встречаются кадры 4.47+x и 0.97+x — те самые, что совпадают.
      if (next.paused) {
        rewind(next);
        start(next);
      }

      const progress = Math.min(
        1,
        (current.currentTime - LOOP_POINT) / CROSSFADE,
      );

      current.style.opacity = String(1 - progress);
      next.style.opacity = String(progress);

      if (progress >= 1 || current.ended) {
        current.pause();
        // Дотягиваем прозрачности руками: последний кадр может не попасть
        // ровно в конец растворения, и на слое оставался бы хвост.
        current.style.opacity = '0';
        next.style.opacity = '1';
        active = active === 0 ? 1 : 0;
      }
    };

    frame = requestAnimationFrame(tick);

    // Уходя на другую вкладку, браузер останавливает видео без звука. Сам он
    // его не возобновит, а цикл ниже ждёт продвижения времени и без этого
    // обработчика трава осталась бы застывшей навсегда.
    const resume = () => {
      if (!document.hidden) {
        start(active === 0 ? first : second);
      }
    };

    document.addEventListener('visibilitychange', resume);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', resume);
      first.pause();
      second.pause();
    };
  }, []);

  return (
    <div aria-hidden="true" className="hero-grass">
      {/* Порог взят по гистограмме кадра: фон держится выше 240 по R и B,
          трава — ниже 200. Складываем оба канала, потому что у зелени они
          проседают вместе, и запаса хватает на серый дрейф фона по ходу
          ролика. Размытие перед порогом снимает зернистость от сжатия. */}
      <svg className="absolute h-0 w-0" focusable="false">
        <filter colorInterpolationFilters="sRGB" id="hero-grass-key">
          <feGaussianBlur in="SourceGraphic" result="soft" stdDeviation="0.7" />
          <feColorMatrix
            in="soft"
            result="alpha"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    -2.94 0 -2.94 0 5.56"
          />
          <feComposite in="SourceGraphic" in2="alpha" operator="in" />
        </filter>
      </svg>

      <video
        className="hero-grass-video"
        muted
        playsInline
        preload="auto"
        ref={firstRef}
        src="/hero-grass.mp4"
      />

      <video
        className="hero-grass-video"
        muted
        playsInline
        preload="auto"
        ref={secondRef}
        src="/hero-grass.mp4"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
