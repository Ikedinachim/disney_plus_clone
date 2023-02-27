import React, { Fragment, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import MetaData from "../../layout/MetaData";
import Loader from "../../loader";
import { ProgressBar } from "react-bootstrap";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { senderID, defaultSenderID, generalSender } = useSelector(
    (state) => state || []
  );

  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [showSms, setShowSms] = useState(false);
  const [showUssd, setShowUssd] = useState(false);

  // handle click event of the Add button
  const handleAddClick = (e) => {
    e.preventDefault();
    setShowWhatsapp(true);
    setShowSms(true);
    setShowUssd(true);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (whatsapp) => (e) => {
    e.preventDefault();
    if (whatsapp === "whatsapp") {
      setShowWhatsapp(false);
    } else if (whatsapp === "showSms") {
      setShowSms(false);
    } else if (whatsapp === "showUssd") {
      setShowUssd(false);
    }
  };

  return (
    <Fragment>
      {senderID.loading || defaultSenderID.loading || generalSender.loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Create Smart SMS/Display Ad"} />
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
                  <div className="col-md-5 col-12 mg-t-20">
                    <div className="card-scrol pd-md-x-10">
                      <div>
                        <p className="tx-24 tx-bold mb-1 tx-com">
                          Add product to your store!
                        </p>
                        <p className="tx-14 mb-4">
                          Provide all requested details to help setup your store
                        </p>
                      </div>
                      <form>
                        <div className="form-group mg-b-30">
                          <label className="mb-2">Product Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your product name"
                            // defaultValue={values.url}
                            // onChange={handleChange("url")}
                          />
                        </div>
                        <div className="form-group mg-b-30">
                          <label className="mb-2">Product Description</label>
                          <textarea
                            className="form-control"
                            rows={5}
                            placeholder="Type your description here"
                            // onChange={handleChange("nonEncodedMessage")}
                            // value={values.nonEncodedMessage}
                          />
                        </div>
                        <div className="form-group mg-b-30">
                          <label className="mb-2">Product Price</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter product price"
                            // defaultValue={values.url}
                            // onChange={handleChange("url")}
                          />
                        </div>
                        <div className="form-group mg-b-30">
                          <p className="tx-22 tx-bold mg-b-24 tx-com">
                            Attachment
                          </p>
                          <div className="custom-file">
                            <input
                              type="file"
                              name="file"
                              accept="image/png, image/jpeg, image/gif, image/jpg"
                              className="custom-file-input store-file-input"
                              id="customFile"
                              //   onChange={handleImageUpload}
                              multiple
                            />
                            <label
                              className="custom-file-label store-label"
                              htmlFor="customFile"
                            >
                              <div className="store-label-icon">
                                <i className="fa fa-image store-input-icon"></i>
                              </div>
                              {/* {selectedFileName} */}
                              Click to upload Product Pictures
                            </label>
                            {/* {uploadPercentage > 0 && (
                              <span className="mt-2">
                                <ProgressBar
                                  now={uploadPercentage}
                                  label={`${uploadPercentage}%`}
                                />
                              </span>
                            )} */}
                            <p className="mt-2 tx-danger tx-italic">
                              Image dimension: 960 x 1280
                            </p>
                            {/* <div className="row mg-0 mg-y-20 flex-wrap-reverse">
                              {values.attachments.map((imgNames, i) => (
                                <div
                                  id={i}
                                  key={i}
                                  className="d-flex mg-r-10 mg-y-10"
                                >
                                  <div className="d-flex justify-content-center tx-base align-items-center">
                                    <img
                                      src={imgNames}
                                      alt={"attachments"}
                                      className={"wd-60 ht-60 op-7"}
                                    />
                                  </div>
                                  <div className="justify-content-start d-flex align-items-center">
                                    <button
                                      type="button"
                                      className="btn pd-0 mg-l-10"
                                      onClick={handleImageDelete}
                                      id={imgNames}
                                    >
                                      <i
                                        id={imgNames}
                                        className="fa fa-trash text-danger"
                                      ></i>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div> */}
                          </div>
                        </div>
                      </form>
                      <div className="col-md-7 pd-x-0 mg-y-30">
                        <div className="d-flex">
                          <Link
                            to="/app/campaign/create"
                            className="btn btn-outline-primary w-100 mg-b-15"
                          >
                            Go Back
                          </Link>
                          <button
                            className="btn btn-primary w-100 mg-l-20 mg-b-15 "
                            // onClick={Continue}
                            type="submit"
                            variant="contained"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="position-sticky t-0 col-md-6 col-12 mg-t-20">
                    <div>
                      <button
                        className="btn btn-primary w-100 mg-b-15 "
                        // onClick={Continue}
                        type="submit"
                        variant="contained"
                      >
                        Done
                      </button>
                    </div>
                    <div className="content-body store-preview">
                      <div className="store-preview-logo">
                        <div className="store-card shadow-sm">
                          <p className="text-left tx-20 mg-0">
                            1 product added to store
                          </p>
                        </div>
                      </div>
                      <div className="store-preview-banner">
                        <div className="store-product-card shadow-sm">
                          <div className="store-product-content">
                            <div className="product-store-img">
                              <svg
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
                            <div className="product-store-content">
                              <h2>APPLE HOMEPOD</h2>
                              <p>
                                Lorem ipsum dolor sit amet consectetur. Egestas
                                egestas ullamcorper lorem dolor tempor sit.{" "}
                              </p>
                              <p className="product-store-price">
                                <span>Price:</span> N36,000
                              </p>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary store-close"
                            // onClick={Continue}
                            type="submit"
                            variant="contained"
                          >
                            <i className="fa fa-times store-close-icon"></i>
                          </button>
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

export default AddProduct;
