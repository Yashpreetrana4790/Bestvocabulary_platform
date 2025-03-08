"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Crown } from "lucide-react"
import { ModeToggle } from "./modetoggler"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MobileNav } from "./Navbar/mobileNavbar"
import { navbarlinks } from "@/lib/helper"
import TokenCredit from "./TokenCredit"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4  flex h-14 w-full items-center ">
        {/* <MainNav /> */}
        <MobileNav />
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Crown />
            <span className="hidden font-bold sm:inline-block">Logophile</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navbarlinks.map(({ name, href, hidden }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === href || pathname?.startsWith(href)
                    ? "text-foreground"
                    : "text-foreground/60",
                  hidden ? "hidden lg:block" : "" // Hide QuickQuiz on small screens
                )}
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center  space-x-2 justify-end">
          <TokenCredit />
          <nav className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="px-1">

              <ModeToggle />
            </div>

          </nav>
        </div>
      </div>
    </header>
  )
}
