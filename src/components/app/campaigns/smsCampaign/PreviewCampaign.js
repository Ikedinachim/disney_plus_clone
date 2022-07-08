import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import MetaData from "../../../layout/MetaData";
import NumberFormat from "react-number-format";

import { getWallet } from "../../../../actions/billingActions";
import {
  createSmsCampaignAction,
  clearErrors,
} from "../../../../actions/campaignActions";
import { SMS_CAMPAIGN_RESET } from "../../../../constants/campaignConstants";
import Loader from "../../../loader";
import PreviewIcon from "../../../../assets/img/Brand_Awareness.svg";
import useAnalyticsEventTracker from "../../../../_helpers/GoogleAnalytics/GoogleAnalytics";

const PreviewCampaign = ({
  nextStep,
  prevStep,
  values,
  audience,
  handleCount,
  filterOptions,
  handleChange,
}) => {
  const { error, createSmsCampaign, loading } = useSelector(
    (state) => state.smsCampaign || []
  );

  const { filteredContactList, fcLoading } = useSelector(
    (state) => state.filteredContactList || []
  );

  // const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wallet } = useSelector((state) => state.wallet);
  const gaEventTracker = useAnalyticsEventTracker("SMS Campaign");

  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  const submitSmsCampaignHandler = (e) => {
    e.preventDefault();
    dispatch(createSmsCampaignAction(values));
  };

  const setScheduleDate = (initialDate, endDate) => {
    let day1 = new Date(initialDate);
    let day2 = new Date(endDate);

    const difference = Math.abs(day2 - day1);
    const days = difference / (1000 * 3600 * 24) + 1;

    if (values.scheduleOption !== "recurrent" || days < 1) {
      return 1;
    } else if (values.scheduleOption === "recurrent") {
      return days;
    }
  };

  const setPrice = () => {
    if (values.targetAudienceOption !== "mysogidb") {
      return (
        parseInt(values.price) *
        setScheduleDate(values.scheduleFrom, values.scheduleTo)
      );
    } else if (values.limit !== "" && values.channel !== "voice_sms") {
      return (
        parseInt(values.limit) *
        5 *
        setScheduleDate(values.scheduleFrom, values.scheduleTo)
      );
    } else if (values.limit !== "" && values.channel === "voice_sms") {
      return (
        parseInt(values.limit) *
        15 *
        setScheduleDate(values.scheduleFrom, values.scheduleTo)
      );
    } else if (values.channel === "voice_sms") {
      return filteredContactList
        ? filteredContactList.count *
            15 *
            setScheduleDate(values.scheduleFrom, values.scheduleTo)
        : 0;
    } else {
      return filteredContactList
        ? filteredContactList.count *
            5 *
            setScheduleDate(values.scheduleFrom, values.scheduleTo)
        : 0;
    }
  };

  useEffect(() => {
    handleCount(filteredContactList && filteredContactList.count);
  }, [handleCount, filteredContactList]);

  useEffect(() => {
    if (createSmsCampaign && createSmsCampaign.status === "success") {
      gaEventTracker("SMS Campaign", "User created sms campaign");
      toast.success(createSmsCampaign.message);
      dispatch(getWallet());
      navigate("/app/campaigns");
      dispatch({ type: SMS_CAMPAIGN_RESET });
    } else if (error) {
      toast.error(error);
      dispatch(clearErrors());
      // dispatch(getWallet());
    }
  }, [dispatch, error, createSmsCampaign, navigate]);

  // console.log(values.attachment);

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
                        <p className="tx-28 tx-bold mb-0">Campaigns</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="pd-md-y-20">
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
                      {/* <div>
                        <div
                          className="d-flex pd-t-25 clickable"
                          onClick={viewButton}
                        >
                          <div>
                            <i className="fa fa-edit tx-primary mg-r-5" />
                          </div>
                          <p className="mb-0">Edit</p>
                        </div>
                      </div> */}
                    </div>
                    <hr />
                    <div className=" mg-b-20 mg-md-b-10">
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="tx-18 mb-0 tx-bold tx-com">
                            Campaign Information
                          </p>
                        </div>
                        {/* <div>
                          <div
                            className="d-flex pd-t-3 clickable"
                            onClick={showButton}
                          >
                            <div>
                              <i className="fa fa-edit tx-primary mg-r-5" />
                            </div>
                            <p className="mb-0">Edit</p>
                          </div>
                        </div> */}
                      </div>
                      <div className="row mg-t-15">
                        {values.channel === "voice_sms" ? (
                          <>
                            <div className="form-group col-md-12">
                              <audio controls src={values.attachment} />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="form-group col-md-12">
                              <label
                                htmlFor
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                Campaign Message
                              </label>

                              <p className="tx-15 mb-0">
                                {values.campaignMessage}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {values.targetAudienceOption === "mysogidb" && (
                      <>
                        <hr />
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
                          <div className="form-row mg-t-15">
                            <div className="col-md-3 form-group">
                              <label className="tx-14 tx-gray mb-0 tx-medium d-block">
                                Age Range
                              </label>
                              <div className="d-flex">
                                <span className="badge badge-pink tx-14 mg-5">
                                  {" "}
                                  {filterOptions.ageRange}{" "}
                                  {filterOptions.ageRange === "" ? "" : "years"}
                                </span>
                              </div>
                            </div>
                            <div className="col-md-1 form-group">
                              <label
                                htmlFor
                                className="tx-14 tx-gray mb-0 tx-medium d-block"
                              >
                                Gender
                              </label>
                              <span className="badge badge-pink tx-14 mg-5">
                                {" "}
                                {(filterOptions.gender === "B" && "Both") ||
                                  (filterOptions.gender === "M" && "Male") ||
                                  (filterOptions.gender === "F" && "Female")}
                              </span>
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor
                              className="tx-14 tx-gray mb-0 tx-medium d-block"
                            >
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
                            <label className="tx-14 tx-gray mb-0 tx-medium d-block mt-3">
                              Money Spent
                            </label>
                            <span className="badge badge-pink tx-14 mg-5">
                              {" "}
                              {(filterOptions.revenueBand === "BELOW 5K" &&
                                "Moderate") ||
                                (filterOptions.revenueBand ===
                                  "BTW 5K AND 10K" &&
                                  "Medium High") ||
                                (filterOptions.revenueBand === "ABOVE 10K" &&
                                  "High End")}
                            </span>
                          </div>
                          {/* <div className="col-md-3 form-group">
                            
                          </div> */}
                          {/* <div className="form-group">
                            <label
                              htmlFor
                              className="tx-14 tx-gray mb-0 tx-medium d-block"
                            >
                              Interest
                            </label>
                            <span className="badge badge-pink tx-14 mg-5">
                              {" "}
                              Surfing Net
                            </span>
                          </div> */}
                        </div>
                      </>
                    )}
                    <hr />
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
                      <div className="form-group">
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="recurrent"
                            name="scheduleRadio"
                            className="custom-control-input"
                            checked={values.scheduleOption === "recurrent"}
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
                            <label className="mb-1">Date Range:</label>
                            <div className="input-group mg-b-0">
                              <div className="input-group-prepend">
                                <span className="input-group-text">From</span>
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
                          {/* <div className="form-group col-md-6 mb-0">
                            <label className="mb-1" htmlFor="schedule-time">
                              Time
                            </label>
                            <div className="input-group mg-b-10">
                              <div className="input-group-prepend">
                                <span className="input-group-text">Time</span>
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
                        <div className="form-row col-md-6">
                          <div className="form-group col-md-6 mg-b-0">
                            <label className="mb-1">Set a Date / Time</label>
                            <div className="input-group mg-b-0">
                              <div className="input-group-prepend">
                                <span className="input-group-text">Date</span>
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
                                <span className="input-group-text">Time</span>
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
                          {/* <div className="form-group col-md-6 mb-0">
                            <label className="mb-1" htmlFor="schedule-time">
                              Time
                            </label>
                            <div className="input-group mg-b-10 mg-t-5">
                              <div className="input-group-prepend">
                                <span className="input-group-text">Time</span>
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
                    </div>
                    <hr />
                    {values.targetAudienceOption === "mysogidb" && (
                      <div className="mg-b-20 mg-md-b-10">
                        <p className="tx-18 tx-com tx-semibold mb-0">Pricing</p>
                        <div className="form-group mg-t-15">
                          <label
                            htmlFor
                            className="tx-14 tx-gray mb-0 tx-medium"
                          >
                            Potential Audience Based on filter
                          </label>
                          <p className="tx-18 tx-com tx-bold mb-1">
                            {filteredContactList
                              ? filteredContactList.count
                              : 0}
                          </p>
                        </div>
                        <div className="form-row mg-t-15">
                          <div className="form-group col-md-4">
                            <input
                              type="number"
                              onChange={handleChange("limit")}
                              value={values.limit}
                              className="form-control"
                              placeholder="Enter your target audience number to get price"
                            />
                          </div>
                          <div className="form-group">
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
                    {values.targetAudienceOption !== "mysogidb" && (
                      <div className="mg-b-20 mg-md-b-10">
                        <p className="tx-18 tx-com tx-semibold mb-0">Pricing</p>
                        <div className="form-group mg-t-15">
                          <label
                            htmlFor
                            className="tx-14 tx-gray mb-1 tx-medium"
                          >
                            Potential Audience Based on Manual Input
                          </label>
                          <p className="tx-18 tx-com tx-bold mb-0">
                            {audience}{" "}
                            <span className="tx-14 tx-gray tx-medium">
                              number(s) loaded
                            </span>
                          </p>
                        </div>
                        <div className="form-row mg-t-15 pd-x-0">
                          <div className=" col-md-2 d-flex align-items-center">
                            <p className="tx-18 tx-com tx-bold mb-0">Amount:</p>{" "}
                            <NumberFormat
                              className="badge tx-green tx-bold tx-18 tx-amt w-100 mt-0"
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
                        {parseInt(wallet.balance) < values.price ||
                        (values.targetAudienceOption === "mysogidb" &&
                          parseInt(wallet.balance) < setPrice() &&
                          parseInt(wallet.balance) <
                            filteredContactList.count) ? (
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
                            onClick={submitSmsCampaignHandler}
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
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default PreviewCampaign;
