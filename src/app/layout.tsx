'use client';

import { NextAuthProvider } from '@/components/providers/NextAuthProvider';
import { fontVariables } from '@/config/fonts';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body suppressHydrationWarning>
        <NextAuthProvider>
          <div className="bg-zinc-100 font-montserrat min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}