import { cn } from '@/shared/presentation/utils/shadcn';

interface FieldLabelProps {
  /** The label text to display */
  children: React.ReactNode;
  /** Optional htmlFor attribute to link with input id */
  htmlFor?: string;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * FieldLabel - Reusable label component for form fields
 *
 * Features:
 * - Consistent styling across all form fields
 * - Proper accessibility with htmlFor linking
 * - Small font size with medium weight
 */
export function FieldLabel({ children, htmlFor, className }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn('block text-sm font-medium text-foreground', className)}>
      {children}
    </label>
  );
}
