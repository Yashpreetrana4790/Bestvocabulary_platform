import React from 'react'

import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { FaRegBookmark } from 'react-icons/fa';
import HoverCard from './HoverCard';

const WordCard = () => {
  return (
    <>

      <div className="max-w-xs rounded border shadow-lg">
        <div className="px-4 py-4 ">
          <div className=" flex items-center justify-between mb-2">
            <p className='font-bold font-libre  text-xl   text-center'>
              Logophile
            </p>
            <span className='flex gap-2'>

              <span className='text-center mb-2'>
                <span > ˈlɒɡ.ə.faɪl </span>
              </span>
              /
              <Badge value="Easy" className='bg-emerald-400 rounded-xl mb-1.5' />
            </span>
          </div>
          <p className="text-gray-700 text-base line-clamp-3">
            "Logophile" refers to a person who loves words; specifically, someone who enjoys studying and exploring words and languages. The term is derived from Greek roots: "logo-" meaning "word" or "speech," and "-phile" meaning "lover of." Thus, a logophile is someone who has a passion for words, whether it involves their meanings, origins, usage, or etymology.
          </p>
          <div className='flex justify-between items-center'>

            <div className='flex gap-2'>
              <Button icon="pi pi-share-alt" className='mt-5 p-2 rounded-full bg-slate-100' />
              <Button icon="pi pi-bookmark" className=" mt-5 p-2 rounded-full bg-slate-100 p-button-rounded p-button-text" />
            </div>
            <div className='mt-5'>
              <HoverCard icon="pi pi-lightbulb" tooltipText="Multifaceted Usage" />
              <HoverCard icon="pi pi-sparkles" tooltipText="This word is part of Pro section" />
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default WordCard