import React, { useEffect } from "react";
import { Route, Routes, Navigate, Router } from "react-router-dom";

import Header from "./components/layout/DashboardHeader";
import Sidebar from "./components/layout/Sidebar";
import Loader from "./components/loader";

import Home from "./components/Home";
import Dashboard from "./components/app";
import SenderID from "./components/app/SenderID/SenderID";
import BillingOverview from "./components/app/billing/Billing";
import FundWallet from "./components/app/billing/FundWallet";
import RequestSenderID from "./components/app/SenderID/RequestSenderID";
import CreateCampaign from "./components/app/campaigns/CreateCampaign"
import SmsCampaign from "./components/app/campaigns/SmsCampaign"
import TargetAudience from "./components/app/campaigns/TargetAudience"
import ViewCampaign from "./components/app/campaigns/ViewCampaign"
import PreviewCampaign from "./components/app/campaigns/PreviewCampaign"
import SmsStepForm from "./components/app/campaigns/stepForm/SmsStepForm"

// Auth / User Imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";

import { useSelector } from "react-redux";

import "./dashforge.css";
import "./main.css";

import AOS from 'aos'
import 'aos/dist/aos.css';
AOS.init();

function App() {
  // useEffect(() => {
  //   store.dispatch(loadUser())
  // }, [])

  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  // const routing = useRoutes(routes(isAuthenticated));

  return (
    <div>
      {!loading && (isAuthenticated) ? <Sidebar /> : ""}
      <div className="content ht-100v pd-0">
        {!loading && (isAuthenticated) && (
          <Header />
        )}
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/app/sender-id" element={isAuthenticated ? <SenderID /> : <Login />} />
          <Route path="/app/request-sender-id" element={isAuthenticated ? <RequestSenderID /> : <Login />} />
          <Route path="/app" element={isAuthenticated ? <Dashboard /> : <Login />} />
          <Route path="/app/billing" element={isAuthenticated ? <BillingOverview /> : <Login />} />
          <Route path="/app/billing/fund-wallet" element={isAuthenticated ? <FundWallet /> : <Login />} />
          <Route path="/app/campaigns" element={isAuthenticated ? <ViewCampaign /> : <Login />} />
          <Route path="/app/campaign/create" element={isAuthenticated ? <CreateCampaign /> : <Login />} />
          <Route path="/app/campaign/sms" element={isAuthenticated ? <SmsStepForm /> : <Login />} />
          <Route path="/app/campaign/preview" element={isAuthenticated ? <PreviewCampaign /> : <Login />} />
          <Route path="/app/campaign/audience" element={isAuthenticated ? <TargetAudience /> : <Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/app" element={isAuthenticated ? <Dashboard /> : <Home />} /> */}
          {/* <Route path="*" element={isAuthenticated ? <Dashboard /> : <Login />} /> */}
        </Routes>
      
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/app/sender-id" element={isAuthenticated ? <SenderID /> : <Login />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/app" element={isAuthenticated ? <Dashboard /> : <Login />} /> */}
          {/* <Route path="*" element={isAuthenticated ? <Dashboard /> : <Login />} /> */}
        </Routes>
      {loading ? <Loader /> : null}
      </div>
    </div>
  );
}

export default App;

function PrivateRoute({ children }) {
  return localStorage.getItem('user') !== null ? children : <Navigate to="/login" />;

}

