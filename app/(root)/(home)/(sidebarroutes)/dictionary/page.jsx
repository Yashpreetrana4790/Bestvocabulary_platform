
import WordCard from '@/components/Cards/WordCard';
import Pagination from '@/components/Common/Pagination';
import SearchBar from '@/components/search-bar';
import { getWords } from '@/services/wordapis';
import Image from 'next/image';
import React from 'react';




const Page = async ({ searchParams }) => {
  const wordslist = await getWords({
    page: searchParams.page,
    limit: 12,
    search: searchParams.search,
    difficulty: searchParams.difficulty,
    length: searchParams.length,
    startsWith: searchParams.startsWith
  });

  return (
    <div>
      <SearchBar route="/dictionary" />

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        {wordslist &&
          wordslist?.words.length > 0 && (

            wordslist?.words?.map((word) => (
              <WordCard key={word?.id} wordsdata={word} />
            ))
          )}

      </div>
      {wordslist?.words.length === 0 && (
        <>
          <div className='flex w-full items-center justify-center'>
            <Image src="/404.png" width={500} height={500} alt="404" />
          </div>
        </>
      )}

      {
        wordslist?.words.length > 0 &&
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          totalpage={wordslist?.total} />
      }
    </div>
  );
};

export default Page;
