'use client';

import { useTranslations } from 'next-intl';

interface LoadingProps {
  message?: string;
  className?: string;
}

export function Loading({ message, className = '' }: LoadingProps) {
  const t = useTranslations('shared.actions');
  const label = message ?? t('loading');
  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center surface-muted-container ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default Loading;
