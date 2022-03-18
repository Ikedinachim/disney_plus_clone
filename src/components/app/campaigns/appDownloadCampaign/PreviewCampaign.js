import React, { Fragment, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import MetaData from "../../../layout/MetaData";
import NumberFormat from "react-number-format";

import { getWallet } from "../../../../actions/billingActions";
import {
  createAppDownloadCampaignAction,
  clearErrors,
} from "../../../../actions/campaignActions";
import { APP_DOWNLOAD_CAMPAIGN_RESET } from "../../../../constants/campaignConstants";
import Loader from "../../../loader";
import MediaPlayer from "../../../../_helpers/reactPlayer/ReactPlayer";

import PreviewIcon from "../../../../assets/img/Promote_Offers.svg";

const PreviewCampaign = ({
  nextStep,
  prevStep,
  values,
  audience,
  attachmentPreview,
  price,
  filterOptions,
  handleChange,
  handleCount,
}) => {
  const { error, createAppDownloadCampaign, loading } = useSelector(
    (state) => state.appDownload || []
  );

  const { filteredContactList, fcError, fcLoading } = useSelector(
    (state) => state.filteredContactList || []
  );

  // const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wallet } = useSelector((state) => state.wallet);

  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  const submitAppDownloadCampaignHandler = async (e) => {
    e.preventDefault();
    dispatch(createAppDownloadCampaignAction(values));
  };

  const setScheduleDate = (initialDate, endDate) => {
    let day1 = new Date(initialDate);
    let day2 = new Date(endDate);

    const difference = Math.abs(day2 - day1);
    const days = difference / (1000 * 3600 * 24) + 1;

    if (values.scheduleOption !== "recurrent" || days < 1 || !days) {
      return 1;
    } else if (values.scheduleOption === "recurrent") {
      return days;
    }
  };

  const setPrice = () => {
    if (values.channel === "display_ads") {
      console.log(1);
      return price * setScheduleDate(values.scheduleFrom, values.scheduleTo);
    } else if (
      values.limit !== undefined &&
      values.limit !== "" &&
      values.targetAudienceOption === "mysogidb"
    ) {
      console.log(2);
      return (
        parseInt(values.limit) *
        5 *
        setScheduleDate(values.scheduleFrom, values.scheduleTo)
      );
    } else if (
      values.targetAudienceOption !== "mysogidb" &&
      values.channel === "smart_sms"
    ) {
      console.log(3);
      return price * setScheduleDate(values.scheduleFrom, values.scheduleTo);
    } else {
      console.log(4);
      return (
        filteredContactList.count *
        5 *
        setScheduleDate(values.scheduleFrom, values.scheduleTo)
      );
    }
  };

  useEffect(() => {
    handleCount(filteredContactList && filteredContactList.count);
  }, [filteredContactList]);

  useEffect(() => {
    if (
      createAppDownloadCampaign &&
      createAppDownloadCampaign.status === "success"
    ) {
      toast.success(createAppDownloadCampaign.message);
      dispatch(getWallet());
      navigate("/app/campaigns");
      dispatch({ type: APP_DOWNLOAD_CAMPAIGN_RESET });
    } else if (error) {
      toast.error(error);
      dispatch(clearErrors());
      // dispatch(getWallet());
    }
  }, [dispatch, toast, error, createAppDownloadCampaign, navigate]);

  //Edit functionality
  const [show, setShow] = useState(false);

  const [val, setVal] = useState({
    campaignMessage: values.campaignMessage,
    callToAction: values.callToAction,
  });

  const handleEdit = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVal({ ...val, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    values.campaignMessage = val.campaignMessage;
    values.callToAction = val.callToAction;
    setShow(!show);
  };
  const showButton = (e) => {
    setShow(!show);
  };

  //Campaign channel
  const [view, setView] = useState(false);

  const [chanl, setChanl] = useState(values.channel);

  const viewButton = () => {
    setView(!view);
  };

  const handleChanlChange = (e) => {
    setChanl(e.target.value);
  };

  const handleCampaignChannelSub = (e) => {
    e.preventDefault();
    values.channel = chanl;
    setView(!view);
  };

  return (
    <Fragment>
      {loading || fcLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Preview Campaign"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="row justify-content-between">
                <div className="col-md-6 mg-b-20 mg-md-b-0">
                  <Link to="/app/campaign/create" className="tx-black">
                    <div className="d-flex">
                      <div>
                        <i className="fa fa-angle-left mg-r-10 pd-t-15 tx-18" />
                      </div>
                      <div>
                        <p className="tx-28 tx-bold mb-0">Summary</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="pd-md-y-20">
                <div className="row justify-content-between">
                  <div className="col-md-7 col-12 mg-t-20">
                    <div className="card rounded bd-0 shadow-sm">
                      <div className="card-body pd-lg-x-50">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex">
                            <div className="mg-r-20">
                              <img
                                src={PreviewIcon}
                                className="img-fluid wd-50 ht-50"
                                alt=""
                              />
                            </div>
                            <div>
                              <p className="tx-20 tx-bold pd-t-15 tx-com capitalize">
                                {values.channel}
                              </p>
                            </div>
                          </div>
                          <div>
                            {/* <div
                              className="d-flex pd-t-25 clickable"
                              onClick={viewButton}
                            >
                              <div>
                                <i className="fa fa-edit tx-primary mg-r-5" />
                              </div>
                              <p className="mb-0">Edit</p>
                            </div> */}
                          </div>
                        </div>
                        <hr />
                        <div className=" mg-b-20 mg-md-b-10">
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="tx-18 mb-0 tx-bold tx-com">
                                Campaign Information
                              </p>
                            </div>
                          </div>
                          {values.channel === "display_ads" ? (
                            <div className="row mg-t-15">
                              <div className="form-group col-md-6">
                                <label className="tx-14 tx-gray mb-0 tx-medium">
                                  Channel
                                </label>
                                <p className="tx-16 mb-0">{values.channel}</p>
                              </div>
                              <div className="form-group col-md-6">
                                <label className="tx-14 tx-gray mb-0 tx-medium">
                                  Call To Action
                                </label>
                                <p className="tx-16 mb-0">
                                  {values.callToAction}
                                </p>
                              </div>
                              <div className="form-group col-md-12">
                                <label className="tx-14 tx-gray mb-0 tx-medium">
                                  Campaign Message
                                </label>
                                <p className="tx-15 mb-0">
                                  {values.campaignMessage}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="row mg-t-15">
                              <div className="form-group col-md-6">
                                <label className="tx-14 tx-gray mb-0 tx-medium">
                                  Channel
                                </label>
                                <p className="tx-16 mb-0">{values.channel}</p>
                              </div>
                              <div className="form-group col-md-6">
                                <label className="tx-14 tx-gray mb-0 tx-medium">
                                  Sender ID
                                </label>
                                <p className="tx-16 mb-0">
                                  {values.senderId !== ""
                                    ? values.senderId
                                    : values.alternateSenderId}
                                </p>
                              </div>
                              <div className="form-group col-md-6">
                                <label className="tx-14 tx-gray mb-0 tx-medium">
                                  Call To Action
                                </label>
                                <p className="tx-16 mb-0">
                                  {values.callToAction}
                                </p>
                              </div>
                              <div className="form-group col-md-6">
                                <label className="tx-14 tx-gray mb-0 tx-medium">
                                  IOS URL
                                </label>
                                <p className="tx-16 mb-0">
                                  {values.iosStoreUrl}
                                </p>
                              </div>
                              <div className="form-group col-md-6">
                                <label className="tx-14 tx-gray mb-0 tx-medium">
                                  Android URL
                                </label>
                                <p className="tx-16 mb-0">
                                  {values.androidStoreUrl}
                                </p>
                              </div>
                              <div className="form-group col-md-12">
                                <label className="tx-14 tx-gray mb-0 tx-medium">
                                  Campaign Message
                                </label>
                                <p className="tx-15 mb-0">
                                  {values.campaignMessage}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <hr />
                        {values.channel !== "display_ads" && (
                          <>
                            <div className="mg-b-20 mg-md-b-10">
                              <p className="tx-18 tx-com tx-semibold mb-0">
                                Scheduling
                              </p>
                              <div className="form-group mt-2 mb-2">
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
                              <div className="form-group mb-2">
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
                              <div className="form-group mb-2">
                                <div className="custom-control custom-radio">
                                  <input
                                    type="radio"
                                    id="recurrent"
                                    name="scheduleRadio"
                                    className="custom-control-input"
                                    checked={
                                      values.scheduleOption === "recurrent"
                                    }
                                    // onClick={(e) => assetTypeHandler("video")}
                                    value={"recurrent"}
                                    onChange={handleChange("scheduleOption")}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="recurrent"
                                  >
                                    Recurring
                                  </label>
                                </div>
                              </div>
                              {values.scheduleOption === "recurrent" && (
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
                                        <span className="input-group-text">
                                          To
                                        </span>
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
                                  {/* <div className="form-group col-md-6 mb-0">
                                    <label
                                      className="mb-1"
                                      htmlFor="schedule-time"
                                    >
                                      Time
                                    </label>
                                    <div className="input-group mg-b-10">
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
                                  </div> */}
                                </div>
                              )}
                              {values.scheduleOption === "once" && (
                                <div className="form-row col-md-12">
                                  <div className="form-group col-md-6 mg-b-0">
                                    <label className="mb-1">
                                      Set a Date / Time
                                    </label>
                                    <div className="input-group mg-b-0">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          Date
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
                            </div>
                            <hr />
                          </>
                        )}
                        {values.targetAudienceOption === "mysogidb" &&
                          values.channel !== "display_ads" && (
                            <>
                              <div className="mg-b-20 mg-md-b-10">
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <p className="tx-18 mb-0 tx-bold tx-com">
                                      Target Audience
                                    </p>
                                  </div>
                                  {/* <div>
                                  <div className="d-flex pd-t-3">
                                    <div>
                                      <i className="fa fa-edit tx-primary mg-r-5" />
                                    </div>
                                    <p className="mb-0">Edit</p>
                                  </div>
                                </div> */}
                                </div>
                                <div className="row mg-t-15">
                                  <div className="col-md-3 form-group">
                                    <label className="tx-14 tx-gray mb-0 tx-medium d-block">
                                      Age Range
                                    </label>
                                    <span className="badge badge-pink tx-14 mg-5">
                                      {" "}
                                      {filterOptions.ageRange} years
                                    </span>
                                  </div>
                                  <div className="col-md-3 form-group">
                                    <label className="tx-14 tx-gray mb-0 tx-medium d-block">
                                      Gender
                                    </label>
                                    <span className="badge badge-pink tx-14 mg-5">
                                      {" "}
                                      {filterOptions.gender}
                                    </span>
                                  </div>
                                  <div className="col-md-12 form-group">
                                    <label className="tx-14 tx-gray mb-0 tx-medium d-block">
                                      State:
                                    </label>
                                    <span className="tx-left text-wrap badge badge-pink tx-14 mg-0">
                                      {" "}
                                      {filterOptions.state}
                                    </span>
                                    <label className="tx-14 tx-gray mb-0 tx-medium d-block mt-3">
                                      LGA:
                                    </label>
                                    <span className="tx-left text-wrap badge badge-pink tx-14 mg-0">
                                      {" "}
                                      {filterOptions.lga}
                                    </span>
                                  </div>
                                  <div className="col-md-3 form-group">
                                    <label className="tx-14 tx-gray mb-0 tx-medium d-block">
                                      ARPU Brand
                                    </label>
                                    <span className="badge badge-pink tx-14 mg-5">
                                      {" "}
                                      0-1000
                                    </span>
                                  </div>
                                  <div className="col-md-6 form-group">
                                    <label className="tx-14 tx-gray mb-0 tx-medium d-block">
                                      Interest
                                    </label>
                                    <span className="badge badge-pink tx-14 mg-5">
                                      {" "}
                                      Surfing Net
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <hr />
                            </>
                          )}
                        {values.channel === "display_ads" && (
                          <>
                            <div className="mg-b-20 mg-md-b-10">
                              <div className="d-flex justify-content-between">
                                <div>
                                  <p className="tx-18 mb-0 tx-bold tx-com">
                                    Target Audience
                                  </p>
                                </div>
                                {/* <div>
                                  <div className="d-flex pd-t-3">
                                    <div>
                                      <i className="fa fa-edit tx-primary mg-r-5" />
                                    </div>
                                    <p className="mb-0">Edit</p>
                                  </div>
                                </div> */}
                              </div>
                              <div className="row mg-t-15">
                                <div className="col-md-12 form-group">
                                  <label className="tx-14 tx-gray mb-0 tx-medium d-block">
                                    State:
                                  </label>
                                  <span className="tx-left text-wrap badge badge-pink tx-14 mg-0">
                                    {" "}
                                    {filterOptions.state}
                                  </span>
                                  <label className="tx-14 tx-gray mb-0 tx-medium d-block mt-3">
                                    LGA:
                                  </label>
                                  <span className="tx-left text-wrap badge badge-pink tx-14 mg-0">
                                    {" "}
                                    {filterOptions.lga}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <hr />
                          </>
                        )}
                        {values.targetAudienceOption === "mysogidb" &&
                          values.channel !== "display_ads" && (
                            <div className="mg-b-20 mg-md-b-10">
                              <p className="tx-18 tx-com tx-semibold mb-0">
                                Pricing
                              </p>
                              <div className="form-group mg-t-15">
                                <label className="tx-14 tx-gray mb-0 tx-medium">
                                  Potential Audience Based on filter
                                </label>
                                <p className="tx-18 tx-com tx-bold mb-1">
                                  {filteredContactList.count}
                                </p>
                              </div>
                              <div className="form-row mg-t-15">
                                <div className="form-group col-md-9">
                                  <input
                                    type="number"
                                    onChange={handleChange("limit")}
                                    value={values.limit}
                                    max={parseInt(filteredContactList.count)}
                                    className="form-control"
                                    placeholder="Enter your target audience number to get price"
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  <NumberFormat
                                    className="badge badge-pink  tx-18 mg-5 tx-amt w-100 mt-0"
                                    value={parseInt(setPrice())}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₦"}
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                        {(values.targetAudienceOption === "manual" ||
                          values.targetAudienceOption === "manual_import") &&
                          values.channel !== "display_ads" && (
                            <div className="mg-b-20 mg-md-b-10">
                              <p className="tx-18 tx-com tx-semibold mb-0">
                                Pricing
                              </p>
                              <div className="form-group mg-t-15">
                                <label className="tx-14 tx-gray mb-1 tx-medium">
                                  Potential Audience Based on Manual Input
                                </label>
                                <p className="tx-18 tx-com tx-bold mb-0">
                                  {audience}{" "}
                                  <span className="tx-14 tx-gray tx-medium">
                                    number(s) loaded
                                  </span>
                                </p>
                                {/* <div className="form-group col-md-3">
                                  <p className="tx-18 tx-com tx-bold mb-0">
                                    {audience}
                                  </p>
                                  <span className="badge badge-pink  tx-18 mg-5 tx-amt w-100 mt-0">
                                    {" "}
                                    <NumberFormat
                                      value={values.price}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"₦"}
                                    />
                                  </span>
                                </div> */}
                              </div>
                              <div className="form-row mg-t-15 pd-x-0">
                                {/* <div className="form-group col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your target audience number to get price"
                                  />
                                </div> */}
                                <div className=" col-md-2 d-flex align-items-center">
                                  <p className="tx-18 tx-com tx-bold mb-0">
                                    Amount:
                                  </p>{" "}
                                  <NumberFormat
                                    className="badge tx-green tx-bold tx-18 mg-0 tx-amt w-100 mt-0"
                                    value={parseInt(setPrice())}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₦"}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        {values.channel === "display_ads" && (
                          <div className="mg-b-20 mg-md-b-10">
                            <p className="tx-18 tx-com tx-semibold mb-0">
                              Reach
                            </p>
                            <div className="form-group mg-t-15">
                              <label className="tx-14 tx-gray mb-1 tx-medium">
                                Potential Reach Based on Budget
                              </label>
                              <p className="tx-18 tx-com tx-bold mb-0">
                                {Math.ceil(values.budget / 6 / 100) * 100} -{" "}
                                {""}
                                {Math.ceil(values.budget / 3 / 1000) * 1000}
                                <span className="tx-14 tx-gray tx-medium">
                                  {" "}
                                  Estimated Reach{" "}
                                  <i className="tx-15 fa fa-users" />
                                </span>
                              </p>
                              {/* <div className="form-group col-md-3">
                                <p className="tx-18 tx-com tx-bold mb-0">
                                  {audience}
                                </p>
                                <span className="badge badge-pink  tx-18 mg-5 tx-amt w-100 mt-0">
                                  {" "}
                                  <NumberFormat
                                    value={values.price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₦"}
                                  />
                                </span>
                              </div> */}
                            </div>
                            <div className="form-row mg-t-15 pd-x-0">
                              {/* <div className="form-group col-md-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter your target audience number to get price"
                                />
                              </div> */}
                              <div className=" col-md-2 d-flex align-items-center">
                                <p className="tx-18 tx-com tx-bold mb-0">
                                  Budget:
                                </p>{" "}
                                <NumberFormat
                                  className="badge tx-green tx-bold tx-18 mg-0 tx-amt w-100 mt-0"
                                  value={parseInt(setPrice())}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="col-md-5 pd-x-0 mg-y-40">
                          <div className="mg-t-20 d-flex">
                            {parseInt(wallet.balance) < price ||
                            (values.targetAudienceOption === "mysogidb" &&
                              values.channel !== "display_ads" &&
                              parseInt(wallet.balance) < setPrice() &&
                              parseInt(wallet.balance) <
                                filteredContactList.count * 5) ||
                            (values.channel === "display_ads" &&
                              parseInt(wallet.balance) < values.budget) ? (
                              <button
                                className="btn btn-primary w-100 tx-com mg-r-15"
                                onClick={Continue}
                                disabled={loading ? true : false}
                                type="submit"
                                variant="contained"
                              >
                                Fund Wallet
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary w-100 tx-com mg-r-15"
                                onClick={submitAppDownloadCampaignHandler}
                                disabled={loading ? true : false}
                                type="submit"
                                variant="contained"
                              >
                                Publish
                              </button>
                            )}
                            <button
                              className="btn btn-outline-primary w-100 tx-com mg-r-15"
                              onClick={Previous}
                              type="submit"
                              variant="contained"
                            >
                              Go Back
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 col-12 mg-t-20">
                    <div className="card shadow-sm rounded bd-0">
                      <div className="card-body">
                        <p className="tx-20 tx-bold tx-com">Preview</p>
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
                        <div>
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
                              {values.callToAction} USSD
                            </button>
                          )}
                          {values.callToAction === "" ||
                          values.smsNumber === "" ? null : (
                            <button className="btn btn-primary w-100 mg-b-15 round-5">
                              <i className="fa fa-comment mg-r-10"> </i>
                              {values.callToAction} via Text
                            </button>
                          )} */}
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

export default PreviewCampaign;
