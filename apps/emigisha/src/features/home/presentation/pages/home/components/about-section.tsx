import { useTranslations } from 'next-intl';
import { clientConfig } from '@/core/config/client-config';
import { cn } from '@/shared/presentation/utils/shadcn';
import { containerClassName, eyebrowClassName, focusRingClassName, sectionTitleClassName } from '../class-names';

const SOCIAL = ['github', 'linkedin', 'x'] as const;

const linkClassName = cn('underline decoration-accent decoration-2 underline-offset-4 hover:decoration-[3px]', focusRingClassName);

export function AboutSection() {
  const t = useTranslations('home.about');
  const { links } = clientConfig;

  return (
    <section id="about" className="scroll-mt-4 py-[clamp(4rem,8vw,6.5rem)]">
      <div className={cn(containerClassName, 'grid items-start gap-[clamp(2rem,6vw,6rem)] min-[860px]:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]')}>
        <div>
          <p className={cn(eyebrowClassName, 'text-muted-foreground')}>{t('eyebrow')}</p>
          <h2 className={cn(sectionTitleClassName, 'mt-4')}>{t('title')}</h2>
        </div>
        <div className="text-[1.1875rem] text-muted-foreground">
          <p>
            {t.rich('everyone', {
              strong: (chunks) => <strong className="font-medium text-foreground">{chunks}</strong>,
            })}
          </p>
          <p className="mt-5">{t('name')}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4 border-t pt-8 text-base">
            <span aria-hidden className="grid size-14 place-items-center rounded-full bg-accent font-display text-lg font-semibold text-navy">
              {t('founder.initials')}
            </span>
            <div>
              <a href={links.founder} target="_blank" rel="noopener noreferrer" className={cn('block font-semibold text-foreground', linkClassName)}>
                {t('founder.name')}
              </a>
              <span className="text-[0.9375rem]">{t('founder.role')}</span>
            </div>
            <nav className="flex w-full gap-4 text-[0.9375rem] text-foreground min-[860px]:ml-auto min-[860px]:w-auto">
              {SOCIAL.map((network) => (
                <a key={network} href={links[network]} target="_blank" rel="noopener noreferrer" className={linkClassName}>
                  {t(`social.${network}`)}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
