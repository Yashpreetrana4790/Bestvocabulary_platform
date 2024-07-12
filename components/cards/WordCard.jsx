import Image from 'next/image'
import React from 'react'
const WordCard = () => {
  return (
    <>

      <div className="max-w-xs rounded overflow-hidden shadow-lg">
        <div className="px-4 py-4">
          <div className="font-bold text-xl uppercase mb-2 text-center">
            Logophile</div>
          <div className='text-center mb-2'>
            <span > ˈlɒɡ.ə.faɪl </span>
          </div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-4 pt-2 pb-2 text-center">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Walk</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Travel</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Itenerant</span>
        </div>
      </div>
    </>
  )
}

export default WordCard