import createMiddleware from 'next-intl/middleware';
import { routing } from './core/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, Next.js internals, and static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
