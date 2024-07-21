import React from 'react'

import { Badge } from 'primereact/badge';

const WordCard = () => {
  return (
    <>

      <div className="max-w-xs rounded overflow-hidden border shadow-lg">
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
        </div>

      </div>
    </>
  )
}

export default WordCard