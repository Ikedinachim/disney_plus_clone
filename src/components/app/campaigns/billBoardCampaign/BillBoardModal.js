import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import "./BillBoardModal.css";

const BillBoardModal = ({
  onClose,
  show,
  singleBillBoard,
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
        {singleBillBoard && (
          <>
            <div className="modal2 right fade" onClick={onClose}>
              <div className="modal2-dialog" role="document">
                <div
                  className="modal2-content modal2-side"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal2-header">
                    <div>
                      <div className="d-flex">
                        <div className="div">
                          <div className="avatar avatar-xl">
                            <img
                              src={singleBillBoard.imageUrl}
                              className="rounded-circle"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="mg-l-10">
                          <p className="tx-12 tx-com mb-0 capitalize">
                            {singleBillBoard.kind}
                          </p>
                          <p className="tx-28 mb-0 tx-com tx-bold">
                            {singleBillBoard.name}
                          </p>
                          <p className="mb-0 tx-12">
                            <i className="fa fa-users" />{" "}
                            {singleBillBoard.reach}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal2"
                      aria-label="Close"
                      onClick={onClose}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal2-body pd-x-30">
                    <p className="tx-18 tx-semibold">Select Platform</p>
                    <div className="row justify content-between mg-b-15">
                      <div className="col-5">
                        <p>
                          {/* {sortIcon(platform)} */}
                          Daily
                        </p>
                      </div>
                      <div className="col-7">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            values={parseInt(singleBillBoard.daily)}
                            id={singleBillBoard.daily}
                            onChange={handlePlatformOnChange(singleBillBoard)}
                            checked={
                              singleBillBoard.platforms.findIndex(
                                (el) => el.id === singleBillBoard.daily
                              ) !== -1
                                ? true
                                : false
                            }
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={singleBillBoard.daily}
                          >
                            {parseInt(singleBillBoard.daily)}
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row justify content-between mg-b-15">
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
                            values={singleBillBoard}
                            id="all"
                            onChange={handlePlatformOnChange("all")}
                            checked={
                              singleBillBoard.platforms.findIndex(
                                (el) => el.id === "all"
                              ) !== -1
                                ? true
                                : false
                            }
                          />
                          <label className="custom-control-label" htmlFor="all">
                            {parseInt(singleBillBoard.allCost)} per post
                          </label>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="modal2-footer bd-t-0">
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
            <div className="backdrop"></div>
            <div className="aside-backdrop"></div>
            <div className="modal-backdrop fade show"></div>
          </>
        )}
      </>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default BillBoardModal;
