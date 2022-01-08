import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getSenderID } from "../../../../actions/senderIDActions";
import Loader from "../../../loader";

import MetaData from "../../../layout/MetaData";

const SmsCampaign = ({ nextStep, handleChange, values }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { senderID, loading } = useSelector((state) => state.senderID || []);
  const Continue = (e) => {
    e.preventDefault();
    if (values.senderId === "") {
      alert.error("Select a Sender ID or request for one if not available");
    } else if (values.channel === "") {
      alert.error("Choose a channel");
    } else if (values.campaignMessage === "") {
      alert.error("Create the campaign message");
    } else {
      nextStep();
    }
  };
  const selectChannels = [
    {
      label: "Select Channel",
      value: "select channel",
    },
    {
      label: "Flash SMS",
      value: "flash_sms",
    },
    {
      label: "Smart SMS",
      value: "smart_sms",
    },
    {
      label: "SMS",
      value: "sms",
    },
  ];

  useEffect(() => {
    dispatch(getSenderID());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Create SMS Campaign"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="d-flex justify-content-between">
                <p className="tx-18 mb-0">60%</p>
                <p className="tx-18 mb-0">2 out of 3</p>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-primary progress-bar-striped progress-bar-animated wd-60p"
                  role="progressbar"
                  aria-valuenow={40}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <div className="pd-md-y-20">
                <div className="col-lg-11 pd-x-0">
                  <form>
                    <div>
                      <p className="tx-24 tx-bold mb-1 tx-com">
                        Flash SMS / SMS
                      </p>
                      <p className="tx-14">
                        Provide all requested details to help complete the
                        campaign creation
                      </p>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label htmlFor className="mb-1">
                            Sender ID
                          </label>
                          <select
                            className="custom-select"
                            // value="select channel"
                            defaultValue={values.senderId}
                            onChange={handleChange("senderId")}
                          >
                            <option value="">Select Sender ID</option>
                            {senderID.map((senderids) => (
                              <option value={senderids.senderId}>
                                {senderids.senderId}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="form-group">
                            <label htmlFor className="mb-1">
                              Select Channel
                            </label>
                            <select
                              className="custom-select"
                              // value="select channel"
                              defaultValue={values.channel}
                              onChange={handleChange("channel")}
                            >
                              {selectChannels.map((selectChannel) => (
                                <option value={selectChannel.value}>
                                  {selectChannel.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor className="mb-1">
                          Campaign Message
                        </label>
                        <textarea
                          className="form-control"
                          rows={3}
                          placeholder="Type your ad message here e.g Get up to 50% discount on first purchase"
                          onChange={handleChange("campaignMessage")}
                          defaultValue={values.campaignMessage}
                        />
                      </div>
                    </div>
                  </form>
                  <div className="col-md-5 col-xl-4 pd-x-0 mg-y-50">
                    <div className="d-flex">
                      <button
                        className="btn btn-primary w-100 mg-b-15"
                        onClick={Continue}
                        type="submit"
                        variant="contained"
                      >
                        Proceed
                      </button>
                      <Link
                        to="/app/campaign/create"
                        className="btn btn-outline-primary w-100 mg-l-20 mg-b-15"
                      >
                        Go Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SmsCampaign;
