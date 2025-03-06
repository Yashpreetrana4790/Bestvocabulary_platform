"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import InfoCard from "@/components/Cards/InfoCard"
import word_facts from "@/word_facts.json"
import { Alphabets } from "@/lib/helper"
import { Toggle } from "@/components/ui/toggle"



export function WodSb({
  ...props
}) {


  const [oneFact, setOneFact] = React.useState('')



  const max = word_facts.length
  React.useEffect(() => {
    const num = Math.floor(Math.random() * max)
    setOneFact(word_facts[num])
  }, [])


  const handleAction = () => {
    const num = Math.floor(Math.random() * max)
    setOneFact(word_facts[num])
  }

  return (
    <Sidebar side="right" collapsible="icon" {...props} className="mt-14 ">
      <SidebarHeader className="my-3">
        Dictionary Hub
      </SidebarHeader>
      <SidebarContent>
        <div className="p-2 w-full">
          <span className="grid grid-cols-5 gap-2 place-content-center ">
            {Alphabets?.map((alphabet, index) => (
              <Toggle variant="highlighted" key={index} className="border text-center p-1 rounded-lg">{alphabet}</Toggle>
            ))
            }
          </span>
        </div>
        <div className="flex items-end ">
          <InfoCard heading="💡 Facts About Words" desc={oneFact?.fact} handleAction={handleAction} buttonText="Next fact" />
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
