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

const RightsideBar = ({ mnemonic, historicalUsage }) => {



  return (
    <div>

      <Sidebar side="right" className="mt-14 hidden xl:flex ">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel></SidebarGroupLabel>
            <SidebarGroupContent>
              {mnemonic &&
                <InfoCard
                  heading="mnemonic"
                  desc={mnemonic}
                  color="bg-cyan-200"
                />
              }
              <InfoCard
                heading="Hisotrical Usage"
                desc={historicalUsage}
                color="bg-amber-200"
              />

              <p></p>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}

export default RightsideBar