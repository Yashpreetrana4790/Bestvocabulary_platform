import { auth } from '@/auth';
import VocabularyChart from '@/components/cards/Categorcount';
import ChartCard from '@/components/cards/ChartCard'
import React from 'react'

const admindashboard = async () => {

  const monthlyWords = [
    { month: 'Jan', words: 120 },
    { month: 'Feb', words: 150 },
    { month: 'Mar', words: 130 },
    { month: 'Apr', words: 180 },
  ];


  const session = await auth()

  if (!session.user) return null



  console.log(session, "session man")
  return (
    <div className='w-full'>

      <div className=' flex flex-row w-full gap-5 p-5'>
        <div className='max-w-xl px-5'>
          <VocabularyChart />
        </div>
        <ChartCard totalUsers={1500}
        />
        <ChartCard
          totalWords={5000}
        />
      </div>
      <div className='max-w-xl px-5' >
        <ChartCard
          monthlyWords={monthlyWords}
        />
      </div>

    </div>
  )
}

export default admindashboard