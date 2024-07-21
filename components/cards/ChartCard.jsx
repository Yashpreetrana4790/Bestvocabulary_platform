import React from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';

const ChartCard = ({ totalUsers, totalWords, monthlyWords }) => {
  const monthlyWordsData = monthlyWords ? {
    labels: monthlyWords.map(item => item.month),
    datasets: [
      {
        label: 'Words Added',
        data: monthlyWords.map(item => item.words),
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.4,
      },
    ],
  } : null;


  return (


    <div className="w-full">
      {totalUsers &&
        <Card title="Total Users" className=" text-center font-libre shadow-md border rounded-xl border-gray-200">
          <p className="text-4xl font-bold">{totalUsers}</p>
        </Card>
      }

      {totalWords &&
        <Card title="Total Words" className=" text-center font-libre fonti shadow-md border rounded-xl border-gray-200">
          <p className="text-4xl font-bold">{totalWords}</p>
        </Card>
      }
      {monthlyWordsData && (
        <Card title="Monthly Words Added" className=" text-center font-libre  shadow-md border rounded-xl border-gray-200">
          <Chart type="line" data={monthlyWordsData} />
        </Card>
      )}
    </div>
  );
};

export default ChartCard;
