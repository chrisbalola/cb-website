'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { routing } from './routing';
import { LOCALE_COOKIE_NAME, LOCALE_COOKIE_MAX_AGE } from './constants';

export async function setUserLocale(locale: string) {
  // Validate locale
  if (!routing.locales.includes(locale)) {
    return;
  }

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE_NAME, locale, {
    maxAge: LOCALE_COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
  });

  // Redirect to refresh page with new locale
  redirect('/');
}
