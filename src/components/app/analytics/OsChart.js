import React, { useEffect } from "react";

import { Chart } from "react-google-charts";
import { useSelector, useDispatch } from "react-redux";
import { getOsCampaign } from "../../../actions/analyticsActions";

const OsChart = ({ propellerId }) => {
  const {
    getOsCampaigns: { loading, OsCampaigns },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOsCampaign(propellerId));
  }, []);

  console.log(OsCampaigns);

  const Adsreport = {
    title: "Os report",
    chartArea: { width: "50%" },
    legend: { position: "bottom" },
    isStacked: true,
  };
  return (
    <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
      <div className="card rounded bd-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex">
            <Chart
              chartType="ColumnChart"
              data={[
                ["Month", "Android", "IOS", "Symbian"],
                ["Mon", 20000, 15000, 35000],
                ["Tue", 15000, 12000, 27000],
                ["Wed", 7170, 10460, 17630],
                ["Thu", 16600, 15120, 31720],
                ["Fri", 12530, 18240, 30770],
                ["Sat", 17530, 15540, 33070],
                ["Sun", 10000, 24040, 34040],
              ]}
              width="100%"
              height="400px"
              options={Adsreport}
              legendToggle
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OsChart;
