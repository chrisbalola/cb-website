'use client';

import { ArrowRight, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/presentation/components/ui/button';
import { FadeUp } from '@/shared/presentation/components/ui/motion';

const FEATURE_COUNT = 8;

export function PricingPlanSection() {
  const t = useTranslations('pricing.plan');

  return (
    <section className="pb-24">
      <div className="mx-auto max-w-md px-6 lg:px-8">
        <FadeUp>
          <div className="rounded-2xl border bg-card p-8 shadow-lg">
            {/* Plan header */}
            <div className="text-center">
              <span className="text-sm font-medium text-muted-foreground">{t('title')}</span>
              <h2 className="mt-2 text-2xl font-bold">{t('name')}</h2>
              <div className="mt-4 flex items-baseline justify-center gap-1">
                <span className="text-5xl font-extrabold tracking-tight">{t('price')}</span>
                <span className="text-lg text-muted-foreground">{t('period')}</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{t('description')}</p>
            </div>

            {/* Divider */}
            <div className="my-8 border-t" />

            {/* Feature list */}
            <ul className="space-y-3">
              {Array.from({ length: FEATURE_COUNT }, (_, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span className="text-sm">{t(`features.${i}`)}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-8">
              <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="#">
                  {t('cta')}
                  <ArrowRight className="ml-1 size-4" />
                </a>
              </Button>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
