import React, { Fragment} from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";

const DateChart = () => {
  const {
    getCampaignByDate: { dateCampaigns },
  } = useSelector((state) => state);

  const data = [["Day", "Number of clicks", "Number of actions"]];

  for (const i in dateCampaigns) {
    data.push([
      dateCampaigns[i].date_time,
      dateCampaigns[i].clicks,
      dateCampaigns[i].conversions,
    ]);
  }

  // console.log(data);

  const MonthlyAds = {
    title: "Monthly ads",
    curveType: "function",
    legend: { position: "bottom" },
  };
  return (
    <Fragment>
      <div className="row mg-t-30">
        <div className="col-12 mg-t-20 mg-md-t-0">
          <div className="card rounded bd-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex">
                <Chart
                  chartType="LineChart"
                  data={data}
                  width="100%"
                  height="400px"
                  options={MonthlyAds}
                  legendToggle
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DateChart;
