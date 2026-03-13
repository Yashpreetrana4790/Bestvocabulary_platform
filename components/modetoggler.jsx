"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 mt-2">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer gap-2">
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer gap-2">
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer gap-2">
          <Monitor className="h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
