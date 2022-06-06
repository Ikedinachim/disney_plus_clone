import React, { Fragment, useState, useEffect } from "react";

const InfluencerCard = ({
  billboard,
  handleInfluencerChange,
  checkedInfluencer,
  //   isChecked,
  toggleHandler,
  setShow,
  show,
}) => {
  // const [active, setActive] = useState(show);
  // useEffect(() => {
  //   // console.log(show.indexOf(influencer.id + ""), influencer.id);
  // }, [show]);
  return (
    <Fragment>
      <div className="col-md-4 col-lg-3 col-12 mg-b-20">
        <div className="card card-body shadow-sm pd-12 card-height rounded">
          <div className="custom-control custom-checkbox pd-l-15">
            {/* <div className="custom-control-input"> */}
            <input
              type="checkbox"
              name={billboard.title}
              className="custom-control-input pd-l-0 mg-l-0"
              value={billboard.id}
              onChange={toggleHandler(billboard)}
              id={billboard.id}
            />
            {/* </div> */}
            <label
              className="custom-control-label d-inline"
              htmlFor={billboard.id}
              data-toggle="modal2"
              data-target="#sideModal"
            >
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
                  <p className="mb-1 tx-14 capitalize">{billboard.kind}</p>
                  <p className="mb-0 tx-12 tx-gray">
                    <i className="fa fa-users wd-5 ht-5 mg-r-8" />{" "}
                    <span className="tx-gray">{billboard.daily}</span>
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
