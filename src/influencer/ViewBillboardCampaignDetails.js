import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import NumberFormat from "react-number-format";
import { DateTime } from "luxon";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";

import MetaData from "../components/layout/MetaData";
import check from "../assets/img/Check.svg";
import MediaPlayer from "../_helpers/reactPlayer/ReactPlayer";
import {
  updateBillboardCampaignStatusAction,
  updateBillboardPublishStatusAction,
  clearErrors,
} from "../actions/campaignActions";
import {
  UPDATE_BILLBOARD_CAMPAIGN_STATUS_RESET,
  UPDATE_BILLBOARD_PUBLISHED_STATUS_RESET,
} from "../constants/campaignConstants";
import Loader from "../components/loader";

const ViewInfluencerCampaignDetails = () => {
  const { billboardMarketingId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { providerCampaignList } = useSelector(
    (state) => state.providerCampaignList || []
  );
  const { influencerDetails } = useSelector(
    (state) => state.influencerDetails || []
  );
  const { updateBillboardCampaignStatus, error, updateLoading } = useSelector(
    (state) => state.updateBillboardCampaignStatus || []
  );
  const { updateBillboardPublishedStatus, publishError, publishLoading } =
    useSelector((state) => state.updateBillboardCampaignPublishStatus || []);

  const [rejectInput, setRejectInput] = useState("");
  const [ammendInput, setAmmendInput] = useState("");
  const [publishInputUrl, setPublishInputUrl] = useState("");
  const [publishInputMessage, setPublishInputMessage] = useState(
    `Thank You for Advertising with us.`
  );

  const [profile, setProfile] = useState({});
  const [publishImage, setPublishImage] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isUploading, setIsUploading] = useState(null);

  const details = (arr, id) => {
    for (var i in arr) {
      if (arr[i].billBoardCampaignId === parseInt(id)) {
        return arr[i];
      }
    }
  };

  const getBase64Image = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      let width = "";
      let height = "";

      const MAX_WIDTH = 1600;
      const MAX_HEIGHT = 1600;

      const img = new Image();

      img.style.imageOrientation = "from-image";

      img.src = event.target.result;

      img.onload = () => {
        width = img.width;
        height = img.height;

        if (width / MAX_WIDTH > height / MAX_HEIGHT) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        canvas.style.imageOrientation = "from-image";
        ctx.fillStyle = "rgba(255,255,255,0.0)";
        ctx.fillRect(0, 0, 700, 600);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(img, 0, 0, width, height);

        const data = ctx.canvas.toDataURL("image/jpeg");
        callback(data);
      };
    };
    reader.onerror = function (error) {
      // console.log("Error: ", error);
    };
  };

  const onInputChange = (event) => {
    setIsUploading(true);

    for (const file of event.target.files) {
      const url = process.env.REACT_APP_CLOUDINARY_URL;

      getBase64Image(file, (base64Value) => {
        const data = {
          // upload_preset: uploadPreset,
          upload_preset: "mysogi",
          file: base64Value,
        };

        const config = {
          // onUploadProgress: function (progressEvent) {
          //   const progress = Math.round(
          //     (progressEvent.loaded * 100) / progressEvent.total
          //   );
          //   setProgress(progress);
          // },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            if (percent < 100) {
              setUploadPercentage(percent);
            }
          },
        };

        axios
          .post(url, data, config)
          .then((response) => {
            setIsUploading(false);
            setPublishImage({
              ...publishImage,
              imageUrl: response.data.url,
              selectedFileName: file.name,
              imageAlt: `An image of ${file.name}`,
            });
            setPublishInputUrl(response.data.url);
            setProfile((prevState) => ({
              ...prevState,
              imageUrl: response.data.secure_url,
            }));
            setUploadPercentage(0);
          })

          .catch((error) => {
            // console.log(error);
            setUploadPercentage(0);
            setIsUploading(false);
          });
      });
    }
  };

  const campaignDetails = details(providerCampaignList, billboardMarketingId);

  // console.log("campaignDetails", campaignDetails);

  const approvedPayload = {
    billboardId: campaignDetails && campaignDetails.billBoardId,
    campaignId: campaignDetails && campaignDetails.campaign.id,
    approvalType: "approved",
  };

  const rejectPayload = {
    billboardId: campaignDetails && campaignDetails.billBoardId,
    campaignId: campaignDetails && campaignDetails.campaign.id,
    approvalType: "rejected",
    rejectionMessage: rejectInput,
  };

  const ammendPayload = {
    billboardId: campaignDetails && campaignDetails.billBoardId,
    campaignId: campaignDetails && campaignDetails.campaign.id,
    approvalType: "ammend",
    rejectionMessage: ammendInput,
  };

  const publishPayload = {
    billboardId: campaignDetails && campaignDetails.billBoardId,
    campaignId: campaignDetails && campaignDetails.campaign.id,
    publishUrl: publishInputUrl,
    publishMessage: publishInputMessage,
  };

  const setAsset = () => {
    fetch(campaignDetails.campaign.attachment)
      .then((res) => res.blob())
      .then((blob) => saveAs(blob, "campaign_asset"));
  };

  const acceptCampaignHandler = (e) => {
    e.preventDefault();

    dispatch(updateBillboardCampaignStatusAction(approvedPayload));
  };

  const ammendCampaignHandler = (e) => {
    e.preventDefault();

    dispatch(updateBillboardCampaignStatusAction(ammendPayload));
  };

  const rejectCampaignHandler = (e) => {
    e.preventDefault();

    dispatch(updateBillboardCampaignStatusAction(rejectPayload));
  };

  const publishCampaignHandler = (e) => {
    e.preventDefault();

    dispatch(updateBillboardPublishStatusAction(publishPayload));
  };

  const loadActionButtons = () => {
    if (
      campaignDetails &&
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
          {/* <button
            className="btn btn-warning tx-com tx-white mg-r-15 pd-x-30"
            data-toggle="modal"
            data-dismiss="modal"
            data-target="#ammendModal"
          >
            Amend
          </button> */}
          <button
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
      return "";
    }
  };

  useEffect(() => {
    if (
      updateBillboardCampaignStatus &&
      updateBillboardCampaignStatus.status === "success"
    ) {
      toast.success(updateBillboardCampaignStatus.message);
      dispatch({ type: UPDATE_BILLBOARD_CAMPAIGN_STATUS_RESET });
      navigate("/billboard");
    } else if (
      updateBillboardPublishedStatus &&
      updateBillboardPublishedStatus.status === "success"
    ) {
      toast.success(updateBillboardPublishedStatus.message);
      dispatch({ type: UPDATE_BILLBOARD_PUBLISHED_STATUS_RESET });
      navigate("/billboard");
    } else if (error || publishError) {
      toast.error(error || publishError);
      dispatch(clearErrors());
    }
  }, [
    dispatch,
    error,
    publishError,
    updateBillboardCampaignStatus,
    updateBillboardPublishedStatus,
    navigate,
  ]);

  return (
    <Fragment>
      {updateLoading || publishLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Preview Campaign"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="row justify-content-between">
                <div className="col-md-6 mg-b-20 mg-md-b-0">
                  <Link to="/billboard" className="tx-black">
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
                <div className="col-md-5 col-xl-5 pd-xl-l-0 mg-b-20 bd-t-0 flex-basis-max">
                  {loadActionButtons()}
                </div>
              </div>
              <div className="card bd-0 rounded shadow-sm">
                <div className="card-body pd-md-x-30">
                  <div className="col-xl-12 pd-lg-x-30 pd-t-20">
                    <div className="row justify-content-between">
                      {campaignDetails?.campaign.assetType === "youtube" ||
                      campaignDetails?.campaign.assetType === "video" ? (
                        <>
                          <div className="col-md-8">
                            <div className="d-flex justify-content-between">
                              <p className="tx-18 mb-0 tx-bold tx-com">
                                Preview
                              </p>
                            </div>
                            <div className="ht-400 d-flex justify-content-center">
                              <MediaPlayer
                                url={campaignDetails?.campaign.attachment}
                                height={"400px"}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 bd-md-l">
                            <div className="d-flex justify-content-between">
                              <div>
                                <p className="tx-18 mb-0 tx-bold tx-com">
                                  Asset Link:
                                </p>
                              </div>
                              <button
                                className="btn"
                                onClick={
                                  () =>
                                    navigator.clipboard.writeText(
                                      campaignDetails &&
                                        campaignDetails.campaign.attachment
                                    )
                                  // alert.success("Message Copied")
                                }
                              >
                                <i className="copy-btn fa fa-copy" />
                              </button>
                            </div>
                            <div className="row mg-t-15">
                              <div className="form-group col-md-12">
                                {campaignDetails?.campaign.assetType ===
                                "youtube" ? (
                                  <label className="tx-14 mb-0 tx-medium">
                                    Youtube Url:
                                  </label>
                                ) : (
                                  <label className="tx-14 mb-0 tx-medium">
                                    Video Url:
                                  </label>
                                )}

                                <a
                                  href={campaignDetails?.campaign.attachment}
                                  className="tx-14 mb-0"
                                >
                                  {campaignDetails?.campaign.attachment}
                                </a>
                              </div>
                              {campaignDetails &&
                                campaignDetails.isApproved &&
                                campaignDetails.isPublished &&
                                !campaignDetails.isRejected && (
                                  <>
                                    <div className="form-group col-md-12">
                                      <label className="tx-14 mb-0 tx-medium">
                                        Publish Status:
                                      </label>
                                      <p className="tx-14 mb-0 tx-bold tx-success">
                                        Completed
                                      </p>
                                    </div>
                                    <div className="form-group col-md-12">
                                      <label className="tx-14 mb-0 tx-medium">
                                        Confirmation URL:
                                      </label>
                                      <br />
                                      <a
                                        href={campaignDetails?.publishedUrl}
                                        className="tx-14 mb-0"
                                      >
                                        {campaignDetails?.publishedUrl}
                                      </a>
                                    </div>
                                    <div className="form-group col-md-12">
                                      <label className="tx-14 mb-0 tx-medium">
                                        Publish Note:
                                      </label>
                                      <p className="tx-14 mb-0">
                                        {campaignDetails?.publishedMessage}
                                      </p>
                                    </div>
                                  </>
                                )}
                              {campaignDetails &&
                                !campaignDetails.isApproved &&
                                !campaignDetails.isPublished &&
                                campaignDetails.isRejected && (
                                  <>
                                    <div className="form-group col-md-12">
                                      <label className="tx-14 mb-0 tx-medium">
                                        Campaign Status:
                                      </label>
                                      <p className="tx-14 mb-0 tx-bold tx-danger">
                                        Rejected
                                      </p>
                                    </div>
                                    <div className="form-group col-md-12">
                                      <label className="tx-14 mb-0 tx-medium">
                                        Rejection Note:
                                      </label>
                                      <p className="tx-14 mb-0">
                                        {campaignDetails?.rejectReason}
                                      </p>
                                    </div>
                                  </>
                                )}
                              {campaignDetails &&
                                campaignDetails.isApproved &&
                                !campaignDetails.isPublished &&
                                !campaignDetails.isRejected && (
                                  <>
                                    <div className="form-group col-md-12">
                                      <label className="tx-14 mb-0 tx-medium">
                                        Campaign Status:
                                      </label>
                                      <p className="tx-14 mb-0 tx-bold tx-warning">
                                        Pending Confirmation
                                      </p>
                                    </div>
                                  </>
                                )}
                              {campaignDetails &&
                                !campaignDetails.isApproved &&
                                !campaignDetails.isPublished &&
                                !campaignDetails.isRejected && (
                                  <>
                                    <div className="form-group col-md-12">
                                      <label className="tx-14 mb-0 tx-medium">
                                        Campaign Status:
                                      </label>
                                      <p className="tx-14 mb-0 tx-bold tx-warning">
                                        Pending Approval
                                      </p>
                                    </div>
                                  </>
                                )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-md-8">
                            <div className="d-flex justify-content-between">
                              <p className="tx-18 mb-0 tx-bold tx-com">
                                Preview
                              </p>
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
                            <div className="ht-350 d-flex justify-content-center">
                              <img
                                src={
                                  campaignDetails &&
                                  campaignDetails.campaign.attachment
                                }
                                className="img-fluid mg-b-20 ht-100p"
                                alt=""
                              />
                            </div>
                          </div>
                          {campaignDetails &&
                            campaignDetails.isApproved &&
                            campaignDetails &&
                            campaignDetails.isPublished &&
                            !campaignDetails.isRejected && (
                              <div className="col-md-4 bd-md-l">
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <p className="tx-18 mb-0 tx-bold tx-success tx-com">
                                      Completed
                                    </p>
                                  </div>
                                </div>
                                <div className="row mg-t-15">
                                  <div className="form-group col-md-6">
                                    <label className="tx-14 tx-gray mb-0 tx-medium">
                                      Proof:
                                    </label>
                                    <p className="tx-14 mb-0">
                                      {campaignDetails?.publishedUrl}
                                    </p>
                                  </div>
                                  <button
                                    className="btn"
                                    onClick={
                                      () =>
                                        navigator.clipboard.writeText(
                                          campaignDetails?.publishedUrl
                                        )
                                      // alert.success("Message Copied")
                                    }
                                  >
                                    <i className="copy-btn fa fa-copy" />
                                  </button>
                                </div>
                                <div className="row mg-t-15">
                                  <div className="form-group col-md-6">
                                    <label className="tx-14 tx-gray mb-0 tx-medium">
                                      Publish Note:
                                    </label>
                                    <p className="tx-14 mb-0">
                                      {campaignDetails &&
                                        campaignDetails.publishedMessage}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          {campaignDetails &&
                            !campaignDetails.isApproved &&
                            !campaignDetails.isPublished &&
                            campaignDetails.isRejected && (
                              <div className="col-md-4 bd-md-l">
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <p className="tx-18 mb-0 tx-bold tx-danger tx-com">
                                      Rejected
                                    </p>
                                  </div>
                                </div>
                                <div className="row mg-t-15">
                                  <div className="form-group col-md-12">
                                    <label className="tx-14 tx-gray mb-0 tx-medium">
                                      Rejection Note:
                                    </label>
                                    <p className="tx-14 mb-0">
                                      {campaignDetails &&
                                        campaignDetails.rejectReason}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          {campaignDetails &&
                            campaignDetails.isApproved &&
                            !campaignDetails.isPublished &&
                            !campaignDetails.isRejected && (
                              <div className="col-md-4 bd-md-l">
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <p className="tx-18 mb-0 tx-com">Status:</p>
                                  </div>
                                </div>
                                <div className="row mg-t-15">
                                  <div className="form-group col-md-12">
                                    <label className="tx-14 tx-bold tx-warning  mb-0 tx-medium">
                                      Pending Confirmation
                                    </label>
                                  </div>
                                </div>
                              </div>
                            )}
                          {campaignDetails &&
                            !campaignDetails.isApproved &&
                            !campaignDetails.isPublished &&
                            !campaignDetails.isRejected && (
                              <div className="col-md-4 bd-md-l">
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <p className="tx-18 mb-0 tx-com">Status:</p>
                                  </div>
                                </div>
                                <div className="row mg-t-15">
                                  <div className="form-group col-md-12">
                                    <label className="tx-14 tx-bold tx-warning  mb-0 tx-medium">
                                      Pending Approval
                                    </label>
                                  </div>
                                </div>
                              </div>
                            )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="table-responsive mg-t-20">
                    <table className="table inf-table" id="campaig">
                      <thead className="tx-uppercase tx-medium">
                        <tr>
                          <th scope="col">Provider</th>
                          <th scope="col">Campaign ID</th>
                          <th scope="col">Created Date</th>
                          <th scope="col">Rate Type</th>
                          <th scope="col">End Date</th>
                          <th scope="col">Cost</th>
                          <th scope="col">Asset Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex">
                              <div className="div">
                                <div className="avatar avatar-sm">
                                  <img
                                    src={influencerDetails?.imagePath}
                                    className="rounded-circle"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="mg-l-10">
                                <p className="mb-0 pd-t-5">
                                  {influencerDetails?.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className>{campaignDetails?.campaign.id}</td>
                          <td className>
                            {DateTime.fromJSDate(
                              new Date(campaignDetails?.campaign.createdAt)
                            ).toFormat("dd MMM, yyyy")}
                          </td>
                          <td className>{campaignDetails?.rateType}</td>
                          <td className>
                            {campaignDetails?.endDate
                              ? DateTime.fromJSDate(
                                  new Date(campaignDetails?.endDate)
                                ).toFormat("dd MMM, yyyy")
                              : "-"}
                          </td>
                          <td className>
                            <NumberFormat
                              value={parseInt(campaignDetails?.campaign.cost)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₦"}
                            />
                          </td>
                          <td className>
                            {campaignDetails?.campaign.assetType}
                          </td>
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
                                value={parseInt(campaignDetails?.campaign.cost)}
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
                              src={campaignDetails?.campaign.attachment}
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
                    className="modal fade"
                    tabIndex={-1}
                    aria-labelledby="assignModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-smm">
                      <div className="modal-content pd-md-x-30 pd-x-20 pd-y-20">
                        <div className="modal-header bd-b-0"></div>
                        <div className="modal-body tx-center pd-x-10">
                          <div className="form-group">
                            <p className="tx-26 tx-com tx-bold">
                              Reject Campaign
                            </p>
                            <p className="tx-16 mb-10">
                              Please specify the reason for the rejection.
                            </p>
                            <textarea
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
                  {/*Ammend  Modal */}
                  <div
                    id="amendModal"
                    className="modal fade"
                    tabIndex={-1}
                    aria-labelledby="assignModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-smm">
                      <div className="modal-content pd-md-x-30 pd-x-20 pd-y-20">
                        <div className="modal-header bd-b-0"></div>
                        <div className="modal-body tx-center pd-x-10">
                          <div className="form-group">
                            <p className="tx-26 tx-com tx-bold">
                              Ammend Campaign
                            </p>
                            <p className="tx-16 mb-10">
                              Please specify the reason for the ammendment.
                            </p>
                            <textarea
                              className="form-control"
                              rows={4}
                              onChange={(e) => setAmmendInput(e.target.value)}
                              placeholder="Enter Reasons"
                              defaultValue={ammendInput}
                            />
                          </div>
                        </div>
                        <div className="tx-center modal-footer bd-t-0 pd-b-30">
                          <button
                            type="button"
                            className="btn btn-primary w-45 mg-r-20"
                            onClick={ammendCampaignHandler}
                            data-dismiss="modal"
                          >
                            Ammend
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
                    className="modal fade"
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
                            <p className="tx-26 tx-com tx-bold">
                              Billboard Published
                            </p>
                            <p className="tx-16 mb-3">
                              Please confirm that you have displayed this
                              campaign on your billboard.
                            </p>
                            <div className="custom-file">
                              <input
                                type="file"
                                name="file"
                                accept="image/png, image/jpeg, image/gif, image/jpg"
                                className="custom-file-input"
                                id="customFile"
                                onChange={onInputChange}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFile"
                              >
                                {publishImage && publishImage.selectedFileName}
                              </label>
                              {isUploading && uploadPercentage > 0 && (
                                <span className="mt-2">
                                  <ProgressBar
                                    now={uploadPercentage}
                                    label={`${uploadPercentage}%`}
                                  />
                                </span>
                              )}
                            </div>
                            <textarea
                              // name
                              className="form-control mt-4"
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
                            disabled={publishInputUrl === ""}
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
