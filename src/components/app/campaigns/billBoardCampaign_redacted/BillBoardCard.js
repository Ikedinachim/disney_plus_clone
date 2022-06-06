import React, { Fragment } from "react";

const BillBoardCard = ({ billboard, handleBillBoardSelection }) => {
  return (
    <Fragment>
      <div
        className="col-md-4 col-lg-3 col-12 mg-b-20"
        onClick={() => handleBillBoardSelection(billboard.id, billboard.daily)}
      >
        <div className="card card-body shadow-sm pd-12 card-height rounded billboard-card">
          <div className="custom-control custom-checkbox pd-0">
            <div className="d-inline">
              <div className="d-flex overflow-hidden">
                <div className="div pd-l-0">
                  <div className="avatar avatar-xl">
                    <img
                      src={
                        billboard.imageUrl && billboard.imageUrl !== ""
                          ? billboard.imageUrl
                          : billboard.imagePath
                      }
                      className="rounded-circle"
                      alt={billboard.title}
                    />
                  </div>
                </div>
                <div className="mg-l-10">
                  <p className="tx-16 mb-0 tx-com tx-bold">{billboard.title}</p>
                  <p className="mb-1 tx-14 capitalize">{billboard.location}</p>
                  <p className="mb-0 tx-12 tx-gray">
                    <i className="wd-5 ht-5 tx-16 tx-bold">&#x20A6;</i>{" "}
                    <span className="tx-gray">
                      {parseInt(billboard.daily)} - daily
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BillBoardCard;
