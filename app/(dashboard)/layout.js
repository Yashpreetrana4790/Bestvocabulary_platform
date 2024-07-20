
import React from 'react';
import 'primeflex/primeflex.css'; // Optional: PrimeFlex for grid system
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // PrimeReact components
import 'primeicons/primeicons.css';
import 'primeicons/primeicons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


export const metadata = {
  title: "Best Vocabulary",
  description: "This is the Admin Dashboard for Best Vocabulary",
};



export default function AdminLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
