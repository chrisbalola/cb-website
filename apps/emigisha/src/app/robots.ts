import type { MetadataRoute } from 'next';
import { clientConfig } from '@/core/config/client-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${clientConfig.siteUrl}/sitemap.xml`,
  };
}
