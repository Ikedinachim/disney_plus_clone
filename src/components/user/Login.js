import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../loader";
import MetaData from "../layout/MetaData";
import { login, getUser, clearErrors } from "../../actions/authActions";
import { getWallet } from "../../actions/billingActions";
import useAnalyticsEventTracker from "../../_helpers/GoogleAnalytics/GoogleAnalytics";

const Login = () => {
  const gaEventTracker = useAnalyticsEventTracker("Login");
  const navHistory = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const { isAuthenticated, error, loading, user, resetPassword } = useSelector(
    (state) => state.auth
  );
  const { resetInfluencerPassword } = useSelector(
    (state) => state.resetInfluencerPassword
  );

  const { userDetails } = useSelector((state) => state);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {
    if (
      isAuthenticated &&
      user.user.role !== "influencer" &&
      user.user.role !== "billboard_provider"
    ) {
      gaEventTracker("Login", "User successfully signed in");
      dispatch(getWallet());
      dispatch(getUser());
      navHistory("/app");
    } else if (
      !isAuthenticated &&
      error &&
      error.statusCode === 102 &&
      resetInfluencerPassword &&
      resetInfluencerPassword.statusCode === 102
    ) {
      navHistory("/update-password");
      toast.error(resetInfluencerPassword.message);
      dispatch(clearErrors());
    } else if (isAuthenticated && user && user.user.role === "influencer") {
      dispatch(getWallet());
      navHistory("/influencer");
    } else if (
      isAuthenticated &&
      user &&
      user.user.role === "billboard_provider"
    ) {
      dispatch(getWallet());
      navHistory("/billboard");
    } else if (
      error &&
      !error.errors.Verified &&
      error.errors.Verified !== false
    ) {
      gaEventTracker("Login Failed", "User Login Failed");
      toast.error(error.errors.username || error.message);
      dispatch(clearErrors());
    } else if (error && error.errors.Verified === false) {
      toast.error(error.errors.username || error.message);
      navHistory("/resend-verification");
      dispatch(clearErrors());
    } else {
      navHistory("/login");
      setUsername("");
      setPassword("");
    }
  }, [
    dispatch,
    resetInfluencerPassword,
    user,
    isAuthenticated,
    resetPassword,
    error,
    navHistory,
    // gaEventTracker,
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
      {loading || userDetails.loading ? <Loader /> : null}
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
            <div className="col-md-6 login-side min-vh-100 pd-y-30 flex-column">
              <div className="container">
                <Link
                  to="../"
                  type="button"
                  className="close close-btn"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </Link>
              </div>
              <div className="container pd-lg-30 pd-10 col d-flex justify-content-center align-items-center">
                <div className="col w-100 mx-w-580 pd-t-100 pd-md-t-50 pd-lg-t-20 tx-center">
                  <p className="tx-36 tx-bold mb-2 tx-com">Welcome Back</p>
                  <p className="tx-16 tx-gray">
                    Welcome back! Please login to your account.
                  </p>
                  <form className="mg-y-50" onSubmit={submitHandler}>
                    <div className="form-group">
                      <input
                        className="form-control new"
                        placeholder="Email"
                        type="text"
                        id="email_field"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group pass-wrapper">
                      <input
                        className="form-control new"
                        placeholder="Password"
                        type={passwordShown ? "text" : "password"}
                        id="password_field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i
                        onClick={togglePasswordVisiblity}
                        className={`fa ${
                          passwordShown ? "fa-eye-slash" : "fa-eye"
                        } password-eye`}
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
                      <div className="form-group col-md-6 col-6 d-flex justify-content-end">
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
        </section>
      </Fragment>
    </Fragment>
  );
};

export default Login;
