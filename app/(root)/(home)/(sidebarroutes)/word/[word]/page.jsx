import React from 'react'
import { PageHeaderHeading } from '@/components/page-header';
import Image from 'next/image';
import { capitalizeString } from '@/lib/otherutil';
import { getSingleWord } from '@/services/wordapis';
import ReAccCard from '@/components/Cards/ReAccCard';
import MeaningCard from '@/components/Cards/MeaningCard';
import RightsideBar from '../components/RightsideBar';
import { SidebarProvider } from '@/components/ui/sidebar';

const page = async ({ params }) => {
  const singleWord = await getSingleWord(params);

  return (
    <div className='p-5'>
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

      <div className='mt-5 space-y-2 flex '>
        <div className='w-full'>

          {singleWord && singleWord?.meanings?.map((meaning) => (

            <MeaningCard key={meaning?.id} heading={meaning?.subtitle}
              post={meaning?.pos}
              meaning={meaning?.meaning}
              difficulty={meaning?.difficulty}
              examples={meaning?.example_sentences}
              commonUsage={meaning?.common_usage}
            />
          ))}
        </div>
        {singleWord && singleWord?.meanings?.map((meaning) => (

          <RightsideBar mnemonic={meaning?.mnemonic}
            historicalUsage={singleWord?.historical_usage}
          />
        ))}
      </div>
    </div>

  )
}

export default page