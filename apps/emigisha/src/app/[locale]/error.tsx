'use client';

import { useEffect } from 'react';

import { Button } from '@/shared/presentation/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('shared.error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-6xl font-bold">{error.name}</h1>
      <p className="text-xl mt-4">{error.message}</p>
      <Button onClick={() => reset()} className="mt-4">
        {t('reset')}
      </Button>
    </div>
  );
}
