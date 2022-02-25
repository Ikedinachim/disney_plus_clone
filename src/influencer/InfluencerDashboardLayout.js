import React, { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

// import MetaData from "../influencer/components/layout/MetaData";
import Loader from "../influencer/components/layout/Loader";
// import FeatherIcon from "feather-icons-react";
import { toast } from "react-toastify";

import Header from "../influencer/components/layout/DashboardHeader";
import Sidebar from "../influencer/components/layout/Sidebar";

const InfluencerDashboardLayout = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { loading } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.wallet);

  // const [isActive, setActive] = useState("false");

  // const ToggleClass = (e) => {
  //   setActive(!isActive);
  //   e.preventDefault();
  // };

  // const resetPropagation = (e) => {
  //     e.stopPropagation()
  //     e.preventDefault()
  //  }

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
