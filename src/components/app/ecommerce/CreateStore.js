import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  createStoreAction,
  clearErrors,
} from "../../../actions/ecommerceActions";
import MetaData from "../../layout/MetaData";
import Loader from "../../loader";
import { CREATE_STORE_RESET } from "../../../constants/ecommerceConstants";
import useAnalyticsEventTracker from "../../../_helpers/GoogleAnalytics/GoogleAnalytics";

const CreateStore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const gaEventTracker = useAnalyticsEventTracker("Store Creation");
  const { user } = useSelector((state) => state.auth);
  const [isUploading, setIsUploading] = useState(null);
  const { loading, createStore, error, store } = useSelector(
    (state) => state.store || []
  );

  const [storeFormData, setStoreFormData] = useState({
    name: "",
    description: "",
    user_id: user?.user?.id,
    email: "",
    logo: "",
    address: "",
    banners: [],
    uploadPercentage: 0,
  });

  const { name, description, email, logo, banners, address, uploadPercentage } =
    storeFormData;

  const handleFormChange = (e) => {
    setStoreFormData({ ...storeFormData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    if (e.target.name === "banners") {
      //it can handle multiple images
      let imageurls = banners;
      for (let i = 0; i <= Object.keys(e.target.files).length - 1; i++) {
        let file = e.target.files[i];

        let reader = new FileReader();
        reader.onload = (e) => {
          let img = document.createElement("img");
          img.onload = async () => {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            let MAX_WIDTH = 900;
            let MAX_HEIGHT = 600;
            let width = img.width;
            let height = img.height;
            let maxFileSize = 2097152;
            if (file.size > maxFileSize) {
              toast.error(
                "The selected image file is too big. Please choose one that is smaller than 2 MB."
              );
            } else {
              if (width > height) {
                if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
                }
              } else {
                if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
                }
              }
              canvas.width = width;
              canvas.height = height;
              let ctx2 = canvas.getContext("2d");
              ctx2.drawImage(img, 0, 0, width, height);
              let dataurl = canvas.toDataURL("image/png");
              let files = dataurl;
              const formData = new FormData();
              formData.append("file", files);
              formData.append("upload_preset", "mysogi_store");

              const options = {
                onUploadProgress: (progressEvent) => {
                  setIsUploading(true);
                  const { loaded, total } = progressEvent;
                  let percent = Math.floor((loaded * 100) / total);
                  // console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                  if (percent < 100) {
                    setStoreFormData({
                      ...storeFormData,
                      uploadPercentage: percent,
                    });
                  }
                },
              };

              try {
                await axios
                  .post(process.env.REACT_APP_CLOUDINARY_URL, formData, options)
                  .then((res) => {
                    imageurls.push(res.data.secure_url);
                    setIsUploading(false);
                    // console.log(res);
                    setStoreFormData({
                      ...storeFormData,
                      banners: imageurls,
                      //this is what will be displayed on the mockup
                      uploadPercentage: 100,
                      imageAlt: `An image of ${res.original_filename}`,
                    });
                  });
              } catch (err) {
                // return console.log(err);
                setIsUploading(false);
              }
            }
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    } else {
      //it can handle single image
      let imageurls = [];
      let file = e.target.files[0];

      let reader = new FileReader();
      reader.onload = (e) => {
        let img = document.createElement("img");
        img.onload = async () => {
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          let MAX_WIDTH = 900;
          let MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;
          let maxFileSize = 2097152;
          if (file.size > maxFileSize) {
            toast.error(
              "The selected image file is too big. Please choose one that is smaller than 2 MB."
            );
          } else {
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            let ctx2 = canvas.getContext("2d");
            ctx2.drawImage(img, 0, 0, width, height);
            let dataurl = canvas.toDataURL("image/png");
            let files = dataurl;
            const formData = new FormData();
            formData.append("file", files);
            formData.append("upload_preset", "mysogi_store");

            const options = {
              onUploadProgress: (progressEvent) => {
                setIsUploading(true);
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                if (percent < 100) {
                  setStoreFormData({
                    ...storeFormData,
                    uploadPercentage: percent,
                  });
                }
              },
            };

            try {
              await axios
                .post(process.env.REACT_APP_CLOUDINARY_URL, formData, options)
                .then((res) => {
                  // console.log(res);
                  imageurls[0] = res.data.secure_url;
                  setIsUploading(false);
                  setStoreFormData({
                    ...storeFormData,
                    logo: res.data.secure_url,
                    uploadPercentage: 100,
                    selectedFileName: file.name,
                    imageAlt: `An image of ${res.original_filename}`,
                  });
                });
            } catch (err) {
              // return console.log(err);
              setIsUploading(false);
            }
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    // setIsUploading(false);
  };

  const handleImageDelete = (deleteType) => (e) => {
    const uuid = e.target.id;
    const attachments = banners;
    if (deleteType === "banners") {
      setStoreFormData({
        ...storeFormData,
        banners: attachments.filter((i) => i !== uuid),
      });
    } else {
      setStoreFormData({
        ...storeFormData,
        logo: "",
      });
    }
  };

  const submitStoreHandler = (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Enter store name");
    } else if (description === "") {
      toast.error("Enter store description");
    } else if (email === "") {
      toast.error("Enter preferred store email");
    } else if (address === "") {
      toast.error("Enter store address");
    } else if (logo === "") {
      toast.error("Upload store logo");
    } else if (banners.length <= 0) {
      toast.error("Upload Store banners");
    } else {
      dispatch(createStoreAction(storeFormData));
    }
  };

  useEffect(() => {
    if (createStore?.success) {
      gaEventTracker("Ecommerce", "User created a new store");
      toast.success("Store created successfully");
      navigate("/app/ecommerce/add-product", {
        state: { prevPath: pathname },
      });
      dispatch({ type: CREATE_STORE_RESET });
    } else if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [navigate, dispatch, error, createStore, pathname]);

  useEffect(() => {
    if (Object.keys(store)?.length !== 0) {
      navigate("/app/ecommerce");
    }
  }, [navigate, store]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Create Store"} />
          <div className="content-body">
            <div className="container pd-sm-10 pd-10 bg-white pd-md-30">
              <div className="d-flex justify-content-between">
                <p className="tx-18 mb-0">50%</p>
                <p className="tx-18 mb-0">1 out of 2</p>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-primary progress-bar-striped progress-bar-animated wd-50p"
                  role="progressbar"
                  aria-valuenow={50}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <div className="mg-md-y-20">
                <div className="align-items-start row justify-content-between">
                  <div className="col-md-6 col-12 mg-t-20">
                    <div className="card-scrol pd-md-x-10">
                      <div>
                        <p className="tx-24 tx-bold mb-1 tx-com">
                          Let’s create your mini website!
                        </p>
                        <p className="tx-14 mb-4">
                          Provide all requested details to help setup your store
                        </p>
                      </div>
                      <form>
                        <div className="form-group mg-b-30">
                          <label className="mb-2">Business Name</label>
                          <input
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Enter your business name"
                            defaultValue={name}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div className="form-group mg-b-30">
                          <label className="mb-2">Business Description</label>
                          <textarea
                            name="description"
                            className="form-control"
                            rows={5}
                            placeholder="Type your description here"
                            defaultValue={description}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div className="form-group mg-b-30">
                          <label className="mb-2">Email Address</label>
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Enter email address"
                            defaultValue={email}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div className="form-group mg-b-30">
                          <label className="mb-2">
                            Business Location Coverage Area
                          </label>
                          <input
                            name="address"
                            type="text"
                            className="form-control"
                            placeholder="Your business location coverage"
                            defaultValue={address}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div className="form-group mg-b-30">
                          <p className="tx-22 tx-bold mg-b-24 tx-com">
                            Attachment
                          </p>
                          {logo === "" ? (
                            <div className="custom-file">
                              <input
                                name="logo"
                                type="file"
                                accept="image/png, image/jpeg, image/gif, image/jpg"
                                className="custom-file-input store-file-input"
                                id="customFileLogo"
                                onChange={handleImageUpload}
                              />

                              <label
                                className="custom-file-label store-label"
                                htmlFor="customFileLogo"
                              >
                                <div className="store-label-icon">
                                  <i className="fa fa-image store-input-icon"></i>
                                </div>
                                Click to upload Logo
                              </label>
                            </div>
                          ) : (
                            <>
                              <div className="d-none custom-file">
                                <input
                                  name="logo"
                                  type="file"
                                  accept="image/png, image/jpeg, image/gif, image/jpg"
                                  className=" custom-file-input store-file-input"
                                  id="customFileLogo"
                                  onChange={handleImageUpload}
                                />
                              </div>
                              <div className="row mg-0 mg-y-20 flex-wrap-reverse align-items-center">
                                <div className=".store-prefix-label">
                                  <div className="store-label-icon">
                                    <i className="fa fa-image store-input-icon"></i>
                                  </div>
                                </div>
                                <div className="d-flex mg-r-10 mg-y-10 overlay-icon-container pos-relative">
                                  <div className="tx-base h-100 w-100">
                                    <img
                                      src={logo}
                                      alt={"attachments"}
                                      className={"overlay-icon-img"}
                                    />
                                  </div>
                                  <div className="pos-absolute overlay-icon justify-content-start d-flex align-items-center">
                                    <button
                                      type="button"
                                      className="btn pd-0 overlay-button product-close"
                                      onClick={handleImageDelete("logo")}
                                    >
                                      <i className="fa fa-times product-close-icon"></i>
                                    </button>
                                  </div>
                                </div>
                                {logo !== "" && (
                                  <label
                                    htmlFor="customFileLogo"
                                    className="add-image-label"
                                  >
                                    <i className="fa fa-plus"></i>
                                  </label>
                                )}
                              </div>
                            </>
                          )}
                          {banners.length <= 0 ? (
                            <div className="custom-file mg-t-20">
                              <input
                                name="banners"
                                type="file"
                                accept="image/png, image/jpeg, image/gif, image/jpg"
                                className="custom-file-input store-file-input"
                                id="customFileBanners"
                                onChange={handleImageUpload}
                                multiple
                              />

                              <label
                                className="custom-file-label store-label"
                                htmlFor="customFileBanners"
                              >
                                <div className="store-label-icon">
                                  <i className="fa fa-image store-input-icon"></i>
                                </div>
                                Click to upload Banners
                              </label>
                            </div>
                          ) : (
                            <>
                              <div className="d-none custom-file">
                                <input
                                  name="banners"
                                  type="file"
                                  accept="image/png, image/jpeg, image/gif, image/jpg"
                                  className=" custom-file-input store-file-input"
                                  id="customFileBanners"
                                  onChange={handleImageUpload}
                                  disabled={banners.length >= 5}
                                  multiple
                                />
                              </div>
                              <div className="row mg-0 mg-y-20 flex-wrap-reverse align-items-center">
                                <div className=".store-prefix-label">
                                  <div className="store-label-icon">
                                    <i className="fa fa-image store-input-icon"></i>
                                  </div>
                                </div>
                                {banners?.map((imgNames, i) => (
                                  <div
                                    id={i}
                                    key={i}
                                    className="d-flex mg-r-10 mg-y-10 overlay-icon-container pos-relative"
                                  >
                                    <div className="tx-base h-100 w-100">
                                      <img
                                        src={imgNames}
                                        alt={"attachments"}
                                        className={"overlay-icon-img"}
                                      />
                                    </div>
                                    <div className="pos-absolute overlay-icon justify-content-start d-flex align-items-center">
                                      <button
                                        type="button"
                                        className="btn pd-0 overlay-button product-close"
                                        onClick={handleImageDelete("banners")}
                                        id={imgNames}
                                      >
                                        <i
                                          id={imgNames}
                                          className="fa fa-times product-close-icon"
                                        ></i>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {banners.length > 0 && (
                                  <label
                                    htmlFor="customFileBanners"
                                    className={`add-image-label ${
                                      banners.length >= 5
                                        ? "label-disabled not-clickable"
                                        : ""
                                    }`}
                                  >
                                    <i className="fa fa-plus"></i>
                                  </label>
                                )}
                              </div>
                            </>
                          )}
                          {isUploading && uploadPercentage > 0 && (
                            <span className="mt-2">
                              <ProgressBar
                                now={uploadPercentage}
                                label={`${uploadPercentage}%`}
                              />
                            </span>
                          )}
                        </div>
                      </form>
                      <div className="col-md-7 pd-x-0 mg-y-30">
                        <div className="d-flex">
                          <button
                            onClick={() => navigate(-1)}
                            className="btn btn-outline-primary w-100 mg-b-15"
                          >
                            Go Back
                          </button>
                          <button
                            className="btn btn-primary w-100 mg-b-15 mg-l-20"
                            onClick={submitStoreHandler}
                            type="submit"
                            variant="contained"
                          >
                            Proceed
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="position-sticky t-0 col-md-5 col-12 mg-t-20 content-body store-preview">
                    <div className="store-preview-logo">
                      <div className="store-card store-card-center shadow-sm">
                        <p className="text-center mg-0">
                          Here’s a preview of your logo
                        </p>
                        {logo !== "" || logo === undefined ? (
                          <div className="store-preview-icon store-preview-img">
                            <img src={logo} alt="logo" />
                          </div>
                        ) : (
                          <div className="store-preview-icon">
                            <svg
                              width="97"
                              height="97"
                              viewBox="0 0 97 97"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M96.125 85.5417V11.4583C96.125 5.6375 91.3625 0.875 85.5417 0.875H11.4583C5.6375 0.875 0.875 5.6375 0.875 11.4583V85.5417C0.875 91.3625 5.6375 96.125 11.4583 96.125H85.5417C91.3625 96.125 96.125 91.3625 96.125 85.5417ZM29.9792 56.4375L43.2083 72.3654L61.7292 48.5L85.5417 80.25H11.4583L29.9792 56.4375Z"
                                fill="#707070"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="store-preview-banner">
                      <div className="store-card store-card-center shadow-sm banner-card">
                        <p className="text-center mg-0">
                          Here’s a preview of your banner
                        </p>
                        {banners.length > 0 ? (
                          banners.map((banner) => {
                            return (
                              <div key={banner} className="store-banner">
                                <img src={banner} alt="banner" />
                              </div>
                            );
                          })
                        ) : (
                          <div className="store-preview-icon">
                            <svg
                              width="97"
                              height="97"
                              viewBox="0 0 97 97"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M96.125 85.5417V11.4583C96.125 5.6375 91.3625 0.875 85.5417 0.875H11.4583C5.6375 0.875 0.875 5.6375 0.875 11.4583V85.5417C0.875 91.3625 5.6375 96.125 11.4583 96.125H85.5417C91.3625 96.125 96.125 91.3625 96.125 85.5417ZM29.9792 56.4375L43.2083 72.3654L61.7292 48.5L85.5417 80.25H11.4583L29.9792 56.4375Z"
                                fill="#707070"
                              />
                            </svg>
                          </div>
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

export default CreateStore;
