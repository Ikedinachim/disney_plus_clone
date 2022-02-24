import React, { Fragment } from "react";

import { Chart } from "react-google-charts";

const MobileChart = ({ mobileCampaigns }) => {
  console.log(mobileCampaigns);
  const ActionsPerformed = {
    title: "Actions performed",
    pieHole: 0.4,
    legend: { position: "bottom" },
  };
  return (
    <Fragment>
      <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
        <div className="card rounded bd-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex">
              <Chart
                chartType="PieChart"
                data={[
                  ["Mobile ISP", "Clicks", "Conversions"],
                  // mobileCampaigns.map((campaign) => [
                  //   campaign.mobile_isp,
                  //   campaign.clicks,
                  //   campaign.conversions,
                  // ])
                  [("Mobile", 20000, 15000)],
                  ["Whatsapp", 15000, 12000],
                  ["Text", 7170, 10460],
                ]}
                width="100%"
                height="400px"
                options={ActionsPerformed}
                legendToggle
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MobileChart;
