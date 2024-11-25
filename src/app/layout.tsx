import type { Metadata, Viewport } from "next";
import { Inter, League_Spartan, Montserrat, Figtree, Lato, Open_Sans, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans',
});

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
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
  themeColor: '#0a7aff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${openSans.variable} ${lato.variable} ${roboto.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
