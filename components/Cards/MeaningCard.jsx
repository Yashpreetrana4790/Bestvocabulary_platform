import React from 'react';
import ReAccCard from './ReAccCard';

const MeaningCard = ({ heading, pos, meaning, difficulty, examples }) => {





  const difficultyMap = {
    Easy: "bg-emerald-300",
    Beginner: "bg-emerald-300",
    Medium: "bg-amber-500",
    Intermediate: "bg-amber-500",
    Hard: "bg-[#e11d48]",
    Advanced: "bg-[#e11d48]",
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-300 p-4 m-2">
      <div className='flex justify-between items-start gap-2'>

        <h3 className="text-base font-semibold capitalize">{heading} {pos && `/ ${pos} `}</h3>
        <span className={`text-sm font-semibold text-white px-2 py-1 rounded-full ${difficultyMap[difficulty]}`}>{difficulty}</span>
      </div>
      <p className="text-base text-gray-700 dark:text-gray-300 mt-2">{meaning && meaning}</p>
      <ReAccCard
        heading="Examples"
        list={examples}
      />
    </div>
  );
};

export default MeaningCard;
