'use client';

import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@/shared/presentation/components/ui/date-picker';
import { FieldLabel } from './field-label';
import { cn } from '@/shared/presentation/utils/shadcn';

interface DateFieldProps extends DatePickerProps {
  /** Optional label text displayed above the input */
  label?: string;
  /** Optional error from react-hook-form */
  error?: FieldError;
}

/**
 * DateField - Date picker with optional label and error display
 *
 * Features:
 * - Optional label displayed above picker
 * - Calendar popup for date selection
 * - DD/MM/YYYY format
 * - Error state styling
 * - Consistent styling with other form fields
 */
export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(({ label, error, id, className, ...props }, ref) => {
  return (
    <div className={cn('space-y-2', className)}>
      {/* Label */}
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

      {/* Date Picker */}
      <DatePicker ref={ref} id={id} {...props} />

      {/* Error Message */}
      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  );
});

DateField.displayName = 'DateField';
