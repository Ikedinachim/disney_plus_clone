// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";

export const options = {
  // responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const LineChart = ({ chartData }) => {
  return (
    <div className="chart-container mobile-chart">
      {/* <h2 style={{ textAlign: "center" }}>Line Chart</h2> */}
      <Line data={chartData} options={options} />
    </div>
  );
};
export default LineChart;
