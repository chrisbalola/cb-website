'use client';

import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { AutocompleteSelect, AutocompleteSelectProps } from '@/shared/presentation/components/ui/autocomplete-select';
import { FieldLabel } from './field-label';
import { cn } from '@/shared/presentation/utils/shadcn';

interface AutocompleteSelectFieldProps extends AutocompleteSelectProps {
  /** Optional label text displayed above the input */
  label?: string;
  /** Optional error from react-hook-form */
  error?: FieldError;
}

/**
 * AutocompleteSelectField - Autocomplete select with optional label and error display
 *
 * Features:
 * - Optional label displayed above select
 * - Error state styling
 * - Consistent styling with other form fields
 */
export const AutocompleteSelectField = forwardRef<HTMLInputElement, AutocompleteSelectFieldProps>(
  ({ label, error, id, className, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', className)}>
        {/* Label */}
        {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

        {/* Select */}
        <AutocompleteSelect ref={ref} id={id} {...props} />

        {/* Error Message */}
        {error && <p className="text-xs text-destructive">{error.message}</p>}
      </div>
    );
  }
);

AutocompleteSelectField.displayName = 'AutocompleteSelectField';
