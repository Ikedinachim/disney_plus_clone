import React, { Fragment, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import { getSenderID } from "../../../../actions/senderIDActions";
import MetaData from "../../../layout/MetaData";
import Loader from "../../../loader";
import MediaPlayer from "../../../../_helpers/reactPlayer/ReactPlayer";
import { ProgressBar } from "react-bootstrap";

const FlierVideoCampaign = ({
  nextStep,
  handleChange,
  onChangeAttachment,
  values,
  attachmentPreview,
  handleImageUpload,
  selectedFileName,
  uploadPercentage,
}) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { senderID, loading } = useSelector((state) => state.senderID || []);

  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [showSms, setShowSms] = useState(false);
  const [showUssd, setShowUssd] = useState(false);

  const [assetType, setAssetType] = useState("image");
  const assetTypeHandler = (asset) => {
    setAssetType(asset);
  };

  const Continue = (e) => {
    e.preventDefault();
    if (values.callToAction === "") {
      alert.error("Provide a call to action for users");
    } else if (values.channel === "") {
      alert.error("Choose a channel");
    } else if (values.campaignMessage === "") {
      alert.error("Create the campaign message");
    } else if (values.assetType === "image" && values.attachment === null) {
      nextStep();
      handleImageUpload();
    } else {
      nextStep();
    }
  };

  // handle click event of the Add button
  const handleAddClick = (e) => {
    e.preventDefault();
    setShowWhatsapp(true);
    setShowSms(true);
    setShowUssd(true);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (whatsapp) => (e) => {
    e.preventDefault();
    if (whatsapp === "whatsapp") {
      setShowWhatsapp(false);
    } else if (whatsapp === "showSms") {
      setShowSms(false);
    } else if (whatsapp === "showUssd") {
      setShowUssd(false);
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

  useEffect(() => {
    dispatch(getSenderID());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Create Flier/Video Campaign"} />
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
                <div className="row justify-content-between">
                  <div className="col-md-6 col-12 mg-t-20">
                    <div className="card-scrol pd-md-x-10">
                      <form>
                        <div>
                          <p className="tx-24 tx-bold mb-1 tx-com">
                            Flier/Video Campaign
                          </p>
                          <p className="tx-14">
                            Provide all requested details to help complete the
                            campaign creation
                          </p>
                          <div className="form-group">
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
                              {senderID &&
                                senderID.map((senderids) => (
                                  <option value={senderids.senderId}>
                                    {senderids.senderId}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="form-group">
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
                          <div className="form-group">
                            <label htmlFor className="mb-1">
                              Input URL
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter URL customers can order or view your products through"
                              defaultValue={values.url}
                              onChange={handleChange("url")}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor className="mb-1">
                              Phone Number
                            </label>
                            <div className="d-flex">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter customer care number customers can reach you on"
                                defaultValue={values.phoneNumber}
                                onChange={handleChange("phoneNumber")}
                              />
                              {/* <button onClick={handleAddClick}>Add</button> */}
                              <button
                                class="btn btn-success ml-2 col-md-3 text-center"
                                onClick={handleAddClick}
                              >
                                More Options
                                {/* <i class="fa fa-plus"></i> */}
                              </button>
                            </div>
                          </div>
                          {showWhatsapp && (
                            <div className="form-group">
                              <label htmlFor className="mb-1">
                                WhatsApp Number
                              </label>
                              <div className="d-flex">
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="WhatsApp Number"
                                  defaultValue={values.whatsAppNumber}
                                  onChange={handleChange("whatsAppNumber")}
                                />
                                <button
                                  class="btn btn-danger ml-2"
                                  onClick={handleRemoveClick("whatsapp")}
                                >
                                  <i class="fa fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          )}
                          {showUssd && (
                            <div className="form-group">
                              <label htmlFor className="mb-1">
                                USSD
                              </label>
                              <div className="d-flex">
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Enter preferred code"
                                  defaultValue={values.ussd}
                                  onChange={handleChange("ussd")}
                                />
                                <button
                                  class="btn btn-danger ml-2"
                                  onClick={handleRemoveClick("showUssd")}
                                >
                                  <i class="fa fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          )}
                          {showSms && (
                            <div className="form-group">
                              <label htmlFor className="mb-1">
                                SMS Number
                              </label>
                              <div className="d-flex">
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Enter number you want to be texted on by your customers"
                                  defaultValue={values.smsNumber}
                                  onChange={handleChange("smsNumber")}
                                />
                                <button
                                  class="btn btn-danger ml-2"
                                  onClick={handleRemoveClick("showSms")}
                                >
                                  <i class="fa fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          )}
                          <div className="form-group">
                            <label htmlFor className="mb-1">
                              Call To Action
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter the call to action prompt e.g buy now"
                              value={values.callToAction}
                              onChange={handleChange("callToAction")}
                            />
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1">
                                Time Range
                              </label>
                              <div className="input-group mg-b-10">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">From</span>
                                </div>
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder="Username"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  defaultValue={values.timeRangeFrom}
                                  onChange={handleChange("timeRangeFrom")}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className />
                              <div className="input-group mg-b-10 mg-t-5">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">To</span>
                                </div>
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder="Username"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  defaultValue={values.timeRangeTo}
                                  onChange={handleChange("timeRangeTo")}
                                />
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
                              placeholder="Type your ad message here"
                              defaultValue={values.campaignMessage}
                              onChange={handleChange("campaignMessage")}
                            />
                          </div>
                        </div>
                        <div className="mg-t-20">
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
                                checked={assetType === "image"}
                                onClick={(e) => assetTypeHandler("image")}
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
                                checked={assetType === "video"}
                                onClick={(e) => assetTypeHandler("video")}
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
                          {assetType === "image" && (
                            <div className="form-group">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  name="file"
                                  accept="image/png, image/jpeg, image/gif, image/jpg"
                                  className="custom-file-input"
                                  id="customFile"
                                  // defaultValue={values.attachment}
                                  onChange={
                                    // (onChangeAttachment("uploadedImage"),
                                    handleImageUpload
                                  }
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
                                {/* <ProgressBar
                                  now={uploadPercentage}
                                  // active
                                  label={`${uploadPercentage}%`}
                                /> */}
                              </div>
                            </div>
                          )}
                          {assetType === "video" && (
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
                        {assetType === "image" ? (
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
                        <div>
                          {values.callToAction === "" ||
                          values.whatsAppNumber === "" ? null : (
                            <button className="btn btn-primary w-100 mg-b-15 round-5">
                              <i className="fa fa-whatsapp mg-r-5"> </i>
                              {values.callToAction} via WhatsApp
                            </button>
                          )}
                          {values.callToAction === "" ||
                          values.phoneNumber === "" ? null : (
                            <button className="btn btn-primary w-100 mg-b-15 round-5">
                              <i className="fa fa-phone mg-r-5" />
                              {values.callToAction} via Mobile
                            </button>
                          )}
                          {values.callToAction === "" ||
                          values.ussd === "" ? null : (
                            <button className="btn btn-primary w-100 mg-b-15 round-5">
                              <i className="fa fa-phone mg-r-5" />
                              {values.callToAction} via USSD
                            </button>
                          )}
                          {values.callToAction === "" ||
                          values.smsNumber === "" ? null : (
                            <button className="btn btn-primary w-100 mg-b-15 round-5">
                              <i className="fa fa-comment mg-r-10"> </i>
                              {values.callToAction} via Text
                            </button>
                          )}
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

export default FlierVideoCampaign;
