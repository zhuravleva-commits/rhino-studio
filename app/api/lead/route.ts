// Приём заявки и отправка её в Telegram.
//
// Обработчик серверный намеренно: токен бота нельзя отдавать в браузер — любой
// посетитель прочитал бы его в исходниках страницы и получил полный доступ
// к боту. Поэтому страница шлёт данные сюда, а с Telegram разговаривает уже
// сервер.

import { formatPhone, normalizeName, phoneDigits, validateName, validatePhone } from '../../lead-validation';

const TELEGRAM_API = 'https://api.telegram.org';

// Что человек выбрал в форме → как это показать в сообщении. Всё, чего нет
// в списке, просто не выводим: подставить в заявку произвольный текст нельзя.
const CHANNELS: Record<string, string> = {
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
  max: 'MAX',
  vk: 'VK',
};

function clean(value: unknown, limit: number) {
  return typeof value === 'string' ? value.trim().slice(0, limit) : '';
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Не разобрали запрос' }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;
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

    return Response.json(
      { error: 'Приём заявок не настроен' },
      { status: 503 },
    );
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
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Telegram отказал:', response.status, detail.slice(0, 300));

      return Response.json({ error: 'Не удалось отправить' }, { status: 502 });
    }
  } catch (error) {
    console.error('Telegram недоступен:', error);

    return Response.json({ error: 'Не удалось отправить' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
