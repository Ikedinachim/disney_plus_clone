import React, { Fragment, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import {
  getSenderID,
  getDefaultSenderID,
} from "../../../../actions/senderIDActions";
import MetaData from "../../../layout/MetaData";
import Loader from "../../../loader";
import MediaPlayer from "../../../../_helpers/reactPlayer/ReactPlayer";
import { ProgressBar } from "react-bootstrap";

const FlierVideoCampaign = ({
  nextStep,
  handleChange,
  // onChangeAttachment,
  values,
  // attachmentPreview,
  handleImageUpload,
  selectedFileName,
  uploadPercentage,
  characterCount,
  smsCount,
  callToActionCount,
  videoError,
}) => {
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { senderID, defaultSenderID } = useSelector((state) => state || []);

  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [showSms, setShowSms] = useState(false);
  const [showUssd, setShowUssd] = useState(false);

  const maxTimeMinDay = new Date().setHours(19, 59, 0, 0);
  const minTimeMaxDay = new Date().setHours(0, 0, 0, 0);

  // const [assetType, setAssetType] = useState("image");
  // const assetTypeHandler = (asset) => {
  //   setAssetType(asset);
  // };

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
    if (values.channel === "") {
      toast.error("Choose a channel");
    } else if (
      values.channel !== "display_ads" &&
      values.senderId === "" &&
      values.alternateSenderId === ""
    ) {
      toast.error("Choose an alternate ID");
    } else if (values.channel === "display_ads" && values.url === "") {
      toast.error("Input a URL");
    } else if (values.callToAction === "") {
      toast.error("Provide a call to action for users");
    } else if (values.campaignMessage === "") {
      toast.error("Create the campaign message");
    } else if (values.assetType === "image" && values.attachment === null) {
      nextStep();
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
    // .concat(defaultSenderID.defaultSenderID);
    return senders;
  };

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
                <div className="align-items-start row justify-content-between">
                  <div className="col-md-6 col-12 mg-t-20">
                    <div className="card-scrol pd-md-x-10">
                      <form>
                        <div>
                          <p className="tx-24 tx-bold mb-1 tx-com">
                            Digital / Display Ads Campaign
                          </p>
                          <p className="tx-14">
                            Provide all requested details to help complete the
                            campaign creation
                          </p>
                          <div className="form-group">
                            <div className="form-group">
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
                                <p className="mg-0 tx-12 tx-italic tx-gray-500">
                                  This generic Sender ID would be used when your
                                  Sender ID has not been approved by one or more
                                  Telcos.
                                </p>
                              </div>
                            </>
                          )}
                          <div className="form-group">
                            <label className="mb-1">Input URL</label>
                            <input
                              type="url"
                              className="form-control"
                              placeholder="Enter URL customers can order or view your products through"
                              defaultValue={values.url}
                              onChange={handleChange("url")}
                            />
                          </div>
                          {values.channel === "smart_sms" && (
                            <>
                              <div className="form-group">
                                <label className="mb-1">Phone Number</label>
                                <div className="d-flex">
                                  <input
                                    type="phone"
                                    className="form-control"
                                    placeholder="2348057xxxxxx"
                                    defaultValue={values.phoneNumber}
                                    onChange={handleChange("phoneNumber")}
                                  />
                                  {/* <button onClick={handleAddClick}>Add</button> */}
                                  <button
                                    className="btn btn-success ml-2 col-md-3 text-center"
                                    onClick={handleAddClick}
                                  >
                                    More Options
                                    {/* <i class="fa fa-plus"></i> */}
                                  </button>
                                </div>
                              </div>
                              {showWhatsapp && (
                                <div className="form-group">
                                  <label className="mb-1">
                                    WhatsApp Number
                                  </label>
                                  <div className="d-flex">
                                    <input
                                      type="phone"
                                      className="form-control"
                                      placeholder="2348057xxxxxx"
                                      defaultValue={values.whatsAppNumber}
                                      onChange={handleChange("whatsAppNumber")}
                                    />
                                    <button
                                      className="btn btn-danger ml-2"
                                      onClick={handleRemoveClick("whatsapp")}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              )}
                              {showUssd && (
                                <div className="form-group">
                                  <label className="mb-1">USSD</label>
                                  <div className="d-flex">
                                    <input
                                      type="phone"
                                      className="form-control"
                                      placeholder="Enter USSD code"
                                      defaultValue={values.ussd}
                                      onChange={handleChange("ussd")}
                                    />
                                    <button
                                      className="btn btn-danger ml-2"
                                      onClick={handleRemoveClick("showUssd")}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              )}
                              {showSms && (
                                <div className="form-group">
                                  <label className="mb-1">SMS Number</label>
                                  <div className="d-flex">
                                    <input
                                      type="phone"
                                      className="form-control"
                                      placeholder="2348057xxxxxx"
                                      defaultValue={values.smsNumber}
                                      onChange={handleChange("smsNumber")}
                                    />
                                    <button
                                      className="btn btn-danger ml-2"
                                      onClick={handleRemoveClick("showSms")}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                          <div className="form-group">
                            <label className="mb-1">Call To Action</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter the call to action prompt e.g buy now"
                              defaultValue={values.callToAction}
                              onChange={handleChange("callToAction")}
                              maxLength={20}
                            />
                            <p className="mg-0 tx-12 tx-italic tx-gray-400">
                              {20 - callToActionCount} Characters Left
                            </p>
                          </div>
                          <div className="form-group mb-2">
                            <label className="mb-1">Campaign Message</label>
                            <textarea
                              className="form-control"
                              rows={3}
                              maxLength={
                                values.channel === "display_ads"
                                  ? 40
                                  : undefined
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
                                checked={values.assetType === "image"}
                                // onClick={(e) => assetTypeHandler("image")}
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
                                <p className="mt-2 tx-danger tx-italic">
                                  Image dimension: 960 x 1280
                                </p>
                                {/* <ProgressBar
                                  now={uploadPercentage}
                                  // active
                                  label={`${uploadPercentage}%`}
                                /> */}
                              </div>
                            </div>
                          )}
                          {values.assetType === "video" && (
                            <>
                              <div className="form-group">
                                <div className="custom-file">
                                  <label className="mb-1">Youtube URL</label>
                                  <input
                                    type="text"
                                    id="videoAsset"
                                    className="form-control"
                                    defaultValue={values.attachment}
                                    placeholder="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                                    onChange={handleChange("rawVideoUrl")}
                                  />
                                </div>
                              </div>
                              {videoError && (
                                <p className="mt-2 tx-danger tx-italic">
                                  Enter a valid youtube url
                                </p>
                              )}
                            </>
                          )}
                        </div>
                        {/* <div className="mg-t-20">
                          <p className="tx-24 tx-bold mb-1 tx-com">Schedule</p>
                          <div className="form-group">
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="none"
                                name="scheduleRadio"
                                className="custom-control-input"
                                checked={values.scheduleOption === "none"}
                                // onClick={(e) => assetTypeHandler("image")}
                                value={"none"}
                                onChange={handleChange("scheduleOption")}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="none"
                              >
                                Publish Now
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="once"
                                name="scheduleRadio"
                                className="custom-control-input"
                                checked={values.scheduleOption === "once"}
                                // onClick={(e) => assetTypeHandler("video")}
                                value={"once"}
                                onChange={handleChange("scheduleOption")}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="once"
                              >
                                Once
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="recurring"
                                name="scheduleRadio"
                                className="custom-control-input"
                                checked={values.scheduleOption === "recurring"}
                                // onClick={(e) => assetTypeHandler("video")}
                                value={"recurring"}
                                onChange={handleChange("scheduleOption")}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="recurring"
                              >
                                Recurring
                              </label>
                            </div>
                          </div>
                          {values.scheduleOption === "recurring" && (
                            <div className="form-row">
                              <div className="form-group col-md-6 mg-b-0">
                                <label className="mb-1">Date Range</label>
                                <div className="input-group mg-b-0">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      From
                                    </span>
                                  </div>
                                  <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    defaultValue={values.scheduleFrom}
                                    onChange={handleChange("scheduleFrom")}
                                  />
                                </div>
                              </div>
                              <div className="form-group col-md-6 mb-0">
                                <label />
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
                                    defaultValue={values.scheduleTo}
                                    onChange={handleChange("scheduleTo")}
                                  />
                                </div>
                              </div>
                              <div className="form-group col-md-6 mb-0">
                                <label className="mb-1" htmlFor="schedule-time">
                                  Time
                                </label>
                                <div className="input-group mg-b-10 mg-t-5">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      Time
                                    </span>
                                  </div>
                                  <input
                                    type="time"
                                    id="schedule-time"
                                    min="08:00"
                                    max="20:00"
                                    className="form-control"
                                    aria-describedby="basic-addon1"
                                    defaultValue={values.scheduleTime}
                                    onChange={handleChange("scheduleTime")}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div> */}
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
                              (values.attachment === null ||
                                values.attachment === "")
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
                  <div className="position-sticky t-0 col-md-5 col-12 mg-t-20">
                    <div className="card shadow-sm rounded bd-0">
                      <div className="card-body">
                        {values.assetType === "image" ? (
                          <div>
                            <img
                              src={values && values.attachment}
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
                        {values.channel === "smart_sms" ? (
                          <div>
                            {values.callToAction === "" ||
                            values.url === "" ? null : (
                              <button className="btn btn-primary w-100 mg-b-15 round-5">
                                <i className="fa fa-globe mg-r-5"> </i>
                                {values.callToAction} via web
                              </button>
                            )}
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
                        ) : (
                          <div>
                            {values.callToAction === "" ||
                            values.url === "" ? null : (
                              <button className="btn btn-primary w-100 mg-b-15 round-5">
                                <i className="fa fa-globe mg-r-10"> </i>
                                {values.callToAction} - via web
                              </button>
                            )}
                          </div>
                        )}
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
