import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  clearErrors,
  getPropellerCampaign,
} from "../../../actions/analyticsActions";
// import Loader from "../../loader";
import OsChart from "./Digital Chart/OsChart";
import MetaData from "../../layout/MetaData";
import MobileChart from "./Digital Chart/MobileChart";
import DateChart from "./Digital Chart/DateChart";

const DigitalAnalytics = () => {
  const { propellerId } = useParams();
  const dispatch = useDispatch();

  const {
    getPropellerCampaigns: { error, propellerCampaigns },
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
                      <div className="card-body">
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
                      <div className="card-body">
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
                      <div className="card-body">
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

            <DateChart propellerId={propellerId} />

            <div className="row mg-t-30">
              {/* ads performed & actions performed */}
              <OsChart propellerId={propellerId} />

              {/* chartArea */}
              <MobileChart propellerId={propellerId} />
            </div>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default DigitalAnalytics;
