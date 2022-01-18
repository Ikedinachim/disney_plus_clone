import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  displaySingleCampaign,
  clearErrors,
} from "../../../actions/campaignActions";
import Loader from "../../loader";
import { useAlert } from "react-alert";
const FlierDetails = () => {
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
  }, []);
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
                        src="./assets/img/Brand_Awareness.svg"
                        class="tx-primary"
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div>
                      <p class="tx-20 tx-bold pd-t-20">Brand Awareness</p>
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
                          <p class="tx-16 mb-0">(campaignType)</p>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            Sender-ID
                          </label>
                          <p class="tx-16 mb-0">(senderId)</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-5 mg-b-20 mg-md-b-10">
                      <p class="tx-18 tx-semibold mb-0">Campaign</p>
                      <div class="row mg-t-15">
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            USSD Code
                          </label>
                          <p class="tx-16 mb-0">(ussd)</p>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            Phone Call
                          </label>
                          <p class="tx-16 mb-0">(phoneNumber)</p>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            WhatsApp Number
                          </label>
                          <p class="tx-16 mb-0">+2348084637227</p>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            SMS Number
                          </label>
                          <p class="tx-16 mb-0">(smsNumber)</p>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            Campaign message
                          </label>
                          <p class="tx-16 mb-0">(campaignMessage)</p>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            Channel
                          </label>
                          <p class="tx-16 mb-0">(channel)</p>
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
                            Target database
                          </label>
                          <span class="badge badge-pink tx-14 mg-5">
                            {" "}
                            (targetAudience)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-5 mg-b-20 mg-md-b-10">
                      <p class="tx-18 tx-semibold mb-0">Budget and Timing</p>
                      <div class="row mg-t-15">
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            Daily Limit
                          </label>
                          <p class="tx-16 mb-0">#5,000.00</p>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            Date created
                          </label>
                          <p class="tx-16 mb-0">(createdAt)</p>
                        </div>

                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            Time range
                          </label>
                          <p class="tx-16 mb-0">(timeRange)</p>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                            Date updated
                          </label>
                          <p class="tx-16 mb-0">(updatedAt)</p>
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

export default FlierDetails;
