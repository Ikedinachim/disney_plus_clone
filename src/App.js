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
import ViewSenderID from "./components/app/SenderID/ViewSenderID";
// import { fundWallet } from '../../../actions/billingActions'

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
  const { fundWallet } = useSelector(state => state.fundWallet)

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
          <Route path="/app/view-sender-id" element={isAuthenticated ? <ViewSenderID /> : <Login />} />
          <Route path="/app" element={isAuthenticated ? <Dashboard /> : <Login />} />
          <Route path="/app/billing" element={isAuthenticated ? <BillingOverview /> : <Login />} />
          <Route path="/app/billing/fund-wallet" element={isAuthenticated || fundWallet !== null ? <FundWallet /> : <Login />} />
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

