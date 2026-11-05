export const clientConfig = {
  /** Canonical site URL, used for metadata */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chrisbalola.com',

  /** Outbound links shown on the site */
  links: {
    blog: process.env.NEXT_PUBLIC_LINK_BLOG ?? 'https://blog.chrisbalola.com',
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? 'https://www.linkedin.com/in/chrisbalola',
    x: process.env.NEXT_PUBLIC_SOCIAL_X ?? 'https://x.com/chrisbalola',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@chrisbalola.com',
    meneja: process.env.NEXT_PUBLIC_LINK_MENEJA ?? 'https://about.meneja.app',
  },

  /** Cloudflare Web Analytics beacon token */
  cfAnalyticsToken: process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ?? '',
} as const;
