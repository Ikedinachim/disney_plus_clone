import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
// import { DateTime } from "luxon";
// import NumberFormat from 'react-number-format'

import Loader from "../components/loader";
import MetaData from "../components/layout/MetaData";

// import { getWallet } from '../../../actions/billingActions'
// import { MDBDataTable } from 'mdbreact'
import { showAds, clearErrors } from "../actions/campaignActions";

const ViewCampaign = () => {
  const { loading, error, createShowAds } = useSelector(
    (state) => state.showAds || {}
  );
  const { id, campaignType, slug } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(showAds(id, campaignType, slug));
    // dispatch(getWallet())
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"All Campaigns"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="col-md-5 col-12 mg-t-20">
                <div className="card shadow-sm rounded bd-0">
                  <div className="card-body">
                    <p className="tx-20 tx-bold tx-com">Preview</p>
                    <div>
                      <img
                        src={createShowAds.attachment}
                        className="img-fluid mg-b-10"
                        alt=""
                      />
                      <p className="mb-4">{createShowAds.campaignMessage}</p>
                    </div>
                    <div>
                      {createShowAds.callToAction === "" ||
                      createShowAds.whatsappNumber === "" ? null : (
                        <a href="https://api.whatsapp.com/send?phone=2348167696729">
                          <button className="btn btn-primary w-100 mg-b-15 round-5">
                            <i className="fa fa-whatsapp mg-r-5"> </i>
                            {createShowAds.callToAction} via WhatsApp
                          </button>
                        </a>
                      )}
                      {createShowAds.callToAction === "" ||
                      createShowAds.phoneNumber === "" ? null : (
                        <a href="tel:+2348167696729">
                          <button className="btn btn-primary w-100 mg-b-15 round-5">
                            <i className="fa fa-phone mg-r-5" />
                            {createShowAds.callToAction} via Mobile
                          </button>
                        </a>
                      )}
                      {createShowAds.callToAction === "" ||
                      createShowAds.ussd === "" ? null : (
                        <a href="tel:%2A945%2A1%23">
                          <button className="btn btn-primary w-100 mg-b-15 round-5">
                            <i className="fa fa-phone mg-r-5" />
                            {createShowAds.callToAction} USSD
                          </button>
                        </a>
                      )}
                      {createShowAds.callToAction === "" ||
                      createShowAds.smsNumber === "" ? null : (
                        <a href="sms://+2348167696729">
                          <button className="btn btn-primary w-100 mg-b-15 round-5">
                            <i className="fa fa-comment mg-r-10"> </i>
                            {createShowAds.callToAction} via Text
                          </button>
                        </a>
                      )}
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

export default ViewCampaign;
