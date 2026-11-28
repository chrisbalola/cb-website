import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/core/utils/page-metadata';
import { PrivacyPage } from '@/features/legal/presentation/pages/privacy/privacy-page';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal.privacy');
  const site = await getTranslations('shared.pages.home');

  return pageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/privacy',
    siteName: site('title'),
  });
}

export default function Page() {
  return <PrivacyPage />;
}
