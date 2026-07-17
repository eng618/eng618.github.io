import { PlausibleProvider } from '@/components/plausible-provider';
import { WebVitals } from '@/components/web-vitals';
import { ThemeProvider, Toaster } from '@gv-tech/ui-web';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Eric N. Garcia | Principal Engineer & Systems Architect',
  description:
    'Principal Engineer and Systems Architect. Eleven years building enterprise software — design systems, cloud-native services, and production-ready platforms.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider disableTransitionOnChange>
          <PlausibleProvider />
          <WebVitals />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
