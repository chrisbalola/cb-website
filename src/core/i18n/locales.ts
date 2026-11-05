export type LocaleItem = {
  code: string;
  name: string;
};

export const locales: LocaleItem[] = [{ code: 'en', name: 'English' }];

/** Locale codes array for use in routing config */
export const localeCodes = locales.map((l) => l.code) as [string, ...string[]];

export default locales;
