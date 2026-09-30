'use client';

// Форма заявки. Стоит в правой половине блока вопросов: имя, удобный
// мессенджер, телефон и — по желанию — пара слов о задаче.
//
// Заявка уходит на /api/lead, а оттуда в Telegram. Напрямую отсюда стучаться
// в Telegram нельзя: токен бота оказался бы в коде страницы.
//
// Имя и телефон проверяются здесь же (правила общие с сервером, см.
// lead-validation.ts). Неверное поле краснеет, вздрагивает и подписывается,
// что не так: человек должен сразу понять, где ошибся.

import { useRef, useState, type RefObject } from 'react';

import {
  NAME_FORBIDDEN,
  NAME_MAX,
  PHONE_LENGTH,
  formatPhone,
  phoneDigits,
  validateName,
  validatePhone,
} from './lead-validation';
import { CHANNELS, MessengerIcon, type ChannelId } from './messengers';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Errors = { name?: string; phone?: string };

// Перезапускает анимацию «тряски»: снимаем класс, заставляем браузер
// пересчитать стили и вешаем снова — иначе повторная ошибка не дёрнется.
function shake(ref: RefObject<HTMLInputElement | null>) {
  const el = ref.current;
  if (!el) return;

  el.classList.remove('lead-field--shake');
  void el.offsetWidth;
  el.classList.add('lead-field--shake');
}

export function LeadForm() {
  const [name, setName] = useState('');
  const [channel, setChannel] = useState<ChannelId>('telegram');
  const [phone, setPhone] = useState('');
  const [task, setTask] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const sending = status === 'sending';
  const digits = phoneDigits(phone);

  const fail = (next: Errors) => {
    setErrors((prev) => ({ ...prev, ...next }));
    if (next.name) shake(nameRef);
    if (next.phone) shake(phoneRef);
  };

  // Цифры и знаки, запрещённые в имени, в поле не пускаем — и сразу
  // показываем, почему буква «не напечаталась».
  const onNameChange = (value: string) => {
    if (NAME_FORBIDDEN.test(value)) {
      fail({ name: 'В имени могут быть только буквы, пробел и дефис' });

      return;
    }

    setName(value.slice(0, NAME_MAX));
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
  };

  // В поле телефона всегда маска +7 (900) 123-45-67: буквы и лишние цифры
  // не проходят, а попытка их ввести подсвечивает поле.
  const onPhoneChange = (value: string) => {
    if (/[^\d\s()+-]/.test(value)) {
      fail({ phone: 'В номере могут быть только цифры' });

      return;
    }

    // Номер уже полный, а человек печатает дальше.
    if (digits.length === PHONE_LENGTH && value.length > phone.length) {
      fail({ phone: 'После +7 — ровно 10 цифр' });

      return;
    }

    let next = phoneDigits(value);

    // Стёрли скобку или дефис — цифры те же, и маска вернула бы знак на
    // место. Считаем, что человек хотел стереть последнюю цифру.
    if (next === digits && value.length < phone.length) {
      next = next.slice(0, -1);
    }

    if (next.length === 1 && !/[3489]/.test(next)) {
      fail({ phone: 'Российский номер после +7 начинается с 3, 4, 8 или 9' });

      return;
    }

    setPhone(formatPhone(next));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const send = async () => {
    const found: Errors = {
      name: validateName(name) ?? undefined,
      phone: validatePhone(digits) ?? undefined,
    };

    if (found.name || found.phone) {
      fail(found);

      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, channel, phone, task }),
      });

      if (!response.ok) {
        // Сервер проверяет те же поля; если он нашёл ошибку, покажем её у поля.
        const body = (await response.json().catch(() => null)) as { errors?: Errors } | null;

        if (body?.errors) {
          setStatus('idle');
          fail(body.errors);
        } else {
          setStatus('error');
        }

        return;
      }

      setStatus('sent');
      setName('');
      setPhone('');
      setTask('');
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  // Отправленную заявку не показываем формой заново: человек уже всё сделал,
  // и пустые поля рядом со «спасибо» только путают.
  if (status === 'sent') {
    return (
      <div className="lead-card lead-card--done">
        <p className="lead-card__title">Спасибо, получили</p>
        <p className="lead-card__sub">Напишем в выбранный мессенджер в течение рабочего дня.</p>

        <button className="lead-again" onClick={() => setStatus('idle')} type="button">
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form
      className="lead-card"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        void send();
      }}
    >
      <p className="lead-card__title">Обсудим ваш проект</p>
      <p className="lead-card__sub">Оставьте номер — напишем туда, где вам удобно.</p>

      <label className="lead-row">
        <span className="lead-label">Имя</span>
        <input
          aria-describedby={errors.name ? 'lead-name-error' : undefined}
          aria-invalid={Boolean(errors.name)}
          autoComplete="given-name"
          className={`lead-field${errors.name ? ' lead-field--error' : ''}`}
          disabled={sending}
          name="name"
          onAnimationEnd={(e) => e.currentTarget.classList.remove('lead-field--shake')}
          onBlur={() => name && fail({ name: validateName(name) ?? undefined })}
          onChange={(e) => onNameChange(e.target.value)}
          ref={nameRef}
          type="text"
          value={name}
        />
        {errors.name && (
          <span className="lead-error" id="lead-name-error" role="alert">
            {errors.name}
          </span>
        )}
      </label>

      <div className="lead-row">
        <span className="lead-label" id="lead-channel-label">
          Где удобнее общаться
        </span>
        <div aria-labelledby="lead-channel-label" className="lead-channels" role="radiogroup">
          {CHANNELS.map((c) => (
            <button
              aria-checked={channel === c.id}
              className={`lead-channel${channel === c.id ? ' lead-channel--on' : ''}`}
              disabled={sending}
              key={c.id}
              onClick={() => setChannel(c.id)}
              role="radio"
              type="button"
            >
              <MessengerIcon id={c.id} />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <label className="lead-row">
        <span className="lead-label">Телефон</span>
        <input
          aria-describedby={errors.phone ? 'lead-phone-error' : undefined}
          aria-invalid={Boolean(errors.phone)}
          autoComplete="tel"
          className={`lead-field${errors.phone ? ' lead-field--error' : ''}`}
          disabled={sending}
          inputMode="tel"
          name="phone"
          onAnimationEnd={(e) => e.currentTarget.classList.remove('lead-field--shake')}
          onBlur={() => {
            // Пустая маска «+7» — это не номер, убираем, чтобы вернулась подсказка.
            if (!digits) setPhone('');
            else fail({ phone: validatePhone(digits) ?? undefined });
          }}
          onChange={(e) => onPhoneChange(e.target.value)}
          onFocus={() => !phone && setPhone('+7 ')}
          placeholder="+7 (900) 000-00-00"
          ref={phoneRef}
          type="tel"
          value={phone}
        />
        {errors.phone && (
          <span className="lead-error" id="lead-phone-error" role="alert">
            {errors.phone}
          </span>
        )}
      </label>

      <label className="lead-row lead-row--grow">
        <span className="lead-label">
          О задаче <em>необязательно</em>
        </span>
        <textarea
          className="lead-field lead-field--area"
          disabled={sending}
          maxLength={2000}
          name="task"
          onChange={(e) => setTask(e.target.value)}
          placeholder="Пара слов: что нужно, сроки, ссылки"
          rows={2}
          value={task}
        />
      </label>

      <button className="lead-button" disabled={sending} type="submit">
        {sending ? 'Отправляем…' : 'Оставить заявку'}
      </button>

      <p className={`lead-note${status === 'error' ? ' lead-note--error' : ''}`}>
        {status === 'error'
          ? 'Не отправилось. Попробуйте ещё раз или напишите на hello@rhino.studio'
          : 'Нажимая кнопку, вы соглашаетесь на обработку персональных данных.'}
      </p>
    </form>
  );
}
