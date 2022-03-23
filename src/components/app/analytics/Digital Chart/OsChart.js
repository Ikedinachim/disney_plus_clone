import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chart } from "react-google-charts";

import { getOsCampaign } from "../../../../actions/analyticsActions";

const OsChart = ({ propellerId }) => {
  const dispatch = useDispatch();

  const {
    getOsCampaigns: { OsCampaigns },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getOsCampaign(propellerId));
  }, [dispatch, propellerId]);

  //specifying diagram design
  const Adsreport = {
    title: "Os report",
    chartArea: { width: "50%" },
    legend: { position: "bottom" },
    isStacked: true,
  };

  //specifying diagram data
  const data = [["Os Type", "Impressions", "Clicks", "Conversions"]];

  for (const i in OsCampaigns) {
    data.push([
      OsCampaigns[i].os,
      OsCampaigns[i].impressions,
      OsCampaigns[i].clicks,
      OsCampaigns[i].conversions,
    ]);
  }

  return (
    <Fragment>
      <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
        <div className="card rounded bd-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex">
              <Chart
                chartType="ColumnChart"
                data={data}
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
