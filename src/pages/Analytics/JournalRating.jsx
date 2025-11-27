import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { Line } from "react-chartjs-2";
import {Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from "chart.js";

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const JournalRating = () => {
  const {entries}=useAppContext()

  const chartData = entries.filter((e) => e.rating).map((e)=>({
    date: e.createdAt?.toDate().toISOString().split("T")[0], 
    rating: Number(e.rating),
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

   const labels = chartData.map((e) => e.date);

   const dataPoints = chartData.map((e) => e.rating);

   const data = {
    labels,
    datasets: [
      {
        label: "Rating Trend",
        data: dataPoints,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Your Rating Trend Over Time",
      },
    },
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Rating Trend</h2>
      <Line data={data} options={options} />
    </div>
  )
}

export default JournalRating
