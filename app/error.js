'use client'
import { Navbar } from '@/components/Navbar'
import Image from 'next/image'
import React from 'react'

export default function Error({ error, reset }) {
  return (
    <>
      <div className='h-screen'>
        <Navbar />
        <div className='flex flex-col items-center justify-center h-full gap-4'>
          <Image
            src="/500.png"
            width={500}
            height={500}
            alt="Something went wrong"
            className="w-full max-w-lg object-cover"
          />
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Try again
          </button>
        </div>
      </div>
    </>
  )
}