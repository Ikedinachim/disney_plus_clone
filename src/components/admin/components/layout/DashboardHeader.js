import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../../actions/authActions";
// import { getWallet } from "../../../actions/billingActions";

import FeatherIcon from "feather-icons-react";

const Header = () => {
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const { userDetails } = useSelector((state) => state || []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  // const { user } = useSelector((state) => state.auth);
  // const { wallet } = useSelector((state) => state.wallet);

  useEffect(() => {
    // dispatch(getWallet());
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dispatch, isMenuOpen]);

  return (
    <div className="content-header shadow-dash bd-b-0">
      <div className="content-search">
        <FeatherIcon icon="search" />
        <input type="search" className="form-control" placeholder="Search..." />
      </div>
      <nav className="nav justify-content-end col">
        {/* <div className=" ml-md-4 ml-2 mg-t-5">
          <div className="d-flex">
            <Link
              to="/app/billing/fund-wallet"
              className="tx-semibold tx-orange pd-t-1 mg-r-5"
              style={{ textDecoration: "underline" }}
            >
              Fund wallet
            </Link>
            <span className="mg-l-3 tx-14 tx-medium">
              <img
                src="../../assets/img/campaign.svg"
                alt="asset"
                srcSet
                style={{ marginRight: "3px" }}
              />
              Balance:{" "}
              <NumberFormat
                value={wallet && wallet.balance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </span>
          </div>
        </div> */}
        <div className="dropdown dropdown-profile ml-md-4 ml-2" ref={ref}>
          <div
            className="dropdown-link tx-dark tx-13 tx-medium"
            onClick={() => setIsMenuOpen((oldState) => !oldState)}
          >
            {userDetails.user.firstName}
            <div className="avatar avatar-sm mg-l-10">
              <img
                src={
                  userDetails.user
                    ? userDetails.user.imageUrl
                    : "https://via.placeholder.com/500"
                }
                className="rounded-circle"
                alt="asset"
              />
            </div>
          </div>
          {isMenuOpen && (
            <div className="dropdown-menu dropdown-menu-right dropdown-adjust tx-13 show">
              <div className="avatar avatar-lg mg-b-15">
                <img
                  src={
                    userDetails.user
                      ? userDetails.user.imageUrl
                      : "https://via.placeholder.com/500"
                  }
                  className="rounded-circle"
                  alt="asset"
                />
              </div>
              <h6 className="tx-semibold mg-b-5">
                {userDetails.user.firstName +
                  " " +
                  (userDetails.user.lastName ? userDetails.user.lastName : "")}
              </h6>
              <p className="mg-b-25 tx-12 tx-color-03">Administrator</p>
              <Link to="settings" className="dropdown-item">
                <FeatherIcon icon="edit-3" /> Edit Profile
              </Link>
              <Link to="settings" className="dropdown-item">
                <FeatherIcon icon="user" /> View Profile
              </Link>
              <div className="dropdown-divider" />
              <Link to="page-help-center.html" className="dropdown-item">
                <FeatherIcon icon="help-circle" /> Help Center
              </Link>
              <Link to="" className="dropdown-item">
                <FeatherIcon icon="life-buoy" /> Forum
              </Link>
              <Link to="settings" className="dropdown-item">
                <FeatherIcon icon="settings" /> Account Settings
              </Link>
              <Link to="settings" className="dropdown-item">
                <FeatherIcon icon="settings" /> Privacy Settings
              </Link>
              <Link to="/" className="dropdown-item" onClick={logoutHandler}>
                <FeatherIcon icon="log-out" /> Sign Out
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;