// Правая половина героя: страница чертится сама собой и растворяется, цикл 5 с.
// Только SVG и CSS — ни JS, ни видео: нужны тонкие прямые линии и точная
// геометрия, а они должны оставаться чёткими на любом размере.

const СЕРЫЙ = '#aab2be';
const ГОЛУБОЙ = '#9ec9f2';

export function HeroWireframe() {
  return (
    <svg
      aria-hidden="true"
      className="hero-wireframe h-auto w-full text-foreground"
      fill="none"
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* рамка — прочерчивается по контуру */}
      <rect
        className="hw-frame"
        height="280"
        pathLength="1"
        rx="16"
        stroke="currentColor"
        strokeWidth="2"
        width="380"
        x="10"
        y="10"
      />

      {/* шапка: разделитель, логотип, пункты меню */}
      <g className="hw-chrome">
        <path d="M10 48H390" stroke={СЕРЫЙ} strokeWidth="1" />
        <circle cx="34" cy="29" r="7" stroke="currentColor" strokeWidth="2" />
        {[300, 330, 360].map((x) => (
          <rect fill={СЕРЫЙ} height="5" key={x} rx="2.5" width="20" x={x} y="26" />
        ))}
      </g>

      {/* заголовок */}
      <rect
        className="hw-headline"
        fill="currentColor"
        height="22"
        rx="5"
        width="190"
        x="36"
        y="82"
      />

      {/* строки текста */}
      <g className="hw-text" fill={СЕРЫЙ}>
        <rect height="9" rx="4.5" width="240" x="36" y="120" />
        <rect height="9" rx="4.5" width="180" x="36" y="140" />
      </g>

      {/* кнопка — единственное цветное пятно */}
      <rect
        className="hw-button"
        fill={ГОЛУБОЙ}
        height="34"
        rx="17"
        width="106"
        x="36"
        y="170"
      />

      {/* карточки встают по очереди */}
      {[36, 146, 256].map((x, i) => (
        <rect
          className={`hw-card hw-card-${i + 1}`}
          height="46"
          key={x}
          rx="10"
          stroke={СЕРЫЙ}
          strokeWidth="2"
          width="96"
          x={x}
          y="226"
        />
      ))}
    </svg>
  );
}
