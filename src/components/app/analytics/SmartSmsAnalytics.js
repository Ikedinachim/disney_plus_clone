import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getSingleFlierVideosCampaigns,
  clearErrors,
} from "../../../actions/campaignActions";
import { getBitlyCount } from "../../../actions/analyticsActions";
import Loader from "../../loader";
import ActionsChart from "./SmartSms Chart/ActionsChart";
// import { useAlert } from "react-alert";

const SmartSmsAnalytics = () => {
  const { loading, error, singleFlierCampaign } = useSelector(
    (state) => state.singleFlierCampaign || {}
  );

  const { blLoading, bitlyCounts } = useSelector(
    (state) => state.bitlyCount || {}
  );

  const { id } = useParams();
  const dispatch = useDispatch();
  // const alert = useAlert();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getSingleFlierVideosCampaigns(id));
    dispatch(getBitlyCount(singleFlierCampaign.bitlink));
    // dispatch(getWallet())
  }, [dispatch, toast, error]);

  return (
    <Fragment>
      {loading && blLoading ? (
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
              <div className="row">
                <div className="col-12 mg-t-20 mg-md-t-0">
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
                            {singleFlierCampaign &&
                              singleFlierCampaign.targetAudienceCount}
                          </p>
                          <p className="tx-15 tx-blac">
                            Total number of impressions
                          </p>
                        </div>
                        <div className="tx-20 tx-blac">
                          Impressions is the number of people your campaign got
                          to
                        </div>
                      </div>
                    </div>

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
                          <p className="tx-24 tx-bold">
                            {bitlyCounts && bitlyCounts.total_clicks}
                          </p>
                          <p className="tx-15 tx-blac">
                            Total number of Clicks
                          </p>
                        </div>
                      </div>
                    </div>
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
                            {singleFlierCampaign &&
                              singleFlierCampaign.whatsAppNumberClickCount +
                                singleFlierCampaign.urlClickCount +
                                singleFlierCampaign.ussdClickCount +
                                singleFlierCampaign.phoneNumberClickCount +
                                singleFlierCampaign.smsNumberClickCount}
                          </p>
                          <p className="tx-15 tx-blac">
                            Total number of Actions
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex">
                        <ActionsChart />
                      </div>
                    </div>
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

export default SmartSmsAnalytics;
