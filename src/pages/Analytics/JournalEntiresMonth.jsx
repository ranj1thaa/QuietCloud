import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from 'chart.js';

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const JournalEntiresMonth = () => {
  const { entries } = useAppContext();

  const monthCounts = entries.reduce((acc, entry) => {
    if (!entry.createdAt) return acc;
    const month = entry.createdAt.toDate().toISOString().slice(0, 7);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const sortedMonths = Object.keys(monthCounts).sort();

  const data = {
    labels: sortedMonths,
    datasets: [
      {
        label: 'Entries Per Month',
        data: sortedMonths.map((month) => monthCounts[month]),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Journal Entries Per Month',
      },
    },
  };

  return (
    <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px', marginTop: '20px' }}>
      <h2>Entries Per Month</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default JournalEntiresMonth
