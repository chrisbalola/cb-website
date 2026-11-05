'use client';

import { useTranslations } from 'next-intl';
import { FadeUp } from '@/shared/presentation/components/ui/motion';

export function PricingHeroSection() {
  const t = useTranslations('pricing.hero');

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <FadeUp>
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">{t('badge')}</span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">{t('title')}</h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">{t('subtitle')}</p>
        </FadeUp>
      </div>
    </section>
  );
}
