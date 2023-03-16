import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { Chart } from "react-google-charts";
import Loader from "../../../loader";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      data: [55, 23, 30],
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 1,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [1, 2, 4],
      borderColor: "rgb(53, 162, 235)",
      borderWidth: 1,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

// export const data = [
//   ["Year", "Sales", "Expenses"],
//   ["2004", 1000, 400],
//   ["2005", 1170, 460],
//   ["2006", 660, 1120],
//   ["2007", 1030, 540],
// ];

// export const options = {
//   title: "Company Performance",
//   curveType: "function",
//   legend: { position: "bottom" },
// };

export const Data = [
  {
    id: 1,
    datasets: {
      label: "Installations",
      data: [0, 10, 23, 30, 80, 66, 33],
      backgroundColor: [
        "#1a73e9",
        "&quot;#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
      ],
      borderColor: "#1a73e9",
      borderWidth: 2,
    },
  },
  {
    id: 2,
    datasets: {
      label: "Impressions",
      data: [0, 20, 55, 23, 30, 11, 2],
      backgroundColor: [
        "#d83025",
        "&quot;#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
      ],
      borderColor: "#d83025",
      borderWidth: 2,
    },
  },
  {
    id: 3,
    datasets: {
      label: "Clicks",
      data: [20, 0, 23, 39, 27, 92, 40],
      backgroundColor: [
        "#f9ab00",
        "&quot;#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
      ],
      borderColor: "#f9ab00",
      borderWidth: 2,
    },
  },
];

export const Data2 = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
    data: [55, 23, 30],
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
    data: [57, 23, 10],
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
    data: [495, 83, 30],
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
    data: [7, 23, 190],
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
    data: [50, 90, 75],
  },
];

const AppDownloadActionsChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: Data.map((data) => data.datasets),
    // datasets: [
    //   {
    //     label: "Installations",
    //     data: [55, 23, 30, 80, 66],
    //     backgroundColor: [
    //       "rgba(75,192,192,1)",
    //       "&quot;#ecf0f1",
    //       "#50AF95",
    //       "#f3ba2f",
    //       "#2a71d0",
    //     ],
    //     borderColor: "black",
    //     borderWidth: 2,
    //   },
    // ],
    // datasets: [
    //   {
    //     label: "Installs",
    //     data: Data.map((data) => data.data),
    //     backgroundColor: [
    //       "rgba(75,192,192,1)",
    //       "&quot;#ecf0f1",
    //       "#50AF95",
    //       "#f3ba2f",
    //       "#2a71d0",
    //     ],
    //     borderColor: "black",
    //     borderWidth: 2,
    //   },
    // ],
  });
  // const { loading, error, singleAppCampaign } = useSelector(
  //   (state) => state.singleAppCampaign || {}
  // );

  // const ActionsPerformed = {
  //   title: "Actions performed",
  //   pieHole: 0.4,
  //   legend: { position: "bottom" },
  // };

  // const data = useMemo(() => {
  //   return [
  //     ["Stores", "Clicks"],
  //     ["Android", singleAppCampaign && singleAppCampaign?.targetAudienceCount],
  //     ["IOS", singleAppCampaign && singleAppCampaign?.iosStoreClickCount],
  //   ];
  // }, [singleAppCampaign]);

  // const data = [
  //   ["Stores", "Clicks"],
  //   ["Android", singleAppCampaign && singleAppCampaign?.targetAudienceCount],
  //   ["IOS", singleAppCampaign && singleAppCampaign?.iosStoreClickCount],
  // ];

  //   singleAppCampaign.whatsAppNumberClickCount +
  //     singleAppCampaign.urlClickCount +
  //     singleAppCampaign.ussdClickCount +
  //     singleAppCampaign.phoneNumberClickCount +
  //     singleAppCampaign.smsNumberClickCount;

  // useEffect(() => {}, [singleAppCampaign]);

  // console.log(
  //   "data",
  //   Data.map((data) => data.datasets)
  // );

  return (
    <Fragment>
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <Fragment>
        <div className="mg-t-20">
          {/* <Chart
                    chartType="PieChart"
                    data={data}
                    width="100%"
                    height="400px"
                    options={ActionsPerformed}
                    legendToggle
                  /> */}
          {/* <Chart
                  chartType="LineChart"
                  width="400px"
                  height="400px"
                  data={data}
                  options={options}
                /> */}
          {/* <Line options={options} data={data} />; */}
          <LineChart chartData={chartData} />
        </div>
      </Fragment>
      {/* )} */}
    </Fragment>
  );
};

export default AppDownloadActionsChart;
