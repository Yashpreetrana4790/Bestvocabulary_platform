import React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import SmartSearchBar from "@/components/SmartSearchBar"

const Herobanner = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center px-4 py-16 sm:py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Floating orbs - behind everything */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
        
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        
        {/* Grid pattern - more visible */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(128, 128, 128, 0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Radial fade - only at edges */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, hsl(var(--background)) 100%)`
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm px-5 py-2 text-sm font-medium text-primary mb-10 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          10,000+ words with rich definitions
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
          Master the art of
          <span className="relative block mt-2">
            <span className="text-primary">choosing words</span>
            <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 sm:w-40 md:w-48 h-3 text-primary/30" viewBox="0 0 200 12" fill="none">
              <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Discover meanings, explore connections, and expand your vocabulary 
          with <span className="text-foreground font-medium">AI-powered search</span> and curated word collections.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <SmartSearchBar />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/dictionary">
            <Button size="lg" className="rounded-full px-8 h-12 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
              Explore Dictionary
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <Link href="/wordofday">
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base font-medium hover:bg-primary/5 transition-all">
              Word of the Day
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            Free to use
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            No signup required
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            Updated daily
          </div>
        </div>
      </div>
    </section>
  )
}

export default Herobanner
