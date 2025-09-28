import React, { useRef, useEffect } from 'react';
import './Analytics.css';

const Analytics = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Import Chart.js only on client side
    import('chart.js/auto').then(({ Chart }) => {
      if (chartRef.current && !chartInstance.current) {
        const ctx = chartRef.current.getContext('2d');
        
        // Dummy data for the chart
        const data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Students',
              data: [1200, 1250, 1300, 1250, 1300, 1350],
              backgroundColor: 'rgba(14, 89, 242, 0.2)',
              borderColor: '--primary-color-3',
              borderWidth: 2,
              tension: 0.3
            },
            {
              label: 'Teachers',
              data: [40, 42, 43, 44, 45, 45],
              backgroundColor: 'rgba(248, 229, 89, 0.2)',
              borderColor: '#F8E559',
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
              ticks: {
                callback: function(value) {
                  return value;
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
    <div className="analytics-page">
      <div className="page-header">
        <h2>Analytics Dashboard</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--color-6)' }}>
            <i className="fas fa-user-graduate" style={{ color: 'var(--primary-color-1)' }}></i>
          </div>
          <div className="stat-info">
            <h3>1,350</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(24, 187, 155, 0.1)' }}>
            <i className="fas fa-chalkboard-teacher" style={{ color: '#18BB9B' }}></i>
          </div>
          <div className="stat-info">
            <h3>45</h3>
            <p>Total Teachers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(239, 173, 78, 0.1)' }}>
            <i className="fas fa-school" style={{ color: '#EFAD4E' }}></i>
          </div>
          <div className="stat-info">
            <h3>24</h3>
            <p>Total Classes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(233, 87, 87, 0.1)' }}>
            <i className="fas fa-money-bill-wave" style={{ color: '#E95757' }}></i>
          </div>
          <div className="stat-info">
            <h3>92%</h3>
            <p>Fee Collection Rate</p>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h3>Growth Analytics</h3>
        </div>
        <div className="card-body">
          <div className="analytics-chart">
            <canvas ref={chartRef} id="analyticsChart" width="400" height="300"></canvas>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="content-card">
          <div className="card-header">
            <h3>Attendance Summary</h3>
          </div>
          <div className="card-body">
            <div className="attendance-summary">
              <div className="summary-item">
                <span className="summary-label">Overall Attendance</span>
                <span className="summary-value">89%</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">This Month</span>
                <span className="summary-value">92%</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Last Month</span>
                <span className="summary-value">87%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <h3>Performance Metrics</h3>
          </div>
          <div className="card-body">
            <div className="performance-metrics">
              <div className="metric-item">
                <span className="metric-label">Average Exam Score</span>
                <span className="metric-value">78%</span>
              </div>   
                <div className="metric-item">
                <span className="metric-label">Pass Rate</span>
                <span className="metric-value">85%</span>
              </div>
                <div className="metric-item">
                <span className="metric-label">Top Performing Class</span>
                <span className="metric-value">10th Grade A</span>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}
export default Analytics;