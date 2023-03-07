import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import NavLogo from "../../assets/img/logo.svg";

import FeatherIcon from "feather-icons-react";

const Sidebar = ({ user }) => {
  const ref = useRef();
  const [width, setWindowWidth] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(width > 989 ? false : true);
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

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
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
