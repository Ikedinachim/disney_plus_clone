import React, { Fragment } from "react";

const InfluencerCard = ({ influencer, toggleHandler, checkedInfluencer }) => {
  return (
    <Fragment>
      <div className="col-md-3 col-12 mg-b-20">
        <div className="card card-body shadow-sm pd-12 card-height rounded">
          <div className="custom-control custom-checkbox pd-l-15">
            <input
              type="checkbox"
              className="custom-control-input pd-l-0 mg-l-0"
              value={influencer.id}
              onChange={toggleHandler(influencer)}
              checked={checkedInfluencer[influencer.id]}
              id="customCheck1"
            />
            <label
              className="custom-control-label d-inline"
              htmlFor="customCheck1"
              data-toggle="modal"
              data-target="#sideModal"
            >
              <div className="d-flex">
                <div className="div pd-l-0">
                  <div className="avatar avatar-xl">
                    <img
                      src={influencer.imagePath}
                      className="rounded-circle"
                      alt={influencer.name}
                    />
                  </div>
                </div>
                <div className="mg-l-10">
                  <p className="tx-18 mb-0 tx-com tx-bold">{influencer.name}</p>
                  <p className="mb-1 tx-14">{influencer.kind}</p>
                  <p className="mb-0 tx-12 tx-gray">
                    <i className="fa fa-users wd-5 ht-5 mg-r-8" />{" "}
                    <span className="tx-gray">{influencer.reach}</span>
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InfluencerCard;
