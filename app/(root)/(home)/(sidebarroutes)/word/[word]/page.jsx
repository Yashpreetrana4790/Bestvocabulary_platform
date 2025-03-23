import React from 'react'
import { PageHeaderDescription, PageHeaderHeading } from '@/components/page-header';
import Image from 'next/image';
import ReAccCard from '@/components/Cards/ReAccCard';
import { capitalizeString } from '@/lib/otherutil';
import { getSingleWord } from '@/services/wordapis';

const page = async ({ params }) => {
  const singleWord = await getSingleWord(params);

  console.log(singleWord, "sin")

  return (
    <div className='p-10'>
      <div className="flex justify-between items-center">
        <div className="text-center flex-grow">
          <PageHeaderHeading>
            {capitalizeString(singleWord?.word)}
          </PageHeaderHeading>
          <div>
            <p>{singleWord?.pronunciation}</p>
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

    </div>

  )
}

export default page