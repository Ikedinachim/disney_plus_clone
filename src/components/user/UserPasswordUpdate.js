import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../loader";
import MetaData from "../layout/MetaData";
import {
  getUser,
  updateUserPassword,
  clearErrors,
} from "../../actions/authActions";
import { useAlert } from "react-alert";
import { USER_PASSWORD_RESET } from "../../constants/authConstants";
import { useDispatch, useSelector } from "react-redux";

const UserPasswordUpdate = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navHistory = useNavigate();

  // const [userStatus, setUserStatus] = useState()

  const {
    userDetails: { loading },
    updateUserPassword: { updatePassword, error },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const [show, setShow] = useState(false);

  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  ///////////////// HANDLERS////////////////////////
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPassword({ ...password, [name]: value });
  };

  // const handlePasswordMatch = (e) => {
  //   if (newPassword !== confirmPassword) {
  //     setShow(!show);
  //   }
  // }
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(updateUserPassword(password));

    if (updatePassword && updatePassword.status === "success") {
      alert.success(updatePassword.message);
      dispatch({ type: USER_PASSWORD_RESET });
      navHistory("/app/setting");
    } else if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  };

  return (
    <Fragment>
      <MetaData title={"Create New Password"} />
      <section className="ht-100v container-fluid">
        <div className="col-md-12 login-side">
          <div className="container pd-lg-30 pd-10">
            <div>
              <div className="col-lg-10 col-xl-8 mx-auto pd-t-30 tx-center welcome-div">
                <p className="tx-36 tx-bold mb-2 tx-com">Create New Password</p>
                <p className="tx-16 tx-gray">
                  Please, input your preferred password.
                </p>
                <form className="mg-y-50">
                  <div className="form-group">
                    <input
                      className="form-control new"
                      placeholder="New password"
                      name="newPassword"
                      type="password"
                      id="new_password"
                      value={password.newPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control new"
                      placeholder="Confirm New password"
                      name="confirmPassword"
                      type="password"
                      id="new_password"
                      value={password.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mg-y-30">
                    <div className="form-group col-md-5 mx-auto">
                      <button
                        className="btn btn-primary btn-block btn-lg py-15"
                        type="submit"
                        onClick={submitHandler}
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
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

export default UserPasswordUpdate;
