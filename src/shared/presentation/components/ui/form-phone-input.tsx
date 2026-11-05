'use client';

import * as React from 'react';
import { Phone, AlertCircle } from 'lucide-react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/shared/presentation/utils/shadcn';

export interface FormPhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
  error?: FieldError;
}

export const FormPhoneInput = React.forwardRef<HTMLInputElement, FormPhoneInputProps>(
  ({ className, countryCode = '+91', onCountryCodeChange, error, onChange, ...props }, ref) => {
    const [code, setCode] = React.useState(countryCode);

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newCode = e.target.value;

      if (!newCode.startsWith('+')) {
        newCode = '+' + newCode.replace(/\+/g, '');
      }

      newCode = '+' + newCode.slice(1).replace(/\D/g, '');

      if (newCode.length > 4) {
        newCode = newCode.slice(0, 4);
      }

      setCode(newCode);
      onCountryCodeChange?.(newCode);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, '');

      // Format: (XXX) XXX-XXXX
      let formatted = '';
      if (value.length > 0) {
        formatted = '(' + value.substring(0, 3);
        if (value.length >= 3) {
          formatted += ') ' + value.substring(3, 6);
        }
        if (value.length >= 6) {
          formatted += '-' + value.substring(6, 10);
        }
      }

      e.target.value = formatted;

      // Create a new event with only digits for form validation
      const digitsOnlyEvent = {
        ...e,
        target: {
          ...e.target,
          value: value,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange?.(digitsOnlyEvent);
    };

    return (
      <div className="space-y-2">
        <div className="relative flex">
          <div className="relative flex items-center">
            <Phone className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={code}
              autoComplete="off"
              onChange={handleCodeChange}
              className={cn(
                'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-20 min-w-0 rounded-l-md border border-r-0 bg-transparent pl-9 pr-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                error && 'border-destructive'
              )}
              placeholder="+91"
            />
          </div>
          <div className="h-12 w-px bg-border" />
          <input
            type="tel"
            ref={ref}
            onChange={handlePhoneChange}
            maxLength={14}
            className={cn(
              'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-full min-w-0 rounded-r-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
              error && 'border-destructive',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-destructive text-xs pl-1 flex items-center gap-1">
            <AlertCircle className="size-4" />
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

FormPhoneInput.displayName = 'FormPhoneInput';
