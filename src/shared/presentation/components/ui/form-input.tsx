import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import { AlertCircle, CheckCircle, LucideIcon } from 'lucide-react';
import { Input } from './input';
import { cn } from '@/shared/presentation/utils/shadcn';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  showSuccess?: boolean;
  successMessage?: string;
  containerClassName?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ error, icon: Icon, iconPosition = 'left', showSuccess, successMessage, containerClassName = '', className = '', ...props }, ref) => {
    const iconColor = error ? 'text-destructive' : showSuccess ? 'text-success' : 'text-muted-foreground group-focus-within:text-primary';

    return (
      <div className={`space-y-2 ${containerClassName}`}>
        <div className="relative group">
          {Icon && iconPosition === 'left' && <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 size-4 transition-colors ${iconColor}`} />}
          {Icon && iconPosition === 'right' && <Icon className={`absolute right-4 top-1/2 -translate-y-1/2 size-4 transition-colors ${iconColor}`} />}
          <Input
            ref={ref}
            className={cn(
              'w-full',
              'h-12',
              Icon && iconPosition === 'left' ? 'pl-11' : 'pl-4',
              Icon && iconPosition === 'right' ? 'pr-11' : props.type === 'password' ? 'pr-11' : 'pr-4',
              'bg-transparent',
              'rounded-xl',
              'text-foreground',
              'placeholder:text-muted-foreground',
              'focus:outline-none',
              'transition-colors',
              error ? 'border-destructive' : showSuccess ? 'border-success' : 'border-border focus:border-primary',
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
        {!error && showSuccess && successMessage && (
          <p className="text-success text-xs pl-1 flex items-center gap-1">
            <CheckCircle className="size-4" />
            {successMessage}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
