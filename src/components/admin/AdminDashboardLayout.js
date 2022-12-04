import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "./components/layout/Loader";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/AdminSidebar";
import DashboardHeader from "./components/layout/DashboardHeader";
import { getUser } from "../../actions/authActions";

const AdminDashboardLayout = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(getUser());
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
            <DashboardHeader />
            <Outlet />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AdminDashboardLayout;
