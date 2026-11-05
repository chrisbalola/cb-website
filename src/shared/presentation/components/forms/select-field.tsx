'use client';

import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { Select, SelectProps } from '@/shared/presentation/components/ui/select';
import { FieldLabel } from './field-label';
import { cn } from '@/shared/presentation/utils/shadcn';

interface SelectFieldProps extends SelectProps {
  /** Optional label text displayed above the select */
  label?: string;
  /** Optional error from react-hook-form */
  error?: FieldError;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(({ label, error, id, className, ...props }, ref) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

      <Select ref={ref} id={id} {...props} />

      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  );
});

SelectField.displayName = 'SelectField';
