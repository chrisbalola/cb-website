import { MarketingLayout } from '@/shared/presentation/components/layout/marketing';
import { TermsHeroSection } from './components/terms-hero-section';
import { TermsContentSection } from './components/terms-content-section';
import { TermsContactSection } from './components/terms-contact-section';

export function TermsPage() {
  return (
    <MarketingLayout>
      <TermsHeroSection />
      <TermsContentSection />
      <TermsContactSection />
    </MarketingLayout>
  );
}
