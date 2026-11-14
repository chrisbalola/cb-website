import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { clientConfig } from '@/core/config/client-config';
import { cn } from '@/shared/presentation/utils/shadcn';

const linkClassName =
  'underline decoration-accent decoration-2 underline-offset-[0.22em] hover:decoration-[3px] focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent';

function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const opensNewTab = !href.startsWith('mailto:');

  return (
    <a
      href={href}
      className={cn(linkClassName, className)}
      target={opensNewTab ? '_blank' : undefined}
      rel={opensNewTab ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

export function Letter() {
  const t = useTranslations('home.letter');
  const { links } = clientConfig;

  return (
    <>
      <h1 className="mb-7 max-w-[22ch] text-[clamp(1.6rem,3.6vw,2.125rem)] leading-[1.22] font-semibold tracking-[-0.025em]">{t('lede')}</h1>
      <p className="mb-5 max-w-[60ch] text-lg leading-relaxed">{t('roles')}</p>
      <p className="mb-5 max-w-[60ch] text-lg leading-relaxed">
        {t.rich('product', {
          meneja: (chunks) => <ExternalLink href={links.meneja}>{chunks}</ExternalLink>,
        })}
      </p>
      <p className="mb-5 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
        {t.rich('elsewhere', {
          blog: (chunks) => <ExternalLink href={links.blog}>{chunks}</ExternalLink>,
          linkedin: (chunks) => <ExternalLink href={links.linkedin}>{chunks}</ExternalLink>,
          x: (chunks) => <ExternalLink href={links.x}>{chunks}</ExternalLink>,
          email: (chunks) => <ExternalLink href={`mailto:${links.email}`}>{chunks}</ExternalLink>,
        })}
      </p>
      <p className="mt-16 text-lg text-muted-foreground">{t('signature')}</p>
    </>
  );
}
