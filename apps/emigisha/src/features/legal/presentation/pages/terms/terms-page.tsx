import { LegalDocument } from '../../components/legal-document';

const SECTIONS = [
  'who',
  'account',
  'content',
  'notAllowed',
  'ai',
  'payments',
  'availability',
  'liability',
  'ending',
  'changes',
  'law',
  'contact',
] as const;

export function TermsPage() {
  return <LegalDocument namespace="terms" sections={SECTIONS} />;
}
