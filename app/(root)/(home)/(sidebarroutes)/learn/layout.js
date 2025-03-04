import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LearnSidebar from "./components/LearnSidebar";


export default function LearnRouteLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <LearnSidebar />
        <div className="flex flex-col">

          <SidebarTrigger className="" />
          <SidebarInset>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>

  );
}
