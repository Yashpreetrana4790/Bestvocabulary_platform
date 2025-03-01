import { Sidebar } from "lucide-react";
import { LearnSidebar } from "./components/LearnSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


export default function LearnRouteLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <LearnSidebar />
        <SidebarTrigger className="ml-150" />
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>

  );
}
