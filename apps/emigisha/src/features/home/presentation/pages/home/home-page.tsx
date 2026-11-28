import { SiteFooter } from '@/shared/presentation/components/layout/site-footer';
import { HomeHero } from './components/home-hero';
import { ProductsSection } from './components/products-section';
import { PrinciplesSection } from './components/principles-section';
import { AboutSection } from './components/about-section';
import { OrganizationJsonLd } from './components/organization-json-ld';

export function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <HomeHero />
      <main>
        <ProductsSection />
        <PrinciplesSection />
        <AboutSection />
      </main>
      <SiteFooter />
    </>
  );
}
