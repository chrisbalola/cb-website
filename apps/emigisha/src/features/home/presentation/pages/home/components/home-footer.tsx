import { useTranslations } from 'next-intl';
import { clientConfig } from '@/core/config/client-config';

export function HomeFooter() {
  const t = useTranslations('home.footer');
  const { email } = clientConfig.links;

  return (
    <footer className="mt-[4.5rem] flex flex-wrap justify-between gap-x-6 gap-y-2 text-[0.9375rem] text-muted-foreground">
      <span>{t('copyright', { year: new Date().getFullYear() })}</span>
      <a
        href={`mailto:${email}`}
        className="underline decoration-accent decoration-2 underline-offset-4 hover:decoration-[3px] focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
      >
        {email}
      </a>
    </footer>
  );
}
