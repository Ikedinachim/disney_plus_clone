import React, { Fragment, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import MetaData from "../../../layout/MetaData";
import NumberFormat from "react-number-format";

import { getWallet } from "../../../../actions/billingActions";
import {
  createBillBoardCampaignAction,
  clearErrors,
} from "../../../../actions/campaignActions";
import { BILLBOARD_CAMPAIGN_RESET } from "../../../../constants/campaignConstants";
import Loader from "../../../loader";

import MediaPlayer from "../../../../_helpers/reactPlayer/ReactPlayer";

// import PreviewIcon from "../../../../assets/img/Promote_Offers.svg";

const PreviewBillBoardCampaign = ({
  nextStep,
  prevStep,
  values,
  audience,
  attachment,
  checkedInfluencers,
  price,
  handlePrice,
  // payload,
}) => {
  const { error, createBillBoardCampaign, loading } = useSelector(
    (state) => state.billBoardCampaign || []
  );
  const { user } = useSelector((state) => state.auth);
  // const alert = useAlert();
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
    if (createBillBoardCampaign && createBillBoardCampaign.success === true) {
      toast.success(createBillBoardCampaign.message);
      dispatch(getWallet());
      navigate("/app/campaigns");
      dispatch({ type: BILLBOARD_CAMPAIGN_RESET });
    } else if (error) {
      toast.error(error);
      dispatch(clearErrors());
      dispatch(getWallet());
    }
  }, [dispatch, error, createBillBoardCampaign, navigate]);

  const filteredValue = checkedInfluencers;

  // console.log(filteredValue);

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
        billboard_id: el.map((item) => item.billboard_id)[0],
        cost: getTotal(el),
        rateType: el.map((item) => item.rateType)[0],
      };
    });

    // console.log("platforms", platforms);

    const payload = {
      user_id: user.user.id,
      startDate: values.startDate,
      attachment: values.attachment,
      assetType: values.assetType,
      billboards: filteredValue[0],
    };
    setPayload(payload);
    // console.log(payload);
  }, [filteredValue]);

  // console.log("filteredValue", filteredValue);

  const submitInfluencerCampaignHandler = (e) => {
    e.preventDefault();

    dispatch(createBillBoardCampaignAction(payload));
  };

  const getTotal = (p) => {
    // console.log(p.platforms);
    // let allIndex = p.platforms.findIndex((el) => el.id === "all");
    let total;
    total = p.reduce(
      (accumulator, current) => accumulator + parseInt(current.cost),
      0
    );
    // if (allIndex !== -1) {
    //   total = parseInt(p.platforms[allIndex].cost);
    // } else {
    //   total = p.billboards.reduce(
    //     (accumulator, current) => accumulator + parseInt(current.cost),
    //     0
    //   );
    // }

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

  //Edit functionality
  const [show, setShow] = useState(false);

  const [val, setVal] = useState({
    instagramHandle: values.instagramHandle,
    twitterHandle: values.twitterHandle,
    facebookHandle: values.facebookHandle,
    snapchatHandle: values.snapchatHandle,
    campaignMessage: values.campaignMessage,
  });

  const handleEdit = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVal({ ...val, [name]: value });
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Preview Billboard Campaign"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <p className="tx-24 tx-bold tx-com">Selection Preview</p>
              <div className="card bd-0 rounded shadow-sm">
                <div className="card-body pd-md-x-30">
                  <div className="col-xl-11 mx-auto">
                    <div className="row justify-content-between">
                      {/* <div className="col-md-7">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="tx-18 mb-0 tx-bold tx-com">
                              Campaign Preview
                            </p>
                          </div>
                        </div>
                        <div className="row mg-t-15">
                          <div className="form-group col-md-6">
                            <label className="tx-14 tx-gray mb-0 tx-medium">
                              Campaign Message
                            </label>
                            <p className="tx-14 mb-0">
                              {show === false ? (
                                values.campaignMessage
                              ) : (
                                <Fragment>
                                  <input
                                    type="text"
                                    name="campaignMessage"
                                    value={val.campaignMessage}
                                    onChange={handleEdit}
                                  />{" "}
                                </Fragment>
                              )}
                            </p>
                          </div>
                        </div>
                      </div> */}
                      <div className="col-md-12">
                        <p className="tx-18 mb-0 tx-bold tx-com">Preview</p>
                        {values.assetType === "image" ? (
                          <div className="mg-y30 ht-300 d-flex justify-content-center">
                            <img
                              src={values.attachment}
                              className="img-fluid ht-300"
                              alt="logo"
                            />
                          </div>
                        ) : (
                          <>
                            <div>
                              <MediaPlayer url={attachment} />
                            </div>
                          </>
                        )}
                        {/* <div>
                          <img src={attachment} className="img-fluid" alt="" />
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table inf-table" id="campaig">
                      <thead className="tx-uppercase tx-medium">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Location</th>
                          <th scope="col">Size</th>
                          <th scope="col">Duration</th>
                          <th scope="col">Cost</th>
                          {/* <th scope="col">Weekly</th>
                          <th scope="col">Monthly</th> */}
                          {/* <th scope="col" className="tx-right">
                            Total Amount
                          </th> */}
                          {/* <th /> */}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredValue[0]?.map((platform) => (
                          <tr>
                            <td>
                              <div className="d-flex">
                                <div className="div">
                                  <div className="avatar avatar-sm">
                                    <img
                                      src={platform.imageUrl}
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
                            <td>{platform.location}</td>
                            <td>{platform.size}</td>
                            <td>{platform.rateType}</td>
                            <td>
                              {
                                <NumberFormat
                                  value={platform.cost}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                />
                              }
                            </td>
                            {/* <td>
                              {platform.rateType === "Weekly"
                                ? platform.cost
                                : "-"}
                            </td>
                            <td>
                              {platform.rateType === "Monthly"
                                ? platform.cost
                                : "-"}
                            </td> */}
                            {/* <td>
                              {platform.billboards.find(
                                (p) => p.rateType === "facebook"
                              )?.cost || "-"}
                            </td> */}
                            {/* <td>
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
                            </td> */}
                            {/* < */}
                            {/* <td>
                              <div className="d-flex pd-t-3">
                                <div>
                                  <i className="fa fa-edit tx-primary mg-r-5 tx-semibold" />
                                </div>
                                <p className="mb-0">Edit</p>
                              </div>
                            </td> */}
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
                  <div className="col-md-5 pd-x-0 mg-y-40">
                    <div className="d-flex">
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

export default PreviewBillBoardCampaign;
