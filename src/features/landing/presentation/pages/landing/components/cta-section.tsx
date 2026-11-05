'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/presentation/components/ui/button';
import { FadeUp } from '@/shared/presentation/components/ui/motion';
import { clientConfig } from '@/core/config/client-config';

export function CtaSection() {
  const t = useTranslations('landing.cta');

  return (
    <section className="relative overflow-hidden bg-primary py-24 dark:bg-card">
      {/* Amber radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <FadeUp>
          <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground md:text-4xl dark:text-foreground">{t('title')}</h2>
          <p className="mt-4 text-lg text-primary-foreground/70 dark:text-muted-foreground">{t('subtitle')}</p>
          <div className="mt-8 flex justify-center gap-4">
            {clientConfig.social.x && (
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href={clientConfig.social.x}>
                  {t('button')}
                  <ArrowRight className="ml-1 size-4" />
                </a>
              </Button>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
