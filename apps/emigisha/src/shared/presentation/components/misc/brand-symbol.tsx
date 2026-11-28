import { cn } from '@/shared/presentation/utils/shadcn';

type BrandSymbolProps = {
  className?: string;
  sunClassName?: string;
  bowlClassName?: string;
  /** Crop the viewBox to the artwork (lockups) instead of the full 100x100 square (hero) */
  cropped?: boolean;
  label?: string;
};

/** The Emigisha symbol: a gold sun settling into a bowl. See docs/brand/logo. */
export function BrandSymbol({ className, sunClassName, bowlClassName, cropped = false, label }: BrandSymbolProps) {
  return (
    <svg
      viewBox={cropped ? '10 17 80 66' : '0 0 100 100'}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn('overflow-visible', className)}
    >
      <circle cx="50" cy="32" r="15" className={cn('fill-accent', sunClassName)} />
      <path d="M10 43A40 40 0 0 0 90 43L76 43A26 26 0 0 1 24 43Z" className={cn('fill-on-navy', bowlClassName)} />
    </svg>
  );
}
