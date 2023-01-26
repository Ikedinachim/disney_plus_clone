import React, { Fragment, useState, useEffect } from "react";
import Loader from "../loader";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resendVerificationLink } from "../../actions/authActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ResendVerification = () => {
  const {
    resendVerification: { resend, loading },
  } = useSelector((state) => state);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resendVerificationLink(email));
  };

  useEffect(() => {
    if (resend && resend.statusCode === 100) {
      toast.success(resend.message);
    } else if (resend.error) {
      toast.error(resend.error);
      dispatch(clearErrors());
    }
  }, [dispatch, resend]);

  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <Fragment>
        <MetaData title={"Resend Verification"} />
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
              <div className="container pd-lg-30 pd-10 col d-flex justify-content-center align-items-center">
                <div>
                  <div className="col-lg-10 col-xl-8 mx-auto tx-center welcome-div">
                    <p className="tx-36 tx-bold mb-2 tx-com">Resend code</p>
                    <p className="tx-16 tx-gray">
                      Input your email, so we send you another verification code
                    </p>
                    <form className="mg-y-50" onSubmit={submitHandler}>
                      <div className="form-group">
                        <input
                          className="form-control new text-center"
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
                            disabled={loading ? true : false}
                          >
                            SEND
                          </button>
                        </div>
                      </div>
                      <span
                        className="tx-dark"
                        style={{
                          color: "#000",
                          textDecoration: "underline;",
                        }}
                      >
                        Return to Sign in?
                      </span>
                      {"  "}
                      <Link to="/login">
                        <span style={{ textDecoration: "underline;" }}>
                          Click here
                        </span>
                      </Link>
                    </form>
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

export default ResendVerification;
