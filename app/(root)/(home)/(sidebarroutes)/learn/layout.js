import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LearnSidebar from "./components/LearnSidebar";
import { LeftSidebar } from "../dictionary/components/LeftSidebar";


export default function LearnRouteLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <LearnSidebar />
        <div className="flex flex-col w-full">

          <SidebarTrigger className="ml-2" />
          <SidebarInset>
            {children}
          </SidebarInset>
        </div>
        asd
      </SidebarProvider>
    </>

  );
}
