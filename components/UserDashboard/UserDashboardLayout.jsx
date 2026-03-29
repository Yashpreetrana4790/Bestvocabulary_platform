"use client"

import React from "react"
import UserSidebar from "@/components/UserDashboard/UserSidebar"

export default function UserDashboardLayout({ children, activeKey = "dashboard" }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-[-20%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-primary/[0.06] blur-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute bottom-[-25%] left-[-15%] h-[24rem] w-[24rem] rounded-full bg-violet-500/[0.05] blur-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.2] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border) / 0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.35) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
      </div>

      <div className="flex h-screen w-full overflow-hidden relative">
        <UserSidebar activeKey={activeKey} />
        <main className="flex-1 overflow-y-auto min-w-0">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 lg:py-11 text-[15px] leading-relaxed">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
