import { Albert_Sans, Syne } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { clientConfig } from '@/core/config/client-config';

const albertSans = Albert_Sans({
  subsets: ['latin'],
  variable: '--font-albert-sans',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-syne',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${albertSans.variable} ${syne.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="emigisha-theme">
          {children}
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
