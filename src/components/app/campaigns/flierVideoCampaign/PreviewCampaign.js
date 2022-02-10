import React, { Fragment, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import MetaData from "../../../layout/MetaData";
import NumberFormat from "react-number-format";

import { getWallet } from "../../../../actions/billingActions";
import {
  createFlierVideoCampaignAction,
  clearErrors,
} from "../../../../actions/campaignActions";
import { VIDEO_FLIER_CAMPAIGN_RESET } from "../../../../constants/campaignConstants";
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
}) => {
  const { error, createFlierVideoCampaign, loading } = useSelector(
    (state) => state.flierVideoCampaign || []
  );
  const { filteredContactList, fcError, fcLoading } = useSelector(
    (state) => state.filteredContactList || []
  );
  const alert = useAlert();
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

  const submitFlierVideoCampaignHandler = (e) => {
    e.preventDefault();

    dispatch(createFlierVideoCampaignAction(values));
  };

  const setPrice = () => {
    if (values.limit !== "") {
      return parseInt(values.limit) * 5;
    } else {
      return filteredContactList.count * 5;
    }
  };

  useEffect(() => {
    if (
      createFlierVideoCampaign &&
      createFlierVideoCampaign.status === "success"
    ) {
      alert.success(createFlierVideoCampaign.message);
      dispatch(getWallet());
      navigate("/app/campaigns");
      dispatch({ type: VIDEO_FLIER_CAMPAIGN_RESET });
    } else if (error) {
      alert.error(error);
      dispatch(clearErrors());
      // dispatch(getWallet());
    }
  }, [dispatch, alert, error, createFlierVideoCampaign, navigate]);

  // console.log(csvArray);

  //Edit functionality
  const [show, setShow] = useState(false);

  const [val, setVal] = useState({
    campaignMessage: values.campaignMessage,
    callToAction: values.callToAction,
    ussd: values.ussd,
    phoneNumber: values.phoneNumber,
    whatsAppNumber: values.whatsAppNumber,
    smsNumber: values.smsNumber,
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
    values.ussd = val.ussd;
    values.phoneNumber = val.phoneNumber;
    values.whatsAppNumber = val.whatsAppNumber;
    values.smsNumber = val.smsNumber;
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
                                {view === false ? (
                                  values.channel
                                ) : (
                                  <Fragment>
                                    <select
                                      name="channels"
                                      onClick={handleChanlChange}
                                    >
                                      <option value="smart_sms">
                                        smart_sms
                                      </option>
                                      <option value="display_ads">
                                        display_ads
                                      </option>
                                    </select>
                                    <button
                                      className="btn btn-primary"
                                      onClick={handleCampaignChannelSub}
                                    >
                                      save
                                    </button>
                                  </Fragment>
                                )}
                              </p>
                            </div>
                          </div>
                          <div>
                            <div
                              className="d-flex pd-t-25 clickable"
                              onClick={viewButton}
                            >
                              <div>
                                <i className="fa fa-edit tx-primary mg-r-5" />
                              </div>
                              <p className="mb-0">Edit</p>
                            </div>
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
                            <div>
                              <div
                                className="d-flex pd-t-3 clickable"
                                onClick={showButton}
                              >
                                <div>
                                  <i className="fa fa-edit tx-primary mg-r-5" />
                                </div>
                                <p className="mb-0">Edit</p>
                              </div>
                            </div>
                          </div>
                          <div className="row mg-t-15">
                            <div className="form-group col-md-6">
                              <label
                                htmlFor
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                USSD Code
                              </label>
                              <p className="tx-16 mb-0">
                                *
                                {show === false ? (
                                  values.ussd
                                ) : (
                                  <Fragment>
                                    <input
                                      type="text"
                                      name="ussd"
                                      value={val.ussd}
                                      className="p-1"
                                      onChange={handleEdit}
                                    />{" "}
                                  </Fragment>
                                )}
                                #
                              </p>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                htmlFor
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                Phone Call
                              </label>
                              <p className="tx-16 mb-0">
                                {show === false ? (
                                  values.phoneNumber
                                ) : (
                                  <Fragment>
                                    <input
                                      type="text"
                                      name="phoneNumber"
                                      value={val.phoneNumber}
                                      className="p-1"
                                      onChange={handleEdit}
                                    />{" "}
                                  </Fragment>
                                )}
                              </p>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                htmlFor
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                WhatsApp Number
                              </label>
                              <p className="tx-16 mb-0">
                                {show === false ? (
                                  values.whatsAppNumber
                                ) : (
                                  <Fragment>
                                    <input
                                      type="text"
                                      name="whatsAppNumber"
                                      value={val.whatsAppNumber}
                                      className="p-1"
                                      onChange={handleEdit}
                                    />{" "}
                                  </Fragment>
                                )}
                              </p>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                htmlFor
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                SMS Number
                              </label>
                              <p className="tx-16 mb-0">
                                {show === false ? (
                                  values.smsNumber
                                ) : (
                                  <Fragment>
                                    <input
                                      type="text"
                                      name="smsNumber"
                                      value={val.smsNumber}
                                      className="p-1"
                                      onChange={handleEdit}
                                    />{" "}
                                  </Fragment>
                                )}
                              </p>
                            </div>
                            <div className="form-group col-md-12">
                              <label
                                htmlFor
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                Campaign Message
                              </label>
                              <p className="tx-15 mb-0">
                                {show === false ? (
                                  values.campaignMessage
                                ) : (
                                  <Fragment>
                                    <input
                                      type="text"
                                      name="campaignMessage"
                                      value={val.campaignMessage}
                                      className="p-1"
                                      onChange={handleEdit}
                                    />{" "}
                                  </Fragment>
                                )}
                              </p>
                            </div>
                            {show === false ? null : (
                              <div className="form-group col-md-6">
                                <button
                                  className="btn btn-primary"
                                  onClick={handleSubmit}
                                >
                                  save
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <hr />
                        {values.targetAudienceOption === "mysogidb" && (
                          <>
                            <div className="mg-b-20 mg-md-b-10">
                              <div className="d-flex justify-content-between">
                                <div>
                                  <p className="tx-18 mb-0 tx-bold tx-com">
                                    Target Audience
                                  </p>
                                </div>
                                <div>
                                  <div className="d-flex pd-t-3">
                                    <div>
                                      <i className="fa fa-edit tx-primary mg-r-5" />
                                    </div>
                                    <p className="mb-0">Edit</p>
                                  </div>
                                </div>
                              </div>
                              <div className="row mg-t-15">
                                <div className="col-md-3 form-group">
                                  <label
                                    htmlFor
                                    className="tx-14 tx-gray mb-0 tx-medium d-block"
                                  >
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
                                <div className="form-group">
                                  <label
                                    htmlFor
                                    className="tx-14 tx-gray mb-0 tx-medium d-block"
                                  >
                                    Location
                                  </label>
                                  <div className="d-flex">
                                    <span className="badge badge-pink tx-14 mg-5">
                                      {" "}
                                      {filterOptions.state}
                                    </span>
                                    <span className="badge badge-pink tx-14 mg-5">
                                      {" "}
                                      {filterOptions.lga}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-md-3 form-group">
                                  <label
                                    htmlFor
                                    className="tx-14 tx-gray mb-0 tx-medium d-block"
                                  >
                                    ARPU Brand
                                  </label>
                                  <span className="badge badge-pink tx-14 mg-5">
                                    {" "}
                                    0-1000
                                  </span>
                                </div>
                                <div className="col-md-6 form-group">
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
                                </div>
                              </div>
                            </div>
                            <hr />
                          </>
                        )}
                        {values.targetAudienceOption === "mysogidb" && (
                          <div className="mg-b-20 mg-md-b-10">
                            <p className="tx-18 tx-com tx-semibold mb-0">
                              Pricing
                            </p>
                            <div className="form-group mg-t-15">
                              <label
                                htmlFor
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
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
                                {/* <div className="form-group col-md-3">
                                    <p className="tx-18 tx-com tx-bold mb-0">{audience}</p>
                                    <span className="badge badge-pink  tx-18 mg-5 tx-amt w-100 mt-0">
                                        {" "}
                                        <NumberFormat value={values.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
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
                                    className="badge tx-green tx-bold tx-18 mg-5 tx-amt w-100 mt-0"
                                    value={parseInt(price)}
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
                              <label
                                htmlFor
                                className="tx-14 tx-gray mb-1 tx-medium"
                              >
                                Potential Reach Based on Budget
                              </label>
                              <p className="tx-18 tx-com tx-bold mb-0">
                                {audience}{" "}
                                <span className="tx-14 tx-gray tx-medium">
                                  Total Reach
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
                              <div className=" col-md-2 d-flex">
                                <p className="tx-18 tx-com tx-bold mb-0">
                                  Budget:
                                </p>{" "}
                                <NumberFormat
                                  className="badge tx-green tx-bold tx-18 mg-5 tx-amt w-100 mt-0"
                                  value={parseInt(price)}
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
                            parseInt(wallet.balance) <
                              filteredContactList.count ? (
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
                                onClick={submitFlierVideoCampaignHandler}
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
                              {values.callToAction} USSD
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

export default PreviewCampaign;
