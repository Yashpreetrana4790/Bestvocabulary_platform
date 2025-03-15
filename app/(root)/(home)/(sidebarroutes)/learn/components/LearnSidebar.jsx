import * as React from "react"



import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"



const LearnSidebar = async ({ ...props }) => {

  return (
    <Sidebar collapsible="icon" {...props} className="mt-14 ">
      <SidebarHeader className="font-bold">
        Random Word Hunt
      </SidebarHeader>
      <SidebarContent  >

      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>

  );
}

export default LearnSidebar