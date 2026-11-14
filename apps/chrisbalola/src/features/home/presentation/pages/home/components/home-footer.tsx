import { useTranslations } from 'next-intl';

export function HomeFooter() {
  const t = useTranslations('home.footer');

  return (
    <footer className="mx-auto flex w-full max-w-[40rem] justify-between gap-4 border-t px-4 py-5 text-[0.8125rem] text-muted-foreground">
      <span>{t('name')}</span>
      <span>{t('domain')}</span>
    </footer>
  );
}
