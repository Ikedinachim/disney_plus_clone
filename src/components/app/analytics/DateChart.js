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

  console.log(dateCampaigns);
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
                  data={[
                    ["Month", "Number of clicks", "Number of actions"],
                    ["Jan", 20000, 15000],
                    ["Feb", 15000, 12000],
                    ["March", 7170, 10460],
                    ["April", 7170, 10460],
                    ["May", 16600, 15120],
                    ["June", 16600, 15120],
                    ["July", 12530, 18240],
                    ["Aug", 12530, 18240],

                    ["Sept", 17530, 15540],
                    ["Oct", 10000, 24040],
                  ]}
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
