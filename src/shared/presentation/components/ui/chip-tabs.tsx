import * as React from 'react';
import { cn } from '@/shared/presentation/utils/shadcn';

export interface ChipTab<T = string> {
  key: T;
  label: string;
  count?: number;
}

type ChipTabsVariant = 'outlined' | 'filled';

const VARIANT_STYLES: Record<ChipTabsVariant, { base: string; active: string; inactive: string }> = {
  outlined: {
    base: 'border px-4 py-2 text-sm',
    active: 'border-primary bg-primary/5 text-primary',
    inactive: 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground',
  },
  filled: {
    base: 'border-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm',
    active: 'border-accent bg-bg-fill text-accent',
    inactive: 'border-transparent bg-muted-foreground/25 text-text-primary hover:border-accent/25 hover:bg-bg-fill hover:text-accent',
  },
};

export interface ChipTabsProps<T = string> {
  tabs: ChipTab<T>[];
  selectedTab: T;
  onTabChange: (key: T) => void;
  variant?: ChipTabsVariant;
  className?: string;
}

/**
 * Chip-based tabs component with pill-shaped buttons
 * Features: outlined/filled variants, badge counts, horizontal scrollable
 */
export function ChipTabs<T = string>({ tabs, selectedTab, onTabChange, variant = 'outlined', className }: ChipTabsProps<T>) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div className={cn('overflow-x-auto scrollbar-hide', className)}>
      <div className="flex w-max gap-2">
        {tabs.map((tab) => (
          <button
            key={String(tab.key)}
            onClick={() => onTabChange(tab.key)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full font-medium transition-colors',
              styles.base,
              selectedTab === tab.key ? styles.active : styles.inactive
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-xs font-semibold',
                  selectedTab === tab.key ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
