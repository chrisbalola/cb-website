import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function NotFound() {
  const t = await getTranslations('shared.notFound');

  return (
    <main className="flex flex-col flex-1 justify-center h-screen">
      <div className="flex-1 container mx-auto px-2 flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground mt-2">{t('description')}</p>
          <Link href="/" className="mt-4 text-primary underline">
            {t('goHome')}
          </Link>
        </div>
      </div>
    </main>
  );
}
