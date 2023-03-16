import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

// User Imports
import Dashboard from "../components/app";
import SenderID from "../components/app/SenderID/SenderID";
import BillingOverview from "../components/app/billing/Billing";
import Transactions from "../components/app/billing/Transactions";
import FundWallet from "../components/app/billing/FundWallet";
import RequestSenderID from "../components/app/SenderID/RequestSenderID";
import CreateCampaign from "../components/app/campaigns/CreateCampaign";
import ViewCampaignTabs from "../components/app/campaigns/viewCampaigns/ViewCampaignTabs";
import SmsStepForm from "../components/app/campaigns/smsCampaign/SmsStepForm";
import FlierVideoStepForm from "../components/app/campaigns/flierVideoCampaign/FlierVideoStepForm";
import SmartAdStepForm from "../components/app/campaigns/flierVideoCampaign/SmartAdStepForm";
import AppDownloadStepForm from "../components/app/campaigns/appDownloadCampaign/AppDownloadStepForm";
import InfluencerStepForm from "../components/app/campaigns/influencerCampaign/InfluencerStepForm";
import BillBoardStepForm from "../components/app/campaigns/billBoardCampaign/BillBoardStepForm";
import DigitalAnalytics from "../components/app/analytics/DigitalAnalytics";
import ViewAnalytics from "../components/app/analytics/ViewAnalytics";
import Settings from "../components/app/settings/settings";
import ChangePassword from "../components/app/settings/ChangePassword";
import AppDownloadDetails from "../components/app/campaigns/campaignDetails/AppDownloadDetails";
import FlierVideosDetails from "../components/app/campaigns/campaignDetails/FlierVideosDetails";
import SmsDetails from "../components/app/campaigns/campaignDetails/SmsDetails";
import BillboardDetails from "../components/app/campaigns/campaignDetails/BillboardDetails";
import UserPasswordUpdate from "../components/user/UserPasswordUpdate";
import InfluencerDetails from "../components/app/campaigns/campaignDetails/InfluencerDetails";
import SmartSmsAnalytics from "../components/app/analytics/SmartSmsAnalytics";
import SmsAnalytics from "../components/app/analytics/SmsAnalytics";
import AppDownloadAnalytics from "../components/app/analytics/AppDownloadAnalytics";
import RegistrationConfirmation from "../components/user/RegistrationConfirmation";
import ResendVerification from "../components/user/ResendVerification";
import Ecommerce from "../components/app/ecommerce/Ecommerce";
import CreateStore from "../components/app/ecommerce/CreateStore";
import EditStore from "../components/app/ecommerce/EditStore";
import AddProduct from "../components/app/ecommerce/AddProduct";
import EditProduct from "../components/app/ecommerce/EditProduct";

// Public Import
import Home from "../components/Home";
import Ads from "../adsView/Ads";
import Login from "../components/user/Login";
import Register from "../components/user/Register";
import ForgotPassword from "../components/user/ForgotPassword";
import Terms from "../components/Terms";

// Admin Import
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminSettings from "../components/admin/settings/AdminSettings";
import ChangeAdminPassword from "../components/admin/settings/ChangeAdminPassword";

// Influencer Import
import UpdateInfluencerPassword from "../components/user/UpdatePassword";
import InfluencerDashboard from "../influencer/";
import InfluencerCampaignDetails from "../influencer/ViewInfluencerCampaignDetails";
import InfluencerSettings from "../influencer/settings";

// Billboard import
import BillboardCampaignDetails from "../influencer/ViewBillboardCampaignDetails";

const MainRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  const { resetInfluencerPassword } = useSelector(
    (state) => state.resetInfluencerPassword
  );
  return (
    <Routes>
      {/** Protected Routes For User */}
      {/** Wrap all Route under ProtectedRoutes element */}
      <Route
        path="/app"
        element={<ProtectedRoutes roleRequired={user?.user?.role} />}
      >
        <Route index element={<Dashboard />} />
        <Route path="sender-id" element={<SenderID />} />
        <Route path="request-sender-id" element={<RequestSenderID />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="billing" element={<BillingOverview />} />
        <Route path="billing/fund-wallet" element={<FundWallet />} />
        <Route path="campaigns" element={<ViewCampaignTabs />} />
        {/* <Route path="campaign/smart-ads" element={<FlierVideoStepForm />} /> */}
        <Route path="campaign/smart-ads" element={<SmartAdStepForm />} />
        <Route path="campaign/app-download" element={<AppDownloadStepForm />} />
        <Route
          path="campaign/single-app-download/:id"
          element={<AppDownloadDetails />}
        />
        <Route
          path="campaign/single-flier-video/:id"
          element={<FlierVideosDetails />}
        />
        <Route path="campaign/single-sms/:id" element={<SmsDetails />} />
        <Route
          path="campaign/single-billboard/:id"
          element={<BillboardDetails />}
        />
        <Route
          path="campaign/single-influencer/:id"
          element={<InfluencerDetails />}
        />
        <Route path="campaign/sms" element={<SmsStepForm />} />
        <Route path="campaign/influencer" element={<InfluencerStepForm />} />
        <Route path="campaign/billboard" element={<BillBoardStepForm />} />
        <Route path="campaign" element={<CreateCampaign />}>
          <Route index element={<CreateCampaign />} />
          <Route path="create" element={<CreateCampaign />} />
        </Route>
        <Route path="analytics" element={<ViewAnalytics />} />
        <Route
          path="analytics/graph/:propellerId"
          element={<DigitalAnalytics />}
        />
        <Route path="analytics/smartsms/:id" element={<SmartSmsAnalytics />} />
        <Route path="analytics/sms/:id" element={<SmsAnalytics />} />
        <Route
          path="analytics/appdownload/:id"
          element={<AppDownloadAnalytics />}
        />
        <Route path="settings" element={<Settings />}>
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        <Route path="ecommerce" element={<Ecommerce />} />
        {/* <Route path="ecommerce" element={<Ecommerce />} /> */}
        <Route path="ecommerce/create-store" element={<CreateStore />} />
        <Route path="ecommerce/edit-store/:id" element={<EditStore />} />
        <Route path="ecommerce/add-product" element={<AddProduct />} />
        <Route path="ecommerce/edit-product/:id" element={<EditProduct />} />
      </Route>

      {/** Protected Routes For Admin */}
      {/** Wrap all Admin Route under ProtectedRoutes element */}
      <Route
        path="admin"
        element={<ProtectedRoutes isAdmin={user?.user?.isAdmin} />}
      >
        <Route index element={<AdminDashboard />} />
        <Route path="settings" element={<AdminSettings />}></Route>
        <Route
          path="settings/change-password"
          element={<ChangeAdminPassword />}
        ></Route>
      </Route>

      {/** Protected Routes For Influencer Dashboard */}
      {/** Wrap all Influencer Route under ProtectedRoutes element */}
      <Route
        path="/influencer"
        element={<ProtectedRoutes roleRequired={user?.user?.role} />}
      >
        <Route index element={<InfluencerDashboard />} />
        <Route path="settings" element={<InfluencerSettings />} />
        <Route
          path="view-campaign/:influenceMarketingId"
          element={<InfluencerCampaignDetails />}
        />
      </Route>

      {/** Protected Routes For Billboard Dashboard */}
      {/** Wrap all Billboard Route under ProtectedRoutes element */}
      <Route
        path="/billboard"
        element={<ProtectedRoutes roleRequired={user?.user?.role} />}
      >
        <Route index element={<InfluencerDashboard />} />
        <Route path="provider/settings" element={<InfluencerSettings />} />
        <Route
          path="view-campaign/:billboardMarketingId"
          element={<BillboardCampaignDetails />}
        />
      </Route>

      {/** Public Routes */}
      {/** Wrap all Route under PublicRoutes element */}
      <Route path="/" element={<PublicRoutes />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="terms-of-use" element={<Terms />} />
        <Route path="register" element={<Register />} />
        <Route path="referral/:uuid" element={<Register />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route
          path="password-change/:uuid/confirm"
          element={<UserPasswordUpdate />}
        />
        <Route
          path="account-activation/:uuid"
          element={<RegistrationConfirmation />}
        />
        <Route path="resend-verification" element={<ResendVerification />} />
        <Route path="ad/:id/:campaignType/:slug" element={<Ads />} />
        <Route
          path="update-password"
          element={
            (resetInfluencerPassword &&
              resetInfluencerPassword?.statusCode === 102) ||
            (resetInfluencerPassword &&
              resetInfluencerPassword?.statusCode === 104) ? (
              <UpdateInfluencerPassword />
            ) : (
              <Login />
            )
          }
        />
      </Route>

      {/** Permission denied route */}
      {/* <Route path="/denied" element={<PermissionDenied />} /> */}
    </Routes>
  );
};

export default MainRoutes;
