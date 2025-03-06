import { SidebarProvider } from "@/components/ui/sidebar";
import { WodSb } from "./components/WodSb";
import { LeftSidebar } from "./components/LeftSidebar";


export default function DictionaryRouteLayout({ children }) {
  return (
    <>
      <SidebarProvider>

        <WodSb />
        <div className="w-full  ">
          {children}
        </div>

        <LeftSidebar />
      </SidebarProvider>
    </>

  );
}
