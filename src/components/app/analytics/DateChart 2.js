import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chart } from "react-google-charts";
import { getCampaignByDate } from "../../../actions/analyticsActions";

const DateChart = ({ propellerId }) => {
  const {
    getCampaignByDate: { dateCampaigns },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCampaignByDate(propellerId));
  }, []);

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
