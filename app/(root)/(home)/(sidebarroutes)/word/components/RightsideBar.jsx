import React from 'react'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import InfoCard from '@/components/Cards/InfoCard'

const RightsideBar = () => {
  return (
    <div>

      <Sidebar side="right" className="mt-14 hidden xl:flex ">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel></SidebarGroupLabel>
            <SidebarGroupContent>
              <InfoCard
                heading="Etymology"
                desc="she is the person whogfgs fgsdfg dsfyery tuaght he is the a"
                color="bg-cyan-200"
              />

              <InfoCard
                heading="Mnemonic"
                desc="The root word is achieve which means to successfully complete something to mean able to be achieved"
                color="bg-amber-200"
              />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}

export default RightsideBar