import { clientConfig } from '@/core/config/client-config';

export function PersonJsonLd() {
  const { siteUrl, links } = clientConfig;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Christian Balola',
    alternateName: 'Chris Balola',
    url: siteUrl,
    image: `${siteUrl}/og.png`,
    email: `mailto:${links.email}`,
    jobTitle: 'Entrepreneur',
    sameAs: [links.linkedin, links.x, links.blog],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
