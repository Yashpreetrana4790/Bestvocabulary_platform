import React from 'react';
import { Chart } from 'primereact/chart';

const VocabularyChart = () => {
  // Simulate API data with random counts
  const categories = [
    { label: 'Pro Vocabulary', count: Math.floor(Math.random() * 100) },
    { label: 'Basic Vocabulary', count: Math.floor(Math.random() * 100) },
    { label: 'Mathematics Vocabulary', count: Math.floor(Math.random() * 100) },
    { label: 'Advanced Vocabulary', count: Math.floor(Math.random() * 100) },
    { label: 'History Vocabulary', count: Math.floor(Math.random() * 100) },
    { label: 'Geography Vocabulary', count: Math.floor(Math.random() * 100) },
    { label: 'Music Vocabulary', count: Math.floor(Math.random() * 100) },
    { label: 'Business Vocabulary', count: Math.floor(Math.random() * 100) },
    { label: 'Academic Vocabulary', count: Math.floor(Math.random() * 100) },
    { label: 'Technical Vocabulary', count: Math.floor(Math.random() * 100) }
  ];

  const chartData = {
    labels: categories.map(item => item.label),
    datasets: [
      {
        data: categories.map(item => item.count),
        backgroundColor: [
          '#34d399', '#fbbf24', '#60a5fa', '#c084fc', '#f87171',
          '#f472b6', '#a78bfa', '#facc15', '#4ade80', '#22d3ee',
        ],
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="w-full md:w-30rem">
      <Chart type="pie" data={chartData} options={chartOptions} />
    </div>
  );
};

export default VocabularyChart;
