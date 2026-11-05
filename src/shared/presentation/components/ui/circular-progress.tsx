import * as React from 'react';
import { cn } from '@/shared/presentation/utils/shadcn';

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The progress value (0-100)
   */
  value: number;
  /**
   * The size of the circular progress indicator in pixels
   * @default 48
   */
  size?: number;
  /**
   * The width of the progress stroke
   * @default 4
   */
  strokeWidth?: number;
  /**
   * Whether to show the percentage text in the center
   * @default true
   */
  showPercentage?: boolean;
  /**
   * Custom class for the percentage text
   */
  textClassName?: string;
  /**
   * Custom class for the progress circle
   */
  progressClassName?: string;
  /**
   * Custom class for the background circle
   */
  backgroundClassName?: string;
}

/**
 * Circular progress indicator with percentage display
 *
 * @example
 * <CircularProgress value={75} />
 * <CircularProgress value={50} size={64} strokeWidth={6} />
 * <CircularProgress value={25} showPercentage={false} />
 */
export function CircularProgress({
  value,
  size = 48,
  strokeWidth = 4,
  showPercentage = true,
  textClassName,
  progressClassName,
  backgroundClassName,
  className,
  ...props
}: CircularProgressProps) {
  // Clamp value between 0 and 100
  const percentage = Math.min(Math.max(value, 0), 100);

  // Calculate circle dimensions
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('relative shrink-0', className)} style={{ width: size, height: size }} {...props}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className={cn('text-foreground/5', backgroundClassName)}
        />
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn('text-primary transition-all duration-300', progressClassName)}
        />
      </svg>
      {/* Percentage text */}
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn('text-[10px] font-semibold text-primary', textClassName)}>{percentage}%</span>
        </div>
      )}
    </div>
  );
}
