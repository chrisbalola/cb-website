import React from 'react';

import { cn } from '@/shared/presentation/utils/shadcn';

import { Button } from './button';

export interface EmptyStateCardProps {
  /**
   * Icon to display at the top of the empty state
   */
  icon: React.ReactNode;

  /**
   * Title text for the empty state
   */
  title: string;

  /**
   * Optional description text providing more context
   */
  description?: string;

  /**
   * Optional action button configuration
   */
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  };

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Reusable empty state card component
 * Used for empty states, private profiles, and other placeholder scenarios
 */
export function EmptyStateCard({ icon, title, description, action, className }: EmptyStateCardProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center', 'py-12 px-6', className)}>
      {/* Icon */}
      <div className="mb-4 flex items-center justify-center">{icon}</div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>

      {/* Description */}
      {description && <p className="mb-6 max-w-md text-sm text-muted-foreground">{description}</p>}

      {/* Action Button */}
      {action && (
        <Button onClick={action.onClick} variant={action.variant || 'default'} className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}
