// /* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

import Logo from "../../assets/img/logo2.png";

import { useSelector } from "react-redux";

// import "../../App.css";
import "../../dashforge.css";
import "../../main.css";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Fragment>
      <header>
     {!isAuthenticated && <div className="new-billboard">
                <div  className="new-billboard-btn" onClick={null} >
                    E-Commerce!
                </div>
                 <h3>Get your mini-website in 5 minutes</h3>
                 <a href='#section-three'>Learn more 
                 <img src="./assets/img/arrow.png" alt="" />
                 </a>
            </div>}
        <nav className="navbar navbar-expand-lg bg-white bd shadow-sm">
          <div className="container">
            <Link
              className="navbar-brand tx-bold tx-spacing--2 order-1 pd-y-0"
              to="/"
            >
              <img src={Logo} className="sec-logo img-fluid" alt="pofile" />
            </Link>
            {isAuthenticated ? (
              <Link to="/app" className="order-2 btn btn-primary">
                Dashboard
              </Link>
            ) : (
              <>
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
                    {/* <li className="nav-item active">
                      <a className="nav-link tx-dark tx-bolder" href="#about">
                        About Us <span className="sr-only">(about us)</span>
                      </a>
                    </li>
                    <li className="nav-item pd-x-20">
                      <a className="nav-link tx-dark tx-bolder" href="#about">
                        FAQ <span className="sr-only">(faq)</span>
                      </a>
                    </li> */}
                    <li className="nav-item pd-x-20">
                      <a
                        className="nav-link tx-dark tx-bolder"
                        href="#campaigns"
                      >
                        Campaigns
                      </a>
                    </li>
                    <li className="nav-item pd-x-20">
                      <a
                        className="nav-link tx-dark tx-bolder"
                        href="#mysogi-contact"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li className="nav-item pd-r-20 pd-md-l-100 pd-l-20">
                      <Link
                        to="/login"
                        className="btn pd-y-8 pd-x- btn-auth tx-primary tx-bolder"
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
              </>
            )}
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
