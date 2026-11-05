import { MarketingLayout } from '@/shared/presentation/components/layout/marketing';
import { PrivacyHeroSection } from './components/privacy-hero-section';
import { PrivacyContentSection } from './components/privacy-content-section';
import { PrivacyContactSection } from './components/privacy-contact-section';

export function PrivacyPage() {
  return (
    <MarketingLayout>
      <PrivacyHeroSection />
      <PrivacyContentSection />
      <PrivacyContactSection />
    </MarketingLayout>
  );
}
