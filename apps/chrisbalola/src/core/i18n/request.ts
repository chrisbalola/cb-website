import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { captureException } from '@/shared/presentation/utils/errors';
/**
 * Reports i18n loading errors to Sentry with contextual metadata
 */
function reportI18nError(error: unknown, source: string, locale: string): void {
  captureException(error, {
    tags: {
      i18n_source: source,
      locale,
    },
    level: 'error',
  });
}

/**
 * Loads and merges i18n messages from all sources:
 * 1. Shared module messages (base layer)
 * 2. Feature-specific messages (feature layers)
 */
async function loadMessages(locale: string): Promise<Record<string, unknown>> {
  const messages: Record<string, unknown> = {};
  try {
    messages.shared = (await import(`../../shared/presentation/i18n/${locale}.json`)).default;
  } catch (error) {
    reportI18nError(error, 'shared', locale);
  }

  const features = ['home'];

  for (const feature of features) {
    try {
      messages[feature] = (await import(`../../features/${feature}/presentation/i18n/${locale}.json`)).default;
    } catch (error) {
      reportI18nError(error, `feature:${feature}`, locale);
    }
  }

  return messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
    defaultTranslationValues: {},
  };
});
