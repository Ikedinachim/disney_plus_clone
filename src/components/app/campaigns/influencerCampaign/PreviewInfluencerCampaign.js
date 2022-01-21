import React, { Fragment, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import MetaData from "../../../layout/MetaData";
import NumberFormat from "react-number-format";

import { getWallet } from "../../../../actions/billingActions";
import {
  createInfluencerCampaignAction,
  clearErrors,
} from "../../../../actions/campaignActions";
import { INFLUENCER_CAMPAIGN_RESET } from "../../../../constants/campaignConstants";
import Loader from "../../../loader";

import PreviewIcon from "../../../../assets/img/Promote_Offers.svg";

const PreviewInfluencerCampaign = ({
  nextStep,
  prevStep,
  values,
  audience,
  attachmentPreview,
  checkedInfluencers,
  price,
  handlePrice,
  // payload,
}) => {
  const { error, createInfluencerCampaign, loading } = useSelector(
    (state) => state.influencerCampaign || []
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wallet } = useSelector((state) => state.wallet);
  const [walletTotal, setTotal] = useState(0);
  const [payload, setPayload] = useState({});

  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  // console.log("This is the original payload", payload);
  // // const p = Object.values(values.platform);
  // let c = Object.assign({}, values);
  // let b = JSON.parse(JSON.stringify(values.platform));
  // c.platform = Object.assign({}, b);
  // const p = Object.values(c.platform);
  // console.log(p);
  // p.forEach((y) => {
  //   const platform = y.platforms;
  //   y["influencer_id"] = y.id;
  //   const x = y.platforms.map((i) => i.name);
  //   y["platform"] = x.join(", ");
  //   y["allPlatform"] = y.allPlatform;
  //   // platform.forEach((item) => {
  //   //   ["id", "imagePath", "platforms"].forEach((e) => delete item[e]);
  //   // });
  //   p["platform"] = platform;
  //   delete y["imagePath"];
  //   delete y["name"];
  //   delete y["id"];
  //   delete y["platforms"];
  // });
  // // delete p.[("id", "imagePath", "platforms")];
  // console.log(p);

  // // p.forEach((item) => {
  // //   ["id", "imagePath", "platforms"].forEach((e) => delete item[e]);
  // // });
  // // delete values["checkedInfluencers"];
  // console.log(p);

  // c["platform"] = Object.values(p);

  // console.log("this is values", values);
  // console.log("this is c", c);

  useEffect(() => {
    if (
      createInfluencerCampaign &&
      createInfluencerCampaign.status === "success"
    ) {
      alert.success(createInfluencerCampaign.message);
      dispatch(getWallet());
      navigate("/app/campaigns");
      dispatch({ type: INFLUENCER_CAMPAIGN_RESET });
    } else if (error) {
      alert.error(error);
      dispatch(clearErrors());
      dispatch(getWallet());
    }
  }, [dispatch, alert, error, createInfluencerCampaign, navigate]);

  const filteredValue = checkedInfluencers;

  // const total = filteredValue.reduce(
  //   (accumulator, platform, currentIndex, array) => {
  //     accumulator = accumulator + platform.cost;
  //     return accumulator;
  //   },
  //   0
  // );

  // console.log(filteredValue); // 1000

  useEffect(() => {
    let allTotals = filteredValue.map((el) => {
      return getTotal(el);
    });
    // console.log("this is all todal", allTotals);
    const total = allTotals.reduce((acc, curr) => acc + curr, 0);
    // console.log(total);
    setTotal(total);
    handlePrice(total);

    let platforms = filteredValue.map((el) => {
      return {
        influencer_id: el.id,
        cost: getTotal(el),
        platform: el.platforms.map((ele) => ele.id).join(", "),
        allPlatform:
          el.platforms.findIndex((el) => el.id === "all") !== -1 ? true : false,
      };
    });

    const payload = {
      twitterHandle: values.twitterHandle,
      facebookHandle: values.facebookHandle,
      instagramHandle: values.instagramHandle,
      snapchatHandle: values.snapchatHandle,
      campaignMessage: values.campaignMessage,
      campaignType: values.campaignType,
      attachment: values.attachment,
      platform: platforms,
    };
    setPayload(payload);
    // console.log(payload);
  }, [filteredValue, payload]);

  const submitInfluencerCampaignHandler = (e) => {
    e.preventDefault();

    dispatch(createInfluencerCampaignAction(payload));
  };

  const getTotal = (p) => {
    // console.log(p.platforms);
    let allIndex = p.platforms.findIndex((el) => el.id === "all");
    let total;
    if (allIndex !== -1) {
      total = parseInt(p.platforms[allIndex].cost);
    } else {
      total = p.platforms.reduce(
        (accumulator, current) => accumulator + parseInt(current.cost),
        0
      );
    }

    return total;
  };

  // var totalAmount = 0;
  // for (let i = 0; i < filteredValue.length; i++) {
  //   let eachTotal = filteredValue[i].platforms;
  //   console.log(eachTotal);
  //   let b = eachTotal.reduce((total, current) => {
  //     total += +parseInt(current.cost);
  //     return total;
  //   }, 0);
  //   console.log(b);

  //   totalAmount += b;
  // }

  // console.log(values.price);

  // const getTotalAmount = filteredValue.platform.reduce(
  //   (accumulator, current) => accumulator + current.cost,
  //   0
  // );

  // const sumTotal = (arr) =>
  //   arr.reduce((sum, { cost }) => sum + parseInt(cost), 0);

  // const total = sumTotal(filteredValue[1].platforms);

  // console.log(getTotalAmount);

  // console.log(filteredValue.map((p) => getTotal(p)));

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Preview Campaign"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <p className="tx-24 tx-bold tx-com">Selection Preview</p>
              <div className="card bd-0 rounded shadow-sm">
                <div className="card-body pd-md-x-30">
                  <div className="col-xl-11 mx-auto">
                    <div className="row justify-content-between">
                      <div className="col-md-8">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="tx-18 mb-0 tx-bold tx-com">
                              Campaign Preview
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
                          <div className="form-group col-md-3">
                            <label
                              htmlFor
                              className="tx-14 tx-gray mb-0 tx-medium"
                            >
                              Instagram
                            </label>
                            <p className="tx-14 mb-0">
                              {values.instagramHandle}
                            </p>
                          </div>
                          <div className="form-group col-md-3">
                            <label
                              htmlFor
                              className="tx-14 tx-gray mb-0 tx-medium"
                            >
                              Twitter
                            </label>
                            <p className="tx-14 mb-0">{values.twitterHandle}</p>
                          </div>
                          <div className="form-group col-md-6">
                            <label
                              htmlFor
                              className="tx-14 tx-gray mb-0 tx-medium"
                            >
                              Campaign Message
                            </label>
                            <p className="tx-14 mb-0">
                              {values.campaignMessage}
                            </p>
                          </div>
                          <div className="form-group col-md-3">
                            <label
                              htmlFor
                              className="tx-14 tx-gray mb-0 tx-medium"
                            >
                              Facebook
                            </label>
                            <p className="tx-14 mb-0">
                              {values.facebookHandle}
                            </p>
                          </div>
                          <div className="form-group col-md-3">
                            <label
                              htmlFor
                              className="tx-14 tx-gray mb-0 tx-medium"
                            >
                              Snapchat
                            </label>
                            <p className="tx-14 mb-0">
                              {values.snapchatHandle}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <p className="tx-18 mb-0 tx-bold tx-com">Preview</p>
                        <div>
                          <img
                            src={attachmentPreview}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table inf-table" id="campaig">
                      <thead className="tx-uppercase tx-medium">
                        <tr>
                          <th scope="col">Influencer</th>
                          <th scope="col">Instagram</th>
                          <th scope="col">Snapchat</th>
                          <th scope="col">Twitter</th>
                          <th scope="col">Facebook</th>
                          <th scope="col">All</th>
                          <th scope="col" className="tx-right">
                            Total Amount
                          </th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {filteredValue?.map((platform) => (
                          <tr>
                            <td>
                              <div className="d-flex">
                                <div className="div">
                                  <div className="avatar avatar-sm">
                                    <img
                                      src={platform.imagePath}
                                      className="rounded-circle"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className="mg-l-10">
                                  <p className="mb-0 pd-t-5">{platform.name}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              {platform.platforms.find(
                                (p) => p.id === "instagram"
                              )?.cost || "-"}
                            </td>
                            <td>
                              {platform.platforms.find(
                                (p) => p.id === "snapchat"
                              )?.cost || "-"}
                            </td>
                            <td>
                              {platform.platforms.find(
                                (p) => p.id === "twitter"
                              )?.cost || "-"}
                            </td>
                            <td>
                              {platform.platforms.find(
                                (p) => p.id === "facebook"
                              )?.cost || "-"}
                            </td>
                            <td>
                              {platform.platforms.find((p) => p.id === "all")
                                ?.cost || "-"}
                            </td>
                            <td className="tx-right">
                              {
                                <NumberFormat
                                  value={parseInt(getTotal(platform))}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                />
                              }
                            </td>
                            {/* < */}
                            <td>
                              <div className="d-flex pd-t-3">
                                <div>
                                  <i className="fa fa-edit tx-primary mg-r-5 tx-semibold" />
                                </div>
                                <p className="mb-0">Edit</p>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="col-md-5 col-12 offset-md-7 pd-md-x-0">
                      <div className="card card-body bg-pink bd-0 rounded">
                        <div className="row">
                          <div className="col-6">
                            <p className="mb-0 tx-right">Total Amount</p>
                          </div>
                          <div className="col-6">
                            <p className="mb-0 tx-right tx-medium">
                              {
                                <NumberFormat
                                  value={parseInt(walletTotal)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                />
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer mg-t-30 bd-t-0">
                    {parseInt(wallet && wallet.balance) < walletTotal ? (
                      <button
                        className="btn btn-primary pd-x-40 tx-com mg-r-15"
                        onClick={Continue}
                        disabled={loading ? true : false}
                        type="submit"
                        variant="contained"
                      >
                        Fund Wallet
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary pd-x-40 tx-com mg-r-15"
                        onClick={submitInfluencerCampaignHandler}
                        disabled={loading ? true : false}
                        type="submit"
                        variant="contained"
                      >
                        Publish
                      </button>
                    )}
                    <button
                      className="btn btn-outline-primary pd-x-30"
                      onClick={Previous}
                      disabled={loading ? true : false}
                      type="submit"
                      variant="contained"
                    >
                      Go Back
                    </button>
                  </div>
                  {/*Assign  Modal */}
                  {/* <div
                    className="modal fade"
                    id="assignModal"
                    tabIndex={-1}
                    aria-labelledby="assignModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content pd-md-x-30 pd-x-20 pd-y-20">
                        <div className="modal-header bd-b-0">
                          <p
                            className="tx-20 tx-bold tx-com modal-title"
                            id="assignModalLabel"
                          >
                            Assign User
                          </p>
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
                          <div className="form-group">
                            <label className="d-block tx-14 tx-com">
                              Select User from:
                            </label>
                            <select id="User" className="form-control">
                              <option value />
                              <option value={1}>Basey Boss</option>
                              <option value={2}>Lanre Sheriff</option>
                              <option value={3}>Davido Wiz</option>
                            </select>
                          </div>
                        </div>
                        <div className="modal-footer bd-t-0 col-md-10">
                          <button
                            type="button"
                            className="btn btn-primary w-100"
                            data-toggle="modal"
                            data-target="#successModal"
                            data-dismiss="modal"
                          >
                            Proceed
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-primary w-100"
                            data-dismiss="modal"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/*Success  Modal */}
                  {/* <div
                    className="modal fade"
                    id="successModal"
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
                              src="./assets/img/Check.svg"
                              className="img-fluid wd-100 ht-100"
                              alt=""
                              srcSet
                            />
                            <p className="tx-26 tx-com tx-bold">Successful</p>
                            <p className="tx-16 mb-0">
                              User will be notified of the campaign creation
                              Within the hour
                            </p>
                          </div>
                        </div>
                        <div className="tx-center bd-t-0 pd-b-30">
                          <a
                            href="./campaign.html"
                            type="button"
                            className="btn btn-primary w-50"
                            data-dismiss="modal"
                          >
                            Go to Campaigns
                          </a>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default PreviewInfluencerCampaign;
