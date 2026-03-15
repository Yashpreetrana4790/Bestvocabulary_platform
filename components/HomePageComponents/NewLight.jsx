import Image from 'next/image'
import React from 'react'
import { Eye } from 'lucide-react'

const NewLight = () => {
  return (
    <section className="py-12 sm:py-24 md:py-28 px-3 sm:px-4 relative overflow-hidden bg-muted/30">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-40 blur-[100px] bg-primary/10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full min-w-0">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary mb-4 sm:mb-6">
              <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Visual Learning
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-6 leading-tight">
              Discover words in a new light
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-8">
              See how words connect, evolve, and come to life. Our visual approach helps you understand relationships between words and remember them better.
            </p>
            <ul className="space-y-3 sm:space-y-4 inline-block text-left">
              {['Interactive word maps', 'Etymology visualizations', 'Connection graphs'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="relative order-first lg:order-last">
            <div className="absolute inset-0 rounded-3xl" />
            <Image
              width={600}
              height={400}
              alt="Word discovery visualization"
              src="/ad2wordlight.svg"
              className="w-full max-w-md mx-auto lg:max-w-none relative z-10 block dark:hidden"
            />
            <Image
              width={600}
              height={400}
              alt="Word discovery visualization"
              src="/ad2word.svg"
              className="w-full max-w-md mx-auto lg:max-w-none relative z-10 hidden dark:block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewLight
