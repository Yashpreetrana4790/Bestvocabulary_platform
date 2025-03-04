'use client'
import React from 'react'
import { Button } from '../ui/button'

const InfoCard = ({ heading, desc, buttonText, handleAction,  }) => {


  return (
    <div className='m-2 '>
      <div className="flex flex-col pb-4  text-center  items-center justify-between bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg p-0 w-full">
        <div className='p-4 text-black  dark:text-yellow-500 text-base font-semibold'>
          {heading}
        </div>

        <div className='p-2 break-words text-sm text-left leading-snug'>
          {desc && desc}
        </div>
        <div className='my-2'>
          <Button variant="default" onClick={handleAction}>
            <div >{buttonText}</div>
          </Button>
        </div>  
      </div>
    </div>
  )
}

export default InfoCard