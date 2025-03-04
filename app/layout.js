
import React from 'react';

import "./globals.css";
import { Inter, Libre_Baskerville, Merriweather, Open_Sans, Playfair_Display } from "next/font/google";
import { ThemeProvider } from 'next-themes';

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

const InterFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})




export default function RootLayout({ children }) {
  return (

    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${playfairDisplay.variable} ${LibreBaskerville.variable} ${OpenSans.variable} ${MerriWeather.variable} ${InterFont.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
