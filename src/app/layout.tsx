import type { Metadata, Viewport } from "next";
import { Montserrat, Courier_Prime, Tiro_Bangla, Luckiest_Guy, Roboto } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const courier = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-courier',
});

const tiroBangla = Tiro_Bangla({
  weight: '400',
  subsets: ['bengali'],
  variable: '--font-tiro-bangla',
});

const luckiestGuy = Luckiest_Guy({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-luckiest-guy',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://trymyguys.com'),
  title: {
    template: '%s | TMG',
    default: 'TMG - Find Trusted Home Service Professionals',
  },
  description:
    "Connect with trusted local home service professionals recommended by your community. Get personalized quotes for home improvement, repairs, and maintenance services.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }
    ]
  },
  openGraph: {
    title: "TRYMYGUYS - Community Trusted Home Service Professionals",
    description:
      "Find reliable local professionals vetted by your community. Get personalized quotes, browse services, and connect with trusted experts in your neighborhood.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TRYMYGUYS Home Services Platform",
      },
    ],
    locale: "en_US",
    type: "website",
    siteName: "TRYMYGUY",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Community-Recommended Home Service Professionals | TRYMYGUY",
    description:
      "Connect with trusted local professionals recommended by your community. Get personalized quotes today!",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://trymyguy.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "add-your-verification-code",
    yandex: "add-your-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: '#00000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${montserrat.variable} ${courier.variable} ${tiroBangla.variable} ${luckiestGuy.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-zinc-100" suppressHydrationWarning>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
