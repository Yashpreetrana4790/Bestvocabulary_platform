import { SidebarProvider } from "@/components/ui/sidebar";
import { WodSb } from "./components/WodSb";
import { LeftSidebar } from "./components/LeftSidebar";
import { Suspense } from "react";


export default function DictionaryRouteLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <Suspense>
          <WodSb />
        </Suspense>
        <div className="w-full">
          {children}
        </div>
        <Suspense>

          <LeftSidebar />
        </Suspense>
      </SidebarProvider>
    </>

  );
}
