'use client';

import { useState } from 'react';
import { Banknote, Check, Package, Wrench } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/presentation/components/ui/tabs';
import { SectionHeader } from '../../../components/section-header';
import { ModuleVisual } from './module-visual';
import { FadeUp } from '@/shared/presentation/components/ui/motion';

const MODULES = [
  { key: 'finance', icon: Banknote },
  { key: 'products', icon: Package },
  { key: 'services', icon: Wrench },
] as const;

const FEATURE_INDICES = [0, 1, 2, 3] as const;

export function ModulesSection() {
  const t = useTranslations('landing.modules');
  const [activeTab, setActiveTab] = useState('finance');

  return (
    <section className="bg-secondary/50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader label={t('label')} title={t('title')} subtitle={t('subtitle')} />

        <FadeUp className="mt-16">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mx-auto flex w-fit">
              {MODULES.map(({ key, icon: Icon }) => (
                <TabsTrigger key={key} value={key} className="gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  <Icon className="size-4" />
                  {t(`${key}.title`)}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
              {/* Text content */}
              <div>
                {MODULES.map(({ key }) => (
                  <TabsContent key={key} value={key} className="mt-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold">{t(`${key}.title`)}</h3>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          key === 'finance' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {t(`${key}.badge`)}
                      </span>
                    </div>
                    <p className="mt-3 text-muted-foreground">{t(`${key}.description`)}</p>
                    <ul className="mt-5 space-y-3">
                      {FEATURE_INDICES.map((i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                          <span className="text-sm">{t(`${key}.features.${i}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                ))}
              </div>

              {/* Visual */}
              <div className="hidden lg:block">
                <ModuleVisual activeTab={activeTab} />
              </div>
            </div>
          </Tabs>
        </FadeUp>
      </div>
    </section>
  );
}
