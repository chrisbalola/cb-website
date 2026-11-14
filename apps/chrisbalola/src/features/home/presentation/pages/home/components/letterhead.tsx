import Image from 'next/image';
import { useTranslations } from 'next-intl';
import portrait from '@/assets/images/christian-balola.jpg';

export function Letterhead() {
  const t = useTranslations('home.letterhead');

  return (
    <div className="mb-12 flex items-center gap-3.5">
      <span className="block size-14 shrink-0 overflow-hidden rounded-full bg-accent">
        <Image src={portrait} alt={t('photoAlt')} sizes="56px" priority className="size-full origin-[62%_40%] scale-[1.45] object-cover" />
      </span>
      <p className="text-base font-extrabold text-accent">{t('wordmark')}</p>
    </div>
  );
}
