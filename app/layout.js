
import React from 'react';
import Head from "next/head";
import "./globals.css";
import { Libre_Baskerville, Merriweather, Open_Sans, Playfair_Display } from "next/font/google";

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

    <html lang="en" suppressHydrationWarning={true}>
      <Head>

      </Head>
      <body className={`${playfairDisplay.variable} ${LibreBaskerville.variable} ${OpenSans.variable} ${MerriWeather.variable}`}>
        {children}
      </body>
    </html>
  );
}
