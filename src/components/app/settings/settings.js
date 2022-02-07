import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

const Settings = () => {
  const [people, setPeople] = useState({
    firstName: "John",
    lastName: "Doe",
    userName: "@John.Doe",
    email: "JohnDoe@gmail.com",
    password: "JohnDoethings",
    phone: "+2348167696729",
  });

  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPeople({ ...people, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
              <div className="wd-150 wdm-55 d-flex">
                <img
                  src="../../../assets/img/baba.jpeg"
                  className="img-thumbnail"
                  alt=""
                />
                <div>
                  Click here to change Photo
                  <br />
                  (Not more than 1mb)
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
                        disabled={show === false ? "disabled" : ""}
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
