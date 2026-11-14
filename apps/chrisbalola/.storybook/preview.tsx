import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/app/globals.css';

// Import messages
import enMessages from '../messages/en.json';
import securityMessages from '../src/features/security/presentation/i18n/en.json';
import sharedMessages from '../src/shared/presentation/i18n/en.json';

// Merge all messages
const messages = {
  ...enMessages,
  shared: sharedMessages,
  security: securityMessages,
};

// Create a query client for Storybook
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    tags: ['autodocs'],
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      return (
        <QueryClientProvider client={queryClient}>
          <NextIntlClientProvider locale="en" messages={messages}>
            <ThemeProvider attribute="class" forcedTheme={theme} enableSystem={false}>
              <div className="min-h-screen bg-background text-foreground">
                <Story />
              </div>
            </ThemeProvider>
          </NextIntlClientProvider>
        </QueryClientProvider>
      );
    },
  ],
};

export default preview;
