export const clientConfig = {
  /** Social media profile links */
  social: {
    github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB ?? '',
    x: process.env.NEXT_PUBLIC_SOCIAL_X ?? '',
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? '',
  },

  /** Cloudflare Web Analytics beacon token */
  cfAnalyticsToken: process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ?? '',
} as const;
