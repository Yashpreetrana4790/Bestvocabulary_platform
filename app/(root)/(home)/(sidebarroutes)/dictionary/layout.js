import { SidebarProvider } from "@/components/ui/sidebar";
import { WodSb } from "./components/WodSb";


export default function DictionaryRouteLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <WodSb />
        {children}
      </SidebarProvider>
    </>

  );
}
