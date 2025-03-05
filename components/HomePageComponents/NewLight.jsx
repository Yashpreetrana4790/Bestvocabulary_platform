import Image from 'next/image'
import React from 'react'

const NewLight = () => {
  return (
    <>
      <div className='px-4'>

        <div className='flex items-center justify-center relative '>
          <h2 className="font-playfair text-[26px] mb-4 md:text-[28px] max-lg:text-center font-normal dark:text-customBlue text-customBlue-dark">
            DISCOVER WORDS IN A NEW LIGHT  !
          </h2>
          <p className='max-md:hidden'>
          </p>
          <Image
            width={800}
            height={400}
            src="/line.png"
            className='absolute md:bottom-[-40px]  bottom-[-20px] w-full  max-w-[200px] md:max-w-lg '
          />
        </div>
        <div className='flex items-center justify-center py-14'>

          <Image
            width={400}
            height={400}
            alt="student"
            src="/ad2wordlight.svg"
            className='w-full max-w-xl block dark:hidden'

          />

          {/* Dark mode image */}
          <Image
            width={400}
            height={400}
            alt="student"
            src="/ad2word.svg"
            className='w-full max-w-xl hidden dark:block'

          />

        </div>
      </div>

    </>
  )
}

export default NewLight