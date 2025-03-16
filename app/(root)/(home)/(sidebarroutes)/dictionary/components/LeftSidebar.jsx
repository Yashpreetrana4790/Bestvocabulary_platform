"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  userlevel: [
    {
      name: "Beginner",
      logo: "/easy.png",
      plan: "Start with the basics",
    },
    {
      name: "Intermediate",
      logo: "/medium.png",
      plan: " Scale up to the next level",
    },
    {
      name: "Hard",
      logo: "/hard.png",
      plan: " Master the art of words",
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

}

const items = [

  {
    id: "difficulty",
    title: "Difficulty Level",
    items: [
      { id: "Beginner", title: "Beginner", },
      { id: "Intermediate", title: "Intermediate", },
      { id: "Advanced", title: "Advanced", },
    ],
  },
  {
    id: "length",
    title: "Word Length",
    items: [
      {
        id: "short", title: "Short (1-4 letters)",
      },
      {
        id: "medium", title: "Medium (5-8 letters)",
      },
      {
        id: "long", title: "Long (9+ letters)",
      },
    ],
  },
];


export function LeftSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props} className="md:block hidden mt-14">
      <SidebarHeader>
        <TeamSwitcher userlevel={data.userlevel} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
