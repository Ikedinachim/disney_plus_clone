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
import useAnalyticsEventTracker from "../../../../_helpers/GoogleAnalytics/GoogleAnalytics";
import billboard from "../../../../assets/img/bgBillboard.png";
import billboardPortrait from "../../../../assets/img/bgPortrait.png";

const PreviewBillBoardCampaign = ({
  nextStep,
  prevStep,
  values,
  audience,
  attachment,
  checkedInfluencers,
  price,
  handlePrice,
  orientation,
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
  const [campaignDays, setCampaignDays] = useState(1);
  const [payload, setPayload] = useState({});
  const gaEventTracker = useAnalyticsEventTracker("Billboard Campaign");

  // console.log("payload", payload);

  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  const setScheduleDate = (initialDate, endDate) => {
    let day1 = new Date(initialDate);
    let day2 = new Date(endDate);

    const difference = Math.abs(day2 - day1);
    const days = difference / (1000 * 3600 * 24);
    setCampaignDays(days);

    if (values.campaignDuration !== "Daily" || days < 1 || !days) {
      return 1;
    } else if (values.campaignDuration === "Daily") {
      return days;
    }
  };

  useEffect(() => {
    if (createBillBoardCampaign && createBillBoardCampaign.success === true) {
      gaEventTracker("Billboard Campaign", "User created billboard campaign");
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

  useEffect(() => {
    let allTotals = filteredValue.map((el) => {
      return getTotal(el);
    });
    // console.log("this is all todal", allTotals);
    const total = allTotals.reduce((acc, curr) => acc + curr, 0);
    // console.log(total);
    setTotal(total * setScheduleDate(values.startDate, values.endDate));
    handlePrice(walletTotal);

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
      endDate: values.endDate,
      attachment: values.attachment,
      assetType: values.assetType,
      billboards: filteredValue[0],
    };
    setPayload(payload);
    // console.log(payload);
  }, [filteredValue, walletTotal]);

  // console.log("filteredValue", filteredValue);

  const submitInfluencerCampaignHandler = (e) => {
    e.preventDefault();

    dispatch(createBillBoardCampaignAction(payload));
  };

  const getTotal = (p) => {
    let total;
    total = p.reduce(
      (accumulator, current) => accumulator + parseInt(current.cost),
      0
    );

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

  // console.log(orientation);

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
                  <p className="tx-18 mb-2 tx-bold tx-com">Preview</p>
                  <div className=" mg-b-20">
                    {orientation === "portrait" || orientation === "even" ? (
                      <div
                        className="w-100"
                        style={{
                          position: "relative",
                          // backgroundColor: "red",
                          paddingTop: "45%",
                        }}
                      >
                        <img
                          src={billboardPortrait}
                          alt="billboard-img"
                          style={{
                            position: "absolute",
                            left: "33%",
                            top: "0",
                            width: "35%",
                            height: "100%",
                          }}
                        />
                        <div
                          className="justify-content-between"
                          style={{
                            position: "absolute",
                            /* padding-top: 50%; */
                            top: "5.5%",
                            left: "34%",
                            height: "85%",
                            // backgroundColor: "green",
                            right: "33%",
                          }}
                        >
                          <div className="col-md-12 pd-0 mg-0 h-100">
                            {values.assetType === "image" ? (
                              <div className="h-100 w-100 justify-content-center align-items-center">
                                <img
                                  src={values.attachment}
                                  className="img-fluid img-fit-cover"
                                  alt="logo"
                                />
                              </div>
                            ) : (
                              <div className="h-100">
                                <MediaPlayer url={attachment} height={"100%"} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-100"
                        style={{
                          position: "relative",
                          // backgroundColor: "red",
                          paddingTop: "45%",
                        }}
                      >
                        <img
                          src={billboard}
                          alt="billboard-img"
                          style={{
                            position: "absolute",
                            left: "0",
                            top: "0",
                            width: "100%",
                          }}
                        />
                        <div
                          className="justify-content-between"
                          style={{
                            position: "absolute",
                            /* padding-top: 50%; */
                            top: "5%",
                            left: "2%",
                            height: "89.3%",
                            // backgroundColor: "green",
                            right: "2%",
                          }}
                        >
                          <div className="col-md-12 pd-0 mg-0 h-100">
                            {values.assetType === "image" ? (
                              <div className="h-100 w-100 justify-content-center align-items-center">
                                <img
                                  src={values.attachment}
                                  className="img-fluid img-fit-cover"
                                  alt="logo"
                                />
                              </div>
                            ) : (
                              <div className="h-100">
                                <MediaPlayer url={attachment} height={"100%"} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="table-responsive mg-t-40">
                    <table className="table inf-table" id="campaig">
                      <thead className="tx-uppercase tx-medium">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Location</th>
                          <th scope="col">Size</th>
                          <th scope="col">Duration</th>
                          <th scope="col">Start Date</th>
                          {values.campaignDuration === "Daily" && (
                            <th scope="col">End Date</th>
                          )}
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
                        {filteredValue[0]?.map((platform, id) => (
                          <tr key={id}>
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
                            <td>
                              {platform.rateType +
                                (values.campaignDuration === "Daily"
                                  ? ` - ${campaignDays} day(s)`
                                  : "")}
                            </td>
                            <td>{values.startDate}</td>
                            {values.campaignDuration === "Daily" && (
                              <td>
                                {values.endDate !== "" ? values.endDate : " - "}
                              </td>
                            )}
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
                            {values.campaignDuration === "Daily" && (
                              <p className="tx-bold mb-0 tx-right">
                                cost x {campaignDays} day(s)
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 pd-x-0 mg-y-40">
                    <div className="d-flex">
                      <button
                        className="btn btn-outline-primary pd-x-30 mg-r-15"
                        onClick={Previous}
                        disabled={loading ? true : false}
                        type="submit"
                        variant="contained"
                      >
                        Go Back
                      </button>
                      {parseInt(wallet && wallet.balance) < walletTotal ? (
                        <button
                          className="btn btn-primary pd-x-40 tx-com"
                          onClick={Continue}
                          disabled={loading ? true : false}
                          type="submit"
                          variant="contained"
                        >
                          Fund Wallet
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary pd-x-40 tx-com"
                          type="button"
                          data-toggle="modal"
                          data-target="#successModal"
                          data-dismiss="modal"
                        >
                          Proceed
                        </button>
                      )}
                    </div>
                  </div>
                  {/*Success  Modal */}
                  <div
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
                              src="../../assets/img/my4.svg"
                              className="img-fluid wd-100 ht-100"
                              alt=""
                              // srcSet
                            />
                            <p className="tx-26 tx-com tx-bold">Please Note</p>
                            <p className="tx-16 mb-0">
                              Your campaign is being vetted by AMCON and will be
                              published within 48 hours
                            </p>
                          </div>
                        </div>
                        <div className="tx-center bd-t-0 pd-b-30">
                          <button
                            type="button"
                            value="submit"
                            form="senderIdForm"
                            className="btn btn-primary w-50"
                            data-dismiss="modal"
                            onClick={submitInfluencerCampaignHandler}
                            disabled={loading ? true : false}
                            variant="contained"
                          >
                            Publish
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

export default PreviewBillBoardCampaign;
