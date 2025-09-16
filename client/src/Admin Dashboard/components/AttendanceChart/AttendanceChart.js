import React, { useEffect, useRef } from 'react';
import './AttendanceChart.css';

const AttendanceChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Import Chart.js only on client side
    import('chart.js/auto').then(({ Chart }) => {
      if (chartRef.current && !chartInstance.current) {
        const ctx = chartRef.current.getContext('2d');
        
        // Dummy data for the chart
        const data = {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [
            {
              label: 'Present',
              data: [85, 78, 90, 88, 93, 45],
              backgroundColor: 'rgba(24, 187, 155, 0.2)',
              borderColor: '#18BB9B',
              borderWidth: 2,
              tension: 0.3
            },
            {
              label: 'Absent',
              data: [15, 22, 10, 12, 7, 5],
              backgroundColor: 'rgba(233, 87, 87, 0.2)',
              borderColor: '#E95757',
              borderWidth: 2,
              tension: 0.3
            }
          ]
        };
        
        const options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
            }
          }
        };
        
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: data,
          options: options
        });
      }
    });

    // Cleanup function to destroy chart instance
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="attendance-chart">
      <canvas ref={chartRef} id="attendanceChart" width="400" height="250"></canvas>
    </div>
  );
};

export default AttendanceChart;