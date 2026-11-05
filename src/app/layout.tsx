import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/shared/presentation/providers/query-provider';
import { clientConfig } from '@/core/config/client-config';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  icons: [
    { rel: 'icon', url: '/favicon.ico', sizes: 'any' },
    { rel: 'icon', url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="chrisbalola-theme">
          <QueryProvider>{children}</QueryProvider>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
        {clientConfig.cfAnalyticsToken && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${clientConfig.cfAnalyticsToken}"}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
