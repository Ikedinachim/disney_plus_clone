import React, { Fragment, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

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

const PreviewCampaign = ({
  nextStep,
  prevStep,
  values,
  audience,
  filterOptions,
  handleChange,
}) => {
  const { error, createSmsCampaign, loading } = useSelector(
    (state) => state.smsCampaign || []
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

  const submitSmsCampaignHandler = (e) => {
    e.preventDefault();
    dispatch(createSmsCampaignAction(values));
  };

  const setPrice = () => {
    if (values.limit !== "") {
      return parseInt(values.limit) * 5;
    } else {
      return filteredContactList.count * 5;
    }
  };

  useEffect(() => {
    if (createSmsCampaign && createSmsCampaign.status === "success") {
      alert.success(createSmsCampaign.message);
      dispatch(getWallet());
      navigate("/app/campaigns");
      dispatch({ type: SMS_CAMPAIGN_RESET });
    } else if (error) {
      alert.error(error);
      dispatch(clearErrors());
      // dispatch(getWallet());
    }
  }, [dispatch, alert, error, createSmsCampaign, navigate]);

  //Edit buttons

  //campaign message
  const [show, setShow] = useState(false);

  const [val, setVal] = useState(values.campaignMessage);

  const handleEdit = (e) => {
    setVal(e.target.value);
  };

  const handleCampaignMessageSub = (e) => {
    e.preventDefault();
    values.campaignMessage = val;
    setShow(!show);
  };
  const showButton = (e) => {
    setShow(!show);
  };

  //campaign channel
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
                            {view === false ? (
                              values.channel
                            ) : (
                              <Fragment>
                                <select
                                  name="channels"
                                  onClick={handleChanlChange}
                                >
                                  <option value="sms">Sms</option>
                                  <option value="flash_sms">Flash_sms</option>
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
                                  value={val}
                                  className="p-1"
                                  onChange={handleEdit}
                                />{" "}
                                <button
                                  className="btn btn-primary"
                                  onClick={handleCampaignMessageSub}
                                >
                                  save
                                </button>
                              </Fragment>
                            )}
                          </p>
                        </div>
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
                              <label
                                htmlFor
                                className="tx-14 tx-gray mb-0 tx-medium d-block"
                              >
                                Age Range
                              </label>
                              <div className="d-flex">
                                <span className="badge badge-pink tx-14 mg-5">
                                  {" "}
                                  {filterOptions.ageRange} years
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
                                {filterOptions.gender}
                              </span>
                            </div>
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
                          <div className="form-group">
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
                      </>
                    )}
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
                            {filteredContactList.count}
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
                            <p className="tx-18 tx-com tx-bold mb-0">Amount:</p>{" "}
                            <NumberFormat
                              className="badge tx-green tx-bold tx-18 tx-amt w-100 mt-0"
                              value={parseInt(values.price)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₦"}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {/* <div className="mg-b-20 mg-md-b-10">
                      <p className="tx-18 tx-com tx-semibold mb-0">Pricing</p>
                      <div className="form-group mg-t-15">
                        <label htmlFor className="tx-14 tx-gray mb-1 tx-medium">
                          Potential Audience Based on Manual Input
                        </label>
                        <p className="tx-18 tx-com tx-bold mb-0">
                          {audience}
                          <span className="tx-14 tx-gray tx-medium">
                            number(s) loaded
                          </span>
                        </p>
                      </div>
                      <div className="form-row mg-t-15 pd-x-0">
                        <div className=" col-md-2 d-flex">
                          <p className="tx-18 tx-com tx-bold mb-0">Amount:</p>
                          <span className="badge tx-green tx-bold tx-18 mg-5 tx-amt w-100 mt-0">
                            {" "}
                            <NumberFormat
                              value={values.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₦"}
                            />
                          </span>
                        </div>
                      </div>
                    </div> */}
                    <div className="col-md-5 pd-x-0 mg-y-40">
                      <div className="mg-t-20 d-flex">
                        {parseInt(wallet.balance) < values.price ||
                        parseInt(wallet.balance) < filteredContactList.count ? (
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
