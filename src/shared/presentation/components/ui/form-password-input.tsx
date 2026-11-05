import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { AlertCircle, CheckCircle, XCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from './input';
import { cn } from '@/shared/presentation/utils/shadcn';

interface FormPasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: FieldError;
  showSuccess?: boolean;
  successMessage?: string;
  containerClassName?: string;
}

export const FormPasswordInput = forwardRef<HTMLInputElement, FormPasswordInputProps>(
  ({ error, showSuccess, successMessage, containerClassName = '', className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const iconColor = error
      ? 'text-destructive'
      : showSuccess
        ? 'text-green-600 dark:text-green-500'
        : 'text-muted-foreground group-focus-within:text-primary';

    return (
      <div className={`space-y-2 ${containerClassName}`}>
        <div className="relative group">
          <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 size-4 transition-colors ${iconColor}`} />
          <Input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            className={cn(
              'w-full',
              'h-12',
              'pl-11',
              'pr-11',
              'bg-transparent',
              'rounded-xl',
              'text-foreground',
              'placeholder:text-muted-foreground',
              'focus:outline-none',
              'transition-colors',
              error
                ? 'border-destructive focus-visible:border-destructive focus-visible:ring-0'
                : showSuccess
                  ? 'border-green-600 dark:border-green-500 focus-visible:border-green-600 dark:focus-visible:border-green-500 focus-visible:ring-0'
                  : 'border-border focus:border-primary',
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {error && (
          <p
            className={`text-xs pl-1 flex items-start gap-1.5 ${
              error.message?.includes('Password must include') ? 'text-text-gray-50' : 'text-destructive'
            }`}
          >
            {error.message?.includes('do not match') ? (
              <XCircle className="size-4 mt-0.5 shrink-0" />
            ) : (
              <AlertCircle className="size-4 mt-0.5 shrink-0" />
            )}
            {error.message}
          </p>
        )}
        {!error && showSuccess && successMessage && (
          <p className="text-green-600 dark:text-green-500 text-xs pl-1 flex items-center gap-1">
            <CheckCircle className="size-4" />
            {successMessage}
          </p>
        )}
      </div>
    );
  }
);

FormPasswordInput.displayName = 'FormPasswordInput';
