import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../loader";
import MetaData from "../layout/MetaData";
import { FORGOT_PASSWORD_RESET } from "../../constants/authConstants";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordResetLink, clearErrors } from "../../actions/authActions";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const {
    forgotPassword: { message, error, loading },
  } = useSelector((state) => state);
  const [email, setEmail] = useState("");

  // const [userStatus, setUserStatus] = useState()

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendPasswordResetLink(email));
    console.log(message);

    if (message && message.statusCode === 100) {
      toast.success(message.message);
      dispatch({ type: FORGOT_PASSWORD_RESET });
    } else if (message.error) {
      toast.error(message.error);
      dispatch(clearErrors());
    }
  };

  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <Fragment>
        <MetaData title={"Forgot password"} />
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
                    <p className="tx-36 tx-bold mb-2 tx-com">Forgot Password</p>
                    <p className="tx-16 tx-gray">
                      Please input your email so we can send you a link.
                    </p>
                    <form className="mg-y-50">
                      <div className="form-group">
                        <input
                          className="form-control new"
                          placeholder="email"
                          type="email"
                          id="email_field"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mg-y-30">
                        <div className="form-group col-md-5 mx-auto">
                          <button
                            id="login_button"
                            className="btn btn-primary btn-block btn-lg py-15"
                            type="submit"
                            onClick={submitHandler}
                          >
                            SEND
                          </button>
                        </div>
                        <Link to="../login">
                          <span
                            className="tx-dark"
                            style={{
                              color: "#000;",
                              textDecoration: "underline;",
                            }}
                          >
                            Remember password?
                          </span>
                          <span style={{ textDecoration: "underline;" }}>
                            Sign In.
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

export default ForgotPassword;
