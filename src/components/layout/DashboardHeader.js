import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import FeatherIcon from "feather-icons-react";

import { logout } from "../../actions/authActions";
// import { getWallet } from "../../actions/billingActions";
import walletIcon from "../../assets/img/campaign.svg";

const Header = () => {
  const ref = useRef();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoutHandler = () => {
    dispatch(logout());
  };

  // const { user } = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state);
  const { wallet } = useSelector((state) => state.wallet);

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

  const svgString =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15"><rect x="0" y="0" width="16" height="15" fill="#FF6600"/></svg>';
  const encodedSvg = encodeURIComponent(svgString);
  const dataUrl = `data:image/svg+xml,${encodedSvg}`;

  return (
    <div className="content-header shadow-dash bd-b-0">
      <div className="content-search">
        <FeatherIcon icon="search" />
        <input type="search" className="form-control" placeholder="Search..." />
      </div>
      <nav className="sm-nav nav justify-content-end">
        <div className=" ml-md-4 ml-2 mg-t-5">
          <div className="d-flex">
            <Link
              to="/app/billing/fund-wallet"
              className="nav-wallet pd-t-1 mg-r-5"
            >
              <div className="d-flex-center">
                <span className="tx-semibold tx-orange tx-underline mg-r-12">
                  Fund wallet
                </span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.94494 10.5602V4.28466C5.94473 4.07826 5.98523 3.87385 6.06412 3.68312C6.14301 3.49239 6.25874 3.3191 6.40468 3.17315C6.55063 3.02721 6.72392 2.91148 6.91465 2.83259C7.10537 2.7537 7.30979 2.7132 7.51618 2.71341H14.7635V1.93015C14.7652 1.51592 14.6025 1.11792 14.3113 0.823389C14.02 0.528859 13.6238 0.361827 13.2096 0.358908H1.87248C1.45352 0.35126 1.04848 0.509284 0.745396 0.798633C0.442312 1.08798 0.265684 1.48526 0.253906 1.90412V12.9407C0.265684 13.3596 0.442312 13.7568 0.745396 14.0462C1.04848 14.3355 1.45352 14.4936 1.87248 14.4859H13.2033C13.4087 14.4851 13.6119 14.4438 13.8013 14.3643C13.9907 14.2849 14.1626 14.1689 14.3072 14.023C14.4517 13.877 14.5661 13.704 14.6437 13.5139C14.7213 13.3237 14.7607 13.1201 14.7595 12.9147V12.1314H7.51224C7.09607 12.1308 6.69719 11.9649 6.40329 11.6703C6.10939 11.3756 5.94452 10.9763 5.94494 10.5602V10.5602Z"
                    fill="#FF6600"
                  />
                  <path
                    d="M7.50195 4.84795V9.99867C7.50237 10.1546 7.5645 10.304 7.67476 10.4143C7.78502 10.5246 7.93445 10.5867 8.09038 10.5871H14.9701C15.126 10.5867 15.2755 10.5246 15.3857 10.4143C15.496 10.304 15.5581 10.1546 15.5585 9.99867V4.84795C15.5581 4.69202 15.496 4.54259 15.3857 4.43233C15.2755 4.32207 15.126 4.25994 14.9701 4.25952H8.09038C7.93445 4.25994 7.78502 4.32207 7.67476 4.43233C7.5645 4.54259 7.50237 4.69202 7.50195 4.84795V4.84795ZM10.3416 8.59701C10.1027 8.61223 9.86494 8.55434 9.65985 8.43104C9.45476 8.30773 9.2921 8.12487 9.19353 7.90681C9.09496 7.68875 9.06517 7.44583 9.10811 7.21041C9.15106 6.97499 9.2647 6.75824 9.43392 6.58903C9.60313 6.41982 9.81988 6.30617 10.0553 6.26322C10.2907 6.22028 10.5336 6.25007 10.7517 6.34864C10.9698 6.44721 11.1526 6.60987 11.2759 6.81496C11.3992 7.02005 11.4571 7.25785 11.4419 7.49667C11.4234 7.78289 11.3011 8.05252 11.0979 8.25497C10.8948 8.45742 10.6247 8.57876 10.3384 8.59622L10.3416 8.59701Z"
                    fill="#FF6600"
                  />
                </svg>
              </div>
              <span className="nav-balance tx-14 tx-md-12 tx-dark tx-medium">
                Balance:{" "}
                <NumberFormat
                  value={wallet && wallet?.balance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                />
              </span>
            </Link>
          </div>
        </div>
        <div
          className="sm-hide dropdown dropdown-profile ml-md-4 ml-2"
          ref={ref}
        >
          <div
            className="dropdown-link tx-dark tx-13 tx-medium"
            onClick={() => setIsMenuOpen((oldState) => !oldState)}
          >
            {userDetails?.user?.username}
            <div className="avatar avatar-sm mg-l-10">
              <img
                src={
                  userDetails?.user && userDetails?.user?.imageUrl
                    ? userDetails?.user?.imageUrl
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
                    userDetails?.user && userDetails?.user.imageUrl
                      ? userDetails?.user.imageUrl
                      : "https://via.placeholder.com/500"
                  }
                  className="rounded-circle"
                  alt="asset"
                />
              </div>
              <h6 className="tx-semibold mg-b-5">
                {userDetails?.user?.firstName +
                  " " +
                  userDetails?.user?.lastName}
              </h6>
              <p className="mg-b-25 tx-12 tx-color-03">Administrator</p>
              {/* <Link to="admin" className="dropdown-item">
                <FeatherIcon icon="edit-3" /> Edit Profile
              </Link> */}
              {/* <Link to="/app/setting" className="dropdown-item">
                <FeatherIcon icon="user" /> View Profile
              </Link> */}
              <Link to="settings" className="dropdown-item">
                <FeatherIcon icon="settings" /> Account Settings
              </Link>
              <div className="dropdown-divider" />
              <Link to="#" className="dropdown-item disabled">
                <FeatherIcon icon="help-circle" /> Help Center
              </Link>
              <Link to="" className="dropdown-item disabled">
                <FeatherIcon icon="life-buoy" /> Forum
              </Link>
              {/* <Link to="setting" className="dropdown-item">
                <FeatherIcon icon="settings" /> Privacy Settings
              </Link> */}
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
