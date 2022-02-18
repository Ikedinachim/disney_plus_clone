import React from "react";
import { Route, Routes } from "react-router-dom";

// import Header from "./components/layout/DashboardHeader";
// import Sidebar from "./components/layout/Sidebar";
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
import AllCampaigns from "./components/app/campaigns/AllCampaigns";
// import PreviewCampaign from "./components/app/campaigns/PreviewCampaign"
import SmsStepForm from "./components/app/campaigns/smsCampaign/SmsStepForm";
import FlierVideoStepForm from "./components/app/campaigns/flierVideoCampaign/FlierVideoStepForm";
import AppDownloadStepForm from "./components/app/campaigns/appDownloadCampaign/AppDownloadStepForm";
import InfluencerStepForm from "./components/app/campaigns/influencerCampaign/InfluencerStepForm";
import Analytics from "./components/app/analytics/analytics";
import AnalyticsTable from "./components/app/analytics/analyticsTable";
import Settings from "./components/app/settings/settings";
import Ads from "./adsView/Ads";

///////////////////////////////////////
import InfluencerDashboardLayout from "./influencer/InfluencerDashboardLayout";
import InfluencerDashboard from "./influencer/";
import InfluencerCampaignDetails from "./influencer/ViewInfluencerCampaignDetails";
import InfluencerSettings from "./influencer/settings";

// Auth / User Imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ForgotPassword from "./components/user/ForgotPassword";

import { useSelector } from "react-redux";

import "./dashforge.css";
// import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./main.css";
import "./style.css";

import AOS from "aos";
import "aos/dist/aos.css";
import CampaignDetails from "./components/app/campaigns/CampaignDetails";

AOS.init();

function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div>
      {/* {!loading && (isAuthenticated) ? <Sidebar /> : ""} */}
      {/* <div className="content ht-100v pd-0"> */}
      {/* {!loading && (isAuthenticated) && (
          <Header />
        )} */}
      <Routes>
        <Route
          path="/app"
          element={
            isAuthenticated && user.user.role === "user" ? (
              <DashboardLayout />
            ) : (
              <Login />
            )
          }
        >
          <Route
            index
            element={
              isAuthenticated && user.user.role === "user" ? (
                <Dashboard />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="sender-id"
            element={
              isAuthenticated && user.user.role === "user" ? (
                <SenderID />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="request-sender-id"
            element={
              isAuthenticated && user.user.role === "user" ? (
                <RequestSenderID />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="billing"
            element={
              isAuthenticated && user.user.role === "user" ? (
                <BillingOverview />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="billing/fund-wallet"
            element={
              isAuthenticated && user.user.role === "user" ? (
                <FundWallet />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="campaigns/:id"
            element={
              isAuthenticated && user.user.role === "user" ? (
                <CampaignDetails />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="campaigns"
            element={
              isAuthenticated && user.user.role === "user" ? (
                <AllCampaigns />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="campaign/create"
            element={
              isAuthenticated && user.user.role === "user" ? (
                <CreateCampaign />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="campaign/sms"
            element={
              isAuthenticated && user.user.role === "user" ? (
                <SmsStepForm />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="campaign/flier-video"
            element={
              isAuthenticated && user.user.role === "user" ? (
                <FlierVideoStepForm />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="campaign/app-download"
            element={
              isAuthenticated && user.user.role === "user" ? (
                <AppDownloadStepForm />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="campaign/influencer"
            element={
              isAuthenticated && user.user.role === "user" ? (
                <InfluencerStepForm />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="analytics/graph"
            element={
              isAuthenticated && user.user.role === "user" ? (
                <Analytics />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="analytics"
            element={
              isAuthenticated && user.user.role === "user" ? (
                <AnalyticsTable />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="setting"
            element={
              isAuthenticated && user.user.role === "user" ? (
                <Settings />
              ) : (
                <Login />
              )
            }
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
        <Route path="forgotpassword" element={<ForgotPassword />} />
        {/* <Route path="/app/sender-id" element={isAuthenticated ? <SenderID /> : <Login />} /> */}
        {/* <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}
        <Route path="/ad/:id/:campaignType/:slug" element={<Ads />} />
        {/* <Route path="*" element={isAuthenticated ? <Dashboard /> : <Login />} /> */}
      </Routes>

      <Routes>
        <Route
          path="/influencer"
          element={
            isAuthenticated && user.user.role === "influencer" ? (
              <InfluencerDashboardLayout />
            ) : (
              <Login />
            )
          }
        >
          <Route
            index
            element={
              isAuthenticated && user.user.role === "influencer" ? (
                <InfluencerDashboard />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="settings"
            element={
              isAuthenticated && user.user.role === "influencer" ? (
                <InfluencerSettings />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="view-campaign/:influenceMarketingId"
            element={
              isAuthenticated && user.user.role === "influencer" ? (
                <InfluencerCampaignDetails />
              ) : (
                <Login />
              )
            }
          />
        </Route>
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
