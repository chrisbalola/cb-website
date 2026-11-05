import { defineRouting } from 'next-intl/routing';
import { localeCodes } from './locales';

export const routing = defineRouting({
  // Supported locales in the application
  locales: localeCodes,

  // Default locale to use when visiting a non-locale-prefixed path (e.g. /about)
  defaultLocale: 'en',

  // Hide locale from user-facing URLs
  localePrefix: 'never',

  // Enable automatic locale detection from cookies and Accept-Language header
  localeDetection: true,
});
