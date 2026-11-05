'use client';

import * as React from 'react';
import { cn } from '@/shared/presentation/utils/shadcn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.ComponentProps<'select'>, 'children'> {
  options: SelectOption[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, options, placeholder, value, ...props }, ref) => {
  const hasValue = value !== undefined && value !== '';

  return (
    <select
      ref={ref}
      value={value}
      className={cn(
        'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-full min-w-0 appearance-none rounded-md border bg-transparent px-4 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        !hasValue && 'text-muted-foreground',
        className
      )}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
});

Select.displayName = 'Select';

export { Select };
