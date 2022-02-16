import React, { Fragment, useEffect } from "react";
import MetaData from "../../layout/MetaData";
import { Chart } from "react-google-charts";
import { Link } from "react-router-dom";

const Analytics = () => {
  const MonthlyAds = {
    title: "Monthly ads",
    curveType: "function",
    legend: { position: "bottom" },
  };
  const ActionsPerformed = {
    title: "Actions performed",
    pieHole: 0.4,
    legend: { position: "bottom" },
  };
  const Adsreport = {
    title: "Ads report",
    chartArea: { width: "50%" },
    legend: { position: "bottom" },
    isStacked: true,
  };
  return (
    <Fragment>
      <MetaData title={"Analytics"} />
      <div className="content-body">
        <div className="container pd-x-0">
          <div className="row justify-content-between">
            <div className="col-md-6 col-12">
              <Link to="../analytics">
                <p className="tx-26 tx-bold">Go back</p>
              </Link>
            </div>
          </div>

          {/* numbers doing */}
          <div className="row">
            <div className="col-md-4 col-12 mg-t-20 mg-md-t-0">
              <div className="card rounded bd-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="mg-r-20">
                      {" "}
                      <img
                        src="../../assets/img/Brand_Awareness.svg"
                        className="tx-primary"
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div>
                      <p className="tx-24 tx-bold">246k</p>
                      <p className="tx-15 tx-blac">
                        Total number of impressions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 mg-t-20 mg-md-t-0">
              <div className="card rounded bd-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="mg-r-20">
                      {" "}
                      <img
                        src="../../assets/img/Brand_Awareness.svg"
                        className="tx-primary"
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div>
                      <p className="tx-24 tx-bold">9,320</p>
                      <p className="tx-15 tx-blac">Total number of clicks</p>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 mg-t-20 mg-md-t-0">
              <div className="card rounded bd-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="mg-r-20">
                      {" "}
                      <img
                        src="../../assets/img/Brand_Awareness.svg"
                        className="tx-primary"
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div>
                      <p className="tx-24 tx-bold">3,231</p>
                      <p className="tx-15 tx-blac">
                        Total number of actions performed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* diagram thing  */}
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

          {/* ads performed & actions performed */}
          <div className="row mg-t-30">
            <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
              <div className="card rounded bd-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex">
                    <Chart
                      chartType="ColumnChart"
                      data={[
                        ["Month", "Action performed", "Clicked Ads", "All Ads"],
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
            <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
              <div className="card rounded bd-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex">
                    <Chart
                      chartType="PieChart"
                      data={[
                        ["Actions", "Sales", "Expenses"],
                        ["Mobile", 20000, 15000],
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Analytics;
