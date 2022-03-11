import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../../../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
import {
  getSingleUserInfluencers,
  clearErrors,
} from "../../../../actions/campaignActions";
import Loader from "../../../loader";
// import { useAlert } from "react-alert";

const InfluencerDetails = () => {
  const { loading, error, singleUserInfluencer } = useSelector(
    (state) => state.singleUserInfluencer || {}
  );

  const { id } = useParams();
  const dispatch = useDispatch();
  // const alert = useAlert();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getSingleUserInfluencers(id));
    // dispatch(getWallet())
  }, [dispatch, toast, error]);

  console.log(singleUserInfluencer);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Campaign Details"} />
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
                    <div className="mg-r-20">
                      <img
                        src="../../assets/img/Brand_Awareness.svg"
                        className="tx-primary"
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div>
                      <p className="tx-20 tx-bold pd-t-20">
                        Influencer Campaign Details
                      </p>
                    </div>
                  </div>
                  <hr />
                  {singleUserInfluencer.map((campaign) => (
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
                                {campaign.campaignType}
                              </p>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                for=""
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                User-ID
                              </label>
                              <p className="tx-16 mb-0">{campaign.user_id}</p>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                for=""
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                Campaign-ID
                              </label>
                              <p className="tx-16 mb-0">{campaign.id}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-5 mg-b-20 mg-md-b-10">
                          <p className="tx-18 tx-semibold mb-0">Campaign</p>
                          <div className="row mg-t-15">
                            <div className="form-group col-md-6">
                              <label
                                for=""
                                className="tx-14 tx-gray mb-0 tx-medium"
                              >
                                Campaign message
                              </label>
                              <p className="tx-16 mb-0">
                                {campaign.campaignMessage}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row justify-content-between">
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
                              <p className="tx-16 mb-0">{campaign.cost}</p>
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
                                  new Date(campaign.createdAt)
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
                                {DateTime.fromJSDate(
                                  new Date(campaign.updatedAt)
                                ).toFormat("dd MMM, yyyy")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default InfluencerDetails;
