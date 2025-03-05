import * as React from "react"



import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import ToggleFilter from "@/components/ToggleFilter";



const LearnSidebar = async ({ ...props }) => {

  return (
    <Sidebar collapsible="icon" {...props} className="mt-14 ">
      <SidebarHeader className="font-bold">
        Random Word Hunt
      </SidebarHeader>
      <SidebarContent  >
        <SidebarMenuButton>

          <React.Suspense fallback={<div>Loading...</div>}>

            <ToggleFilter
              options={[
                { label: "Easy", value: "easy" },
                { label: "Medium", value: "medium" },
                { label: "Hard", value: "hard" }
              ]}
              paramKey="difficulty"
            />
          </React.Suspense>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <React.Suspense fallback={<div>Loading...</div>}>

            <ToggleFilter
              options={[
                { label: "Idioms", value: "idioms" },
                { label: "Words", value: "words" },
              ]}
              type="single"
              paramKey="difficulty"
            />
          </React.Suspense>
        </SidebarMenuButton>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>

  );
}

export default LearnSidebar