"use client"

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/helper";
import { Button } from "./ui/button";
import React from "react";

export function NavMain({
  items
}) {

  const searchParams = useSearchParams()
  const router = useRouter()

  const filterUpdate = (subItem, itemId) => {
    if (searchParams.get(itemId) === subItem) {
      const newUrl = removeKeysFromQuery({ params: searchParams.toString(), KeysToRemove: [itemId] })
      router.push(newUrl, { scroll: false })
      return
    }
    const newUrl = formUrlQuery({ params: searchParams.toString(), key: itemId, value: subItem })
    router.push(newUrl, { scroll: false })
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>

      <SidebarGroup>
        <SidebarGroupLabel>Filters</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight
                      className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <Button variant="primary" onClick={() => filterUpdate(subItem?.id, item?.id)}
                          className={`text-black  dark:text-white ${subItem?.id === searchParams.get(item?.id) ? "bg-gray-500 text-white" : ""}`}
                        >
                          {subItem.title}
                        </Button>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </React.Suspense>
  );
}
