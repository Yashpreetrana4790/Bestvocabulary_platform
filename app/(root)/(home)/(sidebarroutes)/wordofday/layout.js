import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { WodSidebar } from "./component/Wodsb";

export default function WordofDayLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <WodSidebar />
        <div className="flex flex-col w-full">
          <SidebarTrigger className="ml-2" />
          <SidebarInset>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  )
}