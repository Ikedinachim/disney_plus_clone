import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import NumberFormat from "react-number-format";
import "./BillBoardModal.css";

const BillBoardModal = ({
  onClose,
  show,
  checkedBillBoard,
  handlePlatformOnChange,
  setSelectedBillBoard,
  selectedRate,
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
        {checkedBillBoard && (
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
                              src={checkedBillBoard.imageUrl}
                              className="rounded-circle"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="mg-l-10">
                          <p className="tx-12 tx-com mb-0 capitalize">
                            {checkedBillBoard.title}
                          </p>
                          <p className="tx-16 mg-y-10 tx-com tx-bold">
                            {checkedBillBoard.traffic}
                          </p>
                          <p className="mb-0 tx-12">
                            <i className="fa fa-users" />{" "}
                            {checkedBillBoard.impressions
                              ? checkedBillBoard.impressions
                              : 70}{" "}
                            impressions per day
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
                    <p className="tx-18 tx-semibold">Select Duration</p>
                    {checkedBillBoard &&
                      checkedBillBoard.rates.map((billboard, idx) => (
                        <div
                          key={billboard.id}
                          className="row justify content-between mg-b-15"
                        >
                          <div className="col-5">
                            <p>
                              {/* {sortIcon(platform)} */}
                              {billboard.name} price
                            </p>
                          </div>
                          <div className="col-7">
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                name="customRadio"
                                className="custom-control-input"
                                value={parseInt(billboard.id)}
                                id={billboard.name}
                                onChange={handlePlatformOnChange(
                                  billboard,
                                  idx
                                )}
                                checked={
                                  selectedRate !== null &&
                                  billboard.id === selectedRate.id
                                    ? true
                                    : false
                                }
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={billboard.name}
                              >
                                {/* {parseInt(billboard.cost)} */}
                                <NumberFormat
                                  className="mt-0"
                                  value={parseInt(billboard.cost)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                />{" "}
                                {billboard.name === "Daily" && "(1 day plan)"}
                                {billboard.name === "Weekly" && "(7 days plan)"}
                                {billboard.name === "Monthly" &&
                                  "(30 days plan)"}
                                {/* (1 day plan) */}
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    <br />

                    <div className="row justify content-between mg-b-15">
                      <div className="col">
                        <h3>Note:</h3>
                        <p className="tx-14 mb-0 tx-com tx-bold">
                          Customers advert will be displayed 70 times daily on
                          the billboard.
                        </p>
                      </div>
                    </div>
                    <div className="row justify content-between mg-b-15">
                      <div className="col">
                        <p className="tx-14 mb-0 tx-com tx-bold">
                          Adverts will be displayed for 10 seconds each time it
                          appears on the billboard.
                        </p>
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
                            values={checkedBillBoard}
                            id="all"
                            onChange={handlePlatformOnChange("all")}
                            checked={
                              checkedBillBoard.platforms.findIndex(
                                (el) => el.id === "all"
                              ) !== -1
                                ? true
                                : false
                            }
                          />
                          <label className="custom-control-label" htmlFor="all">
                            {parseInt(checkedBillBoard.allCost)} per post
                          </label>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="modal2-footer bd-t-0">
                    <button
                      className="btn btn-outline-primary bg-white tx-bold tx-com"
                      onClick={() => {
                        setSelectedBillBoard();
                      }}
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
