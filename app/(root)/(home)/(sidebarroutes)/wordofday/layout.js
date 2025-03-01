import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { WodSidebar } from "./component/Wodsb";

export default function WordofDayLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <WodSidebar />
        <SidebarTrigger className="ml-150" />
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}