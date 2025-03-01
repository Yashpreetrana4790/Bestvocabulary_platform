import React from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const MainSidebar = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main>
        <SidebarTrigger />
      </main>  
      </SidebarProvider>
    </div>
  )
}

export default MainSidebar