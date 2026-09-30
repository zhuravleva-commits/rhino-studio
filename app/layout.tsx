import type { Metadata } from 'next';
import { Alumni_Sans, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';

// Шрифты сайта: Alumni Sans — заголовки (прописными), Inter — весь
// остальной текст. Обоим нужна кириллица: сайт почти целиком на русском.
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
});

const alumniSans = Alumni_Sans({
  variable: '--font-alumni',
  subsets: ['latin', 'cyrillic'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rhino Studio — разработка сайтов, приложений и цифровых продуктов',
  description:
    'Студия дизайна и разработки: сайты, приложения, AI-инструменты и цифровые продукты для бизнеса.',
  openGraph: {
    title: 'Rhino Studio',
    description:
      'Проектируем и разрабатываем сайты, приложения и цифровые продукты с ясной структурой и сильной подачей.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${alumniSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
