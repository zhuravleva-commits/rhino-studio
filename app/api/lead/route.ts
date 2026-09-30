// Приём заявки и отправка её в Telegram.
//
// Обработчик серверный намеренно: токен бота нельзя отдавать в браузер — любой
// посетитель прочитал бы его в исходниках страницы и получил полный доступ
// к боту. Поэтому страница шлёт данные сюда, а с Telegram разговаривает уже
// сервер.
//
// Адрес открыт всему интернету, поэтому до Telegram доходит только то, что
// похоже на заявку живого человека с нашей же страницы: чужие сайты, боты,
// заполняющие скрытое поле, слишком большие запросы и частые повторы с одного
// адреса отсекаются раньше.

import { formatPhone, normalizeName, phoneDigits, validateName, validatePhone } from '../../lead-validation';

const TELEGRAM_API = 'https://api.telegram.org';

// Заявка — это несколько коротких полей; всё, что заметно больше, — не она.
const MAX_BODY_BYTES = 8 * 1024;

// Не больше пяти заявок в сутки с одного адреса. Считаются только заявки,
// которые действительно ушли в Telegram: ошибка в поле или сбой отправки
// попытку не съедают. Счётчик живёт в памяти экземпляра сервера, так что
// после перезапуска он обнуляется — строгий лимит даёт только правило
// на хостинге.
const DAILY_LIMIT = 5;
const DAY_MS = 24 * 60 * 60 * 1000;
const sent = new Map<string, number[]>();

// Что человек выбрал в форме → как это показать в сообщении. Всё, чего нет
// в списке, просто не выводим: подставить в заявку произвольный текст нельзя.
const CHANNELS: Record<string, string> = {
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
  max: 'MAX',
  vk: 'VK',
};

// Управляющие символы и символы смены направления письма: ими можно исказить
// то, как заявка выглядит в чате (спрятать или «перевернуть» часть текста).
// Перевод строки оставляем — в описании задачи он законен.
const UNSAFE_CHARS = /[\u0000-\u0009\u000B-\u001F\u007F-\u009F\u200E\u200F\u202A-\u202E\u2066-\u2069]/g;

function clean(value: unknown, limit: number) {
  return typeof value === 'string' ? value.replace(UNSAFE_CHARS, '').trim().slice(0, limit) : '';
}

function fail(error: string, status: number) {
  return Response.json({ error }, { status });
}

// Запрос должен прийти со страницы этого же сайта. Браузер всегда ставит
// Origin на POST, и подделать его скрипт на чужом сайте не может.
function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    const host = new URL(origin).host;

    // За прокси хостинга адрес запроса бывает внутренним, поэтому сверяемся
    // и с заголовками, где прокси передаёт настоящий адрес сайта.
    return [
      new URL(request.url).host,
      request.headers.get('host'),
      request.headers.get('x-forwarded-host'),
    ].includes(host);
  } catch {
    return false;
  }
}

function clientIp(request: Request) {
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

function sentToday(ip: string, now: number) {
  const recent = (sent.get(ip) ?? []).filter((time) => now - time < DAY_MS);
  sent.set(ip, recent);
  return recent;
}

function rememberSent(ip: string, now: number) {
  sentToday(ip, now).push(now);

  // Не даём карте расти бесконечно: выкидываем адреса, у которых сутки прошли.
  if (sent.size > 5000) {
    for (const [key, times] of sent) {
      if (times.every((time) => now - time >= DAY_MS)) sent.delete(key);
    }
  }
}

async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  // Длину в заголовке можно не указать, поэтому читаем по кускам и перестаём
  // копить, как только набралось больше лимита, — в память огромное тело
  // не попадёт. Остаток дочитываем вхолостую: оборванное чтение ломает
  // соединение с сервером.
  const reader = request.body?.getReader();
  if (!reader) return null;

  const chunks: Uint8Array[] = [];
  let size = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;

    size += value.byteLength;
    if (size <= MAX_BODY_BYTES) chunks.push(value);
  }

  if (size > MAX_BODY_BYTES) return null;

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const text = new TextDecoder().decode(bytes);

  try {
    const value: unknown = JSON.parse(text);

    return value && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return fail('Запрос не с сайта', 403);
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return fail('Не разобрали запрос', 415);
  }

  const data = await readJson(request);

  if (!data) {
    return fail('Не разобрали запрос', 400);
  }

  // Скрытое поле: человек его не видит и не заполняет, а бот заполняет всё
  // подряд. Отвечаем «принято», чтобы бот не понял, что его отсеяли.
  if (clean(data.website, 200)) {
    return Response.json({ ok: true });
  }

  const ip = clientIp(request);

  if (sentToday(ip, Date.now()).length >= DAILY_LIMIT) {
    return fail('Сегодня с этого адреса уже отправлено несколько заявок', 429);
  }

  const name = normalizeName(clean(data.name, 120));
  const digits = phoneDigits(clean(data.phone, 40));
  const task = clean(data.task, 2000);
  const channel = CHANNELS[clean(data.channel, 20)];

  // Те же правила, что в форме: запрос можно отправить и в обход неё.
  const errors = {
    name: validateName(name) ?? undefined,
    phone: validatePhone(digits) ?? undefined,
  };

  if (errors.name || errors.phone) {
    return Response.json({ errors }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // Молчать нельзя: иначе заявка исчезнет, а человек увидит «отправлено».
    console.error('Заявка не ушла: не заданы TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID');

    return fail('Приём заявок не настроен', 503);
  }

  const lines = [
    '🦏 Заявка с сайта',
    '',
    `Имя: ${name}`,
    `Телефон: ${formatPhone(digits)}`,
  ];

  if (channel) {
    lines.push(`Удобно в: ${channel}`);
  }

  if (task) {
    lines.push('', `Задача: ${task}`);
  }

  try {
    const response = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
        disable_web_page_preview: true,
      }),
      // Если Telegram не отвечает, человек не должен ждать бесконечно.
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Telegram отказал:', response.status, detail.slice(0, 300));

      return fail('Не удалось отправить', 502);
    }
  } catch (error) {
    // Адрес запроса содержит токен — в журнал он попасть не должен.
    console.error('Telegram недоступен:', String(error).replaceAll(token, '***'));

    return fail('Не удалось отправить', 502);
  }

  rememberSent(ip, Date.now());

  return Response.json({ ok: true });
}
