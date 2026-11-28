import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BrandSymbol } from '@/shared/presentation/components/misc/brand-symbol';
import { ThemeToggleButton } from '@/shared/presentation/components/misc/theme-toggle-button';
import { containerClassName, focusRingClassName, goldButtonClassName } from '@/shared/presentation/utils/class-names';
import { cn } from '@/shared/presentation/utils/shadcn';

const navLinkClassName = cn('transition-colors hover:text-on-navy', focusRingClassName);

/** Section links that only fit next to the products link on wide screens */
const wideNavLinkClassName = cn(navLinkClassName, 'max-[860px]:hidden');

/** Wordmark and navigation, set on a navy background. Section links point at the home page. */
export function SiteHeader({ className }: { className?: string }) {
  const t = useTranslations('shared.layout.nav');

  return (
    <header className={cn('text-on-navy', className)}>
      <div className={cn(containerClassName, 'flex h-21 items-center justify-between')}>
        <Link href="/" className={cn('flex items-center gap-[0.6rem] font-display text-2xl font-semibold tracking-[-0.03em]', focusRingClassName)}>
          <BrandSymbol cropped className="size-[34px]" />
          <span className="max-[420px]:sr-only">{t('wordmark')}</span>
        </Link>
        <nav className="flex items-center gap-4 text-[0.9375rem] text-on-navy-soft min-[860px]:gap-8">
          <Link href="/#products" className={navLinkClassName}>
            {t('products')}
          </Link>
          <Link href="/#principles" className={wideNavLinkClassName}>
            {t('principles')}
          </Link>
          <Link href="/#about" className={wideNavLinkClassName}>
            {t('about')}
          </Link>
          <ThemeToggleButton />
          <a href="#contact" className={cn(goldButtonClassName, focusRingClassName)}>
            {t('sayHello')}
          </a>
        </nav>
      </div>
    </header>
  );
}
