import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  displaySingleCampaign,
  clearErrors,
} from "../../../actions/campaignActions";
import Loader from "../../loader";
import { useAlert } from "react-alert";

const CampaignDetails = () => {
  const { loading, error, singleCampaign } = useSelector(
    (state) => state.getSingleCampaign || {}
  );

  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(displaySingleCampaign(id));
    // dispatch(getWallet())
  }, [dispatch, alert, error]);

  console.log(singleCampaign);
  console.log(singleCampaign);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div class="content-body">
            <div class="container pd-x-0">
              <div class="row justify-content-between">
                <div class="col-md-6 mg-b-20 mg-md-b-0">
                  <Link to="../campaigns" class="tx-black">
                    <div>
                      <i class="fa fa-angle-left mg-r-10 pd-t-15 tx-18"></i>
                      <span class="tx-28 tx-bold mb-0">Campaigns</span>
                    </div>
                  </Link>
                </div>
              </div>
              <div class="card rounded bd-0 shadow-sm">
                <div class="card-body">
                  <div class="d-flex">
                    <div class="mg-r-20">
                      <img
                        src="../../assets/img/Brand_Awareness.svg"
                        class="tx-primary"
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div>
                      <p class="tx-20 tx-bold pd-t-20">
                        Flash-SMS / SMS Details
                      </p>
                    </div>
                  </div>
                  <hr />

                  <div class="row justify-content-between">
                    <div class="col-md-6 col-lg-6 mg-b-20 mg-md-b-10">
                      <p class="tx-18 tx-semibold mb-0">Basic Information</p>
                      <div class="row mg-t-15">
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            Campaign Name
                          </label>
                          <p class="tx-16 mb-0">
                            {singleCampaign.campaignType}
                          </p>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            Sender-ID
                          </label>
                          <p class="tx-16 mb-0">{singleCampaign.senderId}</p>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            Contact
                          </label>
                          <p class="tx-16 mb-0">
                            {singleCampaign.contactNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-5 mg-b-20 mg-md-b-10">
                      <p class="tx-18 tx-semibold mb-0">Campaign</p>
                      <div class="row mg-t-15">
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            Campaign message
                          </label>
                          <p class="tx-16 mb-0">
                            {singleCampaign.campaignMessage}
                          </p>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            Channel
                          </label>
                          <p class="tx-16 mb-0">{singleCampaign.channel}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="row justify-content-between">
                    <div class="col-md-6 col-lg-6 mg-b-20 mg-md-b-10">
                      <p class="tx-18 tx-semibold mb-0">Target Audience</p>
                      <div class="mg-t-15">
                        <div class="form-group">
                          <label
                            for=""
                            class="tx-14 tx-gray mb-0 tx-medium d-block"
                          >
                            Age
                          </label>
                          <span class="badge badge-pink tx-14 mg-5">
                            {" "}
                            {singleCampaign.targetAge} years
                          </span>
                        </div>
                        <div class="form-group">
                          <label
                            for=""
                            class="tx-14 tx-gray mb-0 tx-medium d-block"
                          >
                            Gender
                          </label>
                          <span class="badge badge-pink tx-14 mg-5">
                            {" "}
                            {singleCampaign.gender}
                          </span>
                        </div>
                        <div class="form-group">
                          <label
                            for=""
                            class="tx-14 tx-gray mb-0 tx-medium d-block"
                          >
                            Location
                          </label>
                          <span class="badge badge-pink tx-14 mg-5">
                            {" "}
                            {singleCampaign.location}
                          </span>
                        </div>
                        <div class="form-group">
                          <label
                            for=""
                            class="tx-14 tx-gray mb-0 tx-medium d-block"
                          >
                            Interest
                          </label>
                          <span class="badge badge-pink tx-14 mg-5">
                            {" "}
                            {singleCampaign.interest}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-5 mg-b-20 mg-md-b-10">
                      <p class="tx-18 tx-semibold mb-0">Budget and Timing</p>
                      <div class="row mg-t-15">
                        <div class="form-group col-md-12">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            Price
                          </label>
                          <p class="tx-16 mb-0">{singleCampaign.price}</p>
                        </div>

                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            From
                          </label>
                          <p class="tx-16 mb-0">{singleCampaign.createdAt}</p>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            To
                          </label>
                          <p class="tx-16 mb-0">{singleCampaign.updatedAt}</p>
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

export default CampaignDetails;
