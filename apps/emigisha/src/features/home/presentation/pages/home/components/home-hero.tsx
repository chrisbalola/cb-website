import { useTranslations } from 'next-intl';
import { SiteHeader } from '@/shared/presentation/components/layout/site-header';
import { BrandSymbol } from '@/shared/presentation/components/misc/brand-symbol';
import { eyebrowClassName, focusRingClassName, goldButtonClassName } from '@/shared/presentation/utils/class-names';
import { cn } from '@/shared/presentation/utils/shadcn';

export function HomeHero() {
  const t = useTranslations('home');

  return (
    <section className="hero-sky relative isolate flex min-h-[760px] flex-col items-center overflow-hidden px-[clamp(1.25rem,4vw,3rem)] pt-[130px] text-center text-on-navy min-[860px]:min-h-[860px] min-[860px]:pt-[150px]">
      <SiteHeader className="absolute inset-x-0 top-0 z-10" />

      <div aria-hidden className="hero-glow absolute top-[120px] left-[calc(50%-450px)] -z-10 size-[900px]" />
      <div
        aria-hidden
        className="hero-horizon absolute bottom-[-560px] left-[calc(50%-450px)] -z-10 h-[700px] w-[900px] rounded-full min-[860px]:bottom-[-760px] min-[860px]:left-[calc(50%-700px)] min-[860px]:h-[1000px] min-[860px]:w-[1400px]"
      />

      <BrandSymbol label={t('hero.symbolAlt')} className="size-32 min-[860px]:size-42" sunClassName="animate-settle" bowlClassName="animate-rise" />
      <p className={cn(eyebrowClassName, 'mt-9 animate-fade text-gold-soft [animation-delay:0.5s]')}>{t('hero.eyebrow')}</p>
      <h1 className="mt-5 max-w-[12ch] animate-fade font-display text-[clamp(2.9rem,7.2vw,6.25rem)] leading-none font-semibold tracking-[-0.045em] [animation-delay:0.65s]">
        {t.rich('hero.headline', {
          em: (chunks) => <em className="text-accent not-italic">{chunks}</em>,
        })}
      </h1>
      <p className="mt-6 max-w-[36rem] animate-fade text-[1.1875rem] text-on-navy-soft [animation-delay:0.8s]">{t('hero.lede')}</p>
      <div className="mt-9 flex animate-fade flex-wrap justify-center gap-3 [animation-delay:0.95s]">
        <a href="#products" className={cn(goldButtonClassName, focusRingClassName)}>
          {t('hero.seeProducts')}
        </a>
        <a
          href="#about"
          className={cn(
            'inline-flex items-center rounded-full border border-navy-line px-[1.1rem] py-[0.6rem] font-medium transition-colors hover:bg-white/5',
            focusRingClassName
          )}
        >
          {t('hero.ourStory')}
        </a>
      </div>
    </section>
  );
}
