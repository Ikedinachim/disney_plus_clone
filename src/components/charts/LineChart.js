// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";

export const options = {
  responsive: true,
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
  console.log("🚀 ~ file: LineChart.js:20 ~ LineChart ~ chartData:", chartData);
  return (
    <div className="chart-container non-mobile-chart mobile-chart">
      {chartData?.datasets.length <= 0 ? (
        "No data"
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};
export default LineChart;
