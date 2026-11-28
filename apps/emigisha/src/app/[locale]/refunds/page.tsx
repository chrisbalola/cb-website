import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { RefundsPage } from '@/features/legal/presentation/pages/refunds/refunds-page';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal.refunds');
  const site = await getTranslations('shared.pages.home');

  return {
    title: `${t('title')} · ${site('title')}`,
    description: t('description'),
    alternates: { canonical: '/refunds' },
  };
}

export default function Page() {
  return <RefundsPage />;
}
