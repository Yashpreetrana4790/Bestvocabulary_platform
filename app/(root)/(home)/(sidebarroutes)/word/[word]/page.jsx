import React from 'react'
import { PageHeaderDescription, PageHeaderHeading } from '@/components/page-header';
import Image from 'next/image';
import ReAccCard from '@/components/Cards/ReAccCard';
import { capitalizeString } from '@/lib/otherutil';

const page = ({ params }) => {




  return (
    <div className='p-10'>
      {/* <div className="flex justify-between items-center">
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
      <div className="py-5">
        {
          word?.response?.meanings && word?.response?.meanings?.length > 0 && word?.response?.meanings.map((word, index) => (
            <>
              <div className="flex ">
                <PageHeaderDescription>
                  {word?.subtitle}

                </PageHeaderDescription>
                <span>{word?.pos}</span>
              </div>
              <div className="flex flex-col gap-2  mb-4" >
                <ReAccCard heading="Meanings" list={word?.example_sentences} />
              </div>
            </>
          )
          )
        }

      </div> */}
    </div>

  )
}

export default page