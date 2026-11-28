import { useTranslations } from 'next-intl';
import { BrandSymbol } from '@/shared/presentation/components/misc/brand-symbol';
import { ThemeToggleButton } from '@/shared/presentation/components/misc/theme-toggle-button';
import { cn } from '@/shared/presentation/utils/shadcn';
import { containerClassName, eyebrowClassName, focusRingClassName } from '../class-names';

const goldButtonClassName =
  'inline-flex items-center rounded-full bg-accent px-[1.1rem] py-[0.6rem] font-semibold text-navy transition-transform hover:-translate-y-px';

const navLinkClassName = cn('transition-colors hover:text-on-navy max-[860px]:hidden', focusRingClassName);

export function HomeHero() {
  const t = useTranslations('home');

  return (
    <section className="hero-sky relative isolate flex min-h-[760px] flex-col items-center overflow-hidden px-[clamp(1.25rem,4vw,3rem)] pt-[130px] text-center text-on-navy min-[860px]:min-h-[860px] min-[860px]:pt-[150px]">
      <header className="absolute inset-x-0 top-0 z-10">
        <div className={cn(containerClassName, 'flex h-21 items-center justify-between')}>
          <a href="#" className={cn('flex items-center gap-[0.6rem] font-display text-2xl font-semibold tracking-[-0.03em]', focusRingClassName)}>
            <BrandSymbol cropped className="size-[34px]" />
            {t('nav.wordmark')}
          </a>
          <nav className="flex items-center gap-8 text-[0.9375rem] text-on-navy-soft">
            <a href="#products" className={navLinkClassName}>
              {t('nav.products')}
            </a>
            <a href="#principles" className={navLinkClassName}>
              {t('nav.principles')}
            </a>
            <a href="#about" className={navLinkClassName}>
              {t('nav.about')}
            </a>
            <ThemeToggleButton />
            <a href="#contact" className={cn(goldButtonClassName, focusRingClassName)}>
              {t('nav.sayHello')}
            </a>
          </nav>
        </div>
      </header>

      <div aria-hidden className="hero-glow absolute top-[120px] left-[calc(50%-450px)] -z-10 size-[900px]" />
      <div aria-hidden className="hero-horizon absolute bottom-[-760px] left-[calc(50%-700px)] -z-10 h-[1000px] w-[1400px] rounded-full" />

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
