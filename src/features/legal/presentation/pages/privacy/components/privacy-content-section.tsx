'use client';

import { useTranslations } from 'next-intl';
import { FadeUp } from '@/shared/presentation/components/ui/motion';

const SECTION_CONFIG = [
  { paragraphs: 1, items: 4 },
  { paragraphs: 1, items: 5 },
  { paragraphs: 1, items: 4 },
  { paragraphs: 1, items: 3 },
  { paragraphs: 1, items: 4 },
  { paragraphs: 1, items: 3 },
  { paragraphs: 1, items: 6 },
  { paragraphs: 2 },
  { paragraphs: 2 },
  { paragraphs: 2 },
  { paragraphs: 2 },
  { paragraphs: 2 },
] as const;

export function PrivacyContentSection() {
  const t = useTranslations('legal.privacy.sections');

  return (
    <section className="pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="space-y-12">
          {SECTION_CONFIG.map((config, index) => (
            <FadeUp key={index}>
              <h2 className="text-2xl font-bold tracking-tight">{t(`${index}.title`)}</h2>

              {Array.from({ length: config.paragraphs }, (_, pIdx) => (
                <p key={pIdx} className="mt-4 text-muted-foreground leading-relaxed">
                  {t(`${index}.paragraphs.${pIdx}`)}
                </p>
              ))}

              {'items' in config && (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                  {Array.from({ length: config.items }, (_, iIdx) => (
                    <li key={iIdx} className="leading-relaxed">
                      {t(`${index}.items.${iIdx}`)}
                    </li>
                  ))}
                </ul>
              )}
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
