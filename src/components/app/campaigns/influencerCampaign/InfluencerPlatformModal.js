import React, { Fragment } from "react";

const InfluencerPlatformModal = ({ influencerPlatformDetails }) => {
  return (
    <Fragment>
      <div
        className="modal right fade"
        id="sideModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="sideModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content  modal-side">
            <div className="modal-header">
              <div>
                <div className="d-flex">
                  <div className="div">
                    <div className="avatar avatar-xl">
                      <img
                        src="./assets/img/wiz.jpeg"
                        className="rounded-circle"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="mg-l-10">
                    <p className="tx-12 tx-com mb-0">Artiste</p>
                    <p className="tx-28 mb-0 tx-com tx-bold">Wizkid</p>
                    <p className="mb-0 tx-12">
                      <i className="fa fa-users" /> 3 million - 6 million
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body pd-x-30">
              <p className="tx-18 tx-semibold">Select Platform</p>
              <div className="row justify content-between mg-b-15">
                <div className="col-5">
                  <p>
                    <i
                      className="fa fa-instagram mg-r-5 social-media"
                      aria-hidden="true"
                    />
                    Instagram
                  </p>
                </div>
                <div className="col-7">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="instagram"
                    />
                    <label className="custom-control-label" htmlFor="instagram">
                      N250,000 per post
                    </label>
                  </div>
                </div>
              </div>
              <div className="row justify content-between mg-b-15">
                <div className="col-5">
                  <p>
                    <i
                      className="fa fa-facebook-square mg-r-5 social-media"
                      aria-hidden="true"
                    />
                    Facebook
                  </p>
                </div>
                <div className="col-7">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="facebook"
                    />
                    <label className="custom-control-label" htmlFor="facebook">
                      N250,000 per post
                    </label>
                  </div>
                </div>
              </div>
              <div className="row justify content-between mg-b-15">
                <div className="col-5">
                  <p>
                    <i
                      className="fa fa-twitter mg-r-5 social-media"
                      aria-hidden="true"
                    />
                    Twitter
                  </p>
                </div>
                <div className="col-7">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="twitter"
                    />
                    <label className="custom-control-label" htmlFor="twitter">
                      N250,000 per post
                    </label>
                  </div>
                </div>
              </div>
              <div className="row justify content-between mg-b-15">
                <div className="col-5">
                  <p>
                    <i
                      className="fa fa-snapchat mg-r-5 social-media"
                      aria-hidden="true"
                    />
                    Snapchat
                  </p>
                </div>
                <div className="col-7">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="snapchat"
                    />
                    <label className="custom-control-label" htmlFor="snapchat">
                      N250,000 per post
                    </label>
                  </div>
                </div>
              </div>
              <div className="row justify content-between mg-b-15">
                <div className="col-5">
                  <p>
                    <i className="fas fa-bullhorn mg-r-5 social-media" />
                    All
                  </p>
                </div>
                <div className="col-7">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="all"
                    />
                    <label className="custom-control-label" htmlFor="all">
                      N250,000 per post
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer bd-t-0">
              <button className="btn btn-outline-primary bg-white tx-bold tx-com">
                Save Selection
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InfluencerPlatformModal;
