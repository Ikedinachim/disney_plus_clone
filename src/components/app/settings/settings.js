import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../../layout/MetaData";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUserDetails } from "../../../actions/authActions";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { UPDATE_USER_RESET } from "../../../constants/authConstants";
import { clearErrors } from "../../../actions/authActions";

const Settings = () => {
  const updateUser = useSelector((state) => state.updateUser || []);
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userDetails || []);

  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleImageUpload = async () => {
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
      const res = await fetch(
        "https://api.Cloudinary.com/v1_1/mysogi/image/upload",
        options
      );
      const res_1 = await res.json();
      setImageUrl(res_1.secure_url);
      setImageAlt(`An image of ${res_1.original_filename}`);
    } catch (err) {
      return console.log(err);
    }
  };

  console.log(imageUrl);
  const [people, setPeople] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.username,
    email: user.email,
    password: user.password,
    phone: user.phone,
    image: imageUrl,
  });

  console.log(people);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleImageUpload();
    setPeople({ ...people, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserDetails(people));
    setShow(!show);
  };

  useEffect(() => {
    if (updateUser && updateUser.status === "success") {
      alert.success(`update ${updateUser.status}`);
      dispatch(getUser());
      dispatch({ type: UPDATE_USER_RESET });
    } else if (updateUser.error) {
      alert.error(updateUser.error);
      dispatch(clearErrors());
    }
  }, [alert, updateUser.status]);

  const showButton = (e) => {
    setShow(!show);
  };
  return (
    <Fragment>
      <MetaData title={"Settings"} />
      <div className="content-body">
        <div className="container pd-x-0 p-5">
          <div className="row justify-content-between">
            <div className="col-md-6">
              <p className="tx-26 tx-bold">Settings</p>
            </div>
            <div className="col-md-6 row justify-content-end display-content">
              <p>
                <Link to="../analytics" className="btn btn-primary">
                  All Analytics
                </Link>
              </p>
              <p>
                <Link
                  to="../billing/fund-wallet"
                  className="btn btn-outline-primary offset-1 mx-4"
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
                <div className="mx-4 clickable" onClick={showButton}>
                  <FeatherIcon
                    icon="edit"
                    className="wd-15 ht-20 mg-r-9 tx-primary"
                  />
                  {show === false ? "Edit" : "Stop Editing"}
                </div>
              </div>
              <div className=" wdm-55 d-flex ht-250">
                <img
                  src={imageUrl}
                  className="img-thumbnail w-25"
                  alt="profile"
                  onChange={handleChange}
                />
                <div className="custom-file">
                  <input
                    type="file"
                    name="image"
                    id="custom-file"
                    className="custom-file-input"
                    accept="image/*"
                    onChange={handleChange}
                    disabled={show === false ? "disabled" : ""}
                    value={people.image}
                  />
                  <label for="custom-file" className="w-15 nav-link clickable">
                    Click here to change Photo
                    <br />
                    (Not more than 1mb)
                  </label>
                </div>
              </div>
              <div>
                <form className="p-2">
                  {/* let's put something here jare */}
                  <div className="row justify-content-between">
                    <div className="col-md-6 p-2">
                      <label htmlFor="fname">First name</label>
                      <br />
                      <input
                        type="text"
                        id="fname"
                        name="firstName"
                        value={people.firstName}
                        className="wd-90p p-2"
                        disabled={show === false ? "disabled" : ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 p-2">
                      <label htmlFor="lname">Last name</label>
                      <br />
                      <input
                        type="text"
                        id="lname"
                        name="lastName"
                        value={people.lastName}
                        className="wd-90p p-2"
                        disabled={show === false ? "disabled" : ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-around">
                    <div className="col-md-6 p-2">
                      <label htmlFor="username">User name</label>
                      <br />
                      <input
                        type="text"
                        id="username"
                        name="userName"
                        value={people.userName}
                        className="wd-90p p-2"
                        disabled={show === false ? "disabled" : ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 p-2">
                      <label htmlFor="emailad">Email address</label>
                      <br />
                      <input
                        type="email"
                        id="emailad"
                        name="email"
                        value={people.email}
                        className="wd-90p p-2"
                        disabled={show === false ? "disabled" : ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-around">
                    <div className="col-md-6 p-2">
                      <label htmlFor="password">Password</label>
                      <br />
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={people.password}
                        className="wd-90p p-2"
                        disabled="disabled"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 p-3">
                      <label htmlFor="phone-no">Phone number</label>
                      <br />
                      <input
                        type="tel"
                        id="phone-no"
                        name="phone"
                        value={people.phone}
                        className="wd-90p p-2"
                        disabled={show === false ? "disabled" : ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </form>
                <div className="custom-control custom-switch mg-t-10">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch1"
                  />
                  <label
                    className="custom-control-label tx-blac"
                    htmlFor="customSwitch1"
                  >
                    Notification
                  </label>
                </div>
                {show === false ? null : (
                  <div className="mg-t-20">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Settings;
