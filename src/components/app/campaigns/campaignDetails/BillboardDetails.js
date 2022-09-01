import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../../../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
import {
  getSingleBillBoardCampaign,
  clearErrors,
} from "../../../../actions/campaignActions";
import Billboard from "../../../../assets/img/billboard.png";
import Loader from "../../../loader";

const BillboardDetails = () => {
  const { loading, error, singleBillBoardCampaign } = useSelector(
    (state) => state.singleBillBoardCampaign || {}
  );

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(getSingleBillBoardCampaign(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Billboard Campaign Details"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="row justify-content-between">
                <div className="col-md-6 mg-b-20 mg-md-b-0">
                  <Link to="../campaigns" className="tx-black">
                    <div>
                      <i className="fa fa-angle-left mg-r-10 pd-t-15 tx-18"></i>
                      <span className="tx-28 tx-bold mb-0">Campaigns</span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="card rounded bd-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex">
                    <div>
                      <img
                        src="../../assets/img/Brand_Awareness.svg"
                        className="tx-primary"
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div>
                      <p className="tx-20 tx-bold pd-t-20">
                        Billboard Campaign Details
                      </p>
                    </div>
                  </div>
                  <hr />
                  {singleBillBoardCampaign && (
                    <Fragment>
                      <div className="row justify-content-between">
                        <div className="col-md-6 col-lg-6 mg-b-20 mg-md-b-10">
                          <p className="tx-18 tx-semibold mb-0">
                            Basic Information
                          </p>
                          <div className="row mg-t-15">
                            <div className="form-group col-md-6">
                              <label
                                for=""
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                Campaign Name
                              </label>
                              <p className="tx-16 mb-0">
                                {singleBillBoardCampaign.campaignType}
                              </p>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                for=""
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                Rate Type
                              </label>
                              <p className="tx-16 mb-0 text-capitalize">
                                {singleBillBoardCampaign.rateType}
                              </p>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                for=""
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                Campaign-ID
                              </label>
                              <p className="tx-16 mb-0">
                                {singleBillBoardCampaign.id}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-5 mg-b-20 mg-md-b-10">
                          <p className="tx-18 tx-semibold mb-0">
                            Budget and Timing
                          </p>
                          <div className="row mg-t-15">
                            <div className="form-group col-md-12">
                              <label
                                for=""
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                Price
                              </label>
                              <p className="tx-16 mb-0">
                                {singleBillBoardCampaign.cost}
                              </p>
                            </div>

                            <div className="form-group col-md-6">
                              <label
                                for=""
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                From
                              </label>
                              <p className="tx-16 mb-0">
                                {DateTime.fromJSDate(
                                  new Date(singleBillBoardCampaign.createdAt)
                                ).toFormat("dd MMM, yyyy")}
                              </p>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                for=""
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                To
                              </label>
                              <p className="tx-16 mb-0">
                                {singleBillBoardCampaign?.endDate
                                  ? DateTime.fromJSDate(
                                      new Date(singleBillBoardCampaign.endDate)
                                    ).toFormat("dd MMM, yyyy")
                                  : "-"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row justify-content-between">
                        <div className="col-md-6 col-lg-5 mg-b-20 mg-md-b-10">
                          <p className="tx-18 tx-semibold mb-0">Status</p>
                          <div className="row mg-t-15">
                            <div className="form-group col-md-6">
                              <label
                                for=""
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                Status
                              </label>
                              <p className="tx-16 mb-0">
                                {singleBillBoardCampaign.isAdminApproved
                                  ? "Published"
                                  : null ||
                                    // ||
                                    //   (!singleBillBoardCampaign.isApproved &&
                                    //     !singleBillBoardCampaign.isPublished &&
                                    //     singleBillBoardCampaign.isRejected)
                                    // ? "Rejected"
                                    // : null
                                    (!singleBillBoardCampaign.isApproved &&
                                      !singleBillBoardCampaign.isPublished &&
                                      !singleBillBoardCampaign.isRejected)
                                  ? "Pending"
                                  : null}
                              </p>
                            </div>
                            {singleBillBoardCampaign.isRejected && (
                              <div className="form-group col-md-6">
                                <label
                                  for=""
                                  className="tx-14 tx-gray mb-0 tx-medium"
                                >
                                  Rejection Reason
                                </label>
                                <p className="tx-16 mb-0">
                                  {singleBillBoardCampaign.rejectionReason}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-5 mg-b-20 mg-md-b-10">
                          {singleBillBoardCampaign.isAdminApproved && (
                            // &&
                            //   singleBillBoardCampaign.isPublished &&
                            //   !singleBillBoardCampaign.isRejected &&
                            <>
                              <p className="tx-18 tx-semibold mb-0">
                                Billboard Placement
                              </p>
                              <div className="row mg-t-15">
                                <div className="form-group col-md-12">
                                  <img
                                    src={singleBillBoardCampaign.attachment}
                                    className="img-fluid mg-b-10 img-fit-contain"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BillboardDetails;
