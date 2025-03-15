
'use client'
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import InfoCard from "@/components/Cards/InfoCard"
import { Alphabets, formUrlQuery, removeKeysFromQuery } from "@/lib/helper"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"



export function WodSb({
  ...props
}) {

  const searchParams = useSearchParams()
  const router = useRouter()






  const handleStartWith = (alphabet) => {
    if (searchParams.get("startsWith") === alphabet) {
      const newUrl = removeKeysFromQuery({ params: searchParams.toString(), KeysToRemove: ["startsWith"] })
      router.push(newUrl, { scroll: false })
      return
    }
    const newUrl = formUrlQuery({ params: searchParams.toString(), key: "startsWith", value: alphabet })
    router.push(newUrl, { scroll: false })
  }

  return (
    <Sidebar side="right" collapsible="icon" {...props} className="mt-10   ">
      <SidebarHeader className="my-3">
        Dictionary Hub
      </SidebarHeader>
      <SidebarContent>
        <div className="p-2 w-full">
          <span className="grid grid-cols-5 gap-2 place-content-center ">
            {Alphabets?.map((alphabet, index) => (
              <div key={index} className={`border text-center cursor-pointer p-1 rounded-lg ${searchParams.get("startsWith") === alphabet ? "bg-gray-500 text-white" : ""}`}
                onClick={() => handleStartWith(alphabet)} >{alphabet}</div>
            ))
            }
          </span>
        </div>
        <div className="flex items-end ">
          {/* <InfoCard heading="💡 Facts About Words" desc={oneFact?.fact} handleAction={handleAction} buttonText="Next fact" /> */}
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
