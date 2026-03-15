import Image from 'next/image'
import React from 'react'
import { Users } from 'lucide-react'

const NoMatter = () => {
  return (
    <section className="py-12 sm:py-24 md:py-28 px-3 sm:px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-30 blur-[100px] bg-primary/10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full min-w-0">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1 min-w-0">
            <Image
              width={500}
              height={500}
              alt="Learning levels for all ages"
              src="/lvl.png"
              className="w-full max-w-[280px] sm:max-w-sm md:max-w-md mx-auto"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary mb-4 sm:mb-6">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              For Everyone
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-6 leading-tight">
              No matter your age or skill level
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-8">
              From young learners taking their first steps to professionals seeking precision, our platform adapts to meet you where you are.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              {[
                { label: 'Beginner', desc: 'Start easy' },
                { label: 'Intermediate', desc: 'Build skills' },
                { label: 'Advanced', desc: 'Master words' },
              ].map((level, i) => (
                <div key={i} className="text-center p-2.5 sm:p-4 rounded-lg sm:rounded-xl bg-muted/50 min-w-0">
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
