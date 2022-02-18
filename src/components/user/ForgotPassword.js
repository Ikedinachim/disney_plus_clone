import React, { Fragment, useState, useEffect } from "react";

const ForgotPassword = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <div className="content-body">
        <div className="card container">
          <div className="container pd-x-0 p-5">
            <div className="row justify-content-between">
              <div className="col-md-6 p-2">
                <label htmlFor="fname">please enter username or email</label>
                <br />
                <input
                  type="text"
                  id="fname"
                  name="firstName"
                  placeholder="username/email"
                  className="wd-90p p-2"
                />
              </div>
            </div>
          </div>
          <div className="mg-t-20">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
