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
          <div className="row col-md-9">
            <div className="col-md-3 col-6">
              <img src="./assets/img/logo.png" alt="" />
            </div>
            <div className="col-md-3 col-6">
              <ul className="list-unstyled tx-16 tx-bold footer-link">
                <li>
                  <Link to="">Campaigns</Link>
                </li>
                <li>
                  <Link to="">Contact</Link>
                </li>
                <li></li>
              </ul>
            </div>
            <div className="col-md-6 col-12">
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
            <div className="col-md-3 offset-md-9 col-12">
              <div className="d-flex">
                <p className="tx-14 mb-0 tx-light-blue">Terms and Policy</p>
                <div className="mg-l-10">
                  <Link to="http://" className="tx-white">
                    <i
                      className="fab fa-twitter mg-l-20 text-white"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </Link>
                  <Link to="http://" className="tx-white">
                    <i
                      className="fab fa-facebook-f mg-l-20 tx-white"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </Link>
                  <Link to="http://" className="tx-white">
                    <i
                      className="fab fa-linkedin-in mg-l-20 tx-white"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </Link>
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
