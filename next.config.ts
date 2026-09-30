import type { NextConfig } from 'next';

// Заголовки безопасности выставляются в middleware.ts: страницы из кеша
// vinext отдаёт без заголовков отсюда.
const nextConfig: NextConfig = {
  poweredByHeader: false,
};

export default nextConfig;
