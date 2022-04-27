import React from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "./components/loader";

import Home from "./components/Home";
import Terms from "./components/Terms";
import Dashboard from "./components/app";
import DashboardLayout from "./components/app/DashboardLayout";
import SenderID from "./components/app/SenderID/SenderID";
import BillingOverview from "./components/app/billing/Billing";
import Transactions from "./components/app/billing/Transactions";
import FundWallet from "./components/app/billing/FundWallet";
import RequestSenderID from "./components/app/SenderID/RequestSenderID";
import CreateCampaign from "./components/app/campaigns/CreateCampaign";
import ViewCampaignTabs from "./components/app/campaigns/viewCampaigns/ViewCampaignTabs";
import SmsStepForm from "./components/app/campaigns/smsCampaign/SmsStepForm";
import FlierVideoStepForm from "./components/app/campaigns/flierVideoCampaign/FlierVideoStepForm";
import AppDownloadStepForm from "./components/app/campaigns/appDownloadCampaign/AppDownloadStepForm";
import InfluencerStepForm from "./components/app/campaigns/influencerCampaign/InfluencerStepForm";
import DigitalAnalytics from "./components/app/analytics/DigitalAnalytics";
import ViewAnalytics from "./components/app/analytics/ViewAnalytics";
import Settings from "./components/app/settings/settings";
import ChangePassword from "./components/app/settings/ChangePassword";
import Ads from "./adsView/Ads";

////////////// Single Campaigns /////////////////
import AppDownloadDetails from "./components/app/campaigns/campaignDetails/AppDownloadDetails";
import FlierVideosDetails from "./components/app/campaigns/campaignDetails/FlierVideosDetails";
import SmsDetails from "./components/app/campaigns/campaignDetails/SmsDetails";

///////////////////////////////////////
import InfluencerDashboardLayout from "./influencer/InfluencerDashboardLayout";
import InfluencerDashboard from "./influencer/";
import InfluencerCampaignDetails from "./influencer/ViewInfluencerCampaignDetails";
import InfluencerSettings from "./influencer/settings";
import UpdateInfluencerPassword from "./components/user/UpdatePassword";

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

import UserPasswordUpdate from "./components/user/UserPasswordUpdate";
import InfluencerDetails from "./components/app/campaigns/campaignDetails/InfluencerDetails";
import SmartSmsAnalytics from "./components/app/analytics/SmartSmsAnalytics";
import SmsAnalytics from "./components/app/analytics/SmsAnalytics";
import RegistrationConfirmation from "./components/user/RegistrationConfirmation";
import ResendVerification from "./components/user/ResendVerification";

//Admin
import AdminDashboardLayout from "./components/admin/AdminDashboardLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminSettings from "./components/admin/settings/AdminSettings";
import ChangeAdminPassword from "./components/admin/settings/ChangeAdminPassword";
import Statistics from "./components/admin/dailyStatistics/Statistics";
import AppDownloadAnalytics from "./components/app/analytics/AppDownloadAnalytics";

AOS.init();

function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
  const { resetInfluencerPassword } = useSelector(
    (state) => state.resetInfluencerPassword
  );

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
            isAuthenticated && user && user.user.role === "user" ? (
              <DashboardLayout />
            ) : (
              <Login />
            )
          }
        >
          <Route
            index
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <Dashboard />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="sender-id"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <SenderID />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="request-sender-id"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <RequestSenderID />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="billing"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <BillingOverview />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="transactions"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <Transactions />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="billing/fund-wallet"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <FundWallet />
              ) : (
                <Login />
              )
            }
          />

          {/* <Route
            path="billing/payment"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <MakePayment />
              ) : (
                <Login />
              )
            }
          /> */}

          <Route
            path="campaigns"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <ViewCampaignTabs />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="campaign/create"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <CreateCampaign />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="campaign/sms"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <SmsStepForm />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="campaign/flier-video"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <FlierVideoStepForm />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="campaign/app-download"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <AppDownloadStepForm />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="campaign/single-app-download/:id"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <AppDownloadDetails />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="campaign/single-flier-video/:id"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <FlierVideosDetails />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="campaign/single-sms/:id"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <SmsDetails />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="campaign/single-influencer/:id"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <InfluencerDetails />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="campaign/influencer"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <InfluencerStepForm />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="analytics/graph/:propellerId"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <DigitalAnalytics />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="analytics/smartsms/:id"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <SmartSmsAnalytics />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="analytics/sms/:id"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <SmsAnalytics />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="analytics/appdownload/:id"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <AppDownloadAnalytics/>
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="analytics"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <ViewAnalytics />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="setting"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <Settings />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="setting/change-password"
            element={
              isAuthenticated && user && user.user.role === "user" ? (
                <ChangePassword />
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
        <Route path="/terms-of-use" element={<Terms />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/password-change/:uuid/confirm"
          element={<UserPasswordUpdate />}
        />
        <Route
          path="/account-activation/:uuid"
          element={<RegistrationConfirmation />}
        />
        <Route path="/resend-verification" element={<ResendVerification />} />
        {/* <Route path="/app/sender-id" element={isAuthenticated ? <SenderID /> : <Login />} /> */}
        {/* <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}
        <Route path="/ad/:id/:campaignType/:slug" element={<Ads />} />
        {/* <Route path="*" element={isAuthenticated ? <Dashboard /> : <Login />} /> */}
        <Route
          path="update-password"
          element={
            (resetInfluencerPassword &&
              resetInfluencerPassword.statusCode === 102) ||
            (resetInfluencerPassword &&
              resetInfluencerPassword.statusCode === 104) ? (
              <UpdateInfluencerPassword />
            ) : (
              <Login />
            )
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/admin"
          element={
            isAuthenticated &&
            user &&
            user.user.role === "user" &&
            user.user.isAdmin === true ? (
              <AdminDashboardLayout />
            ) : (
              <Login />
            )
          }
        >
          <Route
            index
            element={
              isAuthenticated && user && user.user.isAdmin === true ? (
                <AdminDashboard />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/admin/settings"
            element={
              isAuthenticated && user && user.user.isAdmin === true ? (
                <AdminSettings />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/admin/settings/change-password"
            element={
              isAuthenticated && user && user.user.isAdmin === true ? (
                <ChangeAdminPassword />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/admin/statistics"
            element={
              isAuthenticated && user && user.user.isAdmin === true ? (
                <Statistics />
              ) : (
                <Login />
              )
            }
          />
        </Route>
      </Routes>
      <Routes>
        <Route
          path="/influencer"
          element={
            isAuthenticated && user && user.user.role === "influencer" ? (
              <InfluencerDashboardLayout />
            ) : (
              <Login />
            )
          }
        >
          <Route
            index
            element={
              isAuthenticated && user && user.user.role === "influencer" ? (
                <InfluencerDashboard />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="settings"
            element={
              isAuthenticated && user && user.user.role === "influencer" ? (
                <InfluencerSettings />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="view-campaign/:influenceMarketingId"
            element={
              isAuthenticated && user && user.user.role === "influencer" ? (
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
