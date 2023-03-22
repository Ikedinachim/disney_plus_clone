import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import MetaData from "../../layout/MetaData";
// import {
//   getSingleAppDownloadCampaigns,
//   clearErrors,
// } from "../../../actions/campaignActions";
import {
  // getBitlyCount,
  getAppdownloadAnalyticsAction,
  clearErrors,
} from "../../../actions/analyticsActions";
import Loader from "../../loader";
// import ActionsChart from "./SmartSms Chart/ActionsChart";

import AppDownloadActionsChart from "./AppDownload Chart/AppDownloadActionsChart";

const AppDownloadAnalytics = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

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
    dispatch(getAppdownloadAnalyticsAction(1430));
  }, [dispatch, id]);

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
          <MetaData title={"App Downloads Campaign Details"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="row justify-content-between">
                <div className="col-md-6 mg-b-20 mg-md-b-0">
                  <Link to="../analytics" className="tx-black">
                    <div>
                      <i className="fa fa-angle-left mg-r-10 pd-t-15 tx-18"></i>
                      <span className="tx-28 tx-bold mb-0">Analytics</span>
                    </div>
                  </Link>
                </div>
              </div>
              {/* <div className="row justify-content-around">
                <div className="col-md-3 col-12 mg-t-20 mg-md-t-0">
                  <div className="card rounded bd-0 shadow-sm row">
                    <div className="card-body vh-36">
                      <div className="d-flex">
                        <div className="mg-r-20">
                          {" "}
                          <img
                            src="../../../assets/img/Brand_Awareness.svg"
                            className="tx-primary"
                            alt=""
                            srcSet=""
                          />
                        </div>
                        <div>
                          <p className="tx-24 tx-bold">
                            {singleAppCampaign &&
                              singleAppCampaign.targetAudienceCount}
                          </p>
                          <p className="tx-15 tx-blac">
                            Total number of impressions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-12 mg-t-20 mg-md-t-0">
                  <div className="card rounded bd-0 shadow-sm row">
                    <div className="card-body vh-36">
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
                          <p className="tx-24 tx-bold">
                            {singleAppCampaign &&
                            singleAppCampaign.bitlink === null
                              ? "0"
                              : bitlyCount.bitlyCounts &&
                                bitlyCount.bitlyCounts.total_clicks}
                          </p>
                          <p className="tx-15 tx-blac">
                            Total number of Clicks
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 col-12 mg-t-20 mg-md-t-0">
                  <div className="card rounded bd-0 shadow-sm row">
                    <div className="card-body vh-36">
                      <div className="d-flex">
                        <div className="mg-r-20">
                          {" "}
                          <img
                            src="../../../assets/img/Revenue_Generated.svg"
                            className="tx-primary"
                            alt=""
                            srcSet=""
                          />
                        </div>
                        <div>
                          <p className="tx-24 tx-bold">
                            {singleAppCampaign &&
                              singleAppCampaign.androidStoreClickCount +
                                singleAppCampaign.iosStoreClickCount}
                          </p>
                          <p className="tx-15 tx-blac">
                            Total number of Actions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-md-12 col-12 mg-t-20 mg-md-t-0">
                <div className="card rounded bd-0 shadow-sm">
                  <div className="card-body">
                    <div className="analytics-data">
                      <div className="analytics-card">
                        <h4 className="tx-white tx-bold tx-18">
                          Installations
                        </h4>
                        <h2 className="tx-white tx-normal">
                          {formatNumber(appDownloadAnalytics?.installations)}
                        </h2>
                      </div>
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
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AppDownloadAnalytics;
