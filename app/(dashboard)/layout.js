import AdminNavbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";

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
