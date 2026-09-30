'use client';

// Всплывающее окно с формой заявки. Открывается любой ссылкой на #zayavka —
// так кнопки «Обсудить проект» остаются обычными <a> в серверной разметке,
// а без JavaScript просто ведут к форме в блоке вопросов.
//
// Внутри та же форма, что в блоке вопросов: те же проверки имени и телефона
// и та же отправка в Telegram через /api/lead.
//
// Нативный <dialog>: фокус внутри окна, закрытие по Esc и блокировку
// прокрутки под ним браузер берёт на себя.

import { useEffect, useRef, useState } from 'react';

import { LeadForm } from './lead-form';

// Строка, а не экспорт: из клиентского модуля в серверную разметку константы
// не передаются, поэтому в page.tsx адрес «#zayavka» записан так же, буквой.
const LEAD_HASH = '#zayavka';

export function LeadDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Счётчик перемонтирует форму при каждом открытии: после отправленной
  // заявки человек снова видит пустые поля, а не «спасибо».
  const [session, setSession] = useState(0);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.(`a[href="${LEAD_HASH}"]`);
      if (!link) return;

      event.preventDefault();
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) {
        setSession((n) => n + 1);
        dialog.showModal();
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      aria-label="Заявка на проект"
      className="lead-dialog"
      onClick={(event) => {
        // Клик по затемнению вокруг окна закрывает его.
        if (event.target === event.currentTarget) close();
      }}
      ref={dialogRef}
    >
      <button aria-label="Закрыть" className="lead-dialog__close" onClick={close} type="button">
        ×
      </button>
      <LeadForm idPrefix="dialog" key={session} />
    </dialog>
  );
}
