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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
