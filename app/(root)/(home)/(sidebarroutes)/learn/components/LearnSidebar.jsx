"use client"

import * as React from "react"



import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";



export function LearnSidebar({
  ...props
}) {



  return (
    <Sidebar collapsible="icon" {...props} className="mt-14 ">
      <SidebarHeader className="font-bold">
        Random Word Hunt
      </SidebarHeader>
      <SidebarContent>
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="a">Easy</ToggleGroupItem>
          <ToggleGroupItem value="b">Medium</ToggleGroupItem>
          <ToggleGroupItem value="c">Hard</ToggleGroupItem>
        </ToggleGroup>
        <SidebarMenuButton>
          Test
        </SidebarMenuButton>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
