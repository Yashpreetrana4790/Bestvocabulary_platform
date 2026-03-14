
import React from 'react';
import Script from 'next/script';

import "./globals.css";
import { Inter, Libre_Baskerville, Merriweather, Open_Sans, Playfair_Display } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';

const GTM_ID = 'GTM-KXNZCTS3';
const GA_ID = 'G-BNHRL2GJ1Y';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bestvocabulary.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Best Vocabulary - Master the Art of Choosing Words",
    template: "%s | Best Vocabulary",
  },
  description: "Expand your vocabulary with AI-powered search, rich definitions, etymology, mnemonics, and curated word collections. Learn new words daily and master the art of choosing the perfect words.",
  keywords: [
    "vocabulary",
    "dictionary",
    "word definitions",
    "learn words",
    "English vocabulary",
    "word of the day",
    "etymology",
    "synonyms",
    "antonyms",
    "word meanings",
    "vocabulary builder",
    "SAT words",
    "GRE words",
    "improve vocabulary",
  ],
  authors: [{ name: "Best Vocabulary" }],
  creator: "Best Vocabulary",
  publisher: "Best Vocabulary",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Best Vocabulary",
    title: "Best Vocabulary - Master the Art of Choosing Words",
    description: "Expand your vocabulary with AI-powered search, rich definitions, etymology, mnemonics, and curated word collections.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Best Vocabulary - Master the Art of Choosing Words",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Vocabulary - Master the Art of Choosing Words",
    description: "Expand your vocabulary with AI-powered search, rich definitions, etymology, and curated word collections.",
    images: ["/og-image.png"],
    creator: "@bestvocabulary",
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
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: SITE_URL,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Best Vocabulary",
  },
};


const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfairdisplay",
});


const LibreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre",
});


const OpenSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-opensans",
});

const MerriWeather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
});

const InterFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})




const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Best Vocabulary',
  url: SITE_URL,
  logo: `${SITE_URL}/icons/icon-512x512.png`,
  description: 'Free platform to master the art of choosing words. AI-powered vocabulary learning with definitions, etymology, and curated word collections.',
  sameAs: [
    'https://twitter.com/bestvocabulary',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Best Vocabulary',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (

    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body className={`${playfairDisplay.variable} ${LibreBaskerville.variable} ${OpenSans.variable} ${MerriWeather.variable} ${InterFont.variable}`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <KeyboardShortcuts />
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
