import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import MetaData from "../components/layout/MetaData";
import MediaPlayer from "../_helpers/reactPlayer/ReactPlayer";
import { showAds, clearErrors } from "../actions/campaignActions";
import { setAdsClickStatus } from "../actions/analyticsActions";

const ViewCampaign = () => {
  const { loading, error, createShowAds } = useSelector(
    (state) => state.showAds || []
  );
  const { id, campaignType, slug } = useParams();
  const dispatch = useDispatch();

  // const [clickType, setClickType] = useState({})
  // const alert = useAlert();

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

  const handleClickType = (type) => {
    if (type === "whatsAppNumber") {
      const clickType = {
        WHATSAPP_NUMBER_CLICK: "whatsAppNumberClick",
      };
      const payload = {
        campaignId: id,
        campaignType: campaignType,
        clickType: clickType,
      };
      dispatch(setAdsClickStatus(payload));
    } else if (type === "phoneNumber") {
      const clickType = {
        PHONE_NUMBER_CLICK: "phoneNumberClick",
      };
      const payload = {
        campaignId: id,
        campaignType: campaignType,
        clickType: "phoneNumberClick",
      };
      dispatch(setAdsClickStatus(payload));
    } else if (type === "iosStoreUrl") {
      const clickType = {
        IOS_URL_CLICK: "iosStoreClick",
      };
      const payload = {
        campaignId: id,
        campaignType: campaignType,
        clickType: clickType,
      };
      dispatch(setAdsClickStatus(payload));
    } else if (type === "androidStoreUrl") {
      const clickType = {
        ANDROID_URL_CLICK: "androidStoreClick",
      };
      const payload = {
        campaignId: id,
        campaignType: campaignType,
        clickType: clickType,
      };
      dispatch(setAdsClickStatus(payload));
    } else if (type === "ussd") {
      const clickType = {
        USSD_CLICK: "ussdClick",
      };
      const payload = {
        campaignId: id,
        campaignType: campaignType,
        clickType: clickType,
      };
      dispatch(setAdsClickStatus(payload));
    } else if (type === "smsNumber") {
      const clickType = {
        SMS_NUMBER_CLICK: "smsNumberClick",
      };
      const payload = {
        campaignId: id,
        campaignType: campaignType,
        clickType: clickType,
      };
      dispatch(setAdsClickStatus(payload));
    } else if (type === "url") {
      const clickType = {
        URL_CLICK: "urlClick",
      };
      const payload = {
        campaignId: id,
        campaignType: campaignType,
        clickType: clickType,
      };
      dispatch(setAdsClickStatus(payload));
    }
  };

  useEffect(() => {
    dispatch(showAds(id, campaignType, slug));
  }, [dispatch]);

  useEffect(() => {
    // dispatch(showAds(id, campaignType, clickType));
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // else {
    //   dispatch(showAds(id, campaignType, slug));
    // }
  }, [error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Campaigns"} />
          {/* <p>Hello</p> */}
          <div className="content-body page-content">
            <div className="container pd-x-0 d-flex justify-content-center">
              <div className="col-md-5 col-12 mg-t-20">
                <div className="card shadow-sm rounded bd-0 page-content-card">
                  <div className="card-body">
                    {/* <p className="tx-20 tx-bold tx-com">Preview</p> */}
                    <div className="card-image">
                      <div className="image-holder">
                        {createShowAds &&
                        createShowAds.assetType === "image" ? (
                          <img
                            src={createShowAds && createShowAds.attachment}
                            className="img-fluid mb-2"
                            alt=""
                          />
                        ) : (
                          <MediaPlayer
                            url={createShowAds && createShowAds.attachment}
                          />
                        )}
                      </div>
                      <p className="mb-3 text-center">
                        {createShowAds && createShowAds.campaignMessage}
                      </p>
                    </div>
                    {campaignType === "flier_video" && (
                      <div className="d-flex flex-column align-items-center">
                        {createShowAds &&
                        createShowAds.whatsAppNumber === "" ? null : (
                          <a
                            className="btn btn-primary mg-b-15 round-5"
                            href={`https://api.whatsapp.com/send?phone=${
                              createShowAds && createShowAds.whatsAppNumber
                            }`}
                            onClick={() => handleClickType("whatsAppNumber")}
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
                            className="btn btn-primary mg-b-15 round-5"
                            href={`tel:+${
                              createShowAds && createShowAds.phoneNumber
                            }`}
                            onClick={() => handleClickType("phoneNumber")}
                          >
                            <i className="fa fa-phone mg-r-5" />
                            {createShowAds && createShowAds.callToAction} via
                            Mobile
                          </a>
                        )}
                        {createShowAds && createShowAds.ussd === "" ? null : (
                          <a
                            className="btn btn-primary mg-b-15 round-5"
                            href={`tel:+${createShowAds && createShowAds.ussd}`}
                            onClick={() => handleClickType("ussd")}
                          >
                            <i className="fa fa-phone mg-r-5" />
                            {createShowAds && createShowAds.callToAction} USSD
                          </a>
                        )}
                        {createShowAds &&
                        createShowAds.smsNumber === "" ? null : (
                          <a
                            className="btn btn-primary mg-b-15 round-5"
                            href={`sms:+${
                              createShowAds && createShowAds.smsNumber
                            }?body="I will like to make an enquiry"`}
                            onClick={() => handleClickType("smsNumber")}
                          >
                            <i className="fa fa-comment mg-r-10"> </i>
                            {createShowAds && createShowAds.callToAction} via
                            Text
                          </a>
                        )}
                        {createShowAds && createShowAds.url === "" ? null : (
                          <a
                            className="btn btn-primary mg-b-15 round-5"
                            href={createShowAds && createShowAds.url}
                            onClick={() => handleClickType("url")}
                          >
                            <i className="fa fa-globe mg-r-10"> </i>
                            {createShowAds && createShowAds.callToAction} via
                            Web
                          </a>
                        )}
                      </div>
                    )}
                    {campaignType === "app_download" && (
                      <div className="d-flex flex-column align-items-center">
                        {createShowAds &&
                        createShowAds.androidStoreUrl === "" ? null : (
                          <a
                            className="btn btn-primary mg-b-15 round-5"
                            href={
                              createShowAds && createShowAds.androidStoreUrl
                            }
                            onClick={() => handleClickType("androidStoreUrl")}
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
                            className="btn btn-primary mg-b-15 round-5"
                            href={createShowAds && createShowAds.iosStoreUrl}
                            onClick={() => handleClickType("iosStoreUrl")}
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
