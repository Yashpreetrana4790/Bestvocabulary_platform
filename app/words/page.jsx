'use client'
import WordCard from "@/components/cards/WordCard"

import { Sidebar } from 'primereact/sidebar';
import { useState } from "react";
import { Button } from 'primereact/button';

const page = () => {
  const [visible, setVisible] = useState(false)
  const [level, setLevel] = useState("basic")


  const handleFilterChange = (item) => {
    setLevel(item)
  }
  return (
    <div className="container mx-auto">
      <div className="  mt-10 mb-10">
        <div className="flex justify-center gap-1">
          <div className="max-w-[200px] w-full hidden  md:flex gap-5 items-start basis-3/12 ">
            <div className="bg-gray-200 rounded-sm p-2 max-w-[50px] max-h-[40px] ">
              <div className="card flex justify-content-center">
                <Sidebar visible={visible} onHide={() => setVisible(false)}>
                  <h2 className="text-xl mb-2 font-bold">Best Vocabulary</h2>
                  <p>
                    Welcome to the ultimate platform for mastering English vocabulary! Enhance your language skills through interactive learning and engaging activitie
                  </p>
                </Sidebar>
                <Button icon="pi pi-angle-double-right  w-full max-w-[20px]" onClick={() => setVisible(true)} />
              </div>
            </div>
            <div className="p-4 rounded-sm bg-gray-50  w-full max-w-[250px] md:block hidden ">
              <h3 className="text-xm font-semibold text-center mb-4">Filter by Level</h3>
              <div className="flex justify-between flex-col space-y-3">
                <button
                  className={`flex-1 px-1 mx-1 py-2 rounded-lg ${level === 'basic' ? 'bg-black text-white' : 'bg-transparent text-gray-800'} `}
                  onClick={() => handleFilterChange('basic')}
                >
                  Basic
                </button>
                <button
                  className={`flex-1 px-1 mx-1 py-2 rounded-lg ${level === 'intermediate' ? 'bg-black text-white' : 'bg-transparent text-gray-800'} `}
                  onClick={() => handleFilterChange('intermediate')}
                >
                  Intermediate
                </button>
                <button
                  className={`flex-1 mx-1 py-2 px-1 rounded-lg ${level === 'advanced' ? 'bg-black text-white' : 'bg-transparent text-gray-800'} `}
                  onClick={() => handleFilterChange('advanced')}
                >
                  Advanced
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4   basis-9/12    ">

            <div class=" w-full px-4 max-w-[500px] md:ml-10 flex items-center justify-center">

              <input type="text" placeholder="Search..." class="bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-lg py-2 px-4 w-full pr-10 min-w-[200px]" />


            </div>
            <div className="grid 2xl:grid-cols-2  sm:grid-cols-2 grid-cols-1  gap-4  place-content-center">
              <WordCard />
              <WordCard />
              <WordCard />
              <WordCard />
              <WordCard />
              <WordCard />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page