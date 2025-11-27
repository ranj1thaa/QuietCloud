import { useAppContext } from '../../context/AppContext';
import { Bar, Line } from 'react-chartjs-2';

import { Chart as ChartJs, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Title, Tooltip,Legend,} from 'chart.js';
import JournalRating from './JournalRating';
import JournalEntiresMonth from './JournalEntiresMonth';

ChartJs.register( CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const JournalAnalytics = () => {
  const { entries } = useAppContext();

  const moodCounts = entries.reduce((acc, entry) => {
    if (!entry.mood) return acc;
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const moodLabels = Object.keys(moodCounts);

  const barData = {
    labels: moodLabels,
    datasets: [
      {
        label: "Mood Count",
        data: moodLabels.map(label => moodCounts[label]),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        maxBarThickness: 1000,
      }
    ]
  };


  const dates = [...new Set(
    entries.map(e => e.createdAt?.toDate().toISOString().split("T")[0])
  )].sort();

  const moods = [...new Set(entries.map(e => e.mood).filter(Boolean))];

  const moodDataPerDate = {};
  dates.forEach(date => {
    moodDataPerDate[date] = {};
    moods.forEach(mood => {
      moodDataPerDate[date][mood] =
        entries.filter(
          e =>
            e.mood === mood &&
            e.createdAt?.toDate().toISOString().split("T")[0] === date
        ).length;
    });
  });

  const colors = ["red", "blue", "green", "orange", "purple", "teal"];

  const lineDatasets = moods.map((mood, index) => ({
    label: mood,
    data: dates.map(date => moodDataPerDate[date][mood]),
    borderColor: colors[index % colors.length],
    backgroundColor: colors[index % colors.length] + "50",
    fill: false,
    tension: 0.3,
    pointRadius: 4
  }));

  const lineData = { labels: dates, datasets: lineDatasets };

 return (
  <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
    <h2 className="text-center mb-4">Journal Analytics</h2>
    <p>Total journal entries: {entries.length}</p>

    <div style={{display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "space-between"}}>
      <div style={{flex: "1 1 48%", minWidth: "300px", height: "350px"}}>
        <h4 className="text-center">Mood Count</h4>
        <Bar 
          data={barData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "top" } }
          }}
        />
      </div>

      <div style={{ flex: "1 1 48%", minWidth: "300px", height: "350px",  }}>
        <h4 className="text-center">Mood Trend Over Time</h4>
        <Line
          data={lineData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "top" } }
          }}
        />
      </div>
    </div>

    <div style={{ marginTop: "50px" }}>
      <JournalRating />
    </div>

    <div style={{ marginTop: "50px" }}>
      <JournalEntiresMonth />
    </div>
  </div>
);

};

export default JournalAnalytics;
