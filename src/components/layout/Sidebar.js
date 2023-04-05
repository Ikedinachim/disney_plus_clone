import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FeatherIcon from "feather-icons-react";

import NavLogo from "../../assets/img/logo.svg";
import { logout } from "../../actions/authActions";

const Sidebar = ({ user }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [width, setWindowWidth] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(width > 989 ? false : true);
  // const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);
  const { userDetails } = useSelector((state) => state);
  const logoutHandler = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    document.body.classList.remove("show-aside") &&
      document.body.classList.remove("show-aside");
    document.querySelector(".aside-backdrop") &&
      document.body.removeChild(document.querySelector(".aside-backdrop"));
  };

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  // const toggleProfile = () => {
  //   setIsProfileOpen(!isProfileOpen);
  // };

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    let backdrop = document.createElement("div");

    if (!isMenuOpen && width < 989) {
      document.body.classList.add("show-aside");
      backdrop.classList.add("aside-backdrop");
      document.body.appendChild(backdrop);
    }
    if ((isMenuOpen && width < 989) || (!isMenuOpen && width > 989)) {
      document.body.classList.remove("show-aside") &&
        document.body.classList.remove("show-aside");
      document.querySelector(".aside-backdrop") &&
        document.body.removeChild(document.querySelector(".aside-backdrop"));
    }

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen, width, setIsMenuOpen]);

  return (
    <aside
      className={`aside aside-fixed ${
        !isMenuOpen ? (width > 989 ? "minimize" : "") : ""
      }
       ${!isMenuOpen && hovered && width > 989 ? "maximize" : ""}
      `}
      ref={width > 989 ? null : ref}
      // ref={ref}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div className={`aside-header ${isMenuOpen ? "" : ""}`}>
        <NavLink to="/app" className="aside-logo">
          <div className="pd-50">
            <img src={NavLogo} className="img-fluid logo" alt="logo" />
          </div>
        </NavLink>
        <div className="aside-menu-link">
          <FeatherIcon
            icon="menu"
            onClick={() => setIsMenuOpen((oldState) => !oldState)}
          />
          <FeatherIcon
            icon="x"
            onClick={() => setIsMenuOpen((oldState) => !oldState)}
          />
        </div>
      </div>
      <div className="aside-body">
        <div className="sm-show accordion">
          <div
            className="accordion-header tx-13 tx-medium"
            // onClick={toggleProfile}
          >
            <div className="accordion-header-main">
              {userDetails?.user?.firstName + " " + userDetails?.user?.lastName}
              {/* <span>
                {isProfileOpen ? (
                  <i className="fa fa-chevron-up"></i>
                ) : (
                  <i className="fa fa-chevron-down"></i>
                )}
              </span> */}
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
            <p className="tx-12 tx-color-03">Administrator</p>
          </div>
          {/* {isProfileOpen && (
            <div className="accordion-content">
              {userDetails?.user?.username}
              <div>
                <NavLink
                  to="/app"
                  end
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <i className="fa fa-home mr-3" />
                  <span>Home</span>
                </NavLink>
              </div>
              <NavLink to="settings" className="dropdown-item">
                <FeatherIcon icon="settings" /> Account Settings
              </NavLink>
              <div className="dropdown-divider" />
              <NavLink to="/" className="dropdown-item" onClick={logoutHandler}>
                <FeatherIcon icon="log-out" /> Sign Out
              </NavLink>
            </div>
          )} */}
        </div>
        <ul className="nav nav-aside">
          <li className="nav-item active">
            <NavLink
              to="/app"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <i className="fa fa-home mr-3" />
              <span>Home</span>
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink
              to="/app/campaigns"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <i className="fa fa-archive mr-3" />
              <span>Campaigns</span>
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink
              to="/app/ecommerce"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <i className="fa fa-store mr-3" />
              <span>Ecommerce</span>
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink
              to="/app/billing"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <i className="fas fa-money-bill mr-3" />
              <span>Billing</span>
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink
              to="/app/sender-id"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <i className="fa fa-user mr-3 tx-muted" />
              <span>Sender ID</span>
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink
              to="/app/settings"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <i className="fa fa-cog mr-3" />
              <span>Settings</span>
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink
              to="/app/analytics"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <i className="fa fa-chart-bar mr-3" />{" "}
              <span className="marine-active-menu">Analytics</span>
            </NavLink>
          </li>
          {user?.user?.isAdmin ? (
            <li className="nav-item active">
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <i className="fa fa-lock mr-3" />{" "}
                <span className="marine-active-menu">Admin</span>
              </NavLink>
            </li>
          ) : null}
          <li className="nav-signout nav-item active sm-show">
            <NavLink
              to="/"
              className="nav-link"
              onClick={logoutHandler}
              // ref={ref}
            >
              <i className="fas fa-sign-out-alt mr-3" />{" "}
              <span className="marine-active-menu">Sign Out</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
