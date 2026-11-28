import { LegalDocument } from '../../components/legal-document';

const SECTIONS = ['failures', 'unused', 'used', 'ask', 'payback', 'disputes', 'contact'] as const;

export function RefundsPage() {
  return <LegalDocument namespace="refunds" sections={SECTIONS} />;
}
