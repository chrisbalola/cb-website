export const clientConfig = {
  /** Canonical site URL, used for metadata */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://emigisha.com',

  /** Outbound links shown on the site */
  links: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@emigisha.com',
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@emigisha.com',
    legalEmail: process.env.NEXT_PUBLIC_LEGAL_EMAIL ?? 'legal@emigisha.com',
    meneja: process.env.NEXT_PUBLIC_LINK_MENEJA ?? 'https://about.meneja.app',
    talatala: process.env.NEXT_PUBLIC_LINK_TALATALA ?? 'https://talatala.app',
    styleddoc: process.env.NEXT_PUBLIC_LINK_STYLEDDOC ?? 'https://styleddoc.app',
    founder: process.env.NEXT_PUBLIC_LINK_FOUNDER ?? 'https://chrisbalola.com',
  },

  /** The founder's own profiles, shown in the about section */
  founderProfiles: {
    github: process.env.NEXT_PUBLIC_FOUNDER_GITHUB ?? 'https://github.com/chrisbalola',
    linkedin: process.env.NEXT_PUBLIC_FOUNDER_LINKEDIN ?? 'https://www.linkedin.com/in/chrisbalola',
    x: process.env.NEXT_PUBLIC_FOUNDER_X ?? 'https://x.com/chrisbalola',
  },

  /** Emigisha's own profiles, shown in the footer. Each stays hidden until its URL is set */
  companyProfiles: {
    linkedin: process.env.NEXT_PUBLIC_COMPANY_LINKEDIN ?? '',
    x: process.env.NEXT_PUBLIC_COMPANY_X ?? '',
  },

  /** Company details shown on the legal pages */
  company: {
    /** Postal address; the line is hidden until this is set */
    mailingAddress: process.env.NEXT_PUBLIC_MAILING_ADDRESS ?? '',
  },

  /** Company-level legal pages linked from the footer */
  legal: {
    terms: '/terms',
    privacy: '/privacy',
    refunds: '/refunds',
  },

  /** Cloudflare Web Analytics beacon token */
  cfAnalyticsToken: process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ?? '',
} as const;
