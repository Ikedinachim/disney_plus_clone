import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../influencer/components/layout/Loader";
import Header from "../influencer/components/layout/DashboardHeader";
import Sidebar from "../influencer/components/layout/Sidebar";

const InfluencerDashboardLayout = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.wallet);

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Sidebar />
          <div className="content ht-100v pd-0">
            <Header />
            <Outlet />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default InfluencerDashboardLayout;
