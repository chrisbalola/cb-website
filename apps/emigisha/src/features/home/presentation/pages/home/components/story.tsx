import { useTranslations } from 'next-intl';
import { clientConfig } from '@/core/config/client-config';

export function Story() {
  const t = useTranslations('home.story');

  return (
    <div className="text-[1.1875rem]">
      <p className="max-w-[32rem]">{t('standard')}</p>
      <p className="mt-4 max-w-[32rem] text-muted-foreground">
        {t.rich('company', {
          founder: (chunks) => (
            <a
              href={clientConfig.links.founder}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-accent decoration-2 underline-offset-4 hover:decoration-[3px] focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
            >
              {chunks}
            </a>
          ),
        })}
      </p>
    </div>
  );
}
