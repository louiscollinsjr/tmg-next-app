import type { Metadata } from "next";
import { Inter, League_Spartan } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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

const inter = Inter({ subsets: ["latin"] });
const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
});

export const metadata: Metadata = {
  title: "TRYMYGUYS | Community Recommended Home Service Professionals",
  description:
    "Connect with trusted local home service professionals recommended by your community. Get personalized quotes for home improvement, repairs, and maintenance services.",
  keywords: [
    "home services",
    "local contractors",
    "home improvement",
    "home repair",
    "handyman services",
    "home maintenance",
    "professional services",
    "community recommended",
    "trusted professionals",
    "home projects",
    "local experts",
    "service quotes",
    "verified contractors",
    "home services marketplace",
  ],
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
    bing: "add-your-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} ${leagueSpartan.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
