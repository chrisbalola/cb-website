import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { clientConfig } from '@/core/config/client-config';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('shared.pages.home');
  const title = t('title');
  const description = t('description');

  return {
    metadataBase: new URL(clientConfig.siteUrl),
    title,
    description,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      url: '/',
      siteName: title,
      title,
      description,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og.png'],
    },
  };
}

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
