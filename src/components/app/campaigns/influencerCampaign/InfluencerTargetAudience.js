import React, { Fragment, useState } from "react";
import { useAlert } from "react-alert";
// import { Link } from "react-router-dom";

import MetaData from "../../../layout/MetaData";
import { ProgressBar } from "react-bootstrap";

const InfluencerTargetAudience = ({
  prevStep,
  nextStep,
  handleChange,
  onChangeAttachment,
  handleImageUpload,
  values,
  selectedFileName,
  uploadPercentage,
}) => {
  const alert = useAlert();
  const [status, setStatus] = useState(3);
  const radioHandler = (status) => {
    setStatus(status);
  };

  const Continue = (e) => {
    e.preventDefault();
    if (values.campaignMessage === "") {
      alert.error("Create the campaign message");
    } else if (values.attachment === null) {
      nextStep();
      handleImageUpload();
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
      <MetaData title={"Influencer Marketing"} />
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
                <p className="tx-22 tx-com tx-bold mb-1">
                  Influencer Marketing
                </p>
                <p className="tx-14 tx-blac">
                  Provide all requested details to help complete the campaign
                  creation
                </p>

                <div className="form-group">
                  <label className="mb-1">Campaign Message</label>
                  <textarea
                    className="form-control"
                    rows={6}
                    placeholder="Indulge in any of our yummy treat for just 4500 naira per loaf... Get all three for 12,500. Contact us now
                    IG: @xxxx
                    Twitter: @xxxx
                    FB: @xxxx
                    Snapchat: @xxxx"
                    defaultValue={values.campaignMessage}
                    onChange={handleChange("campaignMessage")}
                  />
                </div>
                <div className="mg-t-40">
                  <p className="tx-22 tx-bold mb-1 tx-com">Attachment</p>
                  <div className="form-group col-md-6 pd-md-l-0">
                    <div className="custom-file">
                      <input
                        type="file"
                        name="file"
                        className="custom-file-input"
                        id="customFile"
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        onChange={handleImageUpload}
                        // placeholder="Click to upload desired icon (if needed)"
                      />
                      <label className="custom-file-label" htmlFor="customFile">
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
                        uploadPercentage !== 100 && values.attachment === null
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
      </div>
    </Fragment>
  );
};

export default InfluencerTargetAudience;
