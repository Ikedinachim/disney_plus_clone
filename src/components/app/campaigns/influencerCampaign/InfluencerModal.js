import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import "./InfluencerModal.css";

const InfluencerModal = ({
  onClose,
  show,
  singleInfluencer,
  sortIcon,
  handlePlatformOnChange,
  handleAllCostSelection,
}) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <>
        {singleInfluencer && (
          <div className="modal right fade" onClick={onClose}>
            <div className="modal-dialog" role="document">
              <div
                className="modal-content modal-side"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <div>
                    <div className="d-flex">
                      <div className="div">
                        <div className="avatar avatar-xl">
                          <img
                            src={singleInfluencer.imagePath}
                            className="rounded-circle"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="mg-l-10">
                        <p className="tx-12 tx-com mb-0 capitalize">
                          {singleInfluencer.kind}
                        </p>
                        <p className="tx-28 mb-0 tx-com tx-bold">
                          {singleInfluencer.name}
                        </p>
                        <p className="mb-0 tx-12">
                          <i className="fa fa-users" /> {singleInfluencer.reach}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={onClose}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body pd-x-30">
                  <p className="tx-18 tx-semibold">Select Platform</p>
                  {singleInfluencer &&
                    singleInfluencer.costs.map((platform) => (
                      <div
                        key={platform.id}
                        className="row justify content-between mg-b-15"
                      >
                        <div className="col-5">
                          <p>
                            {sortIcon(platform)}
                            {platform.platform}
                          </p>
                        </div>
                        <div className="col-7">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              values={platform.platform}
                              id={platform.platform}
                              onChange={handlePlatformOnChange(platform)}
                              checked={
                                singleInfluencer.platforms.findIndex(
                                  (el) => el.id === platform.platform
                                ) !== -1
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={platform.platform}
                            >
                              {parseInt(platform.cost)}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
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
                          values={singleInfluencer}
                          id="all"
                          onChange={handlePlatformOnChange("all")}
                          checked={
                            singleInfluencer.platforms.findIndex(
                              (el) => el.id === "all"
                            ) !== -1
                              ? true
                              : false
                          }
                        />
                        <label className="custom-control-label" htmlFor="all">
                          {parseInt(singleInfluencer.allCost)} per post
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer bd-t-0">
                  <button
                    className="btn btn-outline-primary bg-white tx-bold tx-com"
                    onClick={onClose}
                  >
                    Save Selection
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default InfluencerModal;
