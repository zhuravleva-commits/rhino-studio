// Проверка полей заявки. Общая для формы и сервера: в браузере — чтобы сразу
// подсветить ошибку, на сервере — потому что запрос можно отправить и в обход
// формы.

// ── Телефон ───────────────────────────────────────────────────────────────
//
// Принимаем только российский номер: +7 и ровно десять цифр после. Первая
// цифра после +7 — 3, 4, 8 или 9: так начинаются коды регионов и мобильных
// операторов России (на 6 и 7 — номера Казахстана).

export const PHONE_LENGTH = 10;

/** Десять (или меньше, пока человек печатает) цифр номера после +7. */
export function phoneDigits(value: string): string {
  const digits = value.replace(/\D/g, '');

  // В поле уже стоит «+7» — первая семёрка это код страны, а не номер.
  let rest = value.trimStart().startsWith('+7') ? digits.slice(1) : digits;

  // Вставили номер целиком, с восьмёркой или семёркой впереди — в том числе
  // поверх уже стоящего «+7».
  if (rest.length === PHONE_LENGTH + 1 && /^[78]/.test(rest)) {
    rest = rest.slice(1);
  }

  return rest.slice(0, PHONE_LENGTH);
}

/** +7 (900) 123-45-67 — по мере ввода, сколько цифр есть. */
export function formatPhone(digits: string): string {
  let out = '+7';

  if (digits.length > 0) out += ` (${digits.slice(0, 3)}`;
  if (digits.length >= 3) out += ')';
  if (digits.length > 3) out += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) out += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) out += `-${digits.slice(8, 10)}`;

  return out;
}

export function validatePhone(digits: string): string | null {
  if (digits.length === 0) return 'Введите номер телефона';
  if (!/^[3489]/.test(digits)) return 'Российский номер после +7 начинается с 3, 4, 8 или 9';
  if (digits.length < PHONE_LENGTH) return 'Номер неполный: после +7 нужно 10 цифр';

  return null;
}

// ── Имя ───────────────────────────────────────────────────────────────────

export const NAME_MAX = 50;

/** Всё, что не буква, пробел или дефис. */
export const NAME_FORBIDDEN = /[^a-zа-яё\s-]/i;

const NAME_SHAPE = /^[a-zа-яё]+(?:[ -][a-zа-яё]+)*$/i;

export function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

export function validateName(value: string): string | null {
  const name = normalizeName(value);

  if (!name) return 'Введите имя';
  if (NAME_FORBIDDEN.test(name)) return 'В имени могут быть только буквы, пробел и дефис';
  if (!NAME_SHAPE.test(name)) return 'Дефис и пробел — только между буквами';
  if (name.replace(/[ -]/g, '').length < 2) return 'Имя слишком короткое';
  if (name.length > NAME_MAX) return 'Имя слишком длинное';
  if (isRude(name)) return 'Введите, пожалуйста, настоящее имя';

  return null;
}

// ── Фильтр грубых слов ────────────────────────────────────────────────────
//
// Список не исчерпывающий: цель — отсеять очевидный мат и оскорбления, а не
// построить идеальный цензор. Корни ищем после приведения к кириллице, чтобы
// «xyй», «huy» и «хууууй» ловились так же, как обычное написание.

// Латиница, похожая на кириллицу по виду: «xyй», «cука».
const LOOKALIKE: Record<string, string> = {
  a: 'а', b: 'в', c: 'с', e: 'е', h: 'н', k: 'к', m: 'м', o: 'о', p: 'р', t: 'т', x: 'х', y: 'у',
};

// Транслит: «huy», «pizda», «blyad».
const TRANSLIT: [string, string][] = [
  ['sch', 'щ'], ['sh', 'ш'], ['ch', 'ч'], ['zh', 'ж'], ['kh', 'х'], ['ts', 'ц'],
  ['ya', 'я'], ['yu', 'ю'], ['yo', 'е'], ['a', 'а'], ['b', 'б'], ['v', 'в'], ['g', 'г'],
  ['d', 'д'], ['e', 'е'], ['z', 'з'], ['i', 'и'], ['j', 'й'], ['k', 'к'], ['l', 'л'],
  ['m', 'м'], ['n', 'н'], ['o', 'о'], ['p', 'п'], ['r', 'р'], ['s', 'с'], ['t', 'т'],
  ['u', 'у'], ['f', 'ф'], ['h', 'х'], ['x', 'х'], ['c', 'к'], ['y', 'й'], ['w', 'в'],
];

// Встречаются внутри слова в любом месте.
const ROOTS = [
  'хуй', 'хуе', 'хуя', 'хую', 'хуи', 'пизд', 'пезд', 'ебан', 'ебат', 'ебал', 'ебл', 'ебн',
  'ебош', 'ебук', 'уебо', 'уеби', 'бляд', 'блят', 'мудак', 'мудил', 'мудозв', 'гандон', 'гондон',
  'пидор', 'пидар', 'пидр', 'педик', 'шлюх', 'шалав', 'залуп', 'дроч', 'говн', 'жоп', 'дерьм',
  'сучк', 'сучар', 'ублюд', 'мразь', 'мрази', 'сволоч', 'выродок', 'долбо', 'далбо', 'проститут',
];

// С этого начинается слово: «еб…», «заеб…», «бля…» — внутри слова такие
// буквы бывают и в нормальных именах («Глеб»), поэтому только с начала.
const PREFIXED = /^(?:за|по|на|вы|от|у|раз|рас|до|об|съ|въ|при|про|пере|из|недо)?еб|^бля/;

// Только целым словом: как часть слова это обычные фамилии («Козлов», «Дураков»).
const WORDS = new Set([
  'сука', 'суки', 'суку', 'сучка', 'хер', 'херня', 'манда', 'чмо', 'лох', 'лошара', 'козел',
  'козлина', 'дурак', 'дура', 'урод', 'тварь', 'падла', 'гад', 'гнида', 'быдло', 'даун', 'дебил',
  'идиот', 'кретин', 'тупица', 'дебилка',
]);

const ENGLISH = /fuck|shit|bitch|cunt|pussy|whore|slut|asshole|nigg|faggot/;

const collapse = (v: string) => v.replace(/(.)\1+/g, '$1');

function isRudeWord(word: string): boolean {
  const lower = word.toLowerCase().replace(/ё/g, 'е');
  const lookalike = [...lower].map((ch) => LOOKALIKE[ch] ?? ch).join('');

  let translit = lower;
  for (const [from, to] of TRANSLIT) translit = translit.split(from).join(to);

  // «хууууй» → «хуй»: повторы букв схлопываем, но проверяем и исходник,
  // чтобы не потерять слова с законно двойной буквой.
  const hit = (v: string, withPrefixed: boolean) =>
    [v, collapse(v)].some(
      (x) => WORDS.has(x) || ROOTS.some((root) => x.includes(root)) || (withPrefixed && PREFIXED.test(x)),
    );

  // «еб…» с начала слова по транслиту не проверяем: латинские Ebenezer и
  // Ebony иначе попадут под фильтр, а «ebat», «ebal» ловятся корнями.
  return hit(lower, true) || hit(lookalike, true) || hit(translit, false);
}

export function isRude(value: string): boolean {
  if (ENGLISH.test(value.toLowerCase())) return true;

  return value.split(/[\s-]+/).filter(Boolean).some(isRudeWord);
}
