import { Navbar } from "@/components/Navbar";
import MainSidebar from "@/components/sidebar/sidebar";


export default function SidebarRoutes({ children }) {
  return (
    <>
      <MainSidebar />
        {children}
    </>

  );
}
