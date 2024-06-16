import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import './FocusChart.css';
import mockChrome from '../utils/mockChrome';

const chrome = typeof window.chrome !== 'undefined' ? window.chrome : mockChrome;

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const FocusChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(['focusData'], (result) => {
        const focusData = result.focusData || [];
        const dayAggregation = new Array(7).fill(0);

        focusData.forEach((data) => {
          dayAggregation[data.dayOfWeek] += data.duration;
        });

        const labels = daysOfWeek;
        const data = dayAggregation.map(duration => duration / 1000 / 60); // Convert milliseconds to minutes

        setChartData({ labels, data });
      });
    } else {
      // Handle the case where chrome.storage is not available (e.g., during development or testing)
      const mockData = new Array(7).fill(0).map(() => Math.random() * 100); // Mock data for testing
      setChartData({ labels: daysOfWeek, data: mockData });
    }
  }, []);

  useEffect(() => {
    if (chartData) {
      const ctx = document.getElementById('focusChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Focus Time (minutes)',
              data: chartData.data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div>
      <h2 id='graph-title' >Focus Time by Day of the Week</h2>
      <canvas id="focusChart" width="400" height="400"></canvas>
    </div>
  );
};

export default FocusChart;
