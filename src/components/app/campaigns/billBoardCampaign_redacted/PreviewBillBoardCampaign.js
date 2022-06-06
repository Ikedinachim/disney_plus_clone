import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
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
import PreviewIcon from "../../../../assets/img/Promote_Offers.svg";

const PreviewBillBoardCampaign = ({
  nextStep,
  prevStep,
  values,
  billBoardPrice,
  handleCost,
}) => {
  const { error, createBillBoardCampaign, loading } = useSelector(
    (state) => state.billBoardCampaign || []
  );
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

  useEffect(() => {
    if (
      createBillBoardCampaign &&
      createBillBoardCampaign.status === "success"
    ) {
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

  const submitInfluencerCampaignHandler = (e) => {
    e.preventDefault();

    dispatch(createBillBoardCampaignAction(values));
  };

  const setScheduleDate = (initialDate, endDate) => {
    let day1 = new Date(initialDate);
    let day2 = new Date(endDate);

    const difference = Math.abs(day2 - day1);
    const days = difference / (1000 * 3600 * 24) + 1;

    if (days < 1 || !days) {
      return 1;
    } else {
      return days;
    }
  };

  const setPrice = () => {
    return billBoardPrice * setScheduleDate(values.startDate, values.endDate);
  };

  useEffect(() => {
    handleCost(setPrice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {loading ? (
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
                <div className="align-items-start row justify-content-between">
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
                                Billboard Campaign
                              </p>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="mg-b-20 mg-md-b-10">
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="tx-18 mb-0 tx-bold tx-com">
                                Billboard Duration
                              </p>
                            </div>
                          </div>
                          <div className="row mg-t-15">
                            <div className="col-md-6 form-group">
                              <label className="tx-14 tx-gray mb-0 tx-medium d-block">
                                Location:
                              </label>
                              <span className="tx-left text-wrap badge badge-pink tx-14 mg-0">
                                {" "}
                                {/* {filterOptions.state} */}
                              </span>
                              <label className="tx-14 tx-gray mb-0 tx-medium d-block mt-3">
                                Size:
                              </label>
                              <span className="tx-left text-wrap badge badge-pink tx-14 mg-0">
                                {" "}
                                {/* {filterOptions.lga} */}
                              </span>
                            </div>
                            <div className="col-md-6 form-group">
                              <label className="tx-14 tx-gray mb-0 tx-medium d-block">
                                Start Date:
                              </label>
                              <span className="tx-left text-wrap badge badge-pink tx-14 mg-0">
                                {" "}
                                {values.startDate}
                              </span>
                              <label className="tx-14 tx-gray mb-0 tx-medium d-block mt-3">
                                End Date:
                              </label>
                              <span className="tx-left text-wrap badge badge-pink tx-14 mg-0">
                                {" "}
                                {values.endDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <hr />
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
                              {/* {audience}{" "} */}
                              <span className="tx-14 tx-gray tx-medium">
                                number(s) loaded
                              </span>
                            </p>
                          </div>
                          <div className="form-row mg-t-15 pd-x-0">
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
                        <div className="col-md-5 pd-x-0 mg-y-40">
                          <div className="mg-t-20 d-flex">
                            {parseInt(wallet?.balance) < values.cost ? (
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
                                onClick={submitInfluencerCampaignHandler}
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
                  <div className="position-sticky t-0 col-md-5 col-12 mg-t-20">
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
                          </div>
                        ) : (
                          <>
                            <div className="mg-b-10">
                              <MediaPlayer url={values.attachment} />
                            </div>
                          </>
                        )}
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
