'use client';

import { usePathname } from 'next/navigation';
import PrelaunchLayout from './(prelaunch)/layout';
import ProductionLayout from './(production)/layout';
import { NextAuthProvider } from '@/components/providers/NextAuthProvider';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Determine which layout to use
  const Layout = pathname?.startsWith('/app') ? ProductionLayout : PrelaunchLayout;

  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}