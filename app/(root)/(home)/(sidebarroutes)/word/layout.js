import { SidebarProvider } from "@/components/ui/sidebar";
import { WordDetailSidebar } from "./components/WordDetailSidebar";
import RightsideBar from "./components/RightsideBar";



export default function WordLayout({ children }) {
  return (
    <>
      <SidebarProvider>

        <WordDetailSidebar />
        <div className="w-full">
          {children}
        </div>
        <RightsideBar />
      </SidebarProvider>
    </>

  );
}
