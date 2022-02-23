import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../loader";
import MetaData from "../layout/MetaData";
import { getUser } from "../../../actions/authActions";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

const ChangePassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  // const [userStatus, setUserStatus] = useState()

  const { user, loading } = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const [people, setPeople] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPeople({ ...people, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getUser());
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Change password"} />
          <section className="ht-100v container-fluid">
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
                    <form className="mg-y-50" onSubmit={submitHandler}>
                      <div className="form-group">
                        <input
                          className="form-control new"
                          placeholder="email"
                          name="usernmae"
                          type="text"
                          id="email_field"
                          value={people.username}
                          onChange={handleChange}
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
                        <Link to="../">
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

export default ChangePassword;
