import { useTranslations } from 'next-intl';
import { clientConfig } from '@/core/config/client-config';
import { ThemeToggleButton } from '@/shared/presentation/components/misc/theme-toggle-button';
import { shippedCount } from '../products';
import { MarkTrack } from './mark-track';

const navLinkClassName =
  'hover:underline focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent';

export function HomeHero() {
  const t = useTranslations('home.hero');

  return (
    <div className="flex min-h-[60svh] flex-col bg-leaf px-[clamp(1.25rem,4vw,3.5rem)] pt-8 pb-7 text-on-leaf min-[52rem]:min-h-[68svh]">
      <header className="flex items-center justify-between gap-4">
        <p className="font-display text-2xl leading-none font-bold tracking-[-0.01em]">{t('wordmark')}</p>
        <nav className="flex items-center gap-6 font-medium">
          <a href="#products" className={navLinkClassName}>
            {t('nav.products')}
          </a>
          <a href={`mailto:${clientConfig.links.email}`} className={navLinkClassName}>
            {t('nav.contact')}
          </a>
          <ThemeToggleButton />
        </nav>
      </header>

      <h1 className="mt-auto mb-[clamp(2rem,5vh,3.5rem)] max-w-[11ch] pt-12 font-display text-[clamp(2.75rem,8.4vw,7.5rem)] leading-[0.98] font-bold tracking-[-0.035em]">
        {t('headline')}
      </h1>

      <div className="grid items-center gap-3 border-t border-leaf-mark pt-5 min-[52rem]:grid-cols-[minmax(0,1fr)_auto] min-[52rem]:gap-8">
        <MarkTrack shipped={shippedCount} label={t('marksAlt', { count: shippedCount })} />
        <p className="max-w-[17rem] text-[0.9375rem] opacity-80">{t('tally', { count: shippedCount })}</p>
      </div>
    </div>
  );
}
