import React, { Fragment } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import NumberFormat from "react-number-format";

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
}) => {
  const { allBillBoard } = useSelector((state) => state.allBillBoard || []);

  const Continue = (e) => {
    e.preventDefault();
    if (values.attachment === "" || values.attachment === undefined) {
      toast.error("Please upload billboard creative");
    } else if (values.startDate === "") {
      toast.error("Set campaign start date");
    } else if (values.endDate === "") {
      toast.error("Set campaign end date");
    } else {
      nextStep();
    }
  };
  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <Fragment>
      <MetaData title={"Billboard Marketing"} />
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
                      <p className="tx-24 tx-bold mb-1 tx-com">
                        Billboard Marketing
                      </p>
                      <p className="tx-14 tx-blac">
                        Provide all requested details to help complete your
                        billboard placement
                      </p>

                      <div className="mg-t-40">
                        <p className="tx-22 tx-bold mb-1 tx-com">
                          Billboard Creative
                        </p>
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
                        {values.attachment !== undefined && (
                          <div className="card shadow-sm rounded bd-0 mg-b-20 ht-250">
                            <div className="card-body ht-100p">
                              {values.assetType === "image" ? (
                                <img
                                  src={values && values.attachment}
                                  className="img-fluid mg-b-10 img-fit-contain"
                                  alt=""
                                />
                              ) : (
                                values.attachment !== undefined &&
                                values.attachment !== "" && (
                                  <>
                                    <div className="mg-b-10">
                                      <MediaPlayer
                                        url={values.attachment}
                                        height={"400px"}
                                      />
                                    </div>
                                  </>
                                )
                              )}
                            </div>
                          </div>
                        )}
                        {values.assetType === "image" && (
                          <div className="form-group pd-0">
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
                              <label className="mb-1">Youtube URL</label>
                              <input
                                type="file"
                                name="file"
                                id="videoAsset"
                                className="custom-file-input"
                                accept="video/mp4,video/x-m4v,video/*"
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
                      <div className="form-group d-flex">
                        <div className="form-group col-md-6 pd-l-0 mg-0">
                          <label className="mb-1">
                            Duration
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
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6 pd-x-0 mg-0">
                          <label />
                          <div className="input-group mg-b-10 mg-t-5">
                            <div className="input-group-prepend">
                              <span className="input-group-text">End</span>
                            </div>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Username"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              defaultValue={values.endDate}
                              onChange={handleChange("endDate")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 pd-x-0 mg-y-40">
                        <div className="d-flex">
                          <button
                            className="btn btn-primary w-100 tx-com"
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
                          <button
                            onClick={Previous}
                            className="btn btn-outline-primary w-100 mg-l-20 tx-bold tx-com"
                          >
                            Go Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="position-sticky t-0 col-md-5 col-12 mg-t-20">
                {allBillBoard.map(
                  (billboard, i) =>
                    billboard.id === values.billboard_id && (
                      <div key={i}>
                        <div className="card shadow-sm rounded bd-0 ht-400">
                          <div className="card-body">
                            <img
                              src={billboard?.imageUrl}
                              className="img-fluid mg-b-10 img-fit-cover"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="pd-30">
                          <h2 className="tx-24 tx-bold mg-b-20 tx-com text-uppercase">
                            {billboard.title}
                          </h2>
                          <div>
                            <p className="tx-bold">
                              Price:{" "}
                              <NumberFormat
                                className="tx-18 mg-5 tx-amt mt-0"
                                value={parseInt(billboard.daily)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₦"}
                              />
                            </p>
                          </div>
                          <div>
                            <p className="tx-bold">
                              Location:{" "}
                              <span className="tx-normal">
                                {billboard.location}
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="tx-bold">
                              Size:{" "}
                              <span className="tx-normal">
                                {billboard.size}
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="tx-bold">
                              illumination:{" "}
                              <span className="tx-normal">
                                {billboard.illumination}
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="tx-bold">
                              Traffic:{" "}
                              <span className="tx-normal">
                                {billboard.traffic}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BillBoardTargetAudience;
