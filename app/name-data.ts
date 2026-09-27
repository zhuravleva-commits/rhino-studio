// Буквы имени, нарезанные из 4K-арта: каждая со своей прозрачностью,
// поэтому их можно двигать порознь, не закрывая соседей фоном.
export const NAME_ROWS = [
  {
    key: 'l1',
    width: 31.745,   // доля ширины арта
    letters: [
    { i: 0, src: '/letters/l1-0.png', left: 0.0, width: 20.016, w: 244, h: 316 },
    { i: 1, src: '/letters/l1-1.png', left: 19.36, width: 20.263, w: 247, h: 316 },
    { i: 2, src: '/letters/l1-2.png', left: 40.279, width: 9.926, w: 121, h: 316 },
    { i: 3, src: '/letters/l1-3.png', left: 52.912, width: 22.313, w: 272, h: 316 },
    { i: 4, src: '/letters/l1-4.png', left: 74.897, width: 25.103, w: 306, h: 316 },
    ],
  },
  {
    key: 'l2',
    width: 36.094,   // доля ширины арта
    letters: [
    { i: 5, src: '/letters/l2-0.png', left: 0.0, width: 18.11, w: 251, h: 316 },
    { i: 6, src: '/letters/l2-1.png', left: 16.667, width: 18.182, w: 252, h: 316 },
    { i: 7, src: '/letters/l2-2.png', left: 34.199, width: 18.615, w: 258, h: 316 },
    { i: 8, src: '/letters/l2-3.png', left: 52.958, width: 19.264, w: 267, h: 316 },
    { i: 9, src: '/letters/l2-4.png', left: 72.006, width: 6.133, w: 85, h: 316 },
    { i: 10, src: '/letters/l2-5.png', left: 77.922, width: 22.078, w: 306, h: 316 },
    ],
  },
] as const;

export const TOTAL_LETTERS = 11;
