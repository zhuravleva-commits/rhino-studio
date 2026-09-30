import { NextResponse, type NextRequest } from 'next/server';

// Заголовки безопасности и закрытие черновых страниц. Здесь, а не в
// next.config: главная отдаётся из кеша готовых страниц, и заголовки
// из next.config к ней vinext не добавляет, а middleware срабатывает всегда.

const isProduction = process.env.NODE_ENV === 'production';

// Черновые витрины (выбор шрифтов, концепты FAQ и формы) нужны только при
// разработке. На боевом сайте их быть не должно: формы там ненастоящие,
// а часть страниц тянет шрифты с серверов Google.
const DRAFT_PAGES = /^\/(?:alumni-concept|faq-demo|faq-lead-demo|faq-preview|fonts-demo|lead-demo)(?:\/|$)/;

// Откуда странице разрешено что-либо грузить. Всё своё — с этого же сайта:
// шрифты лежат у нас, внешних скриптов и сервисов нет. Встроенные скрипты
// и стили нужны самому фреймворку (данные страницы, style у элементов).
// Только для боевой сборки: сервер разработки подключает свои скрипты
// и websocket для горячей перезагрузки.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const SECURITY_HEADERS: [string, string][] = [
  // Браузер не угадывает тип файла по содержимому — картинку не выполнить как скрипт.
  ['X-Content-Type-Options', 'nosniff'],
  // Сайт нельзя встроить в чужую страницу (защита от подложенных кликов).
  ['X-Frame-Options', 'DENY'],
  // Чужим сайтам уходит только домен, без пути и параметров.
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  // Камера, микрофон и геолокация сайту не нужны — запрещаем заранее.
  [
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
  ],
  ...(isProduction
    ? ([
        ['Content-Security-Policy', CONTENT_SECURITY_POLICY],
        // Только https: после первого визита браузер сам не пойдёт по http.
        ['Strict-Transport-Security', 'max-age=31536000; includeSubDomains'],
      ] as [string, string][])
    : []),
];

export function middleware(request: NextRequest) {
  const response =
    isProduction && DRAFT_PAGES.test(request.nextUrl.pathname)
      ? new NextResponse('Not found', { status: 404 })
      : NextResponse.next();

  for (const [key, value] of SECURITY_HEADERS) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  // Всё, кроме файлов сборки и картинок/роликов из public: их отдаёт
  // хостинг напрямую, заголовки для них — в public/_headers.
  matcher: ['/((?!_next/static|.*\\.(?:webp|png|svg|mp4|woff2)$).*)'],
};
