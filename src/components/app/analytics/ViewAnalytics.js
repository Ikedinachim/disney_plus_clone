import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../loader";
import MetaData from "../../layout/MetaData";
import DigitalAnalyticsTable from "./DigitalAnalyticsTable";
// import ViewFlierVideosCampaigns from "../campaigns/viewCampaigns/ViewFlierVideosCampaigns";

import {
  getSmsCampaigns,
  clearErrors,
  getViewFlierVideosCampaigns,
  getDigitalCampaigns,
  getAppDownloadCampaigns
} from "../../../actions/campaignActions";
import SmartSmsAnalyticsTable from "./SmartSmsAnalyticsTable";
import SmsAnalyticsTable from "./SmsAnalyticsTable";
import AppDownloadAnalyticsTable from "./AppDownloadAnalyticsTable";

const ViewAnalytics = () => {
  const { loading, error } = useSelector((state) => state.getAllCampaign || {});
  const { vfLoading } = useSelector(
    (state) => state.viewFlierVideosCampaign || {}
  );
  const dispatch = useDispatch();

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
    // update the state to tab4
    setActiveTab("tab4");
  };

  useEffect(() => {
    dispatch(getDigitalCampaigns());
    dispatch(getSmsCampaigns());
    dispatch(getViewFlierVideosCampaigns());
    dispatch(getAppDownloadCampaigns());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // dispatch(getWallet())
  }, [dispatch, error]);

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
                  <p className="mg-b-0 tx-26 tx-bold">Analytics</p>
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
                        Digital campaign
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
                        Smart sms
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
                        SMS
                      </button>
                      <button
                        className={`btn w-100 mg-r-15 ${
                          activeTab === "tab3"
                            ? "btn-primary"
                            : "btn-outline-primary mg-r-15"
                        }`}
                        onClick={handleTab4}
                        type="submit"
                        variant="contained"
                      >
                        APP DOWNLOAD
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body pd-md-x-30 pd-t- mg-t-20 mg-md-t-0">
                  {activeTab === "tab1" ? <DigitalAnalyticsTable /> : ""}
                  {activeTab === "tab2" ? <SmartSmsAnalyticsTable /> : ""}
                  {activeTab === "tab3" ? <SmsAnalyticsTable /> : ""}
                  {activeTab === 'tab4' ? <AppDownloadAnalyticsTable/> : ""}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ViewAnalytics;
