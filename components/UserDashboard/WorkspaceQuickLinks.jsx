"use client"

import Link from "next/link"
import { BookOpen, Search, Sun, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const LINKS = [
  {
    href: "/dictionary",
    title: "Dictionary",
    description: "Browse words by letter and category",
    icon: BookOpen,
  },
  {
    href: "/search",
    title: "Search by meaning",
    description: "Describe an idea; get matching words",
    icon: Search,
  },
  {
    href: "/wordofday",
    title: "Word of the day",
    description: "A fresh word on each visit",
    icon: Sun,
  },
]

export default function WorkspaceQuickLinks({ className }) {
  return (
    <section className={cn("mb-10 sm:mb-12", className)} aria-labelledby="workspace-explore-heading">
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <h2 id="workspace-explore-heading" className="text-lg font-semibold tracking-tight text-foreground">
            Explore
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">Other ways to grow your list</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {LINKS.map(({ href, title, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "group relative flex flex-col rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5",
              "transition-colors hover:bg-card/80 hover:border-primary/25",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-muted-foreground opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                aria-hidden
              />
            </div>
            <h3 className="mt-3 font-medium text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-snug">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
