import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { ProgressBar } from "react-bootstrap";
// import DatePicker from "react-datepicker";

import MetaData from "../../../layout/MetaData";
import MediaPlayer from "../../../../_helpers/reactPlayer/ReactPlayer";

const BillBoardTargetAudience = ({
  prevStep,
  nextStep,
  handleChange,
  handleImageUpload,
  handleVideoUpload,
  values,
  selectedFileName,
  uploadPercentage,
  resetCheckedState,
  youtubeError,
}) => {
  let date = new Date();
  // add 1 day
  date.setDate(date.getDate() + 1);
  const Continue = (e) => {
    e.preventDefault();
    let d1 = new Date().setHours(0, 0, 0, 0);
    let d2 = new Date(values.startDate).setHours(0, 0, 0, 0);

    if (values.startDate === "") {
      toast.warning("Please choose a start date");
    } else if (d1.valueOf() > d2.valueOf()) {
      toast.warning("Please set a valid date");
    } else if (!values.attachment) {
      toast.warning("Please upload billboard creative");
    } else {
      nextStep();
    }
  };
  const Previous = (e) => {
    e.preventDefault();
    resetCheckedState();
    prevStep();
  };

  return (
    <Fragment>
      <MetaData title={"BillBoard Marketing"} />
      <div className="content-body">
        <div className="container pd-x-0">
          <div className="mg-b-20 mg-md-b-30">
            <div className="d-flex justify-content-between">
              <p className="tx-18 mb-0 tx-com tx-bold">60%</p>
              <p className="tx-18 mb-0 tx-com tx-bold">2 out of 3</p>
            </div>
            <div className="progress">
              <div
                className="progress-bar bg-primary progress-bar-striped progress-bar-animated wd-60p"
                role="progressbar"
                aria-valuenow={60}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
          <div className="pd-md-y-20">
            <div className="align-items-start row justify-content-between">
              <div className="col-md-6 col-12 mg-t-20">
                <div className="card-scrol pd-md-x-10">
                  <form>
                    <div>
                      <p className="tx-22 tx-com tx-bold mb-1">
                        BillBoard Marketing
                      </p>
                      <p className="tx-14 tx-blac">
                        Provide all requested details to help complete the
                        campaign creation
                      </p>
                      <div className="form-group">
                        <div className="form-group">
                          <label className="mb-1">
                            Start Date
                            <i className="tx-6 fa fa-star tx-primary mg-l-2" />
                          </label>
                          <div className="input-group mg-b-0">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Start</span>
                            </div>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Username"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              defaultValue={values.startDate}
                              onChange={handleChange("startDate")}
                              min={date.toISOString().split("T")[0]}
                              // max="6/11/2022"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mg-t-40">
                        <p className="tx-22 tx-bold mb-1 tx-com">Attachment</p>
                        <div className="form-group">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="image"
                              name="customRadio"
                              className="custom-control-input"
                              checked={values.assetType === "image"}
                              value={"image"}
                              onChange={handleChange("assetType")}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="image"
                            >
                              Image Asset
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="video"
                              name="customRadio"
                              className="custom-control-input"
                              checked={values.assetType === "video"}
                              value={"video"}
                              onChange={handleChange("assetType")}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="video"
                            >
                              Video Asset
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="youtube"
                              name="customRadio"
                              className="custom-control-input"
                              checked={values.assetType === "youtube"}
                              value={"youtube"}
                              onChange={handleChange("assetType")}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="youtube"
                            >
                              Youtube
                            </label>
                          </div>
                        </div>
                        {values.assetType === "image" && (
                          <div className="form-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                name="file"
                                accept="image/png, image/jpeg, image/gif, image/jpg"
                                className="custom-file-input"
                                id="customFile"
                                onChange={handleImageUpload}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFile"
                              >
                                {selectedFileName}
                              </label>
                              {uploadPercentage > 0 && (
                                <span className="mt-2">
                                  <ProgressBar
                                    now={uploadPercentage}
                                    label={`${uploadPercentage}%`}
                                  />
                                </span>
                              )}
                              <p className="mt-2 tx-danger tx-italic">
                                Image dimension: 960 x 1280
                              </p>
                            </div>
                          </div>
                        )}
                        {values.assetType === "video" && (
                          <div className="form-group">
                            <div className="custom-file">
                              {/* <label className="mb-1">Youtube URL</label> */}
                              <input
                                type="file"
                                name="file"
                                id="videoAsset"
                                className="custom-file-input"
                                accept="video/mp4,video/x-m4v,video/*"
                                // value={values.attachment}
                                // placeholder="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                                onChange={handleVideoUpload}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="videoAsset"
                              >
                                {selectedFileName}
                              </label>
                              {uploadPercentage > 0 && (
                                <span className="mt-2">
                                  <ProgressBar
                                    now={uploadPercentage}
                                    // active
                                    label={`${uploadPercentage}%`}
                                  />
                                </span>
                              )}
                              <p className="tx-danger tx-italic">
                                Video size: not more than 30mb
                              </p>
                            </div>
                          </div>
                        )}
                        {values.assetType === "youtube" && (
                          <>
                            <div className="form-group">
                              <div className="custom-file">
                                <label className="mb-1">Youtube URL</label>
                                <input
                                  type="text"
                                  id="videoAsset"
                                  className="form-control"
                                  defaultValue={values.attachment}
                                  placeholder="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                                  onChange={handleChange("rawVideoUrl")}
                                />
                              </div>
                            </div>
                            {youtubeError && (
                              <p className="mt-2 tx-danger tx-italic">
                                Enter a valid youtube url
                              </p>
                            )}
                          </>
                        )}
                      </div>
                      <div className="col-md-5 pd-x-0 mg-y-40">
                        <div className="d-flex">
                          <button
                            onClick={Previous}
                            className="btn btn-outline-primary w-100 tx-bold tx-com"
                          >
                            Reset
                          </button>
                          <button
                            className="btn btn-primary w-100 tx-com mg-l-20"
                            onClick={Continue}
                            type="submit"
                            variant="contained"
                            disabled={
                              uploadPercentage !== 100 &&
                              values.attachment === null
                                ? true
                                : false
                            }
                          >
                            Proceed
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="position-sticky t-0 col-md-5 col-12 mg-t-20">
                {/* <div class="iphone-x">
                  <i>Speaker</i>
                  <b>Camera</b>
                  <s></s>
                  <span>Left action button</span>
                  <span>Right action button</span>
                </div> */}
                <div className="card shadow-sm rounded bd-0">
                  <div className="card-body">
                    {values.assetType === "image" ? (
                      <div>
                        <img
                          src={values && values.attachment}
                          className="img-fluid mg-b-10"
                          alt=""
                        />
                        <p className="mb-4">{values.campaignMessage}</p>
                      </div>
                    ) : (
                      <>
                        <div className="mg-b-10">
                          <MediaPlayer url={values.attachment} />
                        </div>
                        <p className="mb-4">{values.campaignMessage}</p>
                      </>
                    )}
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

export default BillBoardTargetAudience;
