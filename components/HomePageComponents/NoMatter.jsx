import Image from 'next/image'
import React from 'react'

const NoMatter = () => {
  return (
    <div className='px-4 my-14'>
      <div className='flex  items-center justify-center'>
        <div className='flex flex-col items-center justify-center relative '>
          <h2 className="font-playfair text-[26px] mb-4 md:text-[28px] max-lg:text-center font-normal dark:text-customBlue text-customBlue-dark">
            Expand Your Vocabulary—No Matter Your Age or Skill Level
          </h2>
          <p className='max-w-lg w-full text-center font-inter'>
            From young learners to professionals, our platform adapts to your needs.
            Improve your vocabulary for school, career, and beyond!
          </p>
          <Image
            width={600}
            height={600}
            alt="age level"
            src="/lvl.png"
            className="my-10"
          />
        </div>
      </div>
    </div>
  )
}

export default NoMatter