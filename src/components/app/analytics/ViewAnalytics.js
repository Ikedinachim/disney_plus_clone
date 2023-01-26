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
  getAppDownloadCampaigns,
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
              <div className="d-flex flex-wrap justify-content-between">
                <p className="mg-b-0 tx-26 tx-bold">Analytics</p>
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
              <div className="card card rounded bd-0 shadow-sm">
                <div className="card-body pd-md-x-30 pd-t- mg-t-20 mg-md-t-0">
                  <ul className="nav w-100 nav-line" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link tab active"
                        id="sms-tab"
                        data-toggle="tab"
                        href="#sms"
                        role="tab"
                        onClick={handleTab1}
                        aria-controls="sms"
                        aria-selected="true"
                      >
                        Digital Campaign
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link tab"
                        id="display-tab"
                        data-toggle="tab"
                        href="#display"
                        role="tab"
                        onClick={handleTab2}
                        aria-controls="display"
                        aria-selected="false"
                      >
                        Smart sms
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link tab"
                        id="app-tab"
                        data-toggle="tab"
                        href="#app"
                        role="tab"
                        onClick={handleTab3}
                        aria-controls="app"
                        aria-selected="false"
                      >
                        SMS
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link tab"
                        id="influencer-tab"
                        data-toggle="tab"
                        href="#influencer"
                        role="tab"
                        onClick={handleTab4}
                        aria-controls="influencer"
                        aria-selected="false"
                      >
                        App download
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content bd-t-0" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="pd-y-20">
                        {activeTab === "tab1" ? <DigitalAnalyticsTable /> : ""}
                        {activeTab === "tab2" ? <SmartSmsAnalyticsTable /> : ""}
                        {activeTab === "tab3" ? <SmsAnalyticsTable /> : ""}
                        {activeTab === "tab4" ? (
                          <AppDownloadAnalyticsTable />
                        ) : (
                          ""
                        )}
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

export default ViewAnalytics;
