// Мессенджеры, которые человек может выбрать в заявке, и их значки.
// Связь во всех — по номеру телефона, его человек оставляет в форме.

export type ChannelId = 'telegram' | 'whatsapp' | 'max' | 'vk';

export const CHANNELS: { id: ChannelId; label: string }[] = [
  { id: 'telegram', label: 'Telegram' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'max', label: 'MAX' },
  { id: 'vk', label: 'VK' },
];

export function MessengerIcon({ id }: { id: ChannelId }) {
  if (id === 'telegram') {
    return (
      <svg aria-hidden="true" className="messenger-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" fill="#27a7e7" r="12" />
        <path
          d="M5.4 11.7 17 7.2c.55-.2 1 .13.83.96l-1.98 9.3c-.14.67-.54.83-1.1.52l-3-2.22-1.46 1.4c-.16.16-.3.3-.6.3l.21-3.07 5.6-5.05c.24-.22-.06-.34-.38-.13l-6.92 4.36-2.98-.93c-.65-.2-.66-.65.14-.96Z"
          fill="#fff"
        />
      </svg>
    );
  }

  if (id === 'whatsapp') {
    return (
      <svg aria-hidden="true" className="messenger-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" fill="#25d366" r="12" />
        <path
          d="M12 5.4a6.6 6.6 0 0 0-5.7 9.9l-.9 3.3 3.4-.9A6.6 6.6 0 1 0 12 5.4Z"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
        />
        <path
          d="M9.6 8.9c.15-.3.3-.3.47-.3h.36c.1 0 .26 0 .4.32l.5 1.2c.05.13.05.26-.02.38l-.34.43c-.08.1-.14.23-.02.43.42.72 1.07 1.3 1.83 1.66.18.08.32.06.43-.07l.42-.5c.12-.15.26-.15.42-.09l1.17.56c.16.08.26.14.27.24.03.35-.08.76-.42 1.03-.33.27-.85.47-1.34.4-2.12-.33-4-2.2-4.3-4.18-.04-.5.08-.9.28-1.18Z"
          fill="#fff"
        />
      </svg>
    );
  }

  if (id === 'max') {
    // Квадрат с синим, фиолетовым и голубым переливом и белое кольцо-облачко
    // с хвостиком слева внизу.
    //
    // id градиентов постоянные, а не из useId: сгенерированные id на сервере
    // и в браузере расходились, и React ругался при гидратации. Одинаковые
    // определения у нескольких значков на странице друг другу не мешают.
    const base = 'messenger-max-base';
    const glow = 'messenger-max-glow';

    return (
      <svg aria-hidden="true" className="messenger-icon" viewBox="0 0 24 24">
        <defs>
          <linearGradient id={base} x1="0" x2="1" y1="0" y2="0.35">
            <stop offset="0" stopColor="#3a44f2" />
            <stop offset="1" stopColor="#9a3fd8" />
          </linearGradient>
          <radialGradient cx="0.05" cy="1" id={glow} r="0.75">
            <stop offset="0" stopColor="#68d0f8" />
            <stop offset="1" stopColor="#68d0f8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect fill={`url(#${base})`} height="24" rx="6" width="24" />
        <rect fill={`url(#${glow})`} height="24" rx="6" width="24" />
        <path
          clipRule="evenodd"
          d="M10.1 18.1A6.6 6.6 0 1 0 6.2 13.9c.1 1.4-.2 2.8-.9 4 .6.4 2.9.9 4.8.2Zm2.6-10.3a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
          fill="#f7f7f8"
          fillRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="messenger-icon" viewBox="0 0 24 24">
      <rect fill="#0077ff" height="24" rx="7" width="24" />
      <text
        fill="#fff"
        fontFamily="Arial, sans-serif"
        fontSize="9.5"
        fontWeight="800"
        textAnchor="middle"
        x="12"
        y="15.4"
      >
        VK
      </text>
    </svg>
  );
}
