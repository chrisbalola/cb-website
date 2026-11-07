import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = createNextIntlPlugin('./src/core/i18n/request.ts')({
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.chrisbalola.com' }],
        destination: 'https://chrisbalola.com/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
});

export default nextConfig;
