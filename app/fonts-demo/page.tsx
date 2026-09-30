// Витрина шрифтовых пар для сайта. Страница временная, в сайт ничего не идёт:
// нужна, чтобы выбрать гарнитуры для заголовков и текста.
//
// Каждая пара показана на одном и том же куске сайта — первый экран,
// заголовок секции, карточки услуги и цены, вопрос из FAQ, кнопки — чтобы
// сравнивать шрифты, а не тексты. У всех гарнитур есть кириллица.

import { Fragment, type CSSProperties } from 'react';

import './fonts.css';

// Все шрифты одним запросом; Google сам отдаёт только нужные наборы символов
// (кириллица, латиница) по unicode-range.
const FONTS_URL =
  'https://fonts.googleapis.com/css2?' +
  [
    'family=Manrope:wght@400;500;600;700;800',
    'family=Onest:wght@400;500;600;700;800',
    'family=Inter:wght@400;500;600;700',
    'family=Inter+Tight:wght@500;600;700;800',
    'family=Geologica:wght@300;400;500;600;700',
    'family=Jost:wght@400;500;600;700',
    'family=Playfair+Display:wght@500;600;700',
    'family=IBM+Plex+Sans:wght@400;500;600;700',
    'family=IBM+Plex+Mono:wght@400;500;600',
    'family=Exo+2:wght@500;600;700;800',
    'family=Geist:wght@400;500;600;700;800',
    'family=Geist+Mono:wght@400;500;600',
    'family=Unbounded:wght@400;500;600;700',
    'family=Wix+Madefor+Display:wght@500;600;700;800',
    'family=Wix+Madefor+Text:wght@400;500;600;700',
    'family=Golos+Text:wght@400;500;600;700;800',
    'family=Commissioner:wght@400;500;600;700;800',
    'family=Nata+Sans:wght@400;500;600;700;800',
    'family=Oswald:wght@400;500;600;700',
    'family=Martian+Mono:wght@400;500;600;700',
    'family=Great+Vibes',
    'family=Marck+Script',
    'family=Montserrat+Alternates:wght@500;600;700',
    'family=Comfortaa:wght@500;600;700',
    'family=Days+One',
    'family=Prosto+One',
    'family=Philosopher:wght@400;700',
    'family=Alumni+Sans:wght@500;600;700;800',
    'family=Forum',
  ].join('&') +
  '&display=swap';

type Pair = {
  id: string;
  title: string;
  fonts: string;
  mood: string;
  note: string;
  heading: string;
  body: string;
  accent?: string;
  // Жирность и трекинг заголовков подобраны под каждую гарнитуру: одна и та
  // же цифра у разных шрифтов выглядит по-разному.
  hWeight: number;
  hTracking: string;
  h2Weight?: number;
  // Широкие и моноширинные гарнитуры на том же кегле вылезают за строку,
  // узкие — наоборот, мельчат. Множитель кегля заголовков.
  hScale?: number;
  upperHeadings?: boolean;
  lowerHeadings?: boolean;
  // Рукописный шрифт для акцентного слова в первом заголовке — как «Нет»
  // на референсе: синее каллиграфическое слово над плотным гротеском.
  script?: string;
  // Первая пара нового блока — перед ней подзаголовок витрины.
  group?: string;
};

const PAIRS: Pair[] = [
  {
    id: 'current',
    title: '0. Сейчас на сайте',
    fonts: 'Arial',
    mood: 'для сравнения',
    note: 'Системный шрифт, свой у каждого устройства. Жирностей 800–900 у Arial нет — браузер дорисовывает их сам, отсюда грубоватые крупные заголовки.',
    heading: 'Arial, Helvetica, sans-serif',
    body: 'Arial, Helvetica, sans-serif',
    hWeight: 800,
    hTracking: '-0.045em',
  },
  {
    id: 'manrope',
    title: '1. Manrope',
    fonts: 'Manrope — заголовки и текст',
    mood: 'современный стандарт',
    note: 'Геометричный гротеск с мягкими формами. Самый частый выбор российских digital-студий: аккуратно, дорого, ничего не отвлекает. Беспроигрышный вариант.',
    heading: "'Manrope', sans-serif",
    body: "'Manrope', sans-serif",
    hWeight: 800,
    hTracking: '-0.045em',
  },
  {
    id: 'onest',
    title: '2. Onest',
    fonts: 'Onest — заголовки и текст',
    mood: 'сделан под кириллицу',
    note: 'Российская гарнитура, где кириллицу рисовали первой, а не пристраивали к латинице: «Д», «Л», «ж» выглядят родными. Спокойный, очень читаемый, чуть теплее Manrope.',
    heading: "'Onest', sans-serif",
    body: "'Onest', sans-serif",
    hWeight: 700,
    hTracking: '-0.04em',
  },
  {
    id: 'inter',
    title: '3. Inter Tight + Inter',
    fonts: 'Inter Tight — заголовки, Inter — текст',
    mood: 'швейцарская точность',
    note: 'Интерфейсная классика: так выглядят Linear, Vercel, Figma. Плотный узкий Inter Tight для крупных заголовков и эталонно читаемый Inter для текста. Строго и технологично.',
    heading: "'Inter Tight', sans-serif",
    body: "'Inter', sans-serif",
    hWeight: 700,
    hTracking: '-0.045em',
  },
  {
    id: 'geologica',
    title: '4. Geologica',
    fonts: 'Geologica — заголовки и текст',
    mood: 'гротеск с характером',
    note: 'Современная гарнитура с острыми срезами штрихов: в крупном размере заметен характер, в мелком — обычный чистый текст. Выделяется среди «ещё одной студии на Manrope».',
    heading: "'Geologica', sans-serif",
    body: "'Geologica', sans-serif",
    hWeight: 600,
    hTracking: '-0.045em',
  },
  {
    id: 'jost',
    title: '5. Jost',
    fonts: 'Jost — заголовки и текст',
    mood: 'геометрия в духе Futura',
    note: 'Круглые «о», острые «А» и «М», ровные пропорции. Ощущение дизайн-бюро и архитектуры. Заголовки выглядят легко даже в полужирном.',
    heading: "'Jost', sans-serif",
    body: "'Jost', sans-serif",
    hWeight: 600,
    hTracking: '-0.03em',
  },
  {
    id: 'editorial',
    title: '6. Playfair Display + Manrope',
    fonts: 'Playfair Display — заголовки, Manrope — текст',
    mood: 'редакционный',
    note: 'Контрастная антиква в заголовках, как в журналах, и спокойный гротеск в тексте. Подчёркивает «редакционный» первый экран, но делает сайт заметно менее «айтишным».',
    heading: "'Playfair Display', serif",
    body: "'Manrope', sans-serif",
    hWeight: 600,
    hTracking: '-0.02em',
    h2Weight: 600,
  },
  {
    id: 'plex',
    title: '7. IBM Plex Sans + Plex Mono',
    fonts: 'Plex Sans — заголовки и текст, Plex Mono — подписи и цифры',
    mood: 'инженерный',
    note: 'Гарнитура IBM с инженерным характером. Моноширинные подписи и цены подчёркивают, что студия делает продукты и код, а не только картинки.',
    heading: "'IBM Plex Sans', sans-serif",
    body: "'IBM Plex Sans', sans-serif",
    accent: "'IBM Plex Mono', monospace",
    hWeight: 700,
    hTracking: '-0.035em',
  },
  {
    id: 'exo',
    title: '8. Exo 2 + Inter',
    fonts: 'Exo 2 — заголовки, Inter — текст',
    mood: 'технологичный',
    note: 'Скошенные углы и «техно»-геометрия в заголовках, нейтральный Inter в тексте. Самый «IT» из всех, но и самый рискованный: легко скатиться в игровую эстетику.',
    heading: "'Exo 2', sans-serif",
    body: "'Inter', sans-serif",
    hWeight: 700,
    hTracking: '-0.025em',
  },
  {
    id: 'geist',
    title: '9. Geist + Geist Mono',
    fonts: 'Geist — заголовки и текст, Geist Mono — подписи и цифры',
    mood: 'главный тренд tech',
    note: 'Шрифт Vercel: им сейчас набрана половина сайтов AI-стартапов и dev-инструментов. Строгий швейцарский гротеск плюс моноширинная пара для подписей. Бонус — он уже подключён в проекте, просто не используется.',
    heading: "'Geist', sans-serif",
    body: "'Geist', sans-serif",
    accent: "'Geist Mono', monospace",
    hWeight: 700,
    hTracking: '-0.05em',
    group: 'Трендовые сейчас',
  },
  {
    id: 'unbounded',
    title: '10. Unbounded + Onest',
    fonts: 'Unbounded — заголовки, Onest — текст',
    mood: 'широкий акцент',
    note: 'Широкий геометричный Unbounded — один из самых модных шрифтов в российском вебе и на событиях. Заголовки звучат громко, текст на Onest остаётся спокойным. Раньше вы отвергали его для кириллического заголовка на тёмном концепте — на светлом сайте он смотрится иначе.',
    heading: "'Unbounded', sans-serif",
    body: "'Onest', sans-serif",
    hWeight: 600,
    hTracking: '-0.035em',
    hScale: 0.78,
  },
  {
    id: 'wix',
    title: '11. Wix Madefor',
    fonts: 'Wix Madefor Display — заголовки, Wix Madefor Text — текст',
    mood: 'дружелюбный продуктовый',
    note: 'Семейство, которое Wix сделал для своих сайтов: отдельная версия для крупных заголовков и отдельная для текста. Открытые, приветливые формы — ощущение продукта, которым приятно пользоваться.',
    heading: "'Wix Madefor Display', sans-serif",
    body: "'Wix Madefor Text', sans-serif",
    hWeight: 700,
    hTracking: '-0.04em',
  },
  {
    id: 'golos',
    title: '12. Golos Text',
    fonts: 'Golos Text — заголовки и текст',
    mood: 'строгий российский',
    note: 'Гарнитура студии Paratype, изначально сделанная для госсервисов: предельно читаемая кириллица, ничего лишнего. Надёжно и солидно, но характера меньше, чем у Onest.',
    heading: "'Golos Text', sans-serif",
    body: "'Golos Text', sans-serif",
    hWeight: 700,
    hTracking: '-0.04em',
  },
  {
    id: 'commissioner',
    title: '13. Commissioner',
    fonts: 'Commissioner — заголовки и текст',
    mood: 'живой гротеск',
    note: 'Вариативный гротеск с чуть расширенными пропорциями и мягкими окончаниями. В заголовках выглядит свежее классических гротесков, в тексте — спокойно.',
    heading: "'Commissioner', sans-serif",
    body: "'Commissioner', sans-serif",
    hWeight: 700,
    hTracking: '-0.045em',
  },
  {
    id: 'nata',
    title: '14. Nata Sans',
    fonts: 'Nata Sans — заголовки и текст',
    mood: 'новинка',
    note: 'Новая гарнитура Google Fonts: чуть расширенные пропорции, открытые формы и необычная круглая «ф». Выглядит свежо и дружелюбно, и её ещё мало кто использует — не примелькалась.',
    heading: "'Nata Sans', sans-serif",
    body: "'Nata Sans', sans-serif",
    hWeight: 700,
    hTracking: '-0.045em',
  },
  {
    id: 'oswald',
    title: '15. Oswald + Inter',
    fonts: 'Oswald — заголовки прописными, Inter — текст',
    mood: 'узкие крупные заголовки',
    note: 'Тренд на огромные узкие заголовки капсом, как в спортивных и fashion-брендах. Очень эффектно на первом экране, но в длинных заголовках читается хуже.',
    heading: "'Oswald', sans-serif",
    body: "'Inter', sans-serif",
    hWeight: 600,
    hTracking: '-0.01em',
    hScale: 1.05,
    upperHeadings: true,
  },
  {
    id: 'martian',
    title: '16. Martian Mono + Geist',
    fonts: 'Martian Mono — заголовки и подписи, Geist — текст',
    mood: 'моноширинный тренд',
    note: 'Заголовки моноширинным шрифтом — приём dev-студий и AI-продуктов, «код как эстетика». Смело и запоминается, но требует аккуратности: длинные заголовки получаются очень широкими.',
    heading: "'Martian Mono', monospace",
    body: "'Geist', sans-serif",
    accent: "'Martian Mono', monospace",
    hWeight: 600,
    hTracking: '-0.06em',
    hScale: 0.7,
  },
  {
    id: 'script-vibes',
    title: '17. Great Vibes + Inter Tight',
    fonts: 'Great Vibes — акцентное слово, Inter Tight — заголовки, Inter — текст',
    mood: 'как на первом референсе',
    note: 'Одно каллиграфическое слово синим поверх плотного гротеска со сжатым трекингом, заголовок в два цвета — синий и чёрный. Рукописный шрифт только для акцента, никогда для целых фраз.',
    heading: "'Inter Tight', sans-serif",
    body: "'Inter', sans-serif",
    script: "'Great Vibes', cursive",
    hWeight: 600,
    hTracking: '-0.065em',
    lowerHeadings: true,
    group: 'По вашим референсам',
  },
  {
    id: 'script-marck',
    title: '18. Marck Script + Onest',
    fonts: 'Marck Script — акцентное слово, Onest — заголовки и текст',
    mood: 'рукописный, живой',
    note: 'Та же идея, но акцент — живой рукописный почерк, а не парадная каллиграфия. Теплее и проще, меньше «свадебного» оттенка.',
    heading: "'Onest', sans-serif",
    body: "'Onest', sans-serif",
    script: "'Marck Script', cursive",
    hWeight: 600,
    hTracking: '-0.06em',
    lowerHeadings: true,
  },
  {
    id: 'alternates',
    title: '19. Montserrat Alternates + Onest',
    fonts: 'Montserrat Alternates — заголовки строчными, Onest — текст',
    mood: 'как Unifix, второй референс',
    note: 'Геометрия на окружностях и альтернативные формы букв, заголовки строчными. Ближайший бесплатный аналог Unifix из Google Fonts.',
    heading: "'Montserrat Alternates', sans-serif",
    body: "'Onest', sans-serif",
    hWeight: 600,
    hTracking: '-0.05em',
    hScale: 0.92,
    lowerHeadings: true,
  },
  {
    id: 'comfortaa',
    title: '20. Comfortaa + Manrope',
    fonts: 'Comfortaa — заголовки строчными, Manrope — текст',
    mood: 'мягкая геометрия',
    note: 'Скруглённая геометрия, тоже в сторону Unifix, но мягче и дружелюбнее. Хорошо смотрится крупно, в мелком тексте не используем.',
    heading: "'Comfortaa', sans-serif",
    body: "'Manrope', sans-serif",
    hWeight: 700,
    hTracking: '-0.05em',
    hScale: 0.92,
    lowerHeadings: true,
  },
  {
    id: 'days',
    title: '21. Days One + Onest',
    fonts: 'Days One — заголовки, Onest — текст',
    mood: 'тяжёлый и широкий',
    note: 'Из вашей подборки («ГРУППА»). Массивный широкий гротеск — заголовки звучат уверенно, как вывеска. Одно начертание, поэтому только для заголовков.',
    heading: "'Days One', sans-serif",
    body: "'Onest', sans-serif",
    hWeight: 400,
    hTracking: '-0.045em',
    hScale: 0.8,
  },
  {
    id: 'prosto',
    title: '22. Prosto One + Onest',
    fonts: 'Prosto One — заголовки, Onest — текст',
    mood: 'характерный акцент',
    note: 'Из вашей подборки («ПЕРО»). Широкий гротеск с необычными сопряжениями штрихов. Выразительнее Days One, чуть легче по весу.',
    heading: "'Prosto One', sans-serif",
    body: "'Onest', sans-serif",
    hWeight: 400,
    hTracking: '-0.04em',
    hScale: 0.82,
  },
  {
    id: 'philosopher',
    title: '23. Philosopher + Manrope',
    fonts: 'Philosopher — заголовки, Manrope — текст',
    mood: 'каллиграфическая нота',
    note: 'Из вашей подборки («КИСТЬ»). Гротеск с каллиграфическими окончаниями — между строгим и рукописным. Необычно, но может выглядеть несовременно.',
    heading: "'Philosopher', sans-serif",
    body: "'Manrope', sans-serif",
    hWeight: 700,
    hTracking: '-0.03em',
  },
  {
    id: 'alumni',
    title: '24. Alumni Sans + Inter',
    fonts: 'Alumni Sans — заголовки прописными, Inter — текст',
    mood: 'вместо Bebas Neue',
    note: 'Bebas Neue из вашей подборки в Google Fonts без кириллицы. Alumni Sans — такой же узкий «плакатный» гротеск, но с кириллицей и разными жирностями.',
    heading: "'Alumni Sans', sans-serif",
    body: "'Inter', sans-serif",
    hWeight: 700,
    hTracking: '-0.01em',
    hScale: 1.25,
    upperHeadings: true,
  },
  {
    id: 'forum',
    title: '25. Forum + Manrope',
    fonts: 'Forum — заголовки прописными, Manrope — текст',
    mood: 'элегантные капители',
    note: 'Ближе всего к Mak («ФИГМА») из подборки: классические римские прописные, дорого и спокойно. Для премиального образа студии.',
    heading: "'Forum', serif",
    body: "'Manrope', sans-serif",
    hWeight: 400,
    hTracking: '0.01em',
    hScale: 0.9,
    upperHeadings: true,
  },
];

function Specimen({ pair }: { pair: Pair }) {
  const style = {
    '--fh': pair.heading,
    '--fb': pair.body,
    '--fa': pair.accent ?? pair.body,
    '--hw': pair.hWeight,
    '--h2w': pair.h2Weight ?? pair.hWeight,
    '--ht': pair.hTracking,
    '--hs': pair.hScale ?? 1,
    '--hcase': pair.upperHeadings ? 'uppercase' : pair.lowerHeadings ? 'lowercase' : 'none',
    '--fs': pair.script ?? pair.heading,
  } as CSSProperties;

  return (
    <section className="ft-pair" id={pair.id}>
      <header className="ft-pair__label">
        <div>
          <h3>{pair.title}</h3>
          <p className="ft-pair__fonts">{pair.fonts}</p>
        </div>
        <span className="ft-pair__mood">{pair.mood}</span>
        <p className="ft-pair__note">{pair.note}</p>
      </header>

      <div className="ft-spec" style={style}>
        {/* Первый экран */}
        <div className="ft-hero">
          <p className="ft-eyebrow">Стратегия · Дизайн · Разработка</p>
          {pair.script ? (
            <h1 className="ft-h1 ft-h1--mixed">
              <span className="ft-script">Создаём</span>
              <span className="ft-blue">сайты,</span> которые продают
            </h1>
          ) : (
            <h1 className="ft-h1">Создаём сайты, которые продают</h1>
          )}
          <p className="ft-lead">
            Проектируем и разрабатываем сайты, приложения и цифровые продукты с ясной структурой и сильной подачей.
          </p>
          <div className="ft-buttons">
            <span className="ft-btn">Обсудить проект</span>
            <span className="ft-btn ft-btn--ghost">Наши работы</span>
          </div>
        </div>

        {/* Секция: заголовок, текст, карточки */}
        <div className="ft-section">
          <p className="ft-eyebrow ft-eyebrow--muted">Портфолио</p>
          <h2 className="ft-h2">Наши прошлые работы</h2>
          <p className="ft-body">
            Визовый центр, платформа недвижимости, CRM для сервисной компании. Показываем продукт так, чтобы было понятно,
            какую задачу он решает, — без лишних слов и красивостей ради красивостей.
          </p>

          <div className="ft-cards">
            <div className="ft-card">
              <span className="ft-tag">02 / продукты</span>
              <p className="ft-h3">Веб-приложения</p>
              <p className="ft-small">UX · интерфейс · разработка</p>
            </div>
            <div className="ft-card">
              <span className="ft-tag">лендинг</span>
              <p className="ft-price">
                <span>от</span> 70 000 <span>₽</span>
              </p>
              <p className="ft-small">Срок — от недели</p>
            </div>
            <div className="ft-card ft-card--faq">
              <p className="ft-q">Как следить за ходом работы?</p>
              <p className="ft-small">
                Работаем прозрачно: вы в курсе того, что происходит на каждом этапе.
              </p>
            </div>
          </div>
        </div>

        <p className="ft-pangram">
          Съешь же ещё этих мягких французских булок, да выпей чаю · ЖЁЛТЫЙ ФЪЕЗД · 0123456789 № «»
        </p>
      </div>
    </section>
  );
}

export default function FontsDemo() {
  return (
    <main className="ft-page">
      <link href="https://fonts.googleapis.com" precedence="default" rel="preconnect" />
      <link href={FONTS_URL} precedence="default" rel="stylesheet" />

      <header className="ft-page__head">
        <p>Rhino · черновик</p>
        <h1>Шрифты сайта: 25 вариантов</h1>
        <p className="ft-page__intro">
          Везде один и тот же кусок сайта: первый экран, секция, карточки услуги и цены, вопрос из FAQ. Вариант 0 — то, что
          стоит сейчас, для сравнения. Пары 9–16 — то, что в тренде прямо сейчас, 17–25 — по вашим
          референсам. У всех гарнитур есть кириллица, все
          бесплатные (Google Fonts).
        </p>
        <nav>
          {PAIRS.map((p) => (
            <a href={`#${p.id}`} key={p.id}>
              {p.title}
            </a>
          ))}
        </nav>
      </header>

      {PAIRS.map((pair) => (
        <Fragment key={pair.id}>
          {pair.group && <h2 className="ft-group">{pair.group}</h2>}
          <Specimen pair={pair} />
        </Fragment>
      ))}
    </main>
  );
}
