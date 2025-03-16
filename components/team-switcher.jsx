"use client"

import { ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useState } from "react"

export function TeamSwitcher({
  userlevel, // use 'userlevel' as the prop name
}) {
  const { isMobile } = useSidebar()
  const [level, setLevel] = useState(userlevel[0]) // set default to the first level in the array

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div
                className={`flex aspect-square size-10 items-center justify-center rounded-lg bg-gray-300 ${level.logo === "/easy.png" ? "bg-gray-600" : ""}`}>
                <img src={level.logo} alt={`${level.name} logo`} className={`size-6 ${level.logo === "/easy.png" ? "invert" : ""}`} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {level.name}
                </span>
                <span className="truncate text-xs">{level.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}>
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Select Level
            </DropdownMenuLabel>
            {/* Correctly map over 'userlevel' */}
            {userlevel.map((level, index) => (
              <DropdownMenuItem key={level.name} onClick={() => setLevel(level)} className="gap-2 p-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-200 text-sidebar-primary-foreground">
                  <img src={level.logo} alt={`${level.name} logo`} className="size-4" />
                </div>
                {level.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
