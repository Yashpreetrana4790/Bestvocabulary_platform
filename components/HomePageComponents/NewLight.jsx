import Image from 'next/image'
import React from 'react'
import { Eye } from 'lucide-react'

const NewLight = () => {
  return (
    <section className="py-28 px-4 relative overflow-hidden bg-muted/30">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-40 blur-[100px] bg-primary/10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Eye className="h-4 w-4" />
              Visual Learning
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Discover words in a new light
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              See how words connect, evolve, and come to life. Our visual approach helps you understand relationships between words and remember them better.
            </p>
            <ul className="space-y-4">
              {['Interactive word maps', 'Etymology visualizations', 'Connection graphs'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0  rounded-3xl" />
            <Image
              width={600}
              height={400}
              alt="Word discovery visualization"
              src="/ad2wordlight.svg"
              className="w-full relative z-10 block dark:hidden"
            />
            <Image
              width={600}
              height={400}
              alt="Word discovery visualization"
              src="/ad2word.svg"
              className="w-full relative z-10 hidden dark:block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewLight
