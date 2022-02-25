import React, { Fragment } from "react";

import { Chart } from "react-google-charts";

const MobileChart = () => {
  const ActionsPerformed = {
    title: "Actions performed",
    pieHole: 0.4,
    legend: { position: "bottom" },
  };

  const data = [
    ["Device", "Clicks", "Conversions"],
    [("Mobile", 20000, 15000)],
    ["Whatsapp", 15000, 12000],
    ["Text", 7170, 10460],
  ];
  return (
    <Fragment>
      <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
        <div className="card rounded bd-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex">
              <Chart
                chartType="PieChart"
                data={data}
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
