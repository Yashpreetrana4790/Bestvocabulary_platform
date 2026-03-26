"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bookmark,
  LayoutDashboard,
  User,
  Brain,
  Trophy,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useSavedWords } from "@/hooks/useSavedWords"
import { cn } from "@/lib/utils"

export default function UserSidebar({ activeKey }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const { savedWords } = useSavedWords()

  const totalXp = (savedWords?.length || 0) * 20
  const displayName =
    user?.fullName?.trim() ||
    (user?.email ? user.email.split("@")[0] : null) ||
    "Learner"
  const firstName = user?.fullName?.trim()?.split(/\s+/)[0] || displayName

  const items = [
    { key: "dashboard", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { key: "profile", label: "Profile", href: "/profile", icon: User },
    { key: "quiz", label: "Quiz", href: "/quiz", icon: Brain },
    { key: "results", label: "Results", href: "/quiz", icon: Trophy },
    { key: "saved", label: "Saved words", href: "/bookmarks", icon: Bookmark },
  ]

  function onLogout() {
    logout()
    router.push("/login")
  }

  return (
    <aside className="hidden lg:flex flex-col w-[17.5rem] xl:w-72 shrink-0 h-screen border-r border-border/60 bg-sidebar/80 backdrop-blur-xl">
      <div className="flex flex-col h-full overflow-hidden">
        <div className="px-5 pt-10 pb-8 border-b border-border/50">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-5">
              <div className="relative h-[4.5rem] w-[4.5rem] rounded-2xl bg-muted/50 border border-border/80 p-1.5 flex items-center justify-center overflow-hidden shadow-sm">
                <img
                  src="/maskot/maskot.gif"
                  alt=""
                  className="h-full w-full object-contain scale-110"
                />
              </div>
              <div
                className="absolute -top-1.5 -right-1.5 min-w-[1.75rem] h-7 px-1.5 rounded-lg bg-primary text-primary-foreground text-[11px] font-semibold tabular-nums flex items-center justify-center border-2 border-background shadow-sm"
                title="Points from saved words"
              >
                {totalXp}
              </div>
            </div>

            <h2 className="text-base font-semibold tracking-tight text-foreground line-clamp-2 w-full">
              {firstName}
            </h2>
            {user?.email ? (
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2 break-all">{user.email}</p>
            ) : null}
            <p className="mt-3 text-xs text-muted-foreground leading-snug max-w-[13rem]">
              Saved words add XP. Open Profile to see emblem unlocks and ranks.
            </p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          <p className="px-3 pb-3 text-xs font-medium text-muted-foreground">Menu</p>

          {items.map((item) => {
            const isActive = item.key === activeKey || (item.href !== "#" && pathname === item.href)
            const Icon = item.icon

            return (
              <div key={item.key}>
                {item.disabled ? (
                  <div
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl opacity-45 cursor-not-allowed"
                    title="Coming soon"
                  >
                    <Icon className="h-[1.125rem] w-[1.125rem] shrink-0 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-[1.125rem] w-[1.125rem] shrink-0",
                        isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
                      )}
                    />
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0 opacity-0 -translate-x-1 transition-all group-hover:opacity-50 group-hover:translate-x-0",
                        isActive && "opacity-60 translate-x-0 text-primary-foreground",
                      )}
                    />
                  </Link>
                )}
              </div>
            )
          })}
        </nav>

        <div className="p-3 border-t border-border/50">
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/25 transition-colors"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
              <LogOut className="h-4 w-4" aria-hidden />
            </span>
            Sign out
          </button>
        </div>
      </div>
    </aside>
  )
}
