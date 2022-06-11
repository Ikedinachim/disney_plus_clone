import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";

import MetaData from "../../../layout/MetaData";
import { ProgressBar } from "react-bootstrap";

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
}) => {
  const Continue = (e) => {
    e.preventDefault();
    if (values.startDate === "") {
      toast.warning("Please choose a start date");
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
          <div className="pd-md-y-20 col-xl-11 pd-x-0">
            <form>
              <div>
                <p className="tx-22 tx-com tx-bold mb-1">BillBoard Marketing</p>
                <p className="tx-14 tx-blac">
                  Provide all requested details to help complete the campaign
                  creation
                </p>
                <div className="form-group">
                  <div className="form-group col-md-6 pd-l-0 mg-0">
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
                        min="6/11/2022"
                        max="6/11/2022"
                      />
                      {/* <DatePicker
                        name="startDate"
                        dateFormat="yyyy/MM/dd"
                        calendarClassName="form-control"
                        selected={values.startDate}
                        onChange={handleChange("startDate")}
                        startDate={new Date()}
                        minDate={new Date()}
                      /> */}
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
                      <label className="custom-control-label" htmlFor="image">
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
                      <label className="custom-control-label" htmlFor="video">
                        Video Asset
                      </label>
                    </div>
                  </div>
                  {values.assetType === "image" && (
                    <div className="form-group pd-0 col-md-6 pd-md-l-0">
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
                    <div className="form-group pd-0 col-md-6 pd-md-l-0">
                      <div className="custom-file">
                        <label className="mb-1">Youtube URL</label>
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
                        uploadPercentage !== 100 && values.attachment === null
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
      </div>
    </Fragment>
  );
};

export default BillBoardTargetAudience;
