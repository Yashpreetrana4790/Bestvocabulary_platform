"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { 
  Menu, Sparkles, Crown, ChevronDown, ChevronRight,
  Home, BookOpen, Brain, Layers, Calendar, Shuffle, Bookmark,
  FolderOpen, Briefcase, Stethoscope, Scale, Atom, Palette,
  GraduationCap, Globe, Heart, Lightbulb, Map, Search
} from "lucide-react"

const learnItems = [
  { title: "Quiz", href: "/quiz", icon: Brain, description: "Test your knowledge" },
  { title: "Flashcards", href: "/flashcards", icon: Layers, description: "Interactive cards" },
  { title: "Word of the Day", href: "/wordofday", icon: Calendar, description: "Daily word" },
  { title: "Random Word", href: "/random", icon: Shuffle, description: "Discover randomly" },
  { title: "Bookmarks", href: "/bookmarks", icon: Bookmark, description: "Saved words" },
  { title: "Origin Maps", href: "/origins", icon: Map, description: "Word origins" },
]

const categoryItems = [
  { name: "Business", icon: Briefcase, href: "/dictionary?category=Business" },
  { name: "Medical", icon: Stethoscope, href: "/dictionary?category=Medical" },
  { name: "Legal", icon: Scale, href: "/dictionary?category=Legal" },
  { name: "Science", icon: Atom, href: "/dictionary?category=Science" },
  { name: "Literature", icon: BookOpen, href: "/dictionary?category=Literature" },
  { name: "Arts", icon: Palette, href: "/dictionary?category=Arts" },
  { name: "Philosophy", icon: Lightbulb, href: "/dictionary?category=Philosophy" },
  { name: "Psychology", icon: Heart, href: "/dictionary?category=Psychology" },
  { name: "Culture", icon: Globe, href: "/dictionary?category=Culture" },
]

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const [learnExpanded, setLearnExpanded] = React.useState(false)
  const [categoriesExpanded, setCategoriesExpanded] = React.useState(false)
  const pathname = usePathname()

  const isLearnActive = ["/quiz", "/flashcards", "/wordofday", "/random", "/bookmarks", "/origins"].some(p => pathname?.startsWith(p))
  const isCategoryActive = pathname?.startsWith("/categories") || pathname?.includes("category=")

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-9 w-9 rounded-lg"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b bg-muted/30">
            <MobileLink href="/" onOpenChange={setOpen} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md shadow-primary/20">
                <Crown className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg block">Best Vocabulary</span>
                <span className="text-xs text-muted-foreground">Learn words better</span>
              </div>
            </MobileLink>
          </div>

          {/* Quick Search */}
          <div className="p-4 border-b">
            <MobileLink 
              href="/search" 
              onOpenChange={setOpen}
              className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">AI Search</p>
                <p className="text-xs text-muted-foreground">Search by meaning</p>
              </div>
              <Search className="h-4 w-4 text-muted-foreground" />
            </MobileLink>
          </div>

          {/* Navigation Links */}
          <ScrollArea className="flex-1">
            <nav className="p-3 space-y-1">
              {/* Home */}
              <MobileLink
                href="/"
                onOpenChange={setOpen}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  pathname === "/" 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground hover:bg-muted"
                )}
              >
                <Home className="h-4 w-4" />
                Home
              </MobileLink>

              {/* Dictionary */}
              <MobileLink
                href="/dictionary"
                onOpenChange={setOpen}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  pathname?.startsWith("/dictionary") && !pathname?.includes("category=")
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground hover:bg-muted"
                )}
              >
                <BookOpen className="h-4 w-4" />
                Dictionary
              </MobileLink>

              {/* Categories - Collapsible */}
              <div>
                <button
                  onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    isCategoryActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <FolderOpen className="h-4 w-4" />
                    Categories
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    categoriesExpanded && "rotate-180"
                  )} />
                </button>
                
                {categoriesExpanded && (
                  <div className="mt-1 ml-4 pl-4 border-l space-y-1">
                    {categoryItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <MobileLink
                          key={item.name}
                          href={item.href}
                          onOpenChange={setOpen}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                        >
                          <Icon className="h-4 w-4" />
                          {item.name}
                        </MobileLink>
                      )
                    })}
                    <MobileLink
                      href="/categories"
                      onOpenChange={setOpen}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-primary hover:bg-primary/10 transition-all font-medium"
                    >
                      View all categories
                      <ChevronRight className="h-4 w-4" />
                    </MobileLink>
                  </div>
                )}
              </div>

              {/* Learn - Collapsible */}
              <div>
                <button
                  onClick={() => setLearnExpanded(!learnExpanded)}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    isLearnActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-4 w-4" />
                    Learn
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    learnExpanded && "rotate-180"
                  )} />
                </button>
                
                {learnExpanded && (
                  <div className="mt-1 ml-4 pl-4 border-l space-y-1">
                    {learnItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <MobileLink
                          key={item.href}
                          href={item.href}
                          onOpenChange={setOpen}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                            isActive 
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <div className="flex-1">
                            <span className="block">{item.title}</span>
                            <span className="text-xs text-muted-foreground">{item.description}</span>
                          </div>
                        </MobileLink>
                      )
                    })}
                  </div>
                )}
              </div>
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t bg-muted/30">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Expand your vocabulary</span>
              <span className="flex items-center gap-1">
                <Crown className="h-3 w-3" />
                10K+ words
              </span>
            </div>
          </div>
        </div>
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
