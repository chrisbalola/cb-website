'use client';

import { motion } from 'framer-motion';
import { Code, Lightbulb, Rocket, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '../../../components/section-header';
import { staggerContainerVariants, fadeUpVariants } from '@/shared/presentation/components/ui/motion';

const DIFFERENTIATOR_ICONS = [Code, Lightbulb, Rocket, Users] as const;

export function DifferentiatorsSection() {
  const t = useTranslations('landing.differentiators');

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid gap-6 sm:grid-cols-2"
        >
          {DIFFERENTIATOR_ICONS.map((Icon, i) => (
            <motion.div key={i} variants={fadeUpVariants} className="rounded-xl border bg-card p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent/10">
                <Icon className="size-6 text-accent" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{t(`items.${i}.title`)}</h3>
              <p className="mt-2 text-muted-foreground">{t(`items.${i}.description`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
