import { useTranslations } from 'next-intl';
import { cn } from '@/shared/presentation/utils/shadcn';
import { containerClassName, eyebrowClassName, sectionTitleClassName } from '../class-names';

const PRINCIPLES = ['useful', 'honest', 'everyone'] as const;

export function PrinciplesSection() {
  const t = useTranslations('home.principles');

  return (
    <section id="principles" className="scroll-mt-4">
      <div className={containerClassName}>
        <div className="navy-glow relative overflow-hidden rounded-[28px] bg-navy p-[clamp(3rem,6vw,5rem)] text-on-navy min-[860px]:rounded-[40px]">
          <p className={cn(eyebrowClassName, 'text-gold-soft')}>{t('eyebrow')}</p>
          <h2 className={cn(sectionTitleClassName, 'mt-4 max-w-[16ch]')}>{t('title')}</h2>
          <ol className="mt-14 grid gap-10 min-[640px]:grid-cols-3">
            {PRINCIPLES.map((key, index) => (
              <li key={key} className="border-t border-navy-line pt-6">
                <span className="font-display text-[0.9375rem] font-medium text-accent">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em]">{t(`items.${key}.title`)}</h3>
                <p className="mt-2 text-on-navy-soft">{t(`items.${key}.body`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
