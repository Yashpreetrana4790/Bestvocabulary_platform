import { Search } from 'lucide-react';
import React from 'react';

export const SearchBar = () => {
  return (
    <div className='flex items-center justify-center px-2 pt-5 pb-5 bg-students object-cover bg-bottom'>
      <div className='max-w-3xl w-full border rounded-xl relative'>
        <input type="text" placeholder='Search' className='w-full p-3 rounded-xl' />
        <Search className='absolute top-3 right-3 ml-2' />
      </div>
    </div>
  );
};
