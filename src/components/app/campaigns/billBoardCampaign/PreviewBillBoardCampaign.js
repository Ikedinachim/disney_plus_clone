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
                  <div className="col-xl-11 mx-auto mg-b-20">
                    <div className="row justify-content-between">
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
                          <th scope="col">Start Date</th>
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
                            <td>{values.startDate}</td>
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
                              srcSet
                            />
                            <p className="tx-26 tx-com tx-bold">Please Note</p>
                            <p className="tx-16 mb-0">
                              Your campaign is been vetted by AMCON and will be
                              published within 24 hours
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
