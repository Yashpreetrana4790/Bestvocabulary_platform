'use client'
import React from 'react'
import { Button } from '../ui/button'

const InfoCard = ({ heading, desc, buttonText, handleAction, color = "bg-emerald-400" }) => {


  return (
    <div className='m-2 text-left '>
      <div className={`flex flex-col p-4    justify-between ${color} dark:bg-gray-800 shadow-md rounded-lg p-0 w-full`}>
        <div className=' text-black mb-2 text-left dark:text-yellow-200 text-base font-semibold'>
          {heading && heading}
        </div>

        <div className=' break-words text-sm text-left leading-snug'>
          {desc && desc}
        </div>
        {
          buttonText &&
          <div className='my-2'>
            <Button variant="default" onClick={handleAction}>
              <div >{buttonText}</div>
            </Button>
          </div>
        }
      </div>
    </div>
  )
}

export default InfoCard