import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { clientConfig } from '@/core/config/client-config';
import { routing } from '@/core/i18n/routing';

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
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Paths with a dot skip the i18n middleware and land here with the path as the locale, e.g. /sitemap.xml
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
