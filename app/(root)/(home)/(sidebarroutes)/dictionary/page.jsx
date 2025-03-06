import WordCard from '@/components/Cards/WordCard';
import SearchBar from '@/components/search-bar';
import React from 'react';
import word_list from "@/word_list.json"



console.log(word_list, "word_facts>>")
const wordslist = word_list.slice(0, 11)

const Page = () => {
  console.log(wordslist[0]?.response?.meanings[0], "wd")
  return (
    <div>
      <SearchBar />

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        {wordslist &&
          wordslist.map((word) => (
            <WordCard key={word.id} wordsdata={word} />
          ))
        }
      </div>
    </div>
  );
};

export default Page;
