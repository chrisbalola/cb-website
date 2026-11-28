import { useTranslations } from 'next-intl';
import { clientConfig } from '@/core/config/client-config';
import { SiteFooter } from '@/shared/presentation/components/layout/site-footer';
import { SiteHeader } from '@/shared/presentation/components/layout/site-header';
import { containerClassName } from '@/shared/presentation/utils/class-names';
import { cn } from '@/shared/presentation/utils/shadcn';

export type LegalNamespace = 'terms' | 'privacy' | 'refunds';

type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalDocumentProps = {
  namespace: LegalNamespace;
  /** Section keys under `legal.<namespace>.sections`, in reading order */
  sections: readonly string[];
};

/** Fills the contact placeholders. Sections are arrays read raw, so ICU arguments are not available. */
function withContacts(text: string) {
  const { supportEmail, legalEmail } = clientConfig.links;

  return text.replaceAll('{supportEmail}', supportEmail).replaceAll('{legalEmail}', legalEmail);
}

/**
 * A legal text laid out from its message keys: a navy header band with the title, then each section as a
 * heading, paragraphs and an optional list. The section keyed `contact` also shows the mailing address once it is set.
 */
export function LegalDocument({ namespace, sections }: LegalDocumentProps) {
  const t = useTranslations('legal');
  const { mailingAddress } = clientConfig.company;

  return (
    <>
      <div className="hero-sky relative isolate overflow-hidden text-on-navy">
        <SiteHeader />
        <div className={cn(containerClassName, 'pt-[clamp(3rem,8vw,5.5rem)] pb-[clamp(2.5rem,6vw,4rem)]')}>
          <h1 className="max-w-[16ch] font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-semibold tracking-[-0.045em]">
            {t(`${namespace}.title`)}
          </h1>
          <p className="mt-5 text-on-navy-soft">{t('updated')}</p>
        </div>
      </div>
      <main className={cn(containerClassName, 'py-[clamp(3rem,8vw,5.5rem)]')}>
        <article className="max-w-[46rem]">
          <p className="text-[1.1875rem] text-muted-foreground">{withContacts(t(`${namespace}.intro`))}</p>
          {sections.map((key) => {
            const section = t.raw(`${namespace}.sections.${key}`) as LegalSection;

            return (
              <section key={key} id={key} className="mt-12 scroll-mt-6">
                <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-muted-foreground">
                    {withContacts(paragraph)}
                  </p>
                ))}
                {section.items && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground marker:text-accent">
                    {section.items.map((item) => (
                      <li key={item}>{withContacts(item)}</li>
                    ))}
                  </ul>
                )}
                {key === 'contact' && mailingAddress && (
                  <p className="mt-3 text-muted-foreground">{t('mailingAddress', { address: mailingAddress })}</p>
                )}
              </section>
            );
          })}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
