'use client';

import { cn } from '@/shared/presentation/utils/shadcn';
import { ChangeEvent } from 'react';
import { FieldLabel } from './field-label';

interface TextFieldProps {
  /** Current value of the input */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Optional label text displayed above the input */
  label?: string;
  /** Optional placeholder text */
  placeholder?: string;
  /** Optional maximum character limit */
  maxLength?: number;
  /** Optional className for additional styling */
  className?: string;
  /** Optional ID for the input element */
  id?: string;
  /** Optional error message */
  error?: string;
  /** Show character counter */
  showCounter?: boolean;
}

/**
 * TextField - Reusable text input component with optional character limit
 *
 * Features:
 * - Optional label displayed above input
 * - Optional character counter displayed at bottom right
 * - Error state styling
 * - Accessible with proper ARIA attributes
 * - Consistent styling across creation flows
 */
export function TextField({ value, onChange, label, placeholder, maxLength, className, id, error, showCounter = false }: TextFieldProps) {
  const currentLength = value.length;
  const isOverLimit = maxLength !== undefined && currentLength > maxLength;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Prevent typing when at max length
    if (maxLength !== undefined && newValue.length > maxLength && newValue.length > currentLength) {
      return;
    }

    onChange(newValue);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {/* Label */}
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

      {/* Input Container */}
      <div className="relative">
        <input
          type="text"
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={cn(
            'w-full px-4 py-3 rounded-lg',
            'bg-secondary border border-border',
            'text-sm text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'transition-colors',
            (error || isOverLimit) && 'border-destructive focus:ring-destructive'
          )}
          aria-describedby={maxLength && showCounter ? `${id}-counter` : undefined}
          aria-invalid={!!error}
        />

        {/* Character Counter */}
        {showCounter && maxLength !== undefined && (
          <div
            id={`${id}-counter`}
            className={cn('absolute bottom-3 right-4 text-xs pointer-events-none', isOverLimit ? 'text-destructive' : 'text-muted-foreground')}
            aria-live="polite"
          >
            {currentLength}/{maxLength}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
