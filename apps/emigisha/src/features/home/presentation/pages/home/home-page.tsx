import { HomeHero } from './components/home-hero';
import { Story } from './components/story';
import { ProductList } from './components/product-list';
import { HomeFooter } from './components/home-footer';
import { OrganizationJsonLd } from './components/organization-json-ld';

export function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <HomeHero />
      <main className="px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(3rem,8vh,5rem)] pb-10">
        <div className="grid items-start gap-[clamp(2rem,6vw,6rem)] min-[52rem]:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <Story />
          <ProductList />
        </div>
        <HomeFooter />
      </main>
    </>
  );
}
