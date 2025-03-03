"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { navbarlinks, UserData } from "@/lib/helper"
import { siteConfig } from "@/config/siteconfig"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { NavUser } from "../nav-user"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="p-0">
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 ">
        <MobileLink
          href="/"
          className=""
          onOpenChange={setOpen}
        >
          <span className="font-bold text-xl">{siteConfig?.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh] pb-10 ">
          <div className="flex flex-col justify-between min-h-[calc(100vh-56px)] gap-10 ">
            <div className="flex flex-col ">
              {navbarlinks?.map(
                (item) =>
                  item.href && (
                    <MobileLink key={item.href} href={item.href} onOpenChange={setOpen} className={pathname === item.href ? "font-bold p-3 border bg-yellow-600 text-white mx-3 my-1 rounded-xl" : "p-3 my-1 mx-3"}>
                      {item.name}
                    </MobileLink>
                  )
              )}
            </div>
            <div>
            </div>
          </div>

        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}


function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
