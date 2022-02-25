import React, { Fragment, useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../../components/loader";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  updateInfluencerPassword,
  clearErrors,
} from "../../actions/authActions";
// import { getWallet } from "../../actions/billingActions";
import { UPDATE_INFLUENCER_PROFILE_RESET } from "../../constants/authConstants";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const UpdateInfluencerPassword = () => {
  const navigate = useNavigate();
  // const alert = useAlert();
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    // middleName: '',
    username: "",
    userType: "",
    // email: '',
    password: "",
    confirmPassword: "",
  });

  const { username } = newUser;

  const schema = Yup.object().shape({
    // email: Yup.string().email().required(),
    oldPassword: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    newPassword: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { isAuthenticated, user, isUpdated } = useSelector(
    (state) => state.auth
  );
  const { passwordUpdated, error, loading } = useSelector(
    (state) => state.resetInfluencerPassword
  );

  const submitIndividualHandler = (data) => {
    console.log(data);
    dispatch(updateInfluencerPassword(data));
    reset();
  };

  // const onError = (errors, e) => console.log(errors, e);

  const onChange = (e) => {
    if (e.target.name === "avatar") {
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (passwordUpdated && isUpdated && isUpdated.statusCode === 100) {
      toast.success(isUpdated.message);
      navigate("/login");
      dispatch({ type: UPDATE_INFLUENCER_PROFILE_RESET });
    } else if (!isAuthenticated && error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
  }, [
    dispatch,
    // toast,
    user,
    isAuthenticated,
    passwordUpdated,
    isUpdated,
    error,
    navigate,
  ]);

  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <Fragment>
        <MetaData title={"Register User"} />
        <section className="ht-100v container-fluid">
          <div className="row">
            <div className="col-md-6 login-bg card-height d-none d-md-block d-lg-block d-xl-block">
              <div className="pd-50">
                <img
                  src="./assets/img/logo.svg"
                  className="img-fluid logo"
                  alt="register logo"
                />
              </div>
            </div>
            <div className="col-md-6 login-side d-flex align-items-center">
              <div className="container pd-lg-30 pd-10">
                <Link
                  to="/home"
                  type="button"
                  className="close close-btn"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </Link>
                <div className>
                  <div className="col-lg-10 col-xl-8 mx-auto pd-t-100 pd-md-t-50 pd-lg-t-20 tx-center">
                    <p className="tx-36 tx-bold mb-2 tx-com">
                      Let’s get started
                    </p>
                    <p className="tx-18 tx-gray">
                      Update your password to create your account.
                    </p>
                    <div className="tab-content bd-t-0" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <form
                          key={1}
                          className="pd-y-30 pd-md-x-20"
                          onSubmit={handleSubmit(submitIndividualHandler)}
                        >
                          <div className="form-group">
                            <input
                              {...register("username")}
                              type="text"
                              id="individualUsername"
                              className="form-control new"
                              placeholder="Username"
                              required
                              value={username}
                              onChange={onChange}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              {...register("oldPassword")}
                              type="password"
                              className="form-control new"
                              placeholder="Old Password"
                            />
                            {errors.password && (
                              <span className="tx-primary">
                                {errors.oldPpassword.message}
                              </span>
                            )}
                          </div>
                          <div className="form-group">
                            <input
                              {...register("newPassword")}
                              type="password"
                              className="form-control new"
                              placeholder="New Password"
                            />
                            {errors.confirmPassword && (
                              <span className="tx-primary">
                                {errors.newPassword.message}
                              </span>
                            )}
                          </div>
                          <div className="form-row mg-t-30">
                            <div className="form-group col-md-5 mx-auto">
                              <button
                                type="submit"
                                className="btn btn-primary btn-block btn-lg pd-y-15"
                                disabled={loading ? true : false}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
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

export default UpdateInfluencerPassword;
