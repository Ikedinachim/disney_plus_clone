import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const FlierDetails = () => {
  return (
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
                      <p class="tx-16 mb-0">Campaign X</p>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                        Industry
                      </label>
                      <p class="tx-16 mb-0">Information and Technology</p>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                        Brand Name
                      </label>
                      <p class="tx-16 mb-0">Oreos Energy</p>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                        Company Url
                      </label>
                      <p class="tx-16 mb-0">Oreosenergy.netX</p>
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
                      <p class="tx-16 mb-0">*224#</p>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                        Phone Call
                      </label>
                      <p class="tx-16 mb-0">123</p>
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
                      <p class="tx-16 mb-0">132</p>
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
                        Age Range
                      </label>
                      <span class="badge badge-pink tx-14 mg-5">
                        {" "}
                        13-24 years
                      </span>
                      <span class="badge badge-pink tx-14 mg-5">
                        {" "}
                        13-24 years
                      </span>
                    </div>
                    <div class="form-group">
                      <label
                        for=""
                        class="tx-14 tx-gray mb-0 tx-medium d-block"
                      >
                        Gender
                      </label>
                      <span class="badge badge-pink tx-14 mg-5"> Male</span>
                    </div>
                    <div class="form-group">
                      <label
                        for=""
                        class="tx-14 tx-gray mb-0 tx-medium d-block"
                      >
                        Location
                      </label>
                      <span class="badge badge-pink tx-14 mg-5"> Adamawa</span>
                    </div>
                    <div class="form-group">
                      <label
                        for=""
                        class="tx-14 tx-gray mb-0 tx-medium d-block"
                      >
                        Profession
                      </label>
                      <span class="badge badge-pink tx-14 mg-5">
                        {" "}
                        Self Employed
                      </span>
                      <span class="badge badge-pink tx-14 mg-5">
                        {" "}
                        Undergraduate
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
                        Surfing Net
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-5 mg-b-20 mg-md-b-10">
                  <p class="tx-18 tx-semibold mb-0">Budget and Timing</p>
                  <div class="row mg-t-15">
                    <div class="form-group col-md-12">
                      <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                        Daily Limit
                      </label>
                      <p class="tx-16 mb-0">#5,000.00</p>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                        From
                      </label>
                      <p class="tx-16 mb-0">+2348084637227</p>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="tx-14 tx-gray mb-0 tx-medium">
                        To
                      </label>
                      <p class="tx-16 mb-0">April 3, 2021</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FlierDetails;
