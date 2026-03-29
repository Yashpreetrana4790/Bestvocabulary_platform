"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  User, Search, Sparkles, Command, ChevronDown,
  BookOpen, Brain, Layers, Calendar, Shuffle, Bookmark,
  FolderOpen, Briefcase, Stethoscope, Scale, Atom, Palette,
  Globe, Heart, Lightbulb, Map, ArrowRight, Menu, LogOut, Settings, LayoutDashboard
} from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { ModeToggle } from "./modetoggler"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const learnItemsBase = [
  { title: "Quiz", href: "/quiz", description: "Test your vocabulary knowledge", icon: Brain },
  { title: "Flashcards", href: "/flashcards", description: "Learn with interactive cards", icon: Layers },
  { title: "Word of the Day", href: "/wordofday", description: "Discover a new word daily", icon: Calendar },
  { title: "Random Word", href: "/random", description: "Explore random vocabulary", icon: Shuffle },
  { title: "Saved Words", href: "/bookmarks", description: "Your saved words", icon: Bookmark },
  { title: "Origin Maps", href: "/origins", description: "Explore word origins", icon: Map },
]

const categoryGroups = [
  {
    title: "Professional",
    categories: [
      { name: "Business", icon: Briefcase, href: "/dictionary?category=Business" },
      { name: "Medical", icon: Stethoscope, href: "/dictionary?category=Medical" },
      { name: "Legal", icon: Scale, href: "/dictionary?category=Legal" },
    ]
  },
  {
    title: "Academic",
    categories: [
      { name: "Science", icon: Atom, href: "/dictionary?category=Science" },
      { name: "Literature", icon: BookOpen, href: "/dictionary?category=Literature" },
      { name: "Philosophy", icon: Lightbulb, href: "/dictionary?category=Philosophy" },
    ]
  },
  {
    title: "Creative",
    categories: [
      { name: "Arts", icon: Palette, href: "/dictionary?category=Arts" },
      { name: "Psychology", icon: Heart, href: "/dictionary?category=Psychology" },
      { name: "Culture", icon: Globe, href: "/dictionary?category=Culture" },
    ]
  },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [learnExpanded, setLearnExpanded] = React.useState(false)
  const [categoriesExpanded, setCategoriesExpanded] = React.useState(false)
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const learnItems = React.useMemo(
    () => (isAuthenticated ? learnItemsBase : learnItemsBase.filter((item) => item.href !== "/bookmarks")),
    [isAuthenticated]
  )

  const isLearnActive = ["/quiz", "/flashcards", "/wordofday", "/random", "/bookmarks", "/origins"].some(p => pathname?.startsWith(p))
  const isCategoryActive = pathname?.startsWith("/categories") || pathname?.includes("category=")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-4">

          {/* Left: Logo only (mobile menu is on the right) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <Image
                src="/bv.png"
                alt="Best Vocabulary"
                width={44}
                height={44}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl shadow-sm"
                priority
                quality={100}
              />
              <span className="hidden sm:inline font-bold text-lg tracking-tight">Best Vocabulary</span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <NavigationMenu className="hidden xl:flex">
            <NavigationMenuList className="gap-0.5">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors",
                    pathname === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/dictionary" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors",
                    pathname?.startsWith("/dictionary") && !pathname?.includes("category=") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}>
                    Dictionary
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "h-9 px-3 text-sm font-medium bg-transparent hover:bg-muted hover:text-foreground data-[state=open]:bg-muted",
                  isCategoryActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                )}>
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[550px] p-5">
                    <div className="grid grid-cols-3 gap-5">
                      {categoryGroups.map((group) => (
                        <div key={group.title}>
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{group.title}</h4>
                          <div className="space-y-0.5">
                            {group.categories.map((cat) => {
                              const Icon = cat.icon
                              return (
                                <Link key={cat.name} href={cat.href} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors group">
                                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                  <span className="text-sm">{cat.name}</span>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t">
                      <Link href="/categories" className="flex items-center justify-center gap-2 p-2 rounded-md bg-primary/5 hover:bg-primary/10 text-primary text-sm font-medium">
                        <FolderOpen className="h-4 w-4" />
                        View all categories
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "h-9 px-3 text-sm font-medium bg-transparent hover:bg-muted hover:text-foreground data-[state=open]:bg-muted",
                  isLearnActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                )}>
                  Learn
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[450px] p-4">
                    <div className="grid grid-cols-2 gap-1">
                      {learnItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                          <Link key={item.href} href={item.href} className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition-colors",
                            isActive ? "bg-primary/10" : "hover:bg-muted"
                          )}>
                            <div className={cn(
                              "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                              isActive ? "bg-primary/20" : "bg-muted"
                            )}>
                              <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                            </div>
                            <div>
                              <p className={cn("text-sm font-medium", isActive ? "text-primary" : "")}>{item.title}</p>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right: Actions */}
          <div className="flex items-center gap-0.5 sm:gap-2">
            {/* AI Search */}
            <Link href="/search">
              <Button variant="outline" size="sm" className="h-8 sm:h-9 px-1.5 sm:px-3 gap-1 sm:gap-1.5 text-xs sm:text-sm border-none sm:border-input">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden lg:inline-flex h-5 items-center rounded border bg-muted px-1 text-[10px] font-mono">
                  <Command className="h-2.5 w-2.5" />K
                </kbd>
              </Button>
            </Link>

            <ModeToggle />

            {isAuthenticated && (
              <Link
                href="/dashboard"
                title="Dashboard"
                aria-current={pathname?.startsWith("/dashboard") ? "page" : undefined}
                className={cn(
                  "shrink-0 inline-flex items-center justify-center gap-1.5 rounded-md border transition-colors duration-200",
                  "h-8 sm:h-9 px-2 sm:px-2.5",
                  "text-xs sm:text-sm font-medium",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  pathname?.startsWith("/dashboard")
                    ? "border-primary/35 bg-primary/10 text-primary"
                    : "border-border/80 bg-background text-muted-foreground hover:border-primary/25 hover:bg-muted/40 hover:text-foreground",
                )}
              >
                <LayoutDashboard className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 opacity-90" strokeWidth={2} aria-hidden />
                <span className="hidden sm:inline leading-none">Dashboard</span>
              </Link>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 rounded-full">
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                        {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.fullName}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/dashboard"><LayoutDashboard className="h-4 w-4 mr-2" />Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/bookmarks"><Bookmark className="h-4 w-4 mr-2" />Saved Words</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/flashcards"><Layers className="h-4 w-4 mr-2" />Flashcards</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/quiz"><Brain className="h-4 w-4 mr-2" />Take Quiz</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30 [&_svg]:text-red-600 dark:[&_svg]:text-red-400"
                  >
                    <LogOut className="h-4 w-4 mr-2 shrink-0" aria-hidden />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="h-8 sm:h-9 px-2 sm:px-3 text-sm hidden sm:inline-flex">
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="h-8 sm:h-9 px-2 sm:px-3 text-sm">
                    <span className="hidden sm:inline">Get started</span>
                    <span className="sm:hidden">Sign up</span>
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button (right side on mobile) */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden h-9 w-9 sm:h-12 sm:w-12 shrink-0 [&_svg]:!h-6 [&_svg]:!w-6 sm:[&_svg]:!h-7 sm:[&_svg]:!w-7">
                  <Menu />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(280px,100vw-1rem)] sm:w-[min(320px,100vw-1rem)] max-w-[85vw] p-0 overflow-hidden flex flex-col h-full max-h-[100dvh]">
                <MobileNavContent
                  pathname={pathname}
                  setOpen={setMobileOpen}
                  learnExpanded={learnExpanded}
                  setLearnExpanded={setLearnExpanded}
                  learnItems={learnItems}
                  categoryGroups={categoryGroups}
                  categoriesExpanded={categoriesExpanded}
                  setCategoriesExpanded={setCategoriesExpanded}
                  isLearnActive={isLearnActive}
                  isCategoryActive={isCategoryActive}
                  user={user}
                  isAuthenticated={isAuthenticated}
                  logout={logout}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileNavContent({ pathname, setOpen, learnExpanded, setLearnExpanded, learnItems, categoryGroups, categoriesExpanded, setCategoriesExpanded, isLearnActive, isCategoryActive, user, isAuthenticated, logout }) {
  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b shrink-0">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
          <Image
            src="/bv.png"
            alt="Best Vocabulary"
            width={48}
            height={48}
            className="w-11 h-11 rounded-xl shadow-sm"
            quality={100}
          />
          <span className="font-bold text-lg tracking-tight">Best Vocabulary</span>
        </Link>
      </div>

      {/* Search */}
      <div className="p-3 border-b shrink-0">
        <Link href="/search" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium">AI Search</p>
            <p className="text-xs text-muted-foreground">Search by meaning</p>
          </div>
        </Link>
      </div>

      {/* Nav Links */}
      <ScrollArea className="flex-1">
        <nav className="p-3 space-y-1">
          <MobileNavLink href="/" active={pathname === "/"} onClick={() => setOpen(false)}>Home</MobileNavLink>
          {isAuthenticated && (
            <MobileNavLink href="/dashboard" active={pathname?.startsWith("/dashboard")} onClick={() => setOpen(false)}>
              Dashboard
            </MobileNavLink>
          )}
          <MobileNavLink href="/dictionary" active={pathname?.startsWith("/dictionary") && !pathname?.includes("category=")} onClick={() => setOpen(false)}>Dictionary</MobileNavLink>

          {/* Categories */}
          <div>
            <button onClick={() => setCategoriesExpanded(!categoriesExpanded)} className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium",
              isCategoryActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
            )}>
              Categories
              <ChevronDown className={cn("h-4 w-4 transition-transform", categoriesExpanded && "rotate-180")} />
            </button>
            {categoriesExpanded && (
              <div className="ml-3 mt-1 pl-3 border-l space-y-0.5">
                {categoryGroups.flatMap(g => g.categories).map((cat) => {
                  const CatIcon = cat.icon
                  return (
                    <Link key={cat.name} href={cat.href} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
                      <CatIcon className="h-4 w-4" />
                      {cat.name}
                    </Link>
                  )
                })}
                <Link href="/categories" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-primary font-medium">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>

          {/* Learn */}
          <div>
            <button onClick={() => setLearnExpanded(!learnExpanded)} className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium",
              isLearnActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
            )}>
              Learn
              <ChevronDown className={cn("h-4 w-4 transition-transform", learnExpanded && "rotate-180")} />
            </button>
            {learnExpanded && (
              <div className="ml-3 mt-1 pl-3 border-l space-y-0.5">
                {learnItems.map((item) => {
                  const ItemIcon = item.icon
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm",
                      pathname === item.href ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}>
                      <ItemIcon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </nav>
      </ScrollArea>

      {/* Footer - Auth */}
      <div className="p-3 border-t shrink-0 bg-background">
        {isAuthenticated ? (
          <div className="flex-col flex gap-2">
            <div className="flex items-center gap-3 p-2">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                <button className="w-full p-2.5 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors">
                  Dashboard
                </button>
              </Link>
              <Link href="/bookmarks" onClick={() => setOpen(false)}>
                <button className="w-full p-2.5 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors">
                  Saved
                </button>
              </Link>
            </div>
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Link href="/login" onClick={() => setOpen(false)}>
              <button className="w-full p-2.5 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors">
                Sign in
              </button>
            </Link>
            <Link href="/register" onClick={() => setOpen(false)}>
              <button className="w-full p-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Create account
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function MobileNavLink({ href, active, onClick, children }) {
  return (
    <Link href={href} onClick={onClick} className={cn(
      "block px-3 py-2.5 rounded-lg text-sm font-medium",
      active ? "bg-primary/10 text-primary" : "hover:bg-muted"
    )}>
      {children}
    </Link>
  )
}
