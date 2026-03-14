import React from 'react';
import ReAccCard from './ReAccCard';

const MeaningCard = ({ heading, pos, meaning, difficulty, examples, commonUsage }) => {




  console.log(commonUsage, "cm")
  const difficultyMap = {
    Easy: "bg-emerald-300",
    Beginner: "bg-emerald-300",
    Medium: "bg-amber-500",
    Intermediate: "bg-amber-500",
    Hard: "bg-[#e11d48]",
    Advanced: "bg-[#e11d48]",
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-600 p-4 m-2">
      <div className='flex justify-between items-start gap-2'>

        <h3 className="text-base font-semibold capitalize">{heading} {pos && `/ ${pos} `}</h3>
        <span className={`text-sm font-semibold text-white px-2 py-1 rounded-full ${difficultyMap[difficulty]}`}>{difficulty}</span>
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300 my-2">{meaning && meaning}</p>

      <div className='bg-white p-3'>
        <h2 className='font-bold mb-2'>Common Usage</h2>
        {
          commonUsage && commonUsage?.map((item, index) => (
            <>
              <p key={index} className='text-amber-900 mb-1'>{item.context}</p>
              <p key={index} className='italic'>{item.example}</p>
            </>
          ))
        }

      </div>
      <ReAccCard
        heading="Examples"
        list={examples}
      />
    </div>
  );
};

export default MeaningCard;
