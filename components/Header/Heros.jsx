import Link from 'next/link'
import React from 'react'

const Heros = ({ heading, para, buttoncontent, className }) => {
  return (
    <section className={`w-full  py-12 md:py-16 2xl:py-28 ${className && className}`}>
      <div className="container flex flex-col items-center justify-center gap-6 px-4 md:px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tighter font-libre text-red-900  sm:text-5xl md:text-6xl lg:text-7xl">
          {heading}
        </h1>
        {para &&
          <p className="max-w-[700px] text-lg md:text-md font-opensans">
            {para}
          </p>
        }
        <Link
          href="/words"
          prefetch={false}
        >
          {buttoncontent}
        </Link>
      </div>
    </section>
  )
}

export default Heros