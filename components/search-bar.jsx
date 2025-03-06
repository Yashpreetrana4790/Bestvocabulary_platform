import { Search } from 'lucide-react';
import React from 'react';

export const SearchBar = () => {
  return (
    <div className='flex items-center justify-center px-2 pt-5 pb-5  object-cover dark:bg-transparent bg-bottom bg-gradient-to-r from-gray-200 from-40%  via-slate-200 from-20% to-zinc-200 to-90% '>
      <div className='max-w-3xl w-full border rounded-xl relative'>
        <input type="text" placeholder='Search' className='w-full p-3 rounded-xl' />
        <Search className='absolute top-3 right-3 ml-2' />  
      </div>
    </div>
  );
};

export default SearchBar; // ✅ Default export
