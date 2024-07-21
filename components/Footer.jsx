import { sidebarLinks } from '@/constants'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  console.log("test")
  return (
    <>
      <footer className="bg-black text-gray-300 mt-auto py-4">
        <div className="container  px-4">
          <div className="flex justify-between items-center">
            <div>
              <p className='italic'>&copy; 2024 Best Vocabulary </p>
            </div>
            <div className='hidden md:block'>
              <ul className="flex space-x-4">
                {sidebarLinks?.map((x) => {
                  return (
                    <Link href={x.route}>

                      <li key={x.id} className='text-white font-bold'>{x?.label}</li>
                    </Link>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer