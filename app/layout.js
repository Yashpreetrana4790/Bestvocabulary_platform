
import React from 'react';
import 'primeflex/primeflex.css'; // Optional: PrimeFlex for grid system
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // PrimeReact components
import 'primeicons/primeicons.css';
import Head from "next/head";
import Script from "next/script";
import 'primeicons/primeicons.css';
import "./globals.css";
import { Libre_Baskerville, Merriweather, Open_Sans, Playfair_Display } from "next/font/google";
import { SessionProvider } from "next-auth/react"

export const metadata = {
  title: "Best Vocabulary",
  description: "Master english vocabulary",
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





export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <Head>
        <Script rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/primeicons/primeicons.css" />

      </Head>
        <body className={`${playfairDisplay.variable} ${LibreBaskerville.variable} ${OpenSans.variable} ${MerriWeather.variable}`}>
          {children}
        </body>
    </html>
  );
}
