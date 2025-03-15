'use client'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/helper';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export const SearchBar = ({ route }) => {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  const [search, setSearch] = React.useState(query || "");


  useEffect(() => {
    const delaydebounce = setTimeout(() => {

      if (search) {
        const newurl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: search || ""
        })
        router.push(newurl, { scroll: false })
      }
      else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            KeysToRemove: ["search"]
          });
          router.push(newUrl, { scroll: false })
        }
      }
    }, 300)

    return () => clearTimeout(delaydebounce)
  }, [query, pathname, search, router, searchParams]);


  return (
    <div className='flex items-center justify-center px-2 pt-5 pb-5  object-cover dark:bg-transparent bg-bottom  bg-zinc-200 '>
      <div className='max-w-3xl w-full border rounded-xl relative'>
        <input type="text" placeholder='Search' className='w-full p-3 rounded-xl'
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className='absolute top-3 right-3 ml-2' />
      </div>
    </div>
  );
};

export default SearchBar; // ✅ Default export
