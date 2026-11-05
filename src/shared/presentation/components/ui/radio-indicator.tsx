import { cn } from '@/shared/presentation/utils/shadcn';

interface RadioIndicatorProps {
  isSelected: boolean;
  className?: string;
}

export function RadioIndicator({ isSelected, className }: RadioIndicatorProps) {
  return (
    <div
      className={cn(
        'shrink-0 size-5 rounded-full flex items-center justify-center',
        isSelected ? 'border-[3px] border-accent' : 'border-2 border-white/60',
        className
      )}
      style={{ boxShadow: isSelected ? '0 0 0 3px rgba(255, 255, 255, 0.1)' : '0 0 0 6px rgba(255, 255, 255, 0.1)' }}
    >
      {isSelected && <div className="size-2.5 bg-accent rounded-full" />}
    </div>
  );
}
