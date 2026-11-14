import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = createNextIntlPlugin('./src/core/i18n/request.ts')({
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.emigisha.com' }],
        destination: 'https://emigisha.com/:path*',
        permanent: true,
      },
    ];
  },
});

export default nextConfig;
