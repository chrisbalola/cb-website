'use client';

import { Moon, Sun } from 'lucide-react';
import { Switch } from '../ui/switch';
import { cn } from '../../utils/shadcn';
import { useCallback, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { WithClientSideMount } from '../../hocs/WithClientSideMount';
import { Skeleton } from '../ui/skeleton';

export const ThemeToggle = WithClientSideMount(
  () => {
    const { theme, setTheme } = useTheme();

    const isDark = useMemo(() => theme === 'dark', [theme]);

    const handleThemeChange = useCallback(
      (isDark: boolean) => {
        const newTheme = isDark ? 'dark' : 'light';
        setTheme(newTheme);
      },
      [setTheme]
    );
    return (
      <div className="flex items-stretch gap-1">
        <Sun
          className={cn('w-6 h-6', {
            'text-primary': !isDark,
          })}
        />
        <Switch onCheckedChange={handleThemeChange} checked={isDark} className="h-auto w-9!" />
        <Moon
          className={cn('w-6 h-6', {
            'text-primary': isDark,
          })}
        />
      </div>
    );
  },
  { loader: <Skeleton className="w-20 h-6 bg-primary" />, delay: 0 }
);
