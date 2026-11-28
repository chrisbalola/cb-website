import { LegalDocument } from '../../components/legal-document';

/** `delete-account` is also the anchor given to the app stores as the account deletion link */
const SECTIONS = ['collect', 'why', 'processors', 'retention', 'delete-account', 'rights', 'children', 'cookies', 'changes', 'contact'] as const;

export function PrivacyPage() {
  return <LegalDocument namespace="privacy" sections={SECTIONS} />;
}
