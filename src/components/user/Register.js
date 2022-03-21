import React, { Fragment, useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../../components/loader";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearErrors } from "../../actions/authActions";
import { REGISTER_USER_RESET } from "../../constants/authConstants";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();
  // const alert = useAlert();
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    // middleName: '',
    username: "",
    userType: "",
    // email: '',
    password: "",
    confirmPassword: "",
    phone: "",
    businessName: "",
    contactName: "",
    businessFirstName: "",
    businessLastName: "",
    businessUsername: "",
    businessPassword: "",
    businessConfirmPassword: "",
    businessPhone: "",
    businessEmail: "",
  });

  const { firstName, lastName, username, email, phone } = newUser;

  const schema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email().required(),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "The passwords do not match"
    ),
  });

  const businessSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    businessEmail: Yup.string().email().required(),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "The passwords do not match"
    ),
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

  const {
    register: registerBusiness,
    formState: { errors: businessError },
    reset: resetBusiness,
    handleSubmit: handleSubmit2,
  } = useForm({
    resolver: yupResolver(businessSchema),
    mode: "onBlur",
  });

  const { isAuthenticated, isRegistered, error, loading } = useSelector(
    (state) => state.auth
  );

  const submitIndividualHandler = (data) => {
    dispatch(registerUser(data));
    reset();
  };

  const onError = (errors, e) => console.log(errors, e);

  const submitBusinessHandler = (data) => {
    dispatch(registerUser(data));
    resetBusiness();
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (isRegistered) {
      toast.success("User registered successfully");
      toast.success('Check email for account activation');
      navigate("/login");
      dispatch({ type: REGISTER_USER_RESET });
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, isRegistered, error, navigate]);

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
            <div className="col-md-6 login-side pd-y-30 flex-column">
              <div className="container">
                <Link
                  to="/"
                  type="button"
                  className="close close-btn"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </Link>
              </div>
              <div className="container pd-lg-30 pd-10 col d-flex justify-content-center align-items-center">
                <div className="col w-100 mx-w-580 pd-t-100 pd-md-t-50 pd-lg-t-20 tx-center">
                  <p className="tx-36 tx-bold mb-2 tx-com">Let’s get started</p>
                  <p className="tx-18 tx-gray">
                    Please complete to create your account.
                  </p>
                  <ul
                    className="nav nav-tabs bd-tab w-100 pd-5 col-lg-11 justify-content-between d-flex m-auto"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item w-48">
                      <a
                        className="nav-link reg active m-0 w-100"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        Individual
                      </a>
                    </li>
                    <li className="nav-item w-48">
                      <a
                        className="nav-link reg m-0 w-100"
                        id="profile-tab"
                        data-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Business
                      </a>
                    </li>
                  </ul>
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
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input
                              {...register("firstName")}
                              type="text"
                              id="firstname"
                              className="form-control new"
                              placeholder="First Name"
                              required
                              value={firstName}
                              onChange={onChange}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              {...register("lastName")}
                              type="text"
                              id="lastname"
                              className="form-control new"
                              placeholder="Last Name"
                              required
                              value={lastName}
                              onChange={onChange}
                            />
                          </div>
                        </div>
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
                            {...register("userType")}
                            type="hidden"
                            className="form-control new"
                            placeholder="User Type"
                            value={"individual"}
                            onChange={onChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            {...register("email")}
                            type="email"
                            id="email"
                            className="form-control new"
                            placeholder="Email"
                            // name="email"
                            // required
                            value={email}
                            // onChange={onChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            {...register("password")}
                            type="password"
                            className="form-control new"
                            placeholder="Password"
                            // name="password"
                            // required
                            // value={password}
                            // onChange={onChange}
                          />
                          {errors.password && (
                            <span className="tx-primary">
                              {errors.password.message}
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <input
                            {...register("confirmPassword")}
                            type="password"
                            className="form-control new"
                            placeholder="Confirm Password"
                            // name="confirmPassword"
                            // required
                            // value={confirmPassword}
                            // onChange={onChange}
                          />
                          {errors.confirmPassword && (
                            <span className="tx-primary">
                              {errors.confirmPassword.message}
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <input
                            {...register("phone")}
                            type="number"
                            className="form-control new"
                            placeholder="Phone Number"
                            // name="phone"
                            required
                            value={phone}
                            onChange={onChange}
                          />
                        </div>
                        <div className="form-group">
                          <div className="col-lg-12 col-12 mg-t-15">
                            <div className="custom-control custom-checkbox pd-l-0">
                              <input
                                type="checkbox"
                                className="custom-control-input form-control"
                                id="customCheck1"
                                name="userType"
                                required
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheck1"
                              >
                                I agree with{" "}
                                <span className="tx-primary">
                                  <Link to="/terms-of-use">
                                    terms and conditions
                                  </Link>
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="form-row mg-t-30">
                          <div className="form-group col-md-5 mx-auto">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block btn-lg pd-y-15"
                              disabled={loading ? true : false}
                            >
                              Sign up
                            </button>
                          </div>
                        </div>
                        <Link to="/login">
                          <span
                            className="tx-dark"
                            style={{
                              color: "#000",
                              textDecoration: "underline",
                            }}
                          >
                            Already have an account?
                          </span>{" "}
                          <span style={{ textDecoration: "underline" }}>
                            Sign in.
                          </span>
                        </Link>
                      </form>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <form
                        key={2}
                        className="pd-y-30 pd-md-x-20"
                        onSubmit={handleSubmit2(submitBusinessHandler, onError)}
                        id="businessForm"
                      >
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input
                              {...registerBusiness("firstName")}
                              type="text"
                              className="form-control new"
                              placeholder="First Name"
                              // name="firstName"
                              // required
                              // value={businessFirstName}
                              // onChange={onChange}
                            />
                            {businessError.firstName && (
                              <span className="tx-primary reg-error">
                                {businessError.firstName.message}
                              </span>
                            )}
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              {...registerBusiness("lastName")}
                              type="text"
                              className="form-control new"
                              placeholder="Last Name"
                              // name="lastName"
                            />
                            {businessError.lastName && (
                              <span className="tx-primary reg-error">
                                {businessError.lastName.message}
                              </span>
                            )}
                          </div>
                        </div>
                        {/* <div className="form-group">
                                                        <input
                                                        type="text"
                                                        className="form-control new"
                                                        placeholder="Middle Name"
                                                        name="middleName"
                                                        value={middleName}
                                                        onChange={onChange}
                                                        />
                                                    </div> */}
                        <div className="form-group">
                          <input
                            {...registerBusiness("username")}
                            type="text"
                            id="businessUsername"
                            className="form-control new"
                            placeholder="Username"
                            // name="username"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            {...registerBusiness("userType")}
                            type="hidden"
                            className="form-control new"
                            placeholder="User Type"
                            // name="userType"
                            required
                            value={"business"}
                          />
                        </div>
                        {/* <div className="form-group">
                                                        <input
                                                        type="email"
                                                        className="form-control new"
                                                        placeholder="Company Email"
                                                        name="email"
                                                        required
                                                        value={email}
                                                        onChange={onChange}
                                                        />
                                                    </div> */}
                        <div className="form-group">
                          <input
                            {...registerBusiness("password")}
                            type="password"
                            className="form-control new"
                            placeholder="Password"
                            // name="password"
                            // required
                            // value={password}
                            // onChange={onChange}
                          />
                          {businessError.password && (
                            <span className="tx-primary reg-error">
                              {businessError.password.message}
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <input
                            {...registerBusiness("confirmPassword")}
                            type="password"
                            className="form-control new"
                            placeholder="Confirm Password"
                            // name="confirmPassword"
                            // required
                            // value={confirmPassword}
                            // onChange={onChange}
                          />
                          {businessError.confirmPassword && (
                            <span className="tx-primary reg-error">
                              {businessError.confirmPassword.message}
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <input
                            {...registerBusiness("phone")}
                            type="number"
                            className="form-control new"
                            placeholder="Phone Number"
                            // name="phone"
                            // required
                            // value={phone}
                            // onChange={onChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            {...registerBusiness("businessName")}
                            type="text"
                            className="form-control new"
                            placeholder="Business Name"
                            // name="businessName"
                            // required
                            // value={businessName}
                            // onChange={onChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            {...registerBusiness("businessEmail")}
                            type="email"
                            className="form-control new"
                            placeholder="Business Email"
                            // name="businessEmail"
                            // value={businessEmail}
                            // onChange={onChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            {...registerBusiness("contactName")}
                            type="text"
                            className="form-control new"
                            placeholder="Contact Name"
                            // name="contactName"
                            // required
                            // value={contactName}
                            // onChange={onChange}
                          />
                        </div>

                        <div className="row">
                          <div className="col-lg-9 col-12 mg-t-15">
                            <div className="custom-control custom-checkbox pd-l-0">
                              <input
                                type="checkbox"
                                className="custom-control-input form-control"
                                id="customCheck2"
                                required
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheck2"
                              >
                                I agree with{" "}
                                <span className="tx-primary">
                                  <Link to="/terms-of-use">
                                    terms and conditions
                                  </Link>
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="form-row mg-t-30">
                          <div className="form-group col-md-5 mx-auto">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block btn-lg pd-y-15"
                              disabled={loading ? true : false}
                              placeholder="Sign up"
                            >
                              Sign up
                            </button>
                          </div>
                        </div>
                        <Link to="/login">
                          <span
                            className="tx-dark"
                            style={{
                              color: "#000",
                              textDecoration: "underline",
                            }}
                          >
                            Already have an account?
                          </span>{" "}
                          <span style={{ textDecoration: "underline" }}>
                            Sign in.
                          </span>
                        </Link>
                      </form>
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

export default Register;
