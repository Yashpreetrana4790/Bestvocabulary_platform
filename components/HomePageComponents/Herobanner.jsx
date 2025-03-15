import React from 'react'
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Image from "next/image"

const Herobanner = () => {
  return (
    <>
      <div className="max:md:flex max:sm:flex-col lg:flex items-center justify-between px-4 md:px-[164px] py-20 md:py-24 gap-2">
        <div className="flex flex-col items-center justify-center lg:items-start">
          <h1 className="font-playfair text-[26px] mb-4  max-lg:text-center font-normal dark:text-customBlue text-customBlue-dark">
            BE THE MASTER OF WORDS
          </h1>
          <p className="font-inter font-base font-normal max-w-xl mb-5 max-lg:text-center">
            Words are more than just words – they carry emotions, context, and meaning. This platform helps you master the art of choosing the right word, understanding its multiple layers, and exploring its connections with other words.
          </p>
          <Button className="font-playfair rounded-xl" variant="default" >
            <Sparkles />
            Word Treasure
          </Button>
        </div>
        <div className="flex items-center justify-center px-5">
          <Image
            width={400}
            height={400}
            alt="student"
            className='my-5'
            src="/std.svg"
          />

        </div>
      </div>
    </>
  )
}

export default Herobanner