'use client'
import { Navbar } from '@/components/Navbar'
import Image from 'next/image'
import React from 'react'

const error = () => {
  return (
    <>
      <div className='h-screen'>

        <Navbar />
        <div className='flex items-center justify-center h-full'>
          <Image
            src="/500.png"
            width={500}
            height={500}
            objectFit="cover"
            className='  w-full max-w-lg'
          />
        </div>
      </div>
    </>
  )
}

export default error