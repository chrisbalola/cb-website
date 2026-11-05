'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/presentation/components/ui/button';
import { staggerContainerVariants, fadeUpVariants } from '@/shared/presentation/components/ui/motion';

export function HeroSection() {
  const t = useTranslations('landing.hero');

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      {/* Radial gradient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:gap-16">
          {/* Text content */}
          <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible" className="max-w-2xl mx-auto text-center">
            <motion.span variants={fadeUpVariants} className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              {t('badge')}
            </motion.span>

            <motion.h1 variants={fadeUpVariants} className="mt-6 text-5xl font-extrabold tracking-tight md:text-7xl">
              {t('title')}
            </motion.h1>

            <motion.p variants={fadeUpVariants} className="mt-6 text-lg text-muted-foreground md:text-xl">
              {t('subtitle')}
            </motion.p>

            <motion.div variants={fadeUpVariants} className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" variant="outline" asChild>
                <a href="#projects">
                  {t('learnMore')}
                  <ArrowRight className="ml-1 size-4" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
