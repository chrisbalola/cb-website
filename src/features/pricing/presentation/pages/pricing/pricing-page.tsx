import { MarketingLayout } from '@/shared/presentation/components/layout/marketing';
import { PricingHeroSection } from './components/pricing-hero-section';
import { PricingPlanSection } from './components/pricing-plan-section';
import { PricingFeaturesSection } from './components/pricing-features-section';
import { PricingCtaSection } from './components/pricing-cta-section';

export function PricingPage() {
  return (
    <MarketingLayout>
      <PricingHeroSection />
      <PricingPlanSection />
      <PricingFeaturesSection />
      <PricingCtaSection />
    </MarketingLayout>
  );
}
