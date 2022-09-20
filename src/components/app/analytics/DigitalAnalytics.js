import React, { Fragment, useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../loader";
import MobileChart from "./Digital Chart/MobileChart";
import OsChart from "./Digital Chart/OsChart";
import DateChart from "./Digital Chart/DateChart";
import useGoogleCharts from "./googleChart/useGoogleChart";

import {
  clearErrors,
  getPropellerCampaign,
} from "../../../actions/analyticsActions";
import MetaData from "../../layout/MetaData";

const DigitalAnalytics = () => {
  const google = useGoogleCharts();
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
                    <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
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
                    <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
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
                  </div>
                ))}

              {/* diagram of clicks and impressions  */}

              <DateChart propellerId={propellerId} google={google} />

              <div className="row mg-t-30">
                {/* ads performed & actions performed */}
                <OsChart propellerId={propellerId} google={google} />

                {/* chartArea */}
                <MobileChart propellerId={propellerId} google={google} />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default DigitalAnalytics;
