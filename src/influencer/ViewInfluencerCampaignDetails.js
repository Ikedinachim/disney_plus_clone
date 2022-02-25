import React, { Fragment, useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

import MetaData from "../components/layout/MetaData";
import NumberFormat from "react-number-format";

import { getWallet } from "../actions/billingActions";
import check from "../assets/img/Check.svg";
import {
  updateInfluencerCampaignStatusAction,
  updateInfluencerPublishStatusAction,
  clearErrors,
} from "../actions/campaignActions";
import {
  UPDATE_INFLUENCER_CAMPAIGN_STATUS_RESET,
  UPDATE_INFLUENCER_PUBLISHED_STATUS_RESET,
} from "../constants/campaignConstants";
import Loader from "../components/layout/Loader";

// import PreviewIcon from "../assets/img/Promote_Offers.svg";

const ViewInfluencerCampaignDetails = () => {
  const { influencerCampaignList } = useSelector(
    (state) => state.influencerCampaignList || []
  );
  const { influencerDetails } = useSelector(
    (state) => state.influencerDetails || []
  );
  const { influenceMarketingId } = useParams();
  // const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateInfluencerCampaignStatus, error, loading } = useSelector(
    (state) => state.updateInfluencerCampaignStatus || []
  );
  const { updateInfluencerPublishedStatus, publishError, publishLoading } =
    useSelector((state) => state.updateInfluencerCampaignPublishStatus || []);

  const [rejectInput, setRejectInput] = useState("");
  const [publishInputUrl, setPublishInputUrl] = useState("");
  const [publishInputMessage, setPublishInputMessage] = useState("");

  const details = (arr, id) => {
    for (var i in arr) {
      if (arr[i].marketingData.id == id) {
        return arr[i];
      }
    }
  };

  const platformCost = (arr, platform) => {
    for (var i in arr) {
      if (arr[i].platform == platform) {
        return arr[i].cost;
      }
    }
  };

  //   console.log(parseInt(platformCost(influencerDetails.costs, "twitter")));

  const campaignDetails = details(influencerCampaignList, influenceMarketingId);

  const platforms = campaignDetails.platforms.split(",");

  console.log(platforms);

  const checkPlatformCost = (p) => {
    let findIndex = platforms.findIndex((el) => el === p);
    if (findIndex !== -1) {
      let price = parseInt(platformCost(influencerDetails.costs, p));
      return (
        <NumberFormat
          value={parseInt(price)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
        />
      );
    } else if (findIndex !== -1 && influencerDetails.allPlatform) {
      let price = parseInt(influencerDetails.allCost);
      return (
        <NumberFormat
          value={parseInt(price)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
        />
      );
    } else {
      return "-";
    }
  };

  console.log(campaignDetails);

  const approvedPayload = {
    influencerId: campaignDetails && campaignDetails.influencerId,
    marketingId: campaignDetails && campaignDetails.marketingData.id,
    approvalType: "approved",
    rejectionMessage: "",
  };
  const rejectPayload = {
    influencerId: campaignDetails && campaignDetails.influencerId,
    marketingId: campaignDetails && campaignDetails.marketingData.id,
    approvalType: "rejected",
    rejectionMessage: rejectInput,
  };
  const publishPayload = {
    influencerId: campaignDetails && campaignDetails.influencerId,
    marketingId: campaignDetails && campaignDetails.marketingData.id,
    publishUrl: publishInputUrl,
    publishMessage: publishInputMessage,
  };

  const setAsset = () => {
    fetch(campaignDetails.attachment)
      .then((res) => res.blob())
      .then((blob) => saveAs(blob, "fileName"));
  };

  const acceptCampaignHandler = (e) => {
    e.preventDefault();

    dispatch(updateInfluencerCampaignStatusAction(approvedPayload));
  };

  const rejectCampaignHandler = (e) => {
    e.preventDefault();

    dispatch(updateInfluencerCampaignStatusAction(rejectPayload));
  };

  const publishCampaignHandler = (e) => {
    e.preventDefault();

    dispatch(updateInfluencerPublishStatusAction(publishPayload));
  };

  const loadActionButtons = () => {
    if (
      !campaignDetails.isApproved &&
      !campaignDetails.isPublished &&
      !campaignDetails.isRejected
    ) {
      return (
        <>
          <button
            type="button"
            onClick={acceptCampaignHandler}
            className="btn btn-primary pd-x-40 tx-com mg-r-15"
            data-toggle="modal"
            data-dismiss="modal"
          >
            Approve
          </button>
          <button
            // onclick={rejectCampaignHandler}
            className="btn btn-outline-primary pd-x-30"
            data-toggle="modal"
            data-dismiss="modal"
            data-target="#rejectModal"
          >
            Reject
          </button>
        </>
      );
    } else if (
      campaignDetails &&
      campaignDetails.isApproved &&
      !campaignDetails.isPublished &&
      !campaignDetails.isRejected
    ) {
      return (
        <>
          <button
            type="button"
            // onClick={publishCampaignHandler}
            className="btn btn-primary pd-x-40 tx-com mg-r-15"
            data-toggle="modal"
            data-dismiss="modal"
            data-target="#publishModal"
          >
            Confirm Publishing
          </button>
        </>
      );
    } else if (
      campaignDetails &&
      campaignDetails.isApproved &&
      campaignDetails &&
      campaignDetails.isPublished &&
      !campaignDetails.isRejected
    ) {
      return <p>Completed</p>;
    }
  };

  useEffect(() => {
    if (
      updateInfluencerCampaignStatus &&
      updateInfluencerCampaignStatus.status === "success"
    ) {
      toast.success(updateInfluencerCampaignStatus.message);
      dispatch({ type: UPDATE_INFLUENCER_CAMPAIGN_STATUS_RESET });
      navigate("/influencer");
    } else if (
      updateInfluencerPublishedStatus &&
      updateInfluencerPublishedStatus.status === "success"
    ) {
      toast.success(updateInfluencerPublishedStatus.message);
      dispatch({ type: UPDATE_INFLUENCER_PUBLISHED_STATUS_RESET });
      navigate("/influencer");
    } else if (error || publishError) {
      toast.error(error || publishError);
      dispatch(clearErrors());
    }
  }, [
    dispatch,
    error,
    publishError,
    updateInfluencerCampaignStatus,
    updateInfluencerPublishedStatus,
    navigate,
  ]);

  return (
    <Fragment>
      {loading || publishLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Preview Campaign"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="row justify-content-between">
                <div className="col-md-6 mg-b-20 mg-md-b-0">
                  <Link to="/influencer" className="tx-black">
                    <div className="d-flex">
                      <div>
                        <i className="fa fa-angle-left mg-r-10 pd-t-15 tx-18" />
                      </div>
                      <div>
                        <p className="tx-28 tx-bold mb-0">View Campaigns</p>
                      </div>
                    </div>
                  </Link>
                </div>
                {/* <div className="col-md-3 col-xl-2 pd-xl-l-0 mg-b-20">
                  <select className="custom-select">
                    <option selected>Actions</option>
                    <option value={1}>Accept</option>
                    <option value={2}>Reject</option>
                  </select>
                  {loadActionButtons()}
                </div> */}
                <div className="col-md-5 col-xl-5 pd-xl-l-0 mg-b-20 bd-t-0 flex-basis-max">
                  {loadActionButtons()}
                </div>
              </div>
              <div className="card bd-0 rounded shadow-sm">
                <div className="card-body pd-md-x-30">
                  <div className="col-xl-12 pd-lg-x-30 pd-t-20">
                    <div className="row justify-content-between">
                      <div className="col-md-8 bd-md-r">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="tx-18 mb-0 tx-bold tx-com">
                              Campaign
                            </p>
                          </div>
                          <button
                            className="btn"
                            onClick={
                              () =>
                                navigator.clipboard.writeText(
                                  campaignDetails &&
                                    campaignDetails.marketingData
                                      .campaignMessage
                                )
                              // alert.success("Message Copied")
                            }
                          >
                            <i className="copy-btn fa fa-copy" />
                          </button>
                        </div>
                        <div className="row mg-t-15">
                          {/* <div className="form-group col-md-3">
                            <label
                              htmlFor
                              className="tx-14 tx-gray mb-0 tx-medium"
                            >
                              Instagram
                            </label>
                            <p className="tx-14 mb-0">
                              @{campaignDetails.marketingData.instgramHandle}
                            </p>
                          </div>
                          <div className="form-group col-md-3">
                            <label
                              htmlFor
                              className="tx-14 tx-gray mb-0 tx-medium"
                            >
                              Twitter
                            </label>
                            <p className="tx-14 mb-0">
                              @{campaignDetails.marketingData.twitterHandle}
                            </p>
                          </div> */}
                          <div className="form-group col-md-6">
                            <label className="tx-14 tx-gray mb-0 tx-medium">
                              Campaign Message
                            </label>
                            <p className="tx-14 mb-0">
                              {campaignDetails &&
                                campaignDetails.marketingData.campaignMessage}
                            </p>
                          </div>
                          {/* <div className="form-group col-md-3">
                            <label className="tx-14 tx-gray mb-0 tx-medium">
                              Facebook
                            </label>
                            <p className="tx-14 mb-0">
                              @{campaignDetails.marketingData.facebookHandle}
                            </p>
                          </div>
                          <div className="form-group col-md-3">
                            <label className="tx-14 tx-gray mb-0 tx-medium">
                              Snapchat
                            </label>
                            <p className="tx-14 mb-0">
                              @{campaignDetails.marketingData.snapchatHandle}
                            </p>
                          </div> */}
                        </div>
                      </div>
                      <div className="col-md-4 pd-md-l-50">
                        <div className="d-flex justify-content-between">
                          <p className="tx-18 mb-0 tx-bold tx-com">Preview</p>
                          <button
                            className="btn tx-primary pd-x-0 pd-t-0"
                            data-toggle="modal"
                            data-target="#downloadModal"
                            data-dismiss="modal"
                          >
                            <div className="d-flex pd-t-3 justify-content-end">
                              <div>
                                <i className="fa fa-download tx-primary mg-r-5" />
                              </div>
                              <p className="mb-0 pointer">Download</p>
                            </div>
                          </button>
                        </div>
                        <div>
                          <img
                            src={
                              campaignDetails &&
                              campaignDetails.marketingData.attachment
                            }
                            className="img-fluid mg-b-20"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive mg-t-20">
                    <table className="table inf-table" id="campaig">
                      <thead className="tx-uppercase tx-medium">
                        <tr>
                          <th scope="col">Influencer</th>
                          <th scope="col">Instagram</th>
                          <th scope="col">Snapchat</th>
                          <th scope="col">Twitter</th>
                          <th scope="col">Facebook</th>
                          <th scope="col">All</th>
                          {/* <th scope="col" className="tx-right">
                            Total Amount
                          </th> */}
                          {/* <th /> */}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex">
                              <div className="div">
                                <div className="avatar avatar-sm">
                                  <img
                                    src={influencerDetails.imagePath}
                                    className="rounded-circle"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="mg-l-10">
                                <p className="mb-0 pd-t-5">
                                  {influencerDetails.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className>{checkPlatformCost("instagram")}</td>
                          <td className>{checkPlatformCost("snapchat")}</td>
                          <td className>{checkPlatformCost("twitter")}</td>
                          <td className>{checkPlatformCost("facebook")}</td>
                          <td className>{checkPlatformCost("all")}</td>
                          {/* <td>
                            <div className="d-flex pd-t-3">
                              <div>
                                <i className="fa fa-edit tx-primary mg-r-5 tx-semibold" />
                              </div>
                              <p className="mb-0">Edit</p>
                            </div>
                          </td> */}
                        </tr>
                      </tbody>
                    </table>
                    <div className="col-md-5 col-12 offset-md-7 pd-md-x-0">
                      <div className="card card-body bg-pink bd-0 rounded pd-y-10">
                        <div className="row">
                          <div className="col-6">
                            <p className="mb-0 tx-right">Total Amount</p>
                          </div>
                          <div className="col-6">
                            <p className="mb-0 tx-right tx-medium">
                              <NumberFormat
                                value={parseInt(campaignDetails.totalCost)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₦"}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="card-footer mg-t-30 bd-t-0">
                    {loadActionButtons()}
                  </div> */}
                  {/*Download  Modal */}
                  <div
                    className="modal fade"
                    id="downloadModal"
                    tabIndex={-1}
                    aria-labelledby="assignModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content pd-md-x-30 pd-x-20 pd-y-20">
                        <div className="modal-header bd-b-0">
                          <p
                            className="tx-20 tx-bold tx-com modal-title"
                            id="downloadModalLabel"
                          />
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <div>
                            <img
                              src={campaignDetails.marketingData.attachment}
                              alt="campaign asset"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                        <div className="modal-footer bd-t-0 col-md-7 mx-auto">
                          <button
                            type="button"
                            onClick={setAsset}
                            className="btn btn-primary w-100"
                            // data-dismiss="modal"
                          >
                            <i className="fa fa-download mg-r-10" />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*Reject  Modal */}
                  <div
                    id="rejectModal"
                    className="modal fadedownload"
                    tabIndex={-1}
                    aria-labelledby="assignModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-smm">
                      <div className="modal-content pd-md-x-30 pd-x-20 pd-y-20">
                        <div className="modal-header bd-b-0"></div>
                        <div className="modal-body tx-center pd-x-10">
                          <div className="form-group">
                            {/* <img
                              src="../assets/img/Check.svg"
                              className="img-fluid wd-100 ht-100"
                              alt=""
                              srcSet
                            /> */}
                            <p className="tx-26 tx-com tx-bold">
                              Reject Campaign
                            </p>
                            <p className="tx-16 mb-10">
                              Please specify the reason for the rejection.
                            </p>
                            {/* <input
                              value={input}
                              onInput={(e) => setRejectInput(e.target.value)}
                            /> */}
                            <textarea
                              name
                              className="form-control"
                              rows={4}
                              onChange={(e) => setRejectInput(e.target.value)}
                              placeholder="Enter Reasons"
                              defaultValue={rejectInput}
                            />
                          </div>
                        </div>
                        <div className="tx-center modal-footer bd-t-0 pd-b-30">
                          <button
                            type="button"
                            className="btn btn-primary w-45 mg-r-20"
                            onClick={rejectCampaignHandler}
                            data-dismiss="modal"
                          >
                            Reject
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-primary w-45"
                            data-dismiss="modal"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*Confirm Publish Modal */}
                  <div
                    id="publishModal"
                    className="modal fadedownload"
                    tabIndex={-1}
                    aria-labelledby="assignModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-smm">
                      <div className="modal-content pd-md-x-30 pd-x-20 pd-y-20">
                        <div className="modal-header bd-b-0"></div>
                        <div className="modal-body tx-center pd-x-10">
                          <div className="form-group">
                            <img
                              src={check}
                              className="img-fluid wd-100 ht-100"
                              alt=""
                            />
                            <p className="tx-26 tx-com tx-bold">Ad Published</p>
                            <p className="tx-16 mb-3">
                              Please confirm that you have posted this campaign
                              on your social media pages.
                            </p>
                            <input
                              // name
                              className="form-control mb-4"
                              rows={4}
                              onChange={(e) =>
                                setPublishInputUrl(e.target.value)
                              }
                              placeholder="Enter Url of the Published Campaign"
                              defaultValue={publishInputUrl}
                            />
                            <textarea
                              // name
                              className="form-control"
                              rows={4}
                              onChange={(e) =>
                                setPublishInputMessage(e.target.value)
                              }
                              placeholder="Optional Message For Advertiser"
                              defaultValue={publishInputMessage}
                            />
                          </div>
                        </div>
                        <div className="tx-center modal-footer bd-t-0 pd-b-30">
                          <button
                            type="button"
                            onClick={publishCampaignHandler}
                            className="btn btn-primary w-45 mg-r-20"
                            data-dismiss="modal"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-primary w-45"
                            data-dismiss="modal"
                          >
                            Dismiss
                          </button>
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

export default ViewInfluencerCampaignDetails;
