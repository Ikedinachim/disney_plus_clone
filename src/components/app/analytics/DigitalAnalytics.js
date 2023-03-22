import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../loader";
// import MobileChart from "./Digital Chart/MobileChart";
// import OsChart from "./Digital Chart/OsChart";
// import DateChart from "./Digital Chart/DateChart";
// import useGoogleCharts from "./googleChart/useGoogleChart";
import AppDownloadActionsChart from "./AppDownload Chart/AppDownloadActionsChart";

import {
  getAppdownloadAnalyticsAction,
  clearErrors,
  // getPropellerCampaign,
} from "../../../actions/analyticsActions";
import MetaData from "../../layout/MetaData";

const DigitalAnalytics = () => {
  const { campaignId } = useParams();
  const dispatch = useDispatch();

  // const {
  //   getPropellerCampaigns: { error, propellerCampaigns, loading },
  // } = useSelector((state) => state);

  const { analyticsLoading, error, appDownloadAnalytics } = useSelector(
    (state) => state.appDownloadAnalyticsData || {}
  );

  const formatNumber = (num) => {
    if (num >= 1000) {
      // Divide the number by 1000 and round it to one decimal place
      num = (num / 1000).toFixed(1) + "k";
    }
    return num;
  };

  useEffect(() => {
    dispatch(getAppdownloadAnalyticsAction(campaignId));
  }, [dispatch, campaignId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      {analyticsLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Digital Campaign Analytics"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="row justify-content-between">
                <div className="col-md-6 col-12">
                  <Link to="../analytics">
                    <p className="tx-26 tx-bold">Go back</p>
                  </Link>
                </div>
              </div>
              <div className="col-md-12 col-12 mg-t-20 mg-md-t-0">
                <div className="card rounded bd-0 shadow-sm">
                  <div className="card-body">
                    <div className="analytics-data">
                      <div className="analytics-card">
                        <h4 className="tx-white tx-bold tx-18">Impressions</h4>
                        <h2 className="tx-white tx-normal">
                          {formatNumber(appDownloadAnalytics?.impressions)}
                        </h2>
                      </div>
                      <div className="analytics-card">
                        <h4 className="tx-white tx-bold tx-18">Clicks</h4>
                        <h2 className="tx-white tx-normal">
                          {formatNumber(appDownloadAnalytics?.clicks)}
                        </h2>
                      </div>
                    </div>
                    <AppDownloadActionsChart
                      appDownloadAnalytics={appDownloadAnalytics}
                    />
                  </div>
                </div>
              </div>

              {/* numbers doing */}
              {/* {propellerCampaigns &&
                propellerCampaigns.map((campaign, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
                      <div className="card rounded bd-0 shadow-sm h-100">
                        <div className="card-body h-25">
                          <div className="d-flex">
                            <div className="mg-r-20">
                              {" "}
                              <img
                                src="../../../assets/img/Brand_Awareness.svg"
                                className="tx-primary"
                                alt=""
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
                                srcSet=""
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
                ))} */}

              {/* diagram of clicks and impressions  */}

              {/* <DateChart propellerId={propellerId} google={google} /> */}

              {/* <div className="row mg-t-30"> */}
              {/* ads performed & actions performed */}
              {/* <OsChart propellerId={propellerId} google={google} /> */}

              {/* chartArea */}
              {/* <MobileChart propellerId={propellerId} google={google} /> */}
              {/* </div> */}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default DigitalAnalytics;
