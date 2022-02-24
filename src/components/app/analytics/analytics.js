import React, { Fragment, useEffect } from "react";
import MetaData from "../../layout/MetaData";
import { Chart } from "react-google-charts";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearErrors,
  getPropellerCampaign,
} from "../../../actions/analyticsActions";
import Loader from "../../loader";
import { useAlert } from "react-alert";
import OsChart from "./OsChart";
import MobileChart from "./MobileChart";

const Analytics = () => {
  const { loading, error, propellerCampaigns } = useSelector(
    (state) => state.getPropellerCampaign || {}
  );

  const { propellerId } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getPropellerCampaign(propellerId));
  }, [dispatch, alert, error]);

  console.log(propellerCampaigns);

  const MonthlyAds = {
    title: "Monthly ads",
    curveType: "function",
    legend: { position: "bottom" },
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
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
                          <p className="tx-24 tx-bold">
                            246k {/*(propellerCampaigns.impressions)*/}
                          </p>
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
                          <p className="tx-24 tx-bold">
                            9,320 {/*(propellerCampaigns.clicks)*/}
                          </p>
                          <p className="tx-15 tx-blac">
                            Total number of clicks
                          </p>
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

              {/* diagram of clicks and impressions  */}
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

              <div className="row mg-t-30">
                {/* ads performed & actions performed */}
                <OsChart />

                {/* chartArea */}
                <MobileChart />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Analytics;
