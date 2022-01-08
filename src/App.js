import React, { Fragment } from "react";
import { Route, Routes, Navigate, Router } from "react-router-dom";

import Header from "./components/layout/DashboardHeader";
import Sidebar from "./components/layout/Sidebar";
import Loader from "./components/loader";

import Home from "./components/Home";
import Dashboard from "./components/app";
import DashboardLayout from "./components/app/DashboardLayout";
import SenderID from "./components/app/SenderID/SenderID";
import BillingOverview from "./components/app/billing/Billing";
import FundWallet from "./components/app/billing/FundWallet";
import RequestSenderID from "./components/app/SenderID/RequestSenderID";
import CreateCampaign from "./components/app/campaigns/CreateCampaign";
// import TargetAudience from "./components/app/campaigns/TargetAudience"
// import ViewCampaign from "./components/app/campaigns/ViewCampaign"
import ViewCampaignTabs from "./components/app/campaigns/viewCampaigns/ViewCampaignTabs";
// import PreviewCampaign from "./components/app/campaigns/PreviewCampaign"
import SmsStepForm from "./components/app/campaigns/smsCampaign/SmsStepForm";
import FlierVideoStepForm from "./components/app/campaigns/flierVideoCampaign/FlierVideoStepForm";
import AppDownloadStepForm from "./components/app/campaigns/appDownloadCampaign/AppDownloadStepForm";
import InfluencerStepForm from "./components/app/campaigns/influencerCampaign/InfluencerStepForm";
import Ads from "./adsView/Ads";

// Auth / User Imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";

import { useSelector } from "react-redux";

import "./dashforge.css";
import "./main.css";
import "./style.css";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

function App() {
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div>
      {/* {!loading && (isAuthenticated) ? <Sidebar /> : ""} */}
      {/* <div className="content ht-100v pd-0"> */}
      {/* {!loading && (isAuthenticated) && (
          <Header />
        )} */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/app"
          element={isAuthenticated ? <DashboardLayout /> : <Login />}
        >
          <Route index element={isAuthenticated ? <Dashboard /> : <Login />} />
          <Route
            path="sender-id"
            element={isAuthenticated ? <SenderID /> : <Login />}
          />
          <Route
            path="request-sender-id"
            element={isAuthenticated ? <RequestSenderID /> : <Login />}
          />
          <Route
            path="billing"
            element={isAuthenticated ? <BillingOverview /> : <Login />}
          />
          <Route
            path="billing/fund-wallet"
            element={isAuthenticated ? <FundWallet /> : <Login />}
          />
          <Route
            path="campaigns"
            element={isAuthenticated ? <ViewCampaignTabs /> : <Login />}
          />
          <Route
            path="campaign/create"
            element={isAuthenticated ? <CreateCampaign /> : <Login />}
          />
          <Route
            path="campaign/sms"
            element={isAuthenticated ? <SmsStepForm /> : <Login />}
          />
          <Route
            path="campaign/flier-video"
            element={isAuthenticated ? <FlierVideoStepForm /> : <Login />}
          />
          <Route
            path="campaign/app-download"
            element={isAuthenticated ? <AppDownloadStepForm /> : <Login />}
          />
          <Route
            path="campaign/influencer"
            element={isAuthenticated ? <InfluencerStepForm /> : <Login />}
          />
        </Route>
        {/* <Route path="/app/campaign/preview" element={isAuthenticated ? <PreviewCampaign /> : <Login />} /> */}
        {/* <Route path="/app/campaign/audience" element={isAuthenticated ? <TargetAudience /> : <Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/app" element={isAuthenticated ? <Dashboard /> : <Home />} /> */}
        {/* <Route path="*" element={isAuthenticated ? <Dashboard /> : <Login />} /> */}
        {/* <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}
      </Routes>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/app/sender-id" element={isAuthenticated ? <SenderID /> : <Login />} /> */}
        {/* <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}
        <Route path="/ad/:id/:campaignType/:slug" element={<Ads />} />
        {/* <Route path="*" element={isAuthenticated ? <Dashboard /> : <Login />} /> */}
      </Routes>
      {loading ? <Loader /> : null}
      {/* </div> */}
    </div>
  );
}

export default App;

// function PrivateRoute({ children }) {
//   return localStorage.getItem('user') !== null ? children : <Navigate to="/login" />;

// }
