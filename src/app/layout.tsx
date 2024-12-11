'use client';

import { usePathname } from 'next/navigation';
import { NextAuthProvider } from '@/components/providers/NextAuthProvider';
import { fontVariables } from '@/config/fonts';
import PrelaunchLayout from './(prelaunch)/layout';
import ProductionLayout from './(production)/layout';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isProduction = pathname?.includes('/(production)') || pathname?.startsWith('/app');

  return (
    <html lang="en" className={fontVariables}>
      <body suppressHydrationWarning>
        <NextAuthProvider>
          {isProduction ? (
            children
          ) : (
            <PrelaunchLayout>{children}</PrelaunchLayout>
          )}
        </NextAuthProvider>
      </body>
    </html>
  );
}