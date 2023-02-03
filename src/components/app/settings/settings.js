import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../../layout/MetaData";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUserDetails } from "../../../actions/authActions";
import { Link } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../../constants/authConstants";
import { clearErrors } from "../../../actions/authActions";
import Loader from "../../loader";

const Settings = () => {
  // const alert = useAlert();
  const dispatch = useDispatch();

  const {
    userDetails: { user, loading: userDetailsLoading },
    updateUser: { updateUser },
  } = useSelector((state) => state);

  useEffect(() => {
    if (updateUser && updateUser.status === "success") {
      toast.success(`${updateUser.message}`);
      dispatch(getUser());
      dispatch({ type: UPDATE_USER_RESET });
    } else if (updateUser.error) {
      toast.error(updateUser.error);
      dispatch(clearErrors());
    }
    // dispatch(getUser());
  }, [dispatch, updateUser]);

  const handleImageChange = async () => {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "mysogi");
    const options = {
      method: "POST",
      // mode: "no-cors",
      body: formData,
    };

    try {
      const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL, options);
      const res_1 = await res.json();

      setPeople({ ...people, imageUrl: res_1.secure_url });
    } catch (err) {
      return console.log(err);
    }
  };

  const [people, setPeople] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    password: "null",
    phone: user.phone,
    imageUrl: user.imageUrl,
  });

  // console.log(people);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPeople({ ...people, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserDetails(people));
  };

  // console.log("people.imageUrl", people.imageUrl);

  return (
    <Fragment>
      <MetaData title={"Settings"} />
      {userDetailsLoading ? (
        <Loader />
      ) : (
        <div className="content-body">
          <div className="container-fluid">
            <div className="d-flex flex-wrap justify-content-between">
              <div className="flex-1">
                <p className="tx-26 tx-bold">Settings</p>
              </div>
              <div className="d-flex justify-content-between w-100 w-sm-auto">
                <p className="d-flex w-100 justify-content-between">
                  <Link to="../analytics" className="btn btn-primary mg-r-10">
                    All Analytics
                  </Link>
                  <Link
                    to="../billing/fund-wallet"
                    className="btn btn-outline-primary"
                  >
                    Fund wallet
                  </Link>
                </p>
              </div>
            </div>
            <div className="card rounded bd-0 shadow-sm">
              <div className="card-body">
                <div className="tx-22">Personal details</div>
                <div className="d-flex justify-content-between my-4">
                  <div>View your setup details here</div>
                </div>
                <div className="d-flex">
                  <img
                    htmlFor="custom-file"
                    src={
                      people.imageUrl
                        ? people.imageUrl
                        : "https://via.placeholder.com/500"
                    }
                    className="img-fluid wd-100 ht-100 pro-image"
                    alt=""
                    onChange={handleImageChange}
                  />
                  <div className="custom-file">
                    <input
                      type="file"
                      id="custom-file"
                      className="custom-file-input"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="custom-file"
                      className="w-15 nav-link clickable"
                    >
                      Click here to change Photo
                    </label>
                  </div>
                </div>
                <div>
                  <form className="mg-t-20">
                    {/* let's put something here jare */}
                    <div className="row justify-content-between">
                      <div className="form-group col-md-6">
                        <label htmlFor="fname">First name</label>
                        <br />
                        <input
                          type="text"
                          id="fname"
                          name="firstName"
                          value={people.firstName}
                          className="form-control"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="lname">Last name</label>
                        <br />
                        <input
                          type="text"
                          id="lname"
                          name="lastName"
                          value={people.lastName}
                          className="form-control"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-around">
                      <div className="form-group col-md-6">
                        <label htmlFor="username">User name</label>
                        <br />
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={people.username}
                          className="form-control"
                          disabled="disabled"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="emailad">Email address</label>
                        <br />
                        <input
                          type="email"
                          id="emailad"
                          name="email"
                          value={people.email}
                          className="form-control"
                          disabled="disabled"
                        />
                      </div>
                    </div>
                    <div className="row justify-content-around">
                      <div className="form-group col-md-6">
                        <label htmlFor="password">Password</label>
                        <br />
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={people.password}
                          className="form-control"
                          disabled="disabled"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="phone-no">Phone number</label>
                        <br />
                        <input
                          type="tel"
                          id="phone-no"
                          name="phone"
                          value={people.phone}
                          className="form-control"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </form>

                  <div className="mg-t-20">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      Save
                    </button>
                  </div>
                  <div className="mg-t-20">
                    <Link to="change-password">
                      <span
                        className="tx-dark"
                        style={{
                          color: "#000",
                          textDecoration: "underline",
                        }}
                      >
                        Want to Change password?
                      </span>
                      <span style={{ textDecoration: "underline" }}>
                        {" "}
                        Click here
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Settings;
