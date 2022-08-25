import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../../loader";
import MetaData from "../../../layout/MetaData";
import ViewSmsCampaign from "./ViewSmsCampaigns";
import ViewAppDownloadsCampaigns from "./ViewAppDownloadsCampaigns";
import ViewFlierVideosCampaigns from "./ViewFlierVideosCampaigns";
import ViewInfluencerCampaigns from "./ViewInfluencerCampaigns";
import ViewBillboardCampaign from "./ViewBillboardCampaigns";
import {
  getSmsCampaigns,
  clearErrors,
  getAppDownloadCampaigns,
  getViewFlierVideosCampaigns,
} from "../../.././../actions/campaignActions";

const ViewCampaignTabs = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.getAllCampaign || {});
  const { vfLoading } = useSelector(
    (state) => state.viewFlierVideosCampaign || {}
  );

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
  const handleTab5 = () => {
    // update the state to tab2
    setActiveTab("tab5");
  };

  useEffect(() => {
    dispatch(getSmsCampaigns());
    dispatch(getAppDownloadCampaigns());
    dispatch(getViewFlierVideosCampaigns());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
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
                        SMS
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
                        Smart SMS/Display Ad
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
                        App Download
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
                        Influencer
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link tab"
                        id="influencer-tab"
                        data-toggle="tab"
                        href="#influencer"
                        role="tab"
                        onClick={handleTab5}
                        aria-controls="influencer"
                        aria-selected="false"
                      >
                        Billboard
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
                        {activeTab === "tab1" ? <ViewSmsCampaign /> : ""}
                        {activeTab === "tab2" ? (
                          <ViewFlierVideosCampaigns />
                        ) : (
                          ""
                        )}
                        {activeTab === "tab3" ? (
                          <ViewAppDownloadsCampaigns />
                        ) : (
                          ""
                        )}
                        {activeTab === "tab4" ? (
                          <ViewInfluencerCampaigns />
                        ) : (
                          ""
                        )}
                        {activeTab === "tab5" ? <ViewBillboardCampaign /> : ""}
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

export default ViewCampaignTabs;
