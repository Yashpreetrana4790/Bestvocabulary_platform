import AdminNavbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";
import 'primeflex/primeflex.css'; // Optional: PrimeFlex for grid system
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // PrimeReact components
import 'primeicons/primeicons.css';

export const metadata = {
  title: "Best Vocabulary",
  description: "This is the Admin Dashboard for Best Vocabulary",
};


export default function AdminLayout({ children }) {
  return (
    <div className='flex w-full '>
      <AdminSidebar />
      <main className='flex flex-col w-full'>
        <AdminNavbar />
        {children}
      </main>
    </div>
  );
}
