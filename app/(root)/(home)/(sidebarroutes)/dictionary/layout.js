import { Navbar } from "@/components/Navbar";
import MainSidebar from "@/components/sidebar/sidebar";


export default function DictinoaryLayout({ children }) {
  return (
    <>
      <MainSidebar />
      {children}
    </>

  );
}
