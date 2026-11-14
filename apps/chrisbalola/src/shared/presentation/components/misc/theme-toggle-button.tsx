'use client';

import { useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { WithClientSideMount } from '../../hocs/WithClientSideMount';

const buttonClassName =
  'flex size-8 items-center justify-center rounded-full border bg-background text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export const ThemeToggleButton = WithClientSideMount(
  () => {
    const t = useTranslations('shared.theme');
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    const toggle = useCallback(() => setTheme(isDark ? 'light' : 'dark'), [isDark, setTheme]);

    return (
      <button type="button" onClick={toggle} aria-label={t('toggle')} className={buttonClassName}>
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
    );
  },
  { loader: <span aria-hidden className={buttonClassName} />, delay: 0 }
);
