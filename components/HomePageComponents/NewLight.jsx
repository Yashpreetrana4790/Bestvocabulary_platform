import Image from 'next/image'
import React from 'react'

const NewLight = () => {
  return (
    <>
      <div className='flex items-center justify-center relative'>
        <h2 className="font-playfair text-[26px] mb-4 md:text-[32px] max-lg:text-center font-normal text-customBlue">
          DISCOVER WORDS IN A NEW LIGHT  !
        </h2>
        <p>
        </p>
        <Image
          width={400}
          height={400}
          src="/line.png"
          className='absolute bottom-[-35px] max-w-40 '
        />
      </div>
      <div className='flex items-center justify-center py-10'>
        <Image
          width={800}
          height={800}
          src="/ad2word.svg"
        />

      </div>

    </>
  )
}

export default NewLight