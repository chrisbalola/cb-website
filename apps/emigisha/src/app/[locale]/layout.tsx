import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { clientConfig } from '@/core/config/client-config';
import { routing } from '@/core/i18n/routing';
import { pageMetadata } from '@/core/utils/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('shared.pages.home');
  return {
    metadataBase: new URL(clientConfig.siteUrl),
    ...pageMetadata({ fullTitle: t('documentTitle'), description: t('description'), path: '/', siteName: t('title') }),
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
