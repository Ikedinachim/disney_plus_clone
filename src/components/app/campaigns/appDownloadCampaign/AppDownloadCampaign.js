import React, { Fragment, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { useAlert } from "react-alert";
import {
  getSenderID,
  getDefaultSenderID,
} from "../../../../actions/senderIDActions";
import Loader from "../../../loader";
import MediaPlayer from "../../../../_helpers/reactPlayer/ReactPlayer";
import { ProgressBar } from "react-bootstrap";
import { toast } from "react-toastify";
import MetaData from "../../../layout/MetaData";

const AppDownloadCampaign = ({
  nextStep,
  handleChange,
  values,
  // onChangeAttachment,
  handleImageUpload,
  // attachmentPreview,
  selectedFileName,
  uploadPercentage,
  characterCount,
  smsCount,
}) => {
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { senderID, defaultSenderID } = useSelector((state) => state || []);
  // const { defaultSenderID } = useSelector((state) => state || []);

  // const [assetType, setAssetType] = useState("image");
  // const assetTypeHandler = (asset) => {
  //   setAssetType(asset);
  // };

  // console.log(values);
  const Continue = (e) => {
    e.preventDefault();
    // if (
    //   values.channel === "smart_sms" &&
    //   values.senderId === ""
    //   // &&
    //   // values.alternateSenderId === ""
    // ) {
    //   toast.error("Select a Sender ID or request for one if not available");
    // } else
    if (values.senderId !== "" && values.alternateSenderId === "") {
      toast.error("Choose an alternate ID");
    } else if (values.channel === "") {
      toast.error("Choose a channel");
    } else if (values.channel === "display_ads" && values.url === "") {
      toast.error("Input a URL");
    } else if (
      // (values.channel === "smart_sms" &&
      values.androidStoreUrl === "" &&
      values.iosStoreUrl === ""
    ) {
      toast.error("Input the URL to your app");
    } else if (values.campaignMessage === "") {
      toast.error("Create the campaign message");
    } else if (values.callToAction === "") {
      toast.error("Provide a call to action for users");
    } else if (values.assetType === "image" && values.attachment === null) {
      nextStep();
      // handleImageUpload();
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
      label: "Smart SMS",
      value: "smart_sms",
    },
    {
      label: "Display Ads",
      value: "display_ads",
    },
  ];

  const getSenderIDs = () => {
    const senders =
      senderID.senderID &&
      senderID.senderID
        .map(
          (senderId) => senderId.telcoStatus === "approved" && senderId.senderId
        )
        .filter((sender) => sender);
    // .concat(defaultSenderID.defaultSenderID);
    return senders;
  };

  // console.log(values);

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
          <MetaData title={"Create App Download Campaign"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div>
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
                  <div className="row justify-content-between">
                    <div className="col-md-6 col-12 mg-t-20">
                      <div className="card-scrol pd-md-x-10">
                        <form>
                          <div>
                            <p className="tx-24 tx-bold mb-1 tx-com">
                              APP Download Campaign
                            </p>
                            <p className="tx-14">
                              Provide all requested details to help complete the
                              campaign creation
                            </p>
                            <div className="form-group">
                              <label className="mb-1">Select Channel</label>
                              <select
                                className="custom-select"
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
                            {values.channel === "smart_sms" && (
                              <>
                                <div className="form-group">
                                  <label className="mb-1">Sender ID</label>
                                  <select
                                    className="custom-select"
                                    // value="select channel"
                                    defaultValue={values.senderId}
                                    onChange={handleChange("senderId")}
                                  >
                                    <option value="">Select Sender ID</option>
                                    {getSenderIDs().map((senderids, i) => (
                                      <option value={senderids} key={i}>
                                        {senderids}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label className="mb-1">
                                    Alternate Sender ID
                                  </label>
                                  <select
                                    className="custom-select"
                                    // value="select channel"
                                    defaultValue={values.alternateSenderId}
                                    onChange={handleChange("alternateSenderId")}
                                  >
                                    <option value="">
                                      Select Alternate Sender ID
                                    </option>
                                    {defaultSenderID &&
                                      defaultSenderID.defaultSenderID.map(
                                        (senderids, i) => (
                                          <option value={senderids} key={i}>
                                            {senderids}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                              </>
                            )}
                            <div className="form-group">
                              <label className="mb-1">IOS store URL</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter URL here"
                                defaultValue={values.iosStoreUrl}
                                onBlur={handleChange("iosStoreUrl")}
                              />
                            </div>
                            <div className="form-group">
                              <label className="mb-1">Android store URL</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter URL here"
                                defaultValue={values.androidStoreUrl}
                                onBlur={handleChange("androidStoreUrl")}
                              />
                            </div>
                            <div className="form-group">
                              <label className="mb-1">Call to Action</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter call to action prompt e.g download now"
                                defaultValue={values.callToAction}
                                onBlur={handleChange("callToAction")}
                              />
                            </div>
                            <div className="form-group">
                              <label className="mb-1">Campaign Message</label>
                              <textarea
                                className="form-control"
                                rows={3}
                                maxLength={
                                  values.channel === "display_ads" ? 40 : false
                                }
                                placeholder="Type your ad message here"
                                defaultValue={values.campaignMessage}
                                onChange={handleChange("campaignMessage")}
                              />
                            </div>
                            {values.channel === "display_ads" ? (
                              <div className="d-flex justify-content-between">
                                <p>{40 - characterCount} Characters Left</p>
                              </div>
                            ) : (
                              <div className="d-flex justify-content-between">
                                <p>{characterCount} Characters</p>
                                <p>{smsCount} SMS</p>
                              </div>
                            )}
                          </div>
                          <div className="mg-t-30">
                            <p className="tx-24 tx-bold mb-1 tx-com">
                              Attachment
                            </p>
                            <div className="form-group">
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="image"
                                  name="customRadio"
                                  className="custom-control-input"
                                  checked={values.assetType === "image"}
                                  // onClick={(e) => values.Handler("image")}
                                  value={"image"}
                                  onChange={handleChange("assetType")}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="image"
                                >
                                  Image Asset
                                </label>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="video"
                                  name="customRadio"
                                  className="custom-control-input"
                                  checked={values.assetType === "video"}
                                  // onClick={(e) => assetTypeHandler("video")}
                                  value={"video"}
                                  onChange={handleChange("assetType")}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="video"
                                >
                                  Video Asset
                                </label>
                              </div>
                            </div>
                            {values.assetType === "image" && (
                              <div className="form-group">
                                <div className="custom-file">
                                  <input
                                    type="file"
                                    name="file"
                                    accept="image/png, image/jpeg, image/gif, image/jpg"
                                    className="custom-file-input"
                                    id="customFile"
                                    onChange={handleImageUpload}
                                  />
                                  <label
                                    className="custom-file-label"
                                    htmlFor="customFile"
                                  >
                                    {selectedFileName}
                                  </label>
                                  {uploadPercentage > 0 && (
                                    <span className="mt-2">
                                      <ProgressBar
                                        now={uploadPercentage}
                                        // active
                                        label={`${uploadPercentage}%`}
                                      />
                                    </span>
                                  )}
                                  <p className="mt-2 tx-danger tx-italic">
                                    Image dimension: 150 x 150
                                  </p>
                                </div>
                              </div>
                            )}
                            {values.assetType === "video" && (
                              <div className="form-group">
                                <div className="custom-file">
                                  <label htmlFor className="mb-1">
                                    Youtube URL
                                  </label>
                                  <input
                                    type="text"
                                    id="videoAsset"
                                    className="form-control"
                                    value={values.attachment}
                                    placeholder="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                                    onChange={handleChange("videoUrl")}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </form>
                        <div className="col-md-7 pd-x-0 mg-y-30">
                          <div className="d-flex">
                            <button
                              className="btn btn-primary w-100 mg-b-15 "
                              onClick={Continue}
                              type="submit"
                              variant="contained"
                              disabled={
                                uploadPercentage !== 100 &&
                                values.attachment === null
                                  ? true
                                  : false
                              }
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
                    <div className="col-md-5 col-12 mg-t-20">
                      <div className="card shadow-sm rounded bd-0">
                        <div className="card-body">
                          {values.assetType === "image" ? (
                            <div>
                              <img
                                src={values.attachment}
                                className="img-fluid mg-b-10"
                                alt=""
                              />
                              <p className="mb-4">{values.campaignMessage}</p>
                            </div>
                          ) : (
                            <>
                              <div className="mg-b-10">
                                <MediaPlayer url={values.attachment} />
                              </div>
                              <p className="mb-4">{values.campaignMessage}</p>
                            </>
                          )}
                          {values.callToAction === "" ||
                          values.iosStoreUrl === "" ? null : (
                            <button className="btn btn-primary w-100 mg-b-15 round-5">
                              <i className="fab fa-apple mg-r-10"> </i>
                              {values.callToAction}
                            </button>
                          )}
                          {values.callToAction === "" ||
                          values.androidStoreUrl === "" ? null : (
                            <button className="btn btn-primary w-100 mg-b-15 round-5">
                              <i className="fab fa-google-play mg-r-10"> </i>
                              {values.callToAction}
                            </button>
                          )}
                          {/* {values.callToAction === "" ||
                          values.androidStoreUrl === "" ||
                          values.iosStoreUrl === "" ? null : (
                            <div className="pd-b-40">
                              <button className="btn btn-primary w-100 mg-b-15 round-5">
                                Download
                              </button>
                            </div>
                          )}
                          <div className="pd-b-40">
                            <button className="btn btn-primary w-100 mg-b-15 round-5">
                              Download
                            </button>
                          </div> */}
                        </div>
                      </div>
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

export default AppDownloadCampaign;
