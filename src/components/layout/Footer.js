import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// import "../../App.css";
import "../../dashforge.css";
import "../../main.css";

const Footer = () => {
  return (
    <Fragment>
      <section className="footer">
        <div className="container py-5 tx-white">
          <div className="row mg-0 pd-0 col-md-12">
            <div className="col-md-2 col-6=12 pd-md-b-0 pd-b-20">
              <img src="./assets/img/logo.png" alt="" className="w-inherit" />
            </div>
            <div className="col-md-3 col-12 pd-md-b-0 pd-b-20">
              <ul className="list-unstyled tx-16 tx-bold footer-link tx-center">
                <h2 className="tx-white tx-primary tx-com tx-bold tx-20">
                  Quick Links
                </h2>
                <li>
                  <a href="#about">
                    About Us <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li>
                  <a href="#mysogi-contact">Contact</a>
                </li>
                <li>
                  <Link to="">Careers</Link>
                </li>
                <li>
                  <Link to="">FAQ</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-12 pd-md-b-0 pd-b-20">
              <ul className="list-unstyled tx-16 tx-bold footer-link tx-center">
                <h2 className="tx-white tx-primary tx-com tx-bold tx-20">
                  Our Services
                </h2>
                <li>
                  <Link to="">Smart SMS</Link>
                </li>
                <li>
                  <Link to="">Influencer Marketing</Link>
                </li>
                <li>
                  <Link to="">Digital Ads</Link>
                </li>
                <li>
                  <Link to="">Voice SMS</Link>
                </li>
                <li>
                  <Link to="">Billboard Marketing</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-12 pd-md-b-0 pd-b-20">
              <ul className="list-unstyled tx-16 tx-bold footer-link tx-right">
                <h2 className="tx-white tx-primary tx-com tx-bold tx-20">
                  Contact Info
                </h2>
                <li className="text-capitalize tx-bold tx-com">
                  <p className="tx-com">
                    3 Adedoyin Ogungbe Crecent,
                    <br />
                    Lekki Phase 1,
                    <br />
                    Lagos, Nigeria
                  </p>
                </li>
                <li>
                  <a href="tel://+2348122089773">
                    <i
                      className="fa fa-phone mg-r-10 tx-primary tx-semibold"
                      style={{ fontSize: "20px" }}
                    ></i>
                    +234 812 208 9773
                  </a>
                </li>
                <li>
                  <a href="mailto:info@mysogi.com.ng">
                    <i
                      className="fa fa-envelope-open mg-r-10 tx-primary tx-semibold"
                      style={{ fontSize: "20px" }}
                    ></i>
                    info@mysogi.com.ng
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-12 mg-md-t-50 mg-t-20">
              <form action="">
                <label htmlFor="" className="tx-16 tx-bold footer-label">
                  Subscribe to our newsletter
                </label>
                <div className="input-group pd-5 bg-white">
                  <input
                    type="text"
                    className="form-control bd-0"
                    placeholder=""
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary tx-12 pd-y-5"
                      type="button"
                      id="button-addon2"
                    >
                      Subscribe{" "}
                      <i
                        className="fa fa-arrow-right mg-l-10 mg-t-3"
                        style={{ fontSize: "14px" }}
                      ></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <hr className="bg-white mg-t-100" />
          <div className="row mg-t-30">
            <div className="col-md-6 col-12">
              <p className="tx-14 mb-0 tx-white ">
                Mysogi © {new Date().getFullYear()}
              </p>
            </div>
            <div className="col-md-6 col-12 d-flex justify-content-md-end justify-content-sm-start">
              <div className="d-flex">
                <p className="tx-14 mb-0 tx-light-blue">
                  <Link to={"/terms-of-use"} className="tx-white">
                    Terms and Policy
                  </Link>
                </p>
                <div className="mg-l-10">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.instagram.com/mysogiads/"
                    className="tx-white"
                  >
                    <i
                      className="fab fa-instagram mg-l-20 text-white"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.facebook.com/mysogiads/"
                    className="tx-white"
                  >
                    <i
                      className="fab fa-facebook-f mg-l-20 tx-white"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/company/mysogicompanylimited/"
                    className="tx-white"
                  >
                    <i
                      className="fab fa-linkedin-in mg-l-20 tx-white"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Footer;
