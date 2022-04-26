import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import MetaData from "../../layout/MetaData";
import {
  getSingleAppDownloadCampaigns,
  clearErrors,
} from "../../../actions/campaignActions";
import { getBitlyCount } from "../../../actions/analyticsActions";
import Loader from "../../loader";
import ActionsChart from "./SmartSms Chart/ActionsChart";

const AppDownloadAnalytics = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, singleAppCampaign } = useSelector(
    (state) => state.singleAppCampaign || {}
  );

  const { bitlyCount } = useSelector((state) => state || {});

  useEffect(() => {
    if (
      singleAppCampaign &&
      (singleAppCampaign.bitlink !== null ||
        singleAppCampaign.bitlink !== undefined)
    ) {
      const link =
        singleAppCampaign.bitlink &&
        singleAppCampaign.bitlink.split("//").pop();
      dispatch(getBitlyCount(link));
      dispatch(getSingleAppDownloadCampaigns(id));
    } else if (error || bitlyCount.error) {
      toast.error(error || bitlyCount.error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

  return (
    <Fragment>
      {loading || bitlyCount.blLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Campaign Details"} />
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
              <div className="row justify-content-around">
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
                                singleAppCampaign.iosStoreClickCount }
                          </p>
                          <p className="tx-15 tx-blac">
                            Total number of Actions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ActionsChart />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AppDownloadAnalytics;
