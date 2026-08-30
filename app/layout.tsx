import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Arina Studio — разработка сайтов, приложений и ИИ-агентов',
  description:
    'Студия разработки цифровых продуктов: сайты, приложения, ИИ-агенты, боты и внутренние системы для бизнеса.',
  openGraph: {
    title: 'Arina Studio',
    description:
      'Сильная разработка сайтов, приложений, ИИ-агентов и ботов с характером Rhino.',
    images: ['/rhino-hero.png'],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
