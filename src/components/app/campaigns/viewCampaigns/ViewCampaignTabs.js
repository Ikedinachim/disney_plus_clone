import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { DateTime } from "luxon";
import NumberFormat from "react-number-format";

import Loader from "../../../loader";
import MetaData from "../../../layout/MetaData";
import ViewSmsCampaign from "./ViewSmsCampaigns";
import ViewAppDownloadsCampaigns from "./ViewAppDownloadsCampaigns";
import ViewFlierVideosCampaigns from "./ViewFlierVideosCampaigns";

// import { getWallet } from '../../../actions/billingActions'
import { MDBDataTable } from "mdbreact";
import {
  getSmsCampaigns,
  clearErrors,
  getAppDownloadCampaigns,
  getViewFlierVideosCampaigns,
} from "../../.././../actions/campaignActions";
import ViewInfluencerCampaigns from "./ViewInfluencerCampaigns";

const ViewCampaignTabs = () => {
  const { loading, error, allCampaigns } = useSelector(
    (state) => state.getAllCampaign || {}
  );
  const { vfLoading } = useSelector(
    (state) => state.viewFlierVideosCampaign || {}
  );
  const dispatch = useDispatch();
  const alert = useAlert();

  const [activeTab, setActiveTab] = useState("tab1");

  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };
  const handleTab3 = () => {
    // update the state to tab2
    setActiveTab("tab3");
  };
  const handleTab4 = () => {
    // update the state to tab2
    setActiveTab("tab4");
  };

  useEffect(() => {
    dispatch(getSmsCampaigns());
    dispatch(getAppDownloadCampaigns());
    dispatch(getViewFlierVideosCampaigns());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // dispatch(getWallet())
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading || vfLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"All Campaigns"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="row justify-content-between">
                <div className="col-md-6 col-6">
                  <p className="mg-b-0 tx-26 tx-bold">Campaigns</p>
                </div>
                <div className="col-md-2 col-6">
                  <p>
                    <Link
                      to="/app/campaign/create"
                      className="btn btn-primary w-100"
                    >
                      {" "}
                      New Campaign
                    </Link>
                  </p>
                </div>
              </div>
              <div className="card card rounded bd-0 shadow-sm">
                <div className="card-header bd-b-0 pd-b-0 pd-t-40 pd-md-x-30">
                  <div className="pd-x-0 mg-y-30">
                    <div className="d-flex smsViewTab">
                      <button
                        className={`btn w-100 mg-r-15 ${
                          activeTab === "tab1"
                            ? "btn-primary"
                            : "btn-outline-primary mg-r-15"
                        }`}
                        onClick={handleTab1}
                        type="submit"
                        variant="contained"
                      >
                        SMS
                      </button>
                      <button
                        className={`btn w-100 mg-r-15 ${
                          activeTab === "tab2"
                            ? "btn-primary"
                            : "btn-outline-primary mg-r-15"
                        }`}
                        onClick={handleTab2}
                        type="submit"
                        variant="contained"
                      >
                        Flier/Video
                      </button>
                      <button
                        className={`btn w-100 mg-r-15 ${
                          activeTab === "tab3"
                            ? "btn-primary"
                            : "btn-outline-primary mg-r-15"
                        }`}
                        onClick={handleTab3}
                        type="submit"
                        variant="contained"
                      >
                        App Download
                      </button>
                      <button
                        className={`btn w-100 ${
                          activeTab === "tab4"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={handleTab4}
                        type="submit"
                        variant="contained"
                      >
                        Influencer
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body pd-md-x-30 pd-t- mg-t-20 mg-md-t-0">
                  {activeTab === "tab1" ? <ViewSmsCampaign /> : ""}
                  {activeTab === "tab2" ? <ViewFlierVideosCampaigns /> : ""}
                  {activeTab === "tab3" ? <ViewAppDownloadsCampaigns /> : ""}
                  {activeTab === "tab4" ? <ViewInfluencerCampaigns /> : ""}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ViewCampaignTabs;
