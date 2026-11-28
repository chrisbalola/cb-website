import { clientConfig } from '@/core/config/client-config';

export function OrganizationJsonLd() {
  const { siteUrl, links, founderProfiles, companyProfiles } = clientConfig;
  const companySameAs = Object.values(companyProfiles).filter(Boolean);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Emigisha',
    legalName: 'Emigisha, LLC',
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    email: links.email,
    ...(companySameAs.length > 0 && { sameAs: companySameAs }),
    founder: {
      '@type': 'Person',
      name: 'Christian Balola',
      url: links.founder,
      sameAs: Object.values(founderProfiles),
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
