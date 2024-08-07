'use client'
import React, { useState } from 'react';
import Searchbar from '@/components/searchbar/Searchbar';
import { Button } from 'primereact/button';
import WordCard from '@/components/cards/WordCard';
import { Tag } from 'primereact/tag';
import ReTag from '@/components/Tag/Tag';
import { filterItemsGrouped } from '@/constants';
import { Carousel } from 'primereact/carousel';

const Page = () => {
  const [activeFilter, setActiveFilter] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const themes = ['Business', 'Travel', 'Academic'];

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };



  return (
    <div className="flex mt-10 container mx-auto dictionary">


      <aside className="max-w-[300px] w-full p-4 bg-gray-100 rounded-xl divide-y-1 lg:block hidden">

        <h2 className="text-2xl mt-5 font-bold mb-4 font-libre text-red-900 text-center">A-Z Words</h2>
        <div className="mb-3 w-full sidebar-section" id="quick-practice-section">
          <Button icon="pi pi-search " className=" w-full !text-center gap-2 ml-2  font-xl rounded-md bg-red-900 text-white p-2 ">Advance Search</Button>
        </div>
        <div className="mb-6 ">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-2xl w-full">
              {Array.from({ length: 26 }, (_, index) => (
                <button
                  key={index}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded mb-2"
                  style={{ minWidth: '40px' }} // Adjust button width for smaller screens
                >
                  {String.fromCharCode(65 + index)}
                </button>
              ))}
            </div>
            <div className='mt-2 w-full'>
              <Button icon="pi pi-sort-alpha-down-alt" className=" w-full !text-center gap-2 ml-2  font-xl rounded-md bg-red-900 text-white p-2 " label="Sort Z-A Words  " />
            </div>
          </div>
        </div>



      </aside>
      {/* Main Content */}
      <main className=" p-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4 font-playfair w-full">The Ultimate Dictionary</h1>
          <p className="text-sm text-center text-gray-700 font-merriweather">
            Discover and master words with our advanced search and filter options.
          </p>
          <div className=''>
            {/* <ReTag items={filterItemsGrouped} /> */}
          </div>
          <Searchbar style="transform 2xl:translate-y-10 max-mg: mt-5  " />
        </header>

        <div className='grid grid-cols-1 md:grid-cols-2  gap-4 place-content-center'>
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
        </div>

      </main>
    </div>
  );
};

export default Page;
