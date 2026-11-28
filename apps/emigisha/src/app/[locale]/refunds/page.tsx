import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/core/utils/page-metadata';
import { RefundsPage } from '@/features/legal/presentation/pages/refunds/refunds-page';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal.refunds');
  const site = await getTranslations('shared.pages.home');

  return pageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/refunds',
    siteName: site('title'),
  });
}

export default function Page() {
  return <RefundsPage />;
}
