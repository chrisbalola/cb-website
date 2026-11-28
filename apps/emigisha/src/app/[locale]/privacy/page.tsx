import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PrivacyPage } from '@/features/legal/presentation/pages/privacy/privacy-page';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal.privacy');
  const site = await getTranslations('shared.pages.home');

  return {
    title: `${t('title')} · ${site('title')}`,
    description: t('description'),
    alternates: { canonical: '/privacy' },
  };
}

export default function Page() {
  return <PrivacyPage />;
}
