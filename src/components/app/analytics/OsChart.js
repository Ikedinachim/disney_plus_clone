import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chart } from "react-google-charts";
import { getOsCampaign } from "../../../actions/analyticsActions";

const OsChart = ({ propellerId }) => {
  const {
    getOsCampaigns: { OsCampaigns },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOsCampaign(propellerId));
  }, []);

  const Adsreport = {
    title: "Os report",
    chartArea: { width: "50%" },
    legend: { position: "bottom" },
    isStacked: true,
  };

  console.log(OsCampaigns);
  return (
    <Fragment>
      <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
        <div className="card rounded bd-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex">
              <Chart
                chartType="ColumnChart"
                data={[
                  ["OS", "impressions", "clicks", "conversions"],
                  ["Android", 20000, 15000, 35000],
                  ["IOS", 15000, 12000, 27000],
                  ["Symbian", 7170, 10460, 17630],
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
    </Fragment>
  );
};

export default OsChart;
