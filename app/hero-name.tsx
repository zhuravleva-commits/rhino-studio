// Имя студии во всю ширину. При загрузке буквы проявляются слева направо,
// оставляя пустоту на месте «I», и в неё снизу прорастает рог. Дальше имя стоит,
// а по рогу раз в несколько секунд проходит блик — чтобы экран не был мёртвым.
//
// Раскладка задержек здесь через animation-delay намеренно: эта часть играет
// один раз (`both`), поэтому сдвиг фаз ничего не рассинхронизирует. Зацикленный
// блик живёт отдельной анимацией и ни от чего не зависит.

import type { CSSProperties } from 'react';

const РОГ = 'M36 92C35 57 27 25 6 4C13 30 15 61 13 92H36Z';

// Порядок нужен сквозной: рог занимает третью позицию, поэтому буквы после него
// продолжают счёт — иначе набор побежит не слева направо.
const ДО_РОГА = ['R', 'H'];
const ПОСЛЕ_РОГА = ['N', 'O'];
const ВТОРОЕ_СЛОВО = ['S', 'T', 'U', 'D', 'I', 'O'];

function Буква({ знак, шаг }: { знак: string; шаг: number }) {
  return (
    <span className="hn-letter" style={{ '--i': шаг } as CSSProperties}>
      {знак}
    </span>
  );
}

export function HeroName() {
  const послеРога = ДО_РОГА.length + 1;
  const второеСлово = послеРога + ПОСЛЕ_РОГА.length;

  return (
    <h1
      aria-label="RHINO STUDIO"
      className="hero-name font-display flex flex-wrap justify-center gap-x-[0.34em] font-normal leading-[1.02] tracking-[-0.01em]"
    >
      <span className="inline-flex items-end">
        {ДО_РОГА.map((з, i) => (
          <Буква знак={з} key={з + i} шаг={i} />
        ))}

        <span aria-hidden="true" className="hn-slot">
          <svg
            className="hn-horn"
            fill="none"
            viewBox="0 0 44 92"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="hn-horn-clip">
                <path d={РОГ} />
              </clipPath>
              <linearGradient id="hn-glint" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                <stop offset="50%" stopColor="#fff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path d={РОГ} fill="currentColor" />

            <g clipPath="url(#hn-horn-clip)">
              <rect
                className="hn-glint"
                fill="url(#hn-glint)"
                height="34"
                width="44"
                x="0"
                y="0"
              />
            </g>
          </svg>
        </span>

        {ПОСЛЕ_РОГА.map((з, i) => (
          <Буква знак={з} key={з + i} шаг={послеРога + i} />
        ))}
      </span>

      <span className="inline-flex items-end">
        {ВТОРОЕ_СЛОВО.map((з, i) => (
          <Буква знак={з} key={з + i} шаг={второеСлово + i} />
        ))}
      </span>
    </h1>
  );
}
