'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/core/i18n/navigation';
import { Icon } from '@/shared/presentation/components/ui/icon';
import { clientConfig } from '@/core/config/client-config';

const SOCIAL_LINKS = [
  { name: 'GitHub', icon: '/icons/social/github.svg', href: clientConfig.social.github },
  { name: 'X', icon: '/icons/social/x.svg', href: clientConfig.social.x },
  { name: 'LinkedIn', icon: '/icons/social/linkedin.svg', href: clientConfig.social.linkedin },
].filter(({ href }) => href) as { name: string; icon: string; href: string }[];

export function MarketingFooter() {
  const t = useTranslations('shared.marketing.footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-lg font-bold text-accent">Chris Balola</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">{t('tagline')}</p>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="text-sm font-semibold">{t('navigation')}</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#projects" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t('projects')}
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t('about')}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-sm font-semibold">{t('legal')}</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t('privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold">{t('social')}</h4>
            <div className="mt-4 flex gap-3">
              {SOCIAL_LINKS.map(({ name, icon, href }) => (
                <a key={name} href={href} aria-label={name} className="text-muted-foreground transition-colors hover:text-foreground">
                  <Icon src={icon} size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-xs text-muted-foreground">{t('copyright', { year })}</p>
        </div>
      </div>
    </footer>
  );
}
