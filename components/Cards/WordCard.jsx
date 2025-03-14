import IconsReturn from '@/lib/helper';
import { capitalizeString } from '@/lib/otherutil';
import { ArrowUpNarrowWide } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
const WordCard = ({ wordsdata }) => {
  const difficulty = wordsdata && wordsdata?.meanings?.[0].difficulty;
  const countOfMeanings = wordsdata && wordsdata?.meanings?.length

  const difficultyColors = {
    Easy: "bg-emerald-500",
    Beginner: "bg-emerald-500",
    Intermediate: "bg-amber-500",
    Hard: "bg-[#e11d48]",
    Medium: "bg-amber-500"
  };
  return (
    <div className="rounded-xl flex flex-col bg-white dark:bg-stone-900 outline outline-1 outline-gray-400 p-4">
      <div className="flex justify-between flex-wrap">
        <Link href={`/word/${wordsdata?.word}`} className="text-[24px] font-merriweather font-semibold">
          {capitalizeString(wordsdata?.word)}
        </Link>
        <div className="flex gap-2 items-center">
          <p>{wordsdata?.pronunciation}</p>
          <span
            className={`rounded-full px-2 text-sm text-white ${difficultyColors[difficulty] || "bg-gray-500"
              }`}
          >
            {difficulty == "Intermediate" ? "Medium" : difficulty}
          </span>
        </div>
      </div>

      <div className="flex flex-col ">
        <p className="leading-tight pt-1 font-opensans text-sm font-normal mb-2 line-clamp-2">
          {wordsdata?.meanings?.[0]?.subtitle}
        </p>

        <div className="border-t border-b border-black border-dotted py-2 flex flex-wrap gap-2">
          <span className="rounded-full px-2  text-sm bg-[#C5E8FF] text-black">
            Idiom  <span className="rounded-full p-[0.5px] w-5 bg-[#AAC5FE]"></span>
          </span>
          <span className="rounded-full px-2 text-sm bg-[#edeae4] text-black border border-[#a3a3a2bc]">
            {wordsdata?.meanings?.length > 1 ? `${countOfMeanings} meanings` : `${countOfMeanings} meaning`}
          </span>
        </div>

        <div className="flex flex-row py-2 gap-2">
          {wordsdata?.meanings?.map((meaning, index) => (
            <span key={index}>
              <IconsReturn category={meaning?.category?.toLowerCase() ?? "default"} />
            </span>
          ))}
        </div>


      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ArrowUpNarrowWide />
          <span>{wordsdata?.frequency}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="cursor-pointer">
            <Image src="/view.png" width={26} height={26} alt="view" />
          </div>
          <div className="cursor-pointer">
            <Image src="/save.png" width={30} height={30} alt="save" className="mt-2" />
          </div>
          <div className="cursor-pointer">
            <Image src="/share.png" width={30} height={30} alt="share" className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
