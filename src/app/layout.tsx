'use client';

import { usePathname } from 'next/navigation';
import { Montserrat, Roboto, Courier_Prime, Tiro_Bangla, Luckiest_Guy, Playfair_Display, Lato } from "next/font/google";
import PrelaunchLayout from './(prelaunch)/layout';
import ProductionLayout from './(production)/layout';
import { NextAuthProvider } from '@/components/providers/NextAuthProvider';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import './globals.css';

// Font configurations
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' });
const courier = Courier_Prime({ weight: '400', subsets: ['latin'], variable: '--font-courier' });
const tiroBangla = Tiro_Bangla({ weight: '400', subsets: ['bengali'], variable: '--font-tiro-bangla' });
const luckiestGuy = Luckiest_Guy({ weight: '400', subsets: ['latin'], variable: '--font-luckiest-guy' });
const playfairDisplay = Playfair_Display({ weight: '400', subsets: ['latin'], variable: '--font-playfair-display' });
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isProduction = pathname?.startsWith('/app');

  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable} ${courier.variable} ${tiroBangla.variable} ${luckiestGuy.variable} ${playfairDisplay.variable} ${lato.variable}`}>
      <body suppressHydrationWarning>
        <NextAuthProvider>
          {isProduction && <Navigation />}
          {isProduction ? (
            <ProductionLayout>{children}</ProductionLayout>
          ) : (
            <PrelaunchLayout>{children}</PrelaunchLayout>
          )}
          {isProduction && <Footer />}
        </NextAuthProvider>
      </body>
    </html>
  );
}