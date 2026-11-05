'use client';

import { cn } from '@/shared/presentation/utils/shadcn';
import { ChangeEvent } from 'react';
import { FieldLabel } from './field-label';

interface TextareaFieldProps {
  /** Label text displayed above the textarea */
  label: string;
  /** Current value of the textarea */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Optional placeholder text */
  placeholder?: string;
  /** Optional maximum character limit */
  maxLength?: number;
  /** Optional minimum number of rows */
  rows?: number;
  /** Optional className for additional styling */
  className?: string;
  /** Optional ID for the textarea element */
  id?: string;
}

/**
 * TextareaField - Reusable textarea component with label and optional character limit
 *
 * Features:
 * - Label displayed above textarea
 * - Optional character counter displayed at bottom right
 * - Responsive rows with auto-resize behavior
 * - Accessible with proper ARIA attributes
 * - Consistent styling across creation flows
 */
export function TextareaField({ label, value, onChange, placeholder, maxLength, rows = 4, className, id }: TextareaFieldProps) {
  const currentLength = value.length;
  const isOverLimit = maxLength !== undefined && currentLength > maxLength;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    // Allow typing even if over limit (user can delete)
    // but don't allow adding more characters when at limit
    if (maxLength !== undefined && newValue.length > maxLength && newValue.length > currentLength) {
      return;
    }

    onChange(newValue);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {/* Label */}
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      {/* Textarea Container */}
      <div className="relative">
        <textarea
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={cn(
            'w-full px-4 py-3 rounded-lg resize-none',
            'bg-secondary border border-border',
            'text-sm text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'transition-colors',
            isOverLimit && 'border-destructive focus:ring-destructive'
          )}
          aria-label={label}
          aria-describedby={maxLength ? `${id}-counter` : undefined}
        />

        {/* Character Counter */}
        {maxLength !== undefined && (
          <div
            id={`${id}-counter`}
            className={cn('absolute bottom-3 right-4 text-xs', isOverLimit ? 'text-destructive' : 'text-muted-foreground')}
            aria-live="polite"
          >
            {currentLength}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
}
