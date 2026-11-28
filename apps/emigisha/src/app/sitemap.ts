import type { MetadataRoute } from 'next';
import { clientConfig } from '@/core/config/client-config';
import { legalUpdatedAt } from '@/features/legal/legal-updated-at';

const LEGAL_PAGES = ['/terms', '/privacy', '/refunds'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = clientConfig;

  return [
    { url: siteUrl, changeFrequency: 'monthly', priority: 1 },
    ...LEGAL_PAGES.map((path) => ({ url: `${siteUrl}${path}`, lastModified: legalUpdatedAt, changeFrequency: 'yearly' as const, priority: 0.3 })),
  ];
}
