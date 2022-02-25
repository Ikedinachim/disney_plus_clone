// /* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

import Logo from "../../assets/img/logo2.png";

// import { useDispatch, useSelector } from 'react-redux'
// import { useAlert } from 'react-alert'
// import { logout } from '../../actions/authActions'

// import "../../App.css";
import "../../dashforge.css";
import "../../main.css";

// import Search from "./Search";

const Header = () => {
  return (
    <Fragment>
      <header>
        <nav className="navbar navbar-expand-lg bg-white bd shadow-sm">
          <div className="container">
            <Link
              className="navbar-brand tx-bold tx-spacing--2 order-1 pd-y-0"
              to="/"
            >
              <img src={Logo} className="sec-logo img-fluid" alt="pofile" />
            </Link>
            <button
              className="navbar-toggler order-2"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {/* <i data-feather="menu" className="wd-20 ht-20"></i> */}
              <FeatherIcon icon="menu" className="wd-20 ht-20" />
            </button>

            <div
              className="collapse navbar-collapse order-2"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link tx-dark" href="#campaign">
                    Campaign <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item pd-x-20">
                  <Link className="nav-link tx-dark" to="/">
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item pd-r-20 pd-md-l-100 pd-l-20">
                  <Link
                    to="/login"
                    className="btn pd-y-8 pd-x- btn-auth tx-primary"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/register"}
                    className="btn btn-primary pd-x-40 btn-auth"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
