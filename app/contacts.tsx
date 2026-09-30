'use client';

// Контакты студии: одна точка правды для карточки в шапке и подвала.
//
// У каждого контакта — ссылка, если по ней можно сразу написать или
// позвонить, и кнопка «скопировать»: mailto и tel ничего не делают на
// компьютере без почтовой программы и телефона, а номер MAX открыть ссылкой
// нельзя вовсе.

import { useEffect, useRef, useState } from 'react';

import { MessengerIcon } from './messengers';

type Contact = {
  id: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  copy: string;
  icon: 'telegram' | 'max' | 'phone' | 'mail';
};

const CONTACTS: Contact[] = [
  {
    id: 'telegram',
    label: 'Telegram',
    value: '@rhinostudio_help',
    href: 'https://t.me/rhinostudio_help',
    external: true,
    copy: '@rhinostudio_help',
    icon: 'telegram',
  },
  {
    id: 'phone',
    label: 'Телефон',
    value: '+7 983 249-40-48',
    href: 'tel:+79832494048',
    copy: '+7 983 249-40-48',
    icon: 'phone',
  },
  {
    id: 'max',
    label: 'MAX',
    value: '+7 983 249-40-48',
    copy: '+7 983 249-40-48',
    icon: 'max',
  },
  {
    id: 'mail',
    label: 'Почта',
    value: 'hello@rhino.studio',
    href: 'mailto:hello@rhino.studio',
    copy: 'hello@rhino.studio',
    icon: 'mail',
  },
];

function Icon({ name }: { name: Contact['icon'] }) {
  if (name === 'telegram' || name === 'max') return <MessengerIcon id={name} />;

  return (
    <svg aria-hidden="true" className="messenger-icon contact-icon" viewBox="0 0 24 24">
      <circle cx="12" cy="12" fill="#eef3ff" r="12" />
      {name === 'phone' ? (
        <path
          d="M9.2 6.8c.3-.4.8-.4 1.1-.1l1.4 1.8c.3.3.3.8 0 1.1l-.8.9c.6 1.4 1.6 2.5 3 3.1l.9-.8c.3-.3.8-.3 1.1 0l1.8 1.4c.3.3.3.8-.1 1.1l-1 1c-.6.6-1.5.8-2.3.5-2.7-1-4.8-3.1-5.8-5.8-.3-.8-.1-1.7.5-2.3Z"
          fill="#0a64ff"
        />
      ) : (
        <path
          d="M6.5 8.2c0-.5.4-.9.9-.9h9.2c.5 0 .9.4.9.9v7.6c0 .5-.4.9-.9.9H7.4a.9.9 0 0 1-.9-.9Zm1.3.6v.3l4.2 2.9 4.2-2.9v-.3Zm0 1.8v4.8h8.4v-4.8L12 13.4Z"
          fill="#0a64ff"
        />
      )}
    </svg>
  );
}

// Список контактов с копированием. Нужен и в шапке, и в подвале.
export function ContactList({ variant }: { variant: 'menu' | 'footer' }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (contact: Contact) => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(contact.copy);
      ok = true;
    } catch {
      // Clipboard API бывает недоступен (старый браузер, страница не по https) —
      // тогда копируем по-старому, через скрытое поле.
      const field = document.createElement('textarea');
      field.value = contact.copy;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      ok = document.execCommand('copy');
      field.remove();
    }
    if (!ok) return;

    setCopied(contact.id);
    window.setTimeout(() => setCopied((current) => (current === contact.id ? null : current)), 1600);
  };

  return (
    <ul className={`contact-list contact-list--${variant}`}>
      {CONTACTS.map((c) => (
        <li className="contact-list__item" key={c.id}>
          <Icon name={c.icon} />
          <span className="contact-list__text">
            <span className="contact-list__label">{c.label}</span>
            {c.href ? (
              <a
                className="contact-list__value"
                href={c.href}
                {...(c.external ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
              >
                {c.value}
              </a>
            ) : (
              <span className="contact-list__value">{c.value}</span>
            )}
          </span>
          <button
            aria-label={`Скопировать: ${c.value}`}
            className={`contact-list__copy${copied === c.id ? ' is-copied' : ''}`}
            onClick={() => copy(c)}
            type="button"
          >
            {copied === c.id ? 'Скопировано' : 'Копировать'}
          </button>
        </li>
      ))}
    </ul>
  );
}

// Пункт «Контакты» в шапке: по клику под ним раскрывается карточка.
export function ContactsMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="contacts-menu" ref={rootRef}>
      <button
        aria-controls="contacts-popover"
        aria-expanded={open}
        className="contacts-menu__toggle"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        Контакты
      </button>

      {open && (
        <div
          className="contacts-menu__popover"
          id="contacts-popover"
          onClick={(event) => {
            // Переход по ссылке внутри (написать, позвонить, заявка) закрывает карточку.
            if ((event.target as Element).closest('a')) setOpen(false);
          }}
        >
          <p className="contacts-menu__title">Связаться с нами</p>
          <ContactList variant="menu" />
          <a className="contacts-menu__lead" href="#zayavka">
            или оставьте заявку — свяжемся сами
          </a>
        </div>
      )}
    </div>
  );
}
