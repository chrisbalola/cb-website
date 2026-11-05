'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { Phone } from 'lucide-react';
import { cn } from '@/shared/presentation/utils/shadcn';
import { FieldLabel } from './field-label';
import { Button } from '@/shared/presentation/components/ui/button';

interface PhoneFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Optional label text displayed above the input */
  label?: string;
  /** Optional error message */
  error?: string;
  /** Callback when edit button is clicked */
  onEditClick?: () => void;
  /** Label for the edit button */
  editLabel?: string;
}

/**
 * PhoneField - Phone input with icon and optional trailing edit button
 *
 * Features:
 * - Optional label displayed above input
 * - Phone icon on the left
 * - Optional EDIT button on the right
 * - Error state styling
 * - Consistent styling with TextField
 */
export const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(
  ({ label, error, onEditClick, editLabel = 'EDIT', className, disabled, id, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', className)}>
        {/* Label */}
        {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

        {/* Input Container */}
        <div className="relative">
          {/* Phone Icon */}
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />

          {/* Input */}
          <input
            ref={ref}
            type="tel"
            id={id}
            className={cn(
              'w-full pl-11 py-3 rounded-lg',
              onEditClick && !disabled ? 'pr-16' : 'pr-4',
              'bg-secondary border border-border',
              'text-sm text-foreground placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              'transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-destructive focus:ring-destructive'
            )}
            aria-invalid={!!error}
            disabled={disabled}
            {...props}
          />

          {/* Edit Button */}
          {onEditClick && (
            <Button
              type="button"
              variant="link"
              onClick={onEditClick}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-accent hover:text-accent/80 p-0 h-auto"
            >
              {editLabel}
            </Button>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);

PhoneField.displayName = 'PhoneField';
