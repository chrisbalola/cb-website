import { cn } from '@/shared/presentation/utils/shadcn';

interface CircularStepsIndicatorProps {
  /** Current step number */
  current: number;
  /** Total number of steps */
  total: number;
  /** Optional size in pixels. Defaults to 48 */
  size?: number;
  /** Optional custom text size class. Defaults to text-sm */
  textSizeClass?: string;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * CircularStepsIndicator - Circular progress indicator showing current step out of total
 *
 * Displays progress as a filled circle with percentage completion shown visually
 *
 * @example
 * ```tsx
 * <CircularStepsIndicator current={1} total={3} />
 * // Shows 33% progress with "1/3" in center
 * ```
 */
export function CircularStepsIndicator({ current, total, size = 48, textSizeClass = 'text-sm', className }: CircularStepsIndicatorProps) {
  const percentage = (current / total) * 100;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      {/* SVG Circle Progress */}
      <svg className="absolute inset-0 -rotate-90" width={size} height={size} viewBox="0 0 48 48">
        {/* Background circle */}
        <circle cx="24" cy="24" r={radius} fill="none" stroke="currentColor" strokeWidth="4" className="text-border" />

        {/* Progress circle */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-primary transition-all duration-300 ease-in-out"
        />
      </svg>

      {/* Center text */}
      <span className={cn('font-semibold text-primary z-10', textSizeClass)}>
        {current}/{total}
      </span>
    </div>
  );
}
