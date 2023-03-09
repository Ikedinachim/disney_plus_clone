// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";

export const options = {
  responsive: true,
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

const dataSample = {
  plugins: {
    title: {
      display: true,
      text: "Users Gained between 2016-2020",
    },
    legend: {
      display: false,
    },
  },
};

const LineChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>Line Chart</h2> */}
      <Line data={chartData} options={options} />
    </div>
  );
};
export default LineChart;
