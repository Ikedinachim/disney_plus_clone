import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getSenderID,
  getDefaultSenderID,
} from "../../../../actions/senderIDActions";
import Loader from "../../../loader";

import MetaData from "../../../layout/MetaData";

const SmsCampaign = ({
  nextStep,
  handleChange,
  values,
  characterCount,
  smsCount,
}) => {
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { senderID, defaultSenderID } = useSelector((state) => state || []);
  const Continue = (e) => {
    e.preventDefault();
    // if (values.senderId === "" && values.alternateSenderId !== "") {
    //   toast.error("Select a Sender ID or choose an alternate ID");
    // } else
    if (values.senderId === "" && values.alternateSenderId === "") {
      toast.error("Choose an alternate ID");
    } else if (values.channel === "") {
      toast.error("Choose a channel");
    } else if (values.campaignMessage === "") {
      toast.error("Create the campaign message");
    } else {
      nextStep();
    }
  };
  const selectChannels = [
    {
      label: "Select Channel",
      value: "select channel",
    },
    // {
    //   label: "Flash SMS",
    //   value: "flash_sms",
    // },
    {
      label: "SMS",
      value: "sms",
    },
  ];

  const getSenderIDs = () => {
    const senders =
      senderID.senderID &&
      senderID.senderID
        .map(
          (senderId) =>
            (senderId.airtelStatus === "approved" ||
              senderId.mtnStatus === "approved" ||
              senderId.gloStatus === "approved" ||
              senderId.nineMobileStatus === "approved") &&
            senderId.senderId
        )
        .filter((sender) => sender);
    return senders;
  };

  // console.log(defaultSenderID.defaultSenderID.length);

  useEffect(() => {
    dispatch(getSenderID());
    dispatch(getDefaultSenderID());
  }, [dispatch]);

  return (
    <Fragment>
      {senderID.loading || defaultSenderID.loading ? (
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
              <div className="pd-y-30  pd-md-y-20">
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
                      <div className="row d-flex flex-column">
                        <div className="form-group col-md-6">
                          <label className="mb-1">Sender ID</label>
                          <select
                            className="custom-select"
                            // value="select channel"
                            defaultValue={values.senderId}
                            onChange={handleChange("senderId")}
                          >
                            <option value="">Select Sender ID</option>
                            {senderID.senderID &&
                              getSenderIDs().map((senderids, i) => (
                                <option value={senderids} key={i}>
                                  {senderids}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="form-group col-md-6">
                          <label className="mb-1">Alternate Sender ID</label>
                          <select
                            className="custom-select"
                            // value="select channel"
                            defaultValue={values.alternateSenderId}
                            onChange={handleChange("alternateSenderId")}
                          >
                            <option value="">Select Alternate Sender ID</option>
                            {defaultSenderID &&
                              defaultSenderID.defaultSenderID.map(
                                (senderids, i) => (
                                  <option value={senderids} key={i}>
                                    {senderids}
                                  </option>
                                )
                              )}
                          </select>
                          <p className="mg-0 tx-12 tx-italic tx-gray-500">
                            This generic Sender ID would be used when your
                            Sender ID has not been approved by one or more
                            Telcos.
                          </p>
                        </div>
                        <div className="form-group col-md-6">
                          <label className="mb-1">Select Channel</label>
                          <select
                            className="custom-select"
                            // value="select channel"
                            defaultValue={values.channel}
                            onChange={handleChange("channel")}
                          >
                            {selectChannels.map((selectChannel, i) => (
                              <option value={selectChannel.value} key={i}>
                                {selectChannel.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-6 mb-2">
                          <label className="mb-1">Campaign Message</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            // maxlength={150}
                            placeholder="Type your ad message here e.g Get up to 50% discount on first purchase"
                            onChange={handleChange("campaignMessage")}
                            defaultValue={values.campaignMessage}
                          />
                        </div>
                        <div className="form-group col-md-6 mb-2 d-flex justify-content-between">
                          <p>{characterCount} Characters</p>
                          <p>{smsCount} SMS</p>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="col-md-5 col-xl-4 pd-x-0 mg-y-20">
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
