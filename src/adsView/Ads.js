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
    (state) => state.showAds || []
  );
  const { id, campaignType, slug } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  //   const getMobileOS = () => {
  //   const ua = navigator.userAgent
  //   if (/android/i.test(ua)) {
  //     return "Android"
  //   }
  //   else if (
  //     /iPad|iPhone|iPod/.test(ua) ||
  //     (navigator.userAgentData.platform === "MacIntel" &&
  //       navigator.maxTouchPoints > 1)
  //   ) {
  //     return "iOS";
  //   }
  //   return "Other"
  // }

  useEffect(() => {
    dispatch(showAds(id, campaignType, slug));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // dispatch(getWallet())
  }, [dispatch, showAds, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"All Campaigns"} />
          <div className="content-body ads-body">
            <div className="container pd-x-0">
              <div className="col-md-5 col-12 mg-t-20">
                <div className="card shadow-sm rounded bd-0">
                  <div className="card-body">
                    {/* <p className="tx-20 tx-bold tx-com">Preview</p> */}
                    <div className="card-image">
                      <div className="image-holder">
                        <img
                          src={createShowAds && createShowAds.attachment}
                          className="img-fluid mb-4"
                          alt=""
                        />
                      </div>
                      <p className="mb-2 text-center">
                        {createShowAds && createShowAds.campaignMessage}
                      </p>
                    </div>
                    {campaignType === "flier_video" && (
                      <div>
                        {createShowAds &&
                        createShowAds.whatsAppNumber === "" ? null : (
                          <a
                            className="btn btn-primary w-100 mg-b-15 round-5"
                            href={`https://api.whatsapp.com/send?phone=${createShowAds.whatsAppNumber}`}
                          >
                            <i
                              className="fab fa-whatsapp mg-r-5"
                              aria-hidden="true"
                            >
                              {" "}
                            </i>
                            {createShowAds && createShowAds.callToAction} via
                            WhatsApp
                          </a>
                        )}
                        {createShowAds &&
                        createShowAds.phoneNumber === "" ? null : (
                          <a
                            className="btn btn-primary w-100 mg-b-15 round-5"
                            href={`tel:+${createShowAds.phoneNumber}`}
                          >
                            <i className="fa fa-phone mg-r-5" />
                            {createShowAds && createShowAds.callToAction} via
                            Mobile
                          </a>
                        )}
                        {createShowAds && createShowAds.ussd === "" ? null : (
                          <a
                            className="btn btn-primary w-100 mg-b-15 round-5"
                            href={`tel:${+createShowAds.ussd}`}
                          >
                            <i className="fa fa-phone mg-r-5" />
                            {createShowAds && createShowAds.callToAction} USSD
                          </a>
                        )}
                        {createShowAds &&
                        createShowAds.smsNumber === "" ? null : (
                          <a
                            className="btn btn-primary w-100 mg-b-15 round-5"
                            href={`sms:${+createShowAds.smsNumber}?body="I will like to make an enquiry"`}
                          >
                            <i className="fa fa-comment mg-r-10"> </i>
                            {createShowAds && createShowAds.callToAction} via
                            Text
                          </a>
                        )}
                        {createShowAds && createShowAds.url === "" ? null : (
                          <a
                            className="btn btn-primary w-100 mg-b-15 round-5"
                            href={createShowAds.url}
                          >
                            <i className="fa fa-globe mg-r-10"> </i>
                            {createShowAds && createShowAds.callToAction} via
                            Web
                          </a>
                        )}
                      </div>
                    )}
                    {campaignType === "app_download" && (
                      <div>
                        {createShowAds &&
                        createShowAds.androidStoreUrl === "" ? null : (
                          <a
                            className="btn btn-primary w-100 mg-b-15 round-5"
                            href={createShowAds.androidStoreUrl}
                          >
                            <i
                              className="fab fa-google-play mg-r-5"
                              aria-hidden="true"
                            >
                              {" "}
                            </i>
                            {createShowAds && createShowAds.callToAction} via
                            PlayStore
                          </a>
                        )}
                        {createShowAds &&
                        createShowAds.iosStoreUrl === "" ? null : (
                          <a
                            className="btn btn-primary w-100 mg-b-15 round-5"
                            href={createShowAds.iosStoreUrl}
                          >
                            <i
                              className="fab fa-apple mg-r-5"
                              aria-hidden="true"
                            >
                              {" "}
                            </i>
                            {createShowAds && createShowAds.callToAction} via
                            AppStore
                          </a>
                        )}
                      </div>
                    )}
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
