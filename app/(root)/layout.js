import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from 'react';
import 'primeflex/primeflex.css'; // Optional: PrimeFlex for grid system
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // PrimeReact components
import 'primeicons/primeicons.css';


export default function RootLayout({ children }) {
  return (

    <main>
      <Navbar />
      <div>
        {children}
      </div>
      <Footer />
    </main>

  );
}
