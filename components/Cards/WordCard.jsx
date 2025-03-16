import IconsReturn from '@/lib/helper';
import { capitalizeString } from '@/lib/otherutil';
import { ArrowUpNarrowWide } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const WordCard = ({ wordsdata }) => {
  if (!wordsdata) return null; // Ensure data exists

  const countOfMeanings = wordsdata?.meanings?.length || 0;

  const difficultyColors = {
    E: "bg-emerald-500",
    M: "bg-amber-500",
    H: "bg-[#e11d48]",
  };

  const difficultyMap = {
    Easy: "E",
    Beginner: "E",
    Medium: "M",
    Intermediate: "M",
    Hard: "H",
    Advanced: "H",
  };

  // Calculate difficulty counts for the current word
  const difficultyCount = {};
  wordsdata?.meanings?.forEach(meaning => {
    const abbreviation = difficultyMap[meaning.difficulty];
    if (abbreviation) {
      difficultyCount[abbreviation] = (difficultyCount[abbreviation] || 0) + 1;
    }
  });

  const uniqueDifficulties = Object.keys(difficultyCount);

  return (
    <div className="rounded-xl flex flex-col bg-white dark:bg-stone-900 outline outline-1 outline-gray-400 p-4">
      <div className="flex justify-between ">
        <Link href={`/word/${wordsdata?.word}`} className="text-[24px] font-merriweather font-semibold">
          {capitalizeString(wordsdata?.word)}
        </Link>
      </div>
      <div className="flex gap-2 items-center justify-end">
        <p>{wordsdata?.pronunciation}</p>
        {uniqueDifficulties.map((abbr, index) => (
          <span
            key={index}
            className={`rounded-full px-2 text-sm text-white ${difficultyColors[abbr] || "bg-gray-500"}`}
          >
            {abbr} {difficultyCount[abbr]}
          </span>
        ))}
      </div>

      <div className="flex flex-col">
        <p className="leading-tight pt-1 font-opensans text-sm font-normal mb-2 line-clamp-2">
          {wordsdata?.meanings?.[0]?.subtitle || "No subtitle available"}
        </p>

        <div className="border-t border-b border-black border-dotted dark:border-white py-2 flex flex-wrap gap-2">
          <span className="rounded-full px-2 text-sm bg-[#C5E8FF] text-black">
            Idiom <span className="rounded-full p-[0.5px] w-5 bg-[#AAC5FE]"></span>
          </span>
          <span className="rounded-full px-2 text-sm bg-[#edeae4] text-black border border-[#a3a3a2bc]">
            {countOfMeanings} {countOfMeanings === 1 ? "meaning" : "meanings"}
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
          <span>{wordsdata?.frequency || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          {["view", "save", "share"].map((icon, index) => (
            <div key={index} className="cursor-pointer">
              <Image src={`/${icon}.png`} width={30} height={30} alt={icon} className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordCard;
