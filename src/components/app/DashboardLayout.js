import React, { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../layout/Loader";
import Header from "../layout/DashboardHeader";
import Sidebar from "../layout/Sidebar";

const Dashboard = () => {
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

export default Dashboard;
