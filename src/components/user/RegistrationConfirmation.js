import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import {
  getUser,
  clearErrors,
  sendNewPassword,
} from "../../actions/authActions";
import { NEW_PASSWORD_RESET } from "../../constants/authConstants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../loader";

const RegistrationConfirmation = () => {
  const dispatch = useDispatch();

  const { uuid } = useParams();

  const navigate = useNavigate();

  const {
    sendNewPassword: { message, loading, error },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(sendNewPassword(uuid));

    if (message && message.statusCode === 100) {
      toast.success(message.message);
      dispatch({ type: NEW_PASSWORD_RESET });
      navigate("/");
    } else if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  };

  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <MetaData title={"Create New Password"} />
      <section className="ht-100v container-fluid">
        <div className="col-md-12 login-side">
          <div className="container pd-lg-30 pd-10">
            <div>
              <div className="col-lg-10 col-xl-8 mx-auto pd-t-30 tx-center welcome-div">
                <p className="tx-36 tx-bold mb-2 tx-com">
                  Confirm user creation
                </p>
                <p className="tx-16 tx-gray">
                  Please, click the confirm button to verify your account.
                </p>
                <form className="mg-y-50">
                  <div className="mg-y-30">
                    <div className="form-group col-md-5 mx-auto">
                      <button
                        className="btn btn-primary btn-block btn-lg py-15"
                        type="submit"
                        onClick={submitHandler}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                  <Link to="../resend-verification">
                    <span
                      className="tx-dark"
                      style={{
                        color: "#000;",
                        textDecoration: "underline;",
                      }}
                    >
                      Didn't get verification code? 
                    </span>
                    <span style={{ textDecoration: "underline;" }}>
                      {" "}Click here
                    </span>
                  </Link>
                </form>
                <p className="tx-blac tx-12 pd-t-50 mb-0">mysogi ads &copy;</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default RegistrationConfirmation;
