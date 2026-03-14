import Herobanner from "@/components/HomePageComponents/Herobanner"
import FeaturedWords from "@/components/HomePageComponents/FeaturedWords"
import Features from "@/components/HomePageComponents/Features"
import Categories from "@/components/HomePageComponents/Categories"
import NewLight from "@/components/HomePageComponents/NewLight"
import NoMatter from "@/components/HomePageComponents/NoMatter"
import CTASection from "@/components/HomePageComponents/CTASection"
import React, { Suspense } from "react"

export default function Home() {
  return (
    <main>
      <Herobanner />

      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedWords />
      </Suspense>

      <Features />

      <Categories />

      <NewLight />

      <NoMatter />

      <CTASection />
    </main>
  )
}

function SectionSkeleton() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="h-6 bg-muted/50 rounded w-48 mx-auto mb-12 animate-pulse" />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-80 bg-muted/50 rounded-3xl animate-pulse" />
          <div className="h-80 bg-muted/50 rounded-3xl animate-pulse" />
        </div>
      </div>
    </section>
  )
}
