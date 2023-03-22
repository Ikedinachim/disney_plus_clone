import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import Loader from "../../../loader";
import LineChart from "../../../charts/LineChart";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// export const options = {
//   maintainAspectRatio: false,
//   // responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Chart.js Line Chart",
//     },
//   },
// };

// export const data = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [55, 23, 30],
//       borderColor: "rgb(255, 99, 132)",
//       borderWidth: 1,
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: [1, 2, 4],
//       borderColor: "rgb(53, 162, 235)",
//       borderWidth: 1,
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

// export const Data = [
//   {
//     id: 1,
//     datasets: {
//       label: "Installations",
//       data: [0, 10, 23, 30, 80, 66, 33],
//       backgroundColor: [
//         "#1a73e9",
//         "&quot;#ecf0f1",
//         "#50AF95",
//         "#f3ba2f",
//         "#2a71d0",
//       ],
//       borderColor: "#1a73e9",
//       borderWidth: 2,
//     },
//   },
//   {
//     id: 2,
//     datasets: {
//       label: "Impressions",
//       data: [0, 20, 55, 23, 30, 11, 2],
//       backgroundColor: [
//         "#d83025",
//         "&quot;#ecf0f1",
//         "#50AF95",
//         "#f3ba2f",
//         "#2a71d0",
//       ],
//       borderColor: "#d83025",
//       borderWidth: 2,
//     },
//   },
//   {
//     id: 3,
//     datasets: {
//       label: "Clicks",
//       data: [20, 0, 23, 39, 27, 92, 40],
//       backgroundColor: [
//         "#f9ab00",
//         "&quot;#ecf0f1",
//         "#50AF95",
//         "#f3ba2f",
//         "#2a71d0",
//       ],
//       borderColor: "#f9ab00",
//       borderWidth: 2,
//     },
//   },
// ];

const AppDownloadActionsChart = ({ appDownloadAnalytics }) => {
  const [chartData] = useState({
    labels: appDownloadAnalytics?.labels,
    datasets: appDownloadAnalytics?.data
      ? appDownloadAnalytics?.data.map((data) => data.datasets)
      : [],
  });

  return (
    <div className="mg-t-20 overflow-scroll">
      {/* <Line options={options} data={data} />; */}
      <LineChart chartData={chartData} />
    </div>
  );
};

export default AppDownloadActionsChart;
