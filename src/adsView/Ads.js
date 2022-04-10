import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import MetaData from "../components/layout/MetaData";
import MediaPlayer from "../_helpers/reactPlayer/ReactPlayer";
import { showAds, clearErrors } from "../actions/campaignActions";
import { setAdsClickStatus } from "../actions/analyticsActions";
import LinkPreview from "../components/layout/LinkPreview";

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

  // const setYoutubeUrl = (url) => {
  //   let regExp =
  //     /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
  //   let match = url && url.match(regExp);
  //   console.log(match);
  //   const watchUrl = `https://www.youtube.com/watch?v=${match && match[1]}`;
  //   // return match && match[1].length === 11 ? match[1] : false;
  //   return watchUrl;
  // };

  const handleClickType = (type) => {
    if (type === "whatsAppNumber") {
      const payload = {
        campaignId: id,
        campaignType: campaignType,
        clickType: "whatsAppNumber",
      };
      dispatch(setAdsClickStatus(payload));
    } else if (type === "phoneNumber") {
      const payload = {
        campaignId: id,
        campaignType: campaignType,
        clickType: "phoneNumberClick",
      };
      dispatch(setAdsClickStatus(payload));
    } else if (type === "iosStoreUrl") {
      const payload = {
        campaignId: id,
        campaignType: campaignType,
        clickType: "iosStoreClick",
      };
      dispatch(setAdsClickStatus(payload));
    } else if (type === "androidStoreUrl") {
      const payload = {
        campaignId: id,
        campaignType: campaignType,
        clickType: "androidStoreClick",
      };
      dispatch(setAdsClickStatus(payload));
    } else if (type === "ussd") {
      const payload = {
        campaignId: id,
        campaignType: campaignType,
        clickType: "ussdClick",
      };
      dispatch(setAdsClickStatus(payload));
    } else if (type === "smsNumber") {
      const payload = {
        campaignId: id,
        campaignType: campaignType,
        clickType: "smsNumberClick",
      };
      dispatch(setAdsClickStatus(payload));
    } else if (type === "url") {
      const payload = {
        campaignId: id,
        campaignType: campaignType,
        clickType: "urlClick",
      };
      dispatch(setAdsClickStatus(payload));
    }
  };

  useEffect(() => {
    dispatch(showAds(id, campaignType, slug));
  }, [dispatch, campaignType, id, slug]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  console.log(
    createShowAds &&
      createShowAds.androidStoreUrl &&
      (createShowAds.androidStoreUrl.indexOf("http://") === 0 ||
        createShowAds.androidStoreUrl.indexOf("https://") === 0)
  );

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Campaigns"} />
          <LinkPreview
            campaignMessage={createShowAds && createShowAds.campaignMessage}
            image={createShowAds && createShowAds.attachment}
          />
          {/* <p>Hello</p> */}
          <div className="content-body page-content">
            <div className="container pd-x-0 d-flex justify-content-center">
              <div className="col-md-5 col-12 mg-t-20">
                <div className="card shadow-sm rounded bd-0 page-content-card ">
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
                      <div className="d-flex flex-column align-items-center .wd-xs-100p">
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
                            href={`tel:${
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
                            href={`tel:${createShowAds && createShowAds.ussd}`}
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
                            href={`sms:${
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
                            href={`${
                              createShowAds &&
                              createShowAds.url &&
                              (createShowAds.url.indexOf("http://") === 0 ||
                                createShowAds.url.indexOf("https://") === 0)
                                ? createShowAds.url && createShowAds.url.trim()
                                : "http://" +
                                  (createShowAds.url &&
                                    createShowAds.url.trim())
                            }`}
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
                            href={`${
                              createShowAds.androidStoreUrl &&
                              (createShowAds.androidStoreUrl.indexOf(
                                "http://"
                              ) === 0 ||
                                createShowAds.androidStoreUrl.indexOf(
                                  "https://"
                                ) === 0)
                                ? createShowAds.androidStoreUrl &&
                                  createShowAds.androidStoreUrl.trim()
                                : "http://" +
                                  (createShowAds.androidStoreUrl &&
                                    createShowAds.androidStoreUrl.trim())
                            }`}
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
                            href={`${
                              createShowAds.iosStoreUrl &&
                              (createShowAds.iosStoreUrl.indexOf("http://") ===
                                0 ||
                                createShowAds.iosStoreUrl.indexOf(
                                  "https://"
                                ) === 0)
                                ? createShowAds.iosStoreUrl &&
                                  createShowAds.iosStoreUrl.trim()
                                : "http://" +
                                  (createShowAds.iosStoreUrl &&
                                    createShowAds.iosStoreUrl.trim())
                            }`}
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
