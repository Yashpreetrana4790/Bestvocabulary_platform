"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Calendar } from "@/components/ui/calendar"
import InfoCard from "@/components/Cards/InfoCard"
import word_facts from "@/word_facts.json"
import { Alphabets } from "@/lib/helper"
import { Toggle } from "@/components/ui/toggle"

// This is sample data.
const data = {
  user: {
    name: "Rambler",
    email: "Rambler@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}


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
    <Sidebar collapsible="icon" {...props} className="mt-14 ">
      <SidebarHeader className="my-3">
        Dictionary Hub
      </SidebarHeader>
      <SidebarContent>
        <div className="p-2 w-full">
          <span class="grid grid-cols-5 gap-4 place-content-center ">
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
