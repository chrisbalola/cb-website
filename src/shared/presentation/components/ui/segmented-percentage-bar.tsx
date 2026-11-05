import * as React from 'react';
import { cn } from '@/shared/presentation/utils/shadcn';

export interface SegmentedPercentageBarSegment {
  /**
   * The color of this segment
   */
  color: string;

  /**
   * The percentage value (0-100)
   */
  value: number;

  /**
   * Optional label for accessibility
   */
  label?: string;
}

export interface SegmentedPercentageBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of segments to display
   */
  segments: SegmentedPercentageBarSegment[];

  /**
   * Height of the bar in pixels
   * @default 8
   */
  height?: number;

  /**
   * Gap between segments in pixels
   * @default 2
   */
  gap?: number;
}

/**
 * Segmented horizontal percentage bar that displays multiple colored segments
 * representing proportions of a whole
 *
 * @example
 * <SegmentedPercentageBar
 *   segments={[
 *     { color: '#F4C762', value: 40, label: 'Technology' },
 *     { color: '#D87C37', value: 30, label: 'Sports' },
 *     { color: '#B55D50', value: 30, label: 'Entertainment' },
 *   ]}
 * />
 */
export function SegmentedPercentageBar({ segments, height = 8, gap = 2, className, ...props }: SegmentedPercentageBarProps) {
  // Calculate total to ensure we're working with actual percentages
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  // Normalize values if they don't sum to 100
  const normalizedSegments = segments.map((segment) => ({
    ...segment,
    normalizedValue: total > 0 ? (segment.value / total) * 100 : 0,
  }));

  return (
    <div className={cn('flex w-full overflow-hidden rounded-full bg-muted', className)} style={{ height, gap }} {...props}>
      {normalizedSegments.map((segment, index) => (
        <div
          key={index}
          className="transition-all duration-300"
          style={{
            width: `${segment.normalizedValue}%`,
            backgroundColor: segment.color,
            marginLeft: index > 0 ? `${gap}px` : 0,
          }}
          role="progressbar"
          aria-valuenow={segment.normalizedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={segment.label}
        />
      ))}
    </div>
  );
}
