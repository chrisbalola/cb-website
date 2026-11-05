'use client';

import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FadeUp } from '@/shared/presentation/components/ui/motion';

export function TermsContactSection() {
  const t = useTranslations('legal.terms.contact');

  return (
    <section className="relative overflow-hidden bg-primary py-24 dark:bg-card">
      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <FadeUp>
          <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground md:text-4xl dark:text-foreground">{t('title')}</h2>
          <p className="mt-4 text-lg text-primary-foreground/70 dark:text-muted-foreground">{t('subtitle')}</p>
          <div className="mt-8">
            <a
              href={`mailto:${t('email')}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <Mail className="size-4" />
              {t('email')}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
