import Image from 'next/image'
import React from 'react'
import { Users } from 'lucide-react'

const NoMatter = () => {
  return (
    <section className="py-16 sm:py-24 md:py-28 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-30 blur-[100px] bg-primary/10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Image
              width={500}
              height={500}
              alt="Learning levels for all ages"
              src="/lvl.png"
              className="w-full max-w-sm sm:max-w-md mx-auto"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Users className="h-4 w-4" />
              For Everyone
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              No matter your age or skill level
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8">
              From young learners taking their first steps to professionals seeking precision, our platform adapts to meet you where you are.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { label: 'Beginner', desc: 'Start easy' },
                { label: 'Intermediate', desc: 'Build skills' },
                { label: 'Advanced', desc: 'Master words' },
              ].map((level, i) => (
                <div key={i} className="text-center p-3 sm:p-4 rounded-xl bg-muted/50">
                  <p className="font-semibold text-foreground text-sm">{level.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{level.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NoMatter
