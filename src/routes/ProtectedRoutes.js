import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../components/layout/Loader";
import Header from "../components/layout/DashboardHeader";
import Sidebar from "../components/layout/Sidebar";
import AdminSidebar from "../components/admin/components/layout/AdminSidebar";
import DashboardHeader from "../components/admin/components/layout/DashboardHeader";
import InfluencerHeader from "../influencer/components/layout/DashboardHeader";
import InfluencerSidebar from "../influencer/components/layout/Sidebar";

const ProtectedRoutes = ({ roleRequired, isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

  //if the role required is there or not
  if (loading) {
    return <Loader />;
  } else if (isAuthenticated) {
    if (roleRequired === "user") {
      return (
        <Fragment>
          <Sidebar user={user} />
          <div className="content ht-100v pd-0">
            <Header />
            <Outlet />
          </div>
        </Fragment>
      );
    } else if (isAdmin === user?.user?.isAdmin) {
      return (
        <Fragment>
          <AdminSidebar />
          <div className="content ht-100v pd-0">
            <DashboardHeader />
            <Outlet />
          </div>
        </Fragment>
      );
    } else if (
      roleRequired === "influencer" ||
      roleRequired === "billboard_provider"
    ) {
      return (
        <Fragment>
          <InfluencerSidebar />
          <div className="content ht-100v pd-0">
            <InfluencerHeader />
            <Outlet />
          </div>
        </Fragment>
      );
    } else {
      return <Navigate to="/app" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
