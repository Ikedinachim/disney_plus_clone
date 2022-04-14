import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../loader";
import MetaData from "../../layout/MetaData";
import { getUser, updateUserPassword } from "../../../actions/authActions";
import { USER_PASSWORD_RESET } from "../../../constants/authConstants";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../../actions/authActions";

const ChangeAdminPassword = () => {
  const dispatch = useDispatch();
  const navHistory = useNavigate();

  // const [userStatus, setUserStatus] = useState()

  const {
    userDetails: { loading, user },
    updateUserPassword: { updatePassword, error },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [people, setPeople] = useState({
    username: user.username,
    oldPassword: "",
    newPassword: "",
  });

  ///////////////// HANDLERS////////////////////////
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPeople({ ...people, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(updateUserPassword(people));

    if (updatePassword && updatePassword.status === "success") {
      toast.success(updatePassword.message);
      dispatch({ type: USER_PASSWORD_RESET });
      navHistory("/app/setting");
    } else if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Change password"} />
          <section className="ht-100v container-fluid">
            <div className="col-md-12 login-side">
              <div className="container pd-lg-30 pd-10">
                <Link
                  to="../setting"
                  type="button"
                  className="close close-btn"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </Link>
                <div>
                  <div className="col-lg-10 col-xl-8 mx-auto pd-t-30 tx-center welcome-div">
                    <p className="tx-36 tx-bold mb-2 tx-com">Change Password</p>
                    <p className="tx-16 tx-gray">
                      Please input your details so we can change your password.
                    </p>
                    <form className="mg-y-50">
                      <div className="form-group">
                        <input
                          className="form-control new"
                          placeholder="Username"
                          name="username"
                          type="text"
                          id="username"
                          value={user.username}
                          disabled="disabled"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control new"
                          placeholder="Old password"
                          name="oldPassword"
                          type="password"
                          id="old_password"
                          value={people.oldPassword}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control new"
                          placeholder="New password"
                          name="newPassword"
                          type="password"
                          id="new_password"
                          value={people.newPassword}
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
                            SEND
                          </button>
                        </div>
                        <Link to="../settings">
                          <span
                            className="tx-dark"
                            style={{
                              color: "#000;",
                              textDecoration: "underline;",
                            }}
                          >
                            Changed your mind?
                          </span>
                          <span style={{ textDecoration: "underline;" }}>
                            Click here
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
      )}
    </Fragment>
  );
};

export default ChangeAdminPassword;