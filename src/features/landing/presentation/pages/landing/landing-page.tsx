import { MarketingLayout } from '@/shared/presentation/components/layout/marketing';
import { HeroSection } from './components/hero-section';
import { FeaturesSection } from './components/features-section';
import { ModulesSection } from './components/modules-section';
import { DifferentiatorsSection } from './components/differentiators-section';
import { CtaSection } from './components/cta-section';

export function LandingPage() {
  return (
    <MarketingLayout>
      <HeroSection />
      <FeaturesSection />
      <ModulesSection />
      <DifferentiatorsSection />
      <CtaSection />
    </MarketingLayout>
  );
}
