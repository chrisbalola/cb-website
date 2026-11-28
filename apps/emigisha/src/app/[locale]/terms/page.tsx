import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { TermsPage } from '@/features/legal/presentation/pages/terms/terms-page';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal.terms');
  const site = await getTranslations('shared.pages.home');

  return {
    title: `${t('title')} · ${site('title')}`,
    description: t('description'),
    alternates: { canonical: '/terms' },
  };
}

export default function Page() {
  return <TermsPage />;
}
