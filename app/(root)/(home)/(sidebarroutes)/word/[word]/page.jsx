import React from 'react'
import word_list from "@/word_list.json"
import { PageHeaderHeading } from '@/components/page-header';
import { capitalizeString } from '@/lib/helper';
import Image from 'next/image';
import ReAccCard from '@/components/Cards/ReAccCard';

const page = ({ params }) => {
  const word = word_list?.find((word) => {
    console.log(word); // Debugging log
    return word.word === params.word; // Ensure a valid return condition
  });


  console.log(word, "word>>")

  return (
    <div className='p-10'>
      <div className="flex justify-between items-center">
        <div className="text-center flex-grow">
          <PageHeaderHeading>

            {capitalizeString(word?.word)}
          </PageHeaderHeading>
          <div>
            <p>{word?.response?.pronunciation}</p>

          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="cursor-pointer">
            <Image src="/save.png" width={30} height={30} alt="save" className="mt-2" />
          </div>
          <div className="cursor-pointer">
            <Image src="/share.png" width={30} height={30} alt="share" className="mt-2" />
          </div>
        </div>

      </div>

      <div className='mt-10'>
        <ReAccCard heading="Examples" list="" />
      </div>
    </div>
  )
}

export default page