import React, { Fragment, useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from '../../loader';

import {
  clearErrors,
  getPropellerCampaign,
} from "../../../actions/analyticsActions";
import MetaData from "../../layout/MetaData";

const DigitalAnalytics = () => {
  const OsChart = React.lazy(() => import('./Digital Chart/OsChart'));
  const DateChart = React.lazy(() => import('./Digital Chart/DateChart'));
  const MobileChart = React.lazy(() => import('./Digital Chart/MobileChart'));
  
  const { propellerId } = useParams();
  const dispatch = useDispatch();

  const {
    getPropellerCampaigns: { error, propellerCampaigns, loading },
  } = useSelector((state) => state);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getPropellerCampaign(propellerId));
  }, [dispatch, error, propellerId]);

  console.log(propellerCampaigns)

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
              {propellerCampaigns &&
                propellerCampaigns.map((campaign) => (
                  <div className="row">
                    <div className="col-md-4 col-12 mg-t-20 mg-md-t-0">
                      <div className="card rounded bd-0 shadow-sm">
                        <div className="card-body h-25">
                          <div className="d-flex">
                            <div className="mg-r-20">
                              {" "}
                              <img
                                src="../../../assets/img/Brand_Awareness.svg"
                                className="tx-primary"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div>
                              <p className="tx-24 tx-bold">
                                {campaign.impressions}
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
                        <div className="card-body h-25">
                          <div className="d-flex">
                            <div className="mg-r-20">
                              {" "}
                              <img
                                src="../../../assets/img/Reach_Conversion_Goals.svg"
                                className="tx-primary"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div>
                              <p className="tx-24 tx-bold">{campaign.clicks}</p>
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
                        <div className="card-body h-25">
                          <div className="d-flex">
                            <div className="mg-r-20">
                              {" "}
                              <img
                                src="../../../assets/img/Revenue_Generated.svg"
                                className="tx-primary"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div>
                              <p className="tx-24 tx-bold">
                                {campaign.conversions}
                              </p>
                              <p className="tx-15 tx-blac">
                                Total number of actions performed
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {/* diagram of clicks and impressions  */}
              <Suspense
                fallback={
                  <div className="col-12 mg-t-20 mg-md-t-0">
                    <div className="card rounded bd-0 shadow-sm">
                      <div className="card-body">
                        <div className="d-flex">Loading impression data...</div>
                      </div>
                    </div>
                  </div>
                }
              >
                <DateChart propellerId={propellerId} />
              </Suspense>

              <div className="row mg-t-30">
                {/* ads performed & actions performed */}
                <Suspense
                  fallback={
                    <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
                      <div className="card rounded bd-0 shadow-sm">
                        <div className="card-body">
                          <div className="d-flex">Loading OS data...</div>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <OsChart propellerId={propellerId} />
                </Suspense>

                {/* chartArea */}
                <Suspense
                  fallback={
                    <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
                      <div className="card rounded bd-0 shadow-sm">
                        <div className="card-body">
                          <div className="d-flex">Loading Mobile data...</div>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <MobileChart propellerId={propellerId} />
                </Suspense>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default DigitalAnalytics;
