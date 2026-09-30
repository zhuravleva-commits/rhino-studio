'use client';

import { useEffect, useState, type RefObject } from 'react';

// Становится true, когда элемент подъезжает к экрану (с запасом margin),
// и дальше так и остаётся. Нужен, чтобы тяжёлое — ролики, картинки соседних
// шагов — грузилось не при открытии страницы, а незадолго до того, как
// понадобится.
export function useNearViewport(
  ref: RefObject<Element | null>,
  margin = '600px',
): boolean {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (near || !element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );

    // Пока грузится первый экран, ничего не подгружаем: иначе ролики
    // соседних карточек отнимут канал у главной картинки.
    const start = () => observer.observe(element);

    if (document.readyState === 'complete') {
      start();
    } else {
      window.addEventListener('load', start, { once: true });
    }

    return () => {
      window.removeEventListener('load', start);
      observer.disconnect();
    };
  }, [ref, margin, near]);

  return near;
}

// Прогревать ролики заранее имеет смысл только там, где их вообще покажут
// по наведению, и если человек не просил экономить трафик.
export function canPreloadHoverMedia(): boolean {
  if (typeof window === 'undefined') return false;

  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;

  return window.matchMedia('(hover: hover)').matches && !connection?.saveData;
}
