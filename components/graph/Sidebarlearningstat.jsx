'use client'
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

const SidebarLearningStats = () => {
  const [learningData, setLearningData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Mock data (replace with actual data from your application)
    const overallProgress = {
      learningWords: 750,         // Example: Total words learned
      practicingWords: 400,       // Example: Total words practiced
      searchedQuestions: 150,     // Example: Total questions searched
      savedQuestions: 50          // Example: Total questions saved
    };

    const data = {
      labels: ['Learning', 'Practicing', 'Searched', 'Saved'],
      datasets: [
        {
          data: [
            overallProgress.learningWords,
            overallProgress.practicingWords,
            overallProgress.searchedQuestions,
            overallProgress.savedQuestions
          ],
          backgroundColor: [
            '#007BFF', // Blue for Learning Words
            '#28A745', // Green for Practicing Words
            '#FFC107', // Yellow for Searched Questions
            '#DC3545'  // Red for Saved Questions
          ]
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          legend: {
              display: true,
              position: 'bottom',
              labels: {
                  font: {
                      size: 12,
                      weight: 'bold'
                  }
              }
          },
          tooltip: {
              enabled: true,
              callbacks: {
                  label: (tooltipItem) => {
                      return `${tooltipItem.label}: ${tooltipItem.raw}`;
                  }
              }
          }
      },
      animation: {
          animateRotate: true,
          animateScale: true
      },
      aspectRatio: 1,
      cutout: '80%',  // Inner radius of the doughnut hole
      // Additional options as needed
  };
    setLearningData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="p-col-12 sidebar">
      <div className="card">
        <h5 className="text-center mt-3">Learning Stats</h5>
        {learningData.datasets && (
          <Chart type="doughnut" data={learningData} options={chartOptions} />
        )}

      </div>
    </div>
  );
};

export default SidebarLearningStats;
