'use client';

import { motion } from 'framer-motion';
import { Bell, Globe, TrendingUp, Users, Wallet, WifiOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/shared/presentation/components/compositions/section-header';
import { staggerContainerVariants, fadeUpVariants } from '@/shared/presentation/components/ui/motion';

const FEATURE_ICONS = [TrendingUp, Globe, Wallet, Bell, WifiOff, Users] as const;

export function PricingFeaturesSection() {
  const t = useTranslations('pricing.features');

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURE_ICONS.map((Icon, i) => (
            <motion.div key={i} variants={fadeUpVariants} className="rounded-xl border bg-card p-6 transition-colors hover:border-accent/40">
              <div className="flex size-11 items-center justify-center rounded-lg bg-accent/10">
                <Icon className="size-5 text-accent" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{t(`items.${i}.title`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(`items.${i}.description`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
