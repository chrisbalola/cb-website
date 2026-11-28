import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { clientConfig } from '@/core/config/client-config';
import { containerClassName, eyebrowClassName, focusRingClassName } from '@/shared/presentation/utils/class-names';
import { cn } from '@/shared/presentation/utils/shadcn';

const LEGAL_PAGES = ['terms', 'privacy', 'refunds'] as const;

const COMPANY_NETWORKS = ['linkedin', 'x'] as const;

const bottomLinkClassName = cn('transition-colors hover:text-on-navy', focusRingClassName);

/** Contact block, legal line and legal links, shown at the bottom of every page */
export function SiteFooter() {
  const t = useTranslations('shared.layout.footer');
  const { links, legal, companyProfiles } = clientConfig;
  const networks = COMPANY_NETWORKS.filter((network) => companyProfiles[network]);

  const contacts = [
    { label: t('support'), email: links.supportEmail },
    { label: t('legal'), email: links.legalEmail },
  ];

  return (
    <footer id="contact" className="bg-navy-deep pt-[clamp(5rem,10vw,8rem)] pb-10 text-on-navy">
      <div className={containerClassName}>
        <p className={cn(eyebrowClassName, 'text-gold-soft')}>{t('eyebrow')}</p>
        <a
          href={`mailto:${links.email}`}
          className={cn(
            'mt-5 inline-block font-display text-[clamp(1.6rem,7.5vw,6.5rem)] leading-none font-semibold tracking-[-0.045em] [overflow-wrap:anywhere] transition-colors hover:text-accent',
            focusRingClassName
          )}
        >
          {links.email}
        </a>
        <div className="mt-16 grid gap-8 border-t border-navy-line pt-8 min-[640px]:grid-cols-3">
          {contacts.map((contact) => (
            <div key={contact.email}>
              <span className="block text-sm text-on-navy-soft">{contact.label}</span>
              <a href={`mailto:${contact.email}`} className={cn('font-medium transition-colors hover:text-accent', focusRingClassName)}>
                {contact.email}
              </a>
            </div>
          ))}
          <div>
            <span className="block text-sm text-on-navy-soft">{t('careers')}</span>
            {t('careersText')}
          </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-4 text-sm text-on-navy-soft">
          <span>{t('copyright', { year: new Date().getFullYear() })}</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {networks.length > 0 && (
              <nav className="flex gap-6">
                {networks.map((network) => (
                  <a key={network} href={companyProfiles[network]} target="_blank" rel="noopener noreferrer" className={bottomLinkClassName}>
                    {t(`profiles.${network}`)}
                  </a>
                ))}
              </nav>
            )}
            <nav className="flex gap-6">
              {LEGAL_PAGES.map((page) => (
                <Link key={page} href={legal[page]} className={bottomLinkClassName}>
                  {t(`links.${page}`)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
