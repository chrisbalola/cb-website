import { clientConfig } from '@/core/config/client-config';

export function OrganizationJsonLd() {
  const { siteUrl, links } = clientConfig;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Emigisha',
    legalName: 'Emigisha, LLC',
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    email: links.email,
    founder: {
      '@type': 'Person',
      name: 'Christian Balola',
      url: links.founder,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
