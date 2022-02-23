import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../loader";
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/authActions";
import { getWallet } from "../../actions/billingActions";

const Login = () => {
  const navHistory = useNavigate();

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [userStatus, setUserStatus] = useState()

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading, user, resetPassword } = useSelector(
    (state) => state.auth
  );
  // const { isAuthenticated, error, loading, user, resetPassword } = useSelector(
  //   (state) => state.auth
  // );

  useEffect(() => {
    if (isAuthenticated && user.user.role !== "influencer") {
      dispatch(getWallet());
      navHistory("/app");
    } else if (
      !isAuthenticated &&
      resetPassword &&
      resetPassword.statusCode === 102
    ) {
      navHistory("/update-password");
      alert.error(resetPassword.message);
    } else if (isAuthenticated && user && user.user.role === "influencer") {
      dispatch(getWallet());
      navHistory("/influencer");
    } else if (!isAuthenticated && error && error.statusCode === 104) {
      alert.error(error.message);
      // dispatch(clearErrors());
    } else {
      navHistory("/login");
      setUsername("");
      setPassword("");
    }
  }, [
    dispatch,
    alert,
    user,
    isAuthenticated,
    resetPassword,
    error,
    navHistory,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(userName, password));
    dispatch(getWallet());
    setUsername("");
    setPassword("");
  };

  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <Fragment>
        <MetaData title={"Login"} />
        <section className="ht-100v container-fluid">
          <div className="row">
            <div className="col-md-6 login-bg card-height d-none d-md-block d-lg-block d-xl-block">
              <div className="pd-50">
                <img
                  src="./assets/img/logo.svg"
                  className="img-fluid logo"
                  alt=""
                  srcSet=""
                />
              </div>
            </div>
            <div className="col-md-6 login-side">
              <div className="container pd-lg-30 pd-10">
                <Link
                  to="../"
                  type="button"
                  className="close close-btn"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </Link>
                <div>
                  <div className="col-lg-10 col-xl-8 mx-auto pd-t-30 tx-center welcome-div">
                    <p className="tx-36 tx-bold mb-2 tx-com">Welcome Back</p>
                    <p className="tx-16 tx-gray">
                      Welcome back! Please login to your account.
                    </p>
                    <form className="mg-y-50" onSubmit={submitHandler}>
                      <div className="form-group">
                        <input
                          className="form-control new"
                          placeholder="Username"
                          type="text"
                          id="email_field"
                          value={userName}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control new"
                          placeholder="Password"
                          type="password"
                          id="password_field"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-row mg-t-30">
                        <div className="form-group col-md-6 col-6">
                          <div className="custom-control custom-checkbox float-left">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck1"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6 col-6">
                          <Link to="../forgotpassword">Forgot Password</Link>
                        </div>
                      </div>
                      <div className="mg-y-30">
                        <div className="form-group col-md-5 mx-auto">
                          <button
                            id="login_button"
                            className="btn btn-primary btn-block btn-lg py-15"
                            type="submit"
                            disabled={loading ? true : false}
                          >
                            LOGIN
                          </button>
                        </div>
                        <Link to="/register">
                          <span
                            className="tx-dark"
                            style={{
                              color: "#000;",
                              textDecoration: "underline;",
                            }}
                          >
                            Don’t have an account yet?
                          </span>
                          <span style={{ textDecoration: "underline;" }}>
                            Sign Up.
                          </span>
                        </Link>
                      </div>
                    </form>
                    <p className="tx-blac tx-12 pd-t-50 mb-0">
                      Term of use. Privacy policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    </Fragment>
  );
};

export default Login;
