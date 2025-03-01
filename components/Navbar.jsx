"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Crown } from "lucide-react"
import { ModeToggle } from "./modetoggler"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 flex h-14 w-full items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Crown />
            <span className="hidden font-bold sm:inline-block">
              Logophile
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Home
            </Link>
            <Link
              href="/wordofday"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/wordofday"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Word of the Day
            </Link>
            <Link
              href="/dictionary"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/dictionary")
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Dictionary
            </Link>
            <Link
              href="/learn"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/learn")
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Learn
            </Link>
            <Link
              href="/quiz"
              className={cn(
                "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
              )}
            >
              QuickQuiz 
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
