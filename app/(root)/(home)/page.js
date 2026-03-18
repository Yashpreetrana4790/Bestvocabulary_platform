import Herobanner from "@/components/HomePageComponents/Herobanner"
import FeaturedWords from "@/components/HomePageComponents/FeaturedWords"
import Features from "@/components/HomePageComponents/Features"
import Categories from "@/components/HomePageComponents/Categories"
import NewLight from "@/components/HomePageComponents/NewLight"
import NoMatter from "@/components/HomePageComponents/NoMatter"
import CTASection from "@/components/HomePageComponents/CTASection"
import LoadingWordFact from "@/components/LoadingWordFact"
import React, { Suspense } from "react"

export default function Home() {
  return (
    <main className="overflow-x-hidden min-w-0">
      <Herobanner />

      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedWords />
      </Suspense>

      <NewLight />

      <Categories />

      <Features />

      <NoMatter />

      <CTASection />
    </main>
  )
}

function SectionSkeleton() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="h-7 w-32 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-10 w-64 bg-muted rounded-lg mx-auto animate-pulse" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* WOD Card Skeleton */}
          <div className="rounded-2xl sm:rounded-3xl border bg-card/80 p-5 sm:p-6 md:p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-10 h-10 rounded-xl bg-muted animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                <div className="h-3 w-32 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="h-12 sm:h-14 md:h-16 w-3/4 bg-muted rounded-lg mb-3 animate-pulse" />
            <div className="h-4 w-24 bg-muted rounded mb-6 animate-pulse" />
            <div className="space-y-2 mb-8">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-10 w-36 bg-muted rounded-full animate-pulse" />
          </div>

          {/* Popular Words Skeleton */}
          <div>
            <div className="flex items-center justify-between mb-5 px-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 rounded-full bg-muted animate-pulse" />
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-4 w-16 bg-muted rounded animate-pulse" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 rounded-xl border bg-card/50">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-5 w-28 bg-muted rounded animate-pulse" />
                      <div className="h-3 w-40 bg-muted rounded animate-pulse" />
                    </div>
                    <div className="h-6 w-16 bg-muted rounded-lg animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 max-w-xl mx-auto">
          <LoadingWordFact variant="card" />
        </div>
      </div>
    </section>
  )
}
