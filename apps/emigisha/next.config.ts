import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = createNextIntlPlugin('./src/core/i18n/request.ts')({});

export default nextConfig;
