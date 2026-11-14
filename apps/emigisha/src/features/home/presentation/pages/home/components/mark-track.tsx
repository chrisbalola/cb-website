import { cn } from '@/shared/presentation/utils/shadcn';

const MARKS = 28;
const STEP = 40;
const RADIUS = 9;

/** One row of diamonds. The first `shipped` are yellow, one per product shipped. */
export function MarkTrack({ shipped, label, className }: { shipped: number; label: string; className?: string }) {
  return (
    <svg viewBox={`0 0 ${MARKS * STEP} ${STEP}`} role="img" aria-label={label} className={cn('block h-auto w-full', className)}>
      {Array.from({ length: MARKS }, (_, index) => {
        const cx = STEP / 2 + index * STEP;
        const cy = STEP / 2;

        return (
          <path
            key={index}
            className={index < shipped ? 'fill-accent' : 'fill-leaf-mark'}
            d={`M${cx} ${cy - RADIUS}L${cx + RADIUS} ${cy}L${cx} ${cy + RADIUS}L${cx - RADIUS} ${cy}Z`}
          />
        );
      })}
    </svg>
  );
}
