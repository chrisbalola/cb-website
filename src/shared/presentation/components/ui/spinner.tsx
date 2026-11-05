import * as React from 'react';
import { cn } from '@/shared/presentation/utils/shadcn';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible label for screen readers */
  label?: string;
  /**
   * Size of the spinner
   * @default 'default'
   */
  size?: 'sm' | 'default' | 'lg';
}

const sizeClasses = {
  sm: 'size-4 border-2',
  default: 'size-8 border-2',
  lg: 'size-12 border-3',
};

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(({ label, size = 'default', className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="status"
      aria-label={label}
      className={cn('inline-block animate-spin rounded-full border-solid border-current border-r-transparent', sizeClasses[size], className)}
      {...props}
    >
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
});
Spinner.displayName = 'Spinner';

export { Spinner };
