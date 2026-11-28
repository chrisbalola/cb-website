import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/core/utils/page-metadata';
import { TermsPage } from '@/features/legal/presentation/pages/terms/terms-page';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal.terms');
  const site = await getTranslations('shared.pages.home');

  return pageMetadata({
    title: `${t('title')} · ${site('title')}`,
    description: t('description'),
    path: '/terms',
    siteName: site('title'),
  });
}

export default function Page() {
  return <TermsPage />;
}
