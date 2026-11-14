export const clientConfig = {
  /** Canonical site URL, used for metadata */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://emigisha.com',

  /** Outbound links shown on the site */
  links: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@emigisha.com',
    meneja: process.env.NEXT_PUBLIC_LINK_MENEJA ?? 'https://about.meneja.app',
    founder: process.env.NEXT_PUBLIC_LINK_FOUNDER ?? 'https://chrisbalola.com',
  },

  /** Cloudflare Web Analytics beacon token */
  cfAnalyticsToken: process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ?? '',
} as const;
