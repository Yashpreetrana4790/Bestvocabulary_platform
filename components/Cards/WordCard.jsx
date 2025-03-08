import { ArrowUpNarrowWide, HeartPulse } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const WordCard = ({ wordsdata }) => {
  const difficulty = wordsdata?.response?.meanings?.[0]?.difficulty;

  const difficultyColors = {
    Easy: "bg-emerald-500",
    Beginner: "bg-emerald-500",
    Intermediate: "bg-amber-500",
    Hard: "bg-[#e11d48]",
    Medium : "bg-amber-500"
  };

  return (
    <Link href={`/word/${ wordsdata?.word}`} className="rounded-xl flex flex-col bg-white dark:bg-stone-900 outline outline-1 outline-gray-400 p-4">
      <div className="flex justify-between flex-wrap">
        <h2 className="text-[28px] font-merriweather font-semibold">
          {wordsdata?.word}
        </h2>
        <div className="flex gap-2 items-center">
          <p>{wordsdata?.response?.pronunciation} / </p>
          <span
            className={`rounded-full px-2 text-sm text-white ${difficultyColors[difficulty] || "bg-gray-500"
              }`}
          >
            {difficulty}
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="leading-tight font-opensans text-sm font-normal mb-2 line-clamp-2">
          {wordsdata?.response?.meanings?.[0]?.subtitle}
        </p>

        <div className="border-t border-b border-black border-dotted py-2 flex flex-wrap gap-2">
          <span className="rounded-full px-2  text-sm bg-[#C5E8FF] text-black">
            Idiom & phrase <span className="rounded-full p-1 min-w-5 bg-[#AAC5FE]">2</span>
          </span>
          <span className="rounded-full px-2 text-sm bg-[#FAB62D] text-black border border-[#C69E00]">
            8+ meanings
          </span>
        </div>

        <div className="py-2">
          <HeartPulse size={24} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ArrowUpNarrowWide />
            <span>Low</span>
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
    </Link>
  );
};

export default WordCard;
