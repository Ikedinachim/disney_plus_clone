import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import NavLogo from "../../../../assets/img/logo.svg";

import FeatherIcon from "feather-icons-react";

const Sidebar = () => {
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [width, setWindowWidth] = useState(0);
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
        document.body.classList.remove("show-aside");
      }
    };

    let backdrop = document.createElement("div");

    if (isMenuOpen && width < 989) {
      document.body.classList.add("show-aside");
      backdrop.classList.add("aside-backdrop");
      document.body.appendChild(backdrop);
    }
    if ((!isMenuOpen && width < 989) || (isMenuOpen && width > 989)) {
      document.body.classList.remove("show-aside");
      document.querySelector(".aside-backdrop") &&
        document.body.removeChild(document.querySelector(".aside-backdrop"));
    }

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen, width]);

  return (
    <aside
      className={`aside aside-fixed ${
        !isMenuOpen ? (width > 989 ? "minimize" : "") : ""
      }
       ${!isMenuOpen && hovered ? "maximize" : ""}
      `}
      ref={ref}
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
      <div className="aside-body h-100">
        <ul className="nav nav-aside">
          <li className="nav-item active">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <i className="fa fa-archive mr-3" />
              <span>Sender Ids</span>
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink
              to="/admin/settings"
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
              to="/app"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <i className="fa fa-home mr-3" />
              <span>Dashboard</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
